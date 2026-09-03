import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json = Record<string, unknown>;
type Transition = { event?: string; to?: string; task_type?: string; approval_required?: boolean; assignee_id?: string | null; due_at?: string | null; requirements?: Json; payload?: Json; terminal?: boolean };

const json = (body: Json, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
const asRecord = (value: unknown): Json => value && typeof value === "object" && !Array.isArray(value) ? value as Json : {};

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "runtime_not_configured" }, 500);
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return json({ error: "missing_authorization" }, 401);
  const db = createClient(url, key, { global: { headers: { Authorization: authorization } } });
  const { data: { user }, error: authError } = await db.auth.getUser(authorization.slice(7));
  if (authError || !user) return json({ error: "unauthorized" }, 401);

  let input: Json;
  try { input = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }
  const workerId = typeof input.workerId === "string" && input.workerId ? input.workerId : user.id;
  const maxTasks = Math.min(20, Math.max(1, Number(input.maxTasks ?? 1)));
  const leaseSeconds = Math.min(3600, Math.max(1, Number(input.leaseSeconds ?? 300)));
  const results: Json[] = [];

  for (let i = 0; i < maxTasks; i += 1) {
    const { data: claim, error: claimError } = await db.rpc("omnii_claim_process_task", { p_worker_id: workerId, p_lease_seconds: leaseSeconds });
    if (claimError) return json({ error: "claim_failed", detail: claimError.message, results }, 500);
    const claimed = asRecord(claim);
    if (claimed.claimed !== true || !claimed.task) break;
    const task = asRecord(claimed.task);
    const taskId = String(task.id);

    const requirements = asRecord(task.requirements);
    const handlerId = typeof requirements.handlerId === "string" ? requirements.handlerId : `system.${String(task.task_type)}`;
    const { data: handler, error: handlerError } = await db.from("omnii_process_task_handlers")
      .select("id,task_type,handler_key,execution_mode,outcome_event,evidence_template,authority_requirements,lifecycle")
      .eq("id", handlerId).eq("task_type", String(task.task_type)).eq("lifecycle", "active").maybeSingle();
    if (handlerError) return json({ error: "handler_lookup_failed", detail: handlerError.message, results }, 500);
    if (!handler) {
      const { data: escalation, error: escalationError } = await db.rpc("omnii_escalate_process_task", {
        p_task_id: taskId, p_expected_version: String(task.version), p_actor_id: workerId,
        p_reason: `No eligible registered handler for task type: ${String(task.task_type)}`,
      });
      if (escalationError) return json({ error: "escalation_failed", detail: escalationError.message, results }, 500);
      results.push({ status: "blocked", task: escalation });
      continue;
    }

    if (handler.execution_mode !== "event" || typeof handler.outcome_event !== "string" || !handler.outcome_event) {
      const { data: escalation, error: escalationError } = await db.rpc("omnii_escalate_process_task", {
        p_task_id: taskId, p_expected_version: String(task.version), p_actor_id: workerId,
        p_reason: `Handler ${handler.id} requires an external or human execution boundary`,
      });
      if (escalationError) return json({ error: "escalation_failed", detail: escalationError.message, results }, 500);
      results.push({ status: "blocked", task: escalation });
      continue;
    }

    const evidence = Array.isArray(handler.evidence_template) ? handler.evidence_template : [];
    const outcome = { event: handler.outcome_event, result: "completed", handler_key: handler.handler_key };
    const { data: completion, error: completionError } = await db.rpc("omnii_transition_process_task", {
      p_task_id: taskId,
      p_expected_version: String(task.version),
      p_status: "completed",
      p_actor_id: workerId,
      p_outcome: outcome,
      p_evidence: evidence,
      p_error: null,
    });
    if (completionError) return json({ error: "completion_failed", detail: completionError.message, results }, 500);

    const { data: process, error: processError } = await db.from("omnii_process_instances")
      .select("*").eq("id", String(task.process_id)).maybeSingle();
    if (processError) return json({ error: "process_lookup_failed", detail: processError.message, results }, 500);

    let progression: unknown = null;
    if (process) {
      const workflowId = typeof process.workflow_id === "string" ? process.workflow_id : undefined;
      const workflowVersion = typeof process.workflow_version === "string" ? process.workflow_version : undefined;
      if (workflowId && workflowVersion) {
        const { data: workflow, error: workflowError } = await db.from("omnii_institutional_workflows")
          .select("id,version,states,transitions,approval_gates,sla_rules,exception_rules,lifecycle")
          .eq("id", workflowId).eq("version", workflowVersion).eq("lifecycle", "active").maybeSingle();
        if (workflowError) return json({ error: "workflow_lookup_failed", detail: workflowError.message, results }, 500);
        const stageTransitions = asRecord(workflow?.transitions)[String(process.current_stage)];
        const matched = Array.isArray(stageTransitions) ? stageTransitions.filter((x): x is Transition => x && typeof x === "object" && !Array.isArray(x) && String(x.event ?? "") === handler.outcome_event) : [];
        if (matched.length === 1 && typeof matched[0].to === "string") {
          const nextStage = matched[0].to;
          const outgoing = asRecord(workflow?.transitions)[nextStage];
          const nextTasks = Array.isArray(outgoing) ? outgoing.filter((x): x is Transition => x && typeof x === "object" && !Array.isArray(x)).map((x, index) => {
            const approval = x.approval_required === true;
            return {
              id: `${process.id}:${nextStage}:${x.event ?? "step"}:${index}`,
              version: "1", process_id: process.id, stage: nextStage, task_type: String(x.task_type ?? "workflow_stage"),
              assignee_id: x.assignee_id ?? null, status: approval ? "blocked" : "ready", due_at: x.due_at ?? null,
              payload: { ...asRecord(task.payload), ...asRecord(x.payload), source_task_id: taskId, transition_event: String(x.event ?? "") },
              requirements: { ...asRecord(x.requirements), ...(approval ? { approvalRequired: true } : {}) }, outcome: {}, evidence: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), idempotency_key: `process-next:${process.id}:${nextStage}:${x.event ?? "step"}:${index}`,
            };
          }) : [];
          const waitingApproval = nextTasks.some((x) => x.status === "blocked");
          const terminal = matched.every((x) => x.terminal === true);
          const patch = { current_stage: nextStage, status: terminal ? "completed" : waitingApproval ? "blocked" : "active", state: { ...asRecord(process.state), waiting_approval: waitingApproval, last_transition: { from: process.current_stage, to: nextStage, event: handler.outcome_event, task_id: taskId } }, completed_at: terminal ? new Date().toISOString() : null, version: String(Number(process.version ?? "1") + 1) };
          const event = { id: `process-progress:${process.id}:${taskId}`, version: "1", lifecycle: "active", authority: {}, provenance: { workflow_id: workflow.id, workflow_version: workflow.version, task_id: taskId, worker_id: workerId }, payload: { type: "PROCESS_TRANSITION_RESOLVED", actor: workerId, from: process.current_stage, to: nextStage, event: handler.outcome_event }, correlation_id: process.id, idempotency_key: `process-progress:${process.id}:${taskId}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
          const { data: progressed, error: progressError } = await db.rpc("omnii_progress_process", { p_process_id: process.id, p_expected_version: String(process.version ?? "1"), p_process_patch: patch, p_tasks: nextTasks, p_event: event });
          if (progressError) return json({ error: "progression_pending", detail: progressError.message, task: completion, results }, 202);
          progression = progressed;
        }
      }
    }
    results.push({ status: "completed", task: completion, progression });
  }

  return json({ accepted: true, workerId, processed: results.length, results }, 200);
});
