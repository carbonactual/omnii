import { EventStore } from "./event-runtime";
import { JsonObject } from "./types";
import { MemoryPersistenceAdapter, PersistencePort, PersistenceRecord } from "./persistence";
import { ProcessTask, TaskQueueRuntime } from "./task-queue-runtime";

export interface ProcessInstance extends PersistenceRecord {
  process_type: string;
  subject_id?: string | null;
  form_submission_id?: string | null;
  status: string;
  current_stage: string;
  workflow_id?: string | null;
  workflow_version?: string | null;
  context: JsonObject;
  state: JsonObject;
  authority: JsonObject;
  evidence: JsonObject;
  started_at?: string | null;
  completed_at?: string | null;
  updated_at: string;
}
export interface WorkflowTransitionDefinition { event: string; to: string; task_type: string; approval_required?: boolean; assignee_id?: string | null; due_at?: string | null; requirements?: JsonObject; payload?: JsonObject; terminal?: boolean; }
export interface WorkflowRecord extends PersistenceRecord { id: string; version: string; states: string[]; transitions: Record<string, Array<WorkflowTransitionDefinition | string>>; approval_gates?: string[]; sla_rules?: JsonObject; exception_rules?: string[]; }
export interface ProcessProgressionWorkflowResolver { resolveWorkflow?(id: string, version: string): Promise<WorkflowRecord | undefined>; }
export interface ProcessProgressionAtomicPersistence extends PersistencePort, ProcessProgressionWorkflowResolver { progressProcess?(input: { processId: string; expectedVersion: string; processPatch: JsonObject; tasks: ProcessTask[]; event: JsonObject }): Promise<{ process: ProcessInstance; tasks: ProcessTask[]; event?: PersistenceRecord; idempotent?: boolean }>; }
export interface ProcessProgressionResult { process: ProcessInstance; nextTasks: ProcessTask[]; transitionEvent: PersistenceRecord; idempotent: boolean; }

const PROCESS_COLLECTION = "process_instances" as const;
const WORKFLOW_COLLECTION = "workflows" as const;
const TASK_COLLECTION = "process_tasks" as const;

export class ProcessProgressionRuntime {
  private readonly persistence: ProcessProgressionAtomicPersistence;
  private readonly queue: TaskQueueRuntime;
  constructor(persistence: ProcessProgressionAtomicPersistence = new MemoryPersistenceAdapter(), events = new EventStore(persistence), queue = new TaskQueueRuntime({ persistence, events })) { this.persistence = persistence; this.queue = queue; }
  async progress(processId: string, completedTaskId: string, actorId: string): Promise<ProcessProgressionResult> {
    const process = await this.requireProcess(processId);
    const task = await this.queue.read(completedTaskId);
    if (!task) throw new Error(`Process task not found: ${completedTaskId}`);
    if (task.process_id !== process.id) throw new Error("Task does not belong to process");
    if (task.status !== "completed") throw new Error("Only completed tasks can advance a process");
    const workflow = await this.requireWorkflow(this.workflowId(process), this.workflowVersion(process));
    const eventName = this.transitionEvent(task);
    const transitions = this.resolveTransitions(workflow, process.current_stage, eventName);
    const nextTasks = transitions.map((transition, index) => this.buildNextTask(process, task, transition, eventName, index));
    const isTerminal = transitions.length > 0 && transitions.every((transition) => transition.terminal === true);
    const waitingApproval = transitions.some((transition) => transition.approval_required === true);
    const nextStatus = isTerminal ? "completed" : waitingApproval ? "blocked" : "active";
    const nextStage = transitions.length === 1 ? transitions[0].to : process.current_stage;
    const expectedVersion = String(process.version ?? "1");
    const processPatch: JsonObject = { current_stage: nextStage, status: nextStatus, state: { ...process.state, waiting_approval: waitingApproval, last_transition: { from: process.current_stage, to: nextStage, event: eventName, task_id: task.id } }, completed_at: isTerminal ? new Date().toISOString() : null, version: String(Number(expectedVersion) + 1) };
    const idempotencyKey = `process-progress:${process.id}:${task.id}`;
    const event: JsonObject = { id: idempotencyKey, type: "PROCESS_TRANSITION_RESOLVED", occurred_at: new Date().toISOString(), actor: actorId, subject: process.id, correlation_id: process.id, idempotency_key: idempotencyKey, outcome: nextStatus, provenance: { workflow_id: workflow.id, workflow_version: workflow.version, task_id: task.id }, payload: { from: process.current_stage, to: nextStage, event: eventName, next_task_ids: nextTasks.map((candidate) => candidate.id) } };
    if (this.persistence.progressProcess) { const atomic = await this.persistence.progressProcess({ processId: process.id, expectedVersion, processPatch, tasks: nextTasks, event }); return { process: atomic.process, nextTasks: atomic.tasks, transitionEvent: atomic.event ?? event, idempotent: atomic.idempotent ?? false }; }
    return this.persistence.transaction(async () => {
      const existingEvents = await this.persistence.query("events", (record) => record["idempotency_key"] === idempotencyKey);
      if (existingEvents.length) { const current = await this.requireProcess(process.id); const existingTasks = await this.persistence.query(TASK_COLLECTION, (record) => nextTasks.some((candidate) => candidate.id === record.id)); return { process: current, nextTasks: existingTasks as unknown as ProcessTask[], transitionEvent: existingEvents[0], idempotent: true }; }
      const updated = await this.persistence.updateIfVersion(PROCESS_COLLECTION, process.id, expectedVersion, processPatch);
      for (const nextTask of nextTasks) await this.persistence.create(TASK_COLLECTION, nextTask);
      const createdEvent = await this.persistence.create("events", event as { id: string });
      return { process: updated as unknown as ProcessInstance, nextTasks, transitionEvent: createdEvent, idempotent: false };
    });
  }
  private buildNextTask(process: ProcessInstance, completedTask: ProcessTask, transition: WorkflowTransitionDefinition, eventName: string, index: number): ProcessTask { const now = new Date().toISOString(); const approvalRequired = transition.approval_required === true; return { id: `${process.id}:${completedTask.id}:${eventName}:${index}`, version: "1", process_id: process.id, stage: transition.to, task_type: transition.task_type, assignee_id: transition.assignee_id ?? null, status: approvalRequired ? "blocked" : "ready", due_at: transition.due_at ?? null, payload: { ...(completedTask.payload ?? {}), ...(transition.payload ?? {}), source_task_id: completedTask.id, transition_event: eventName }, requirements: { ...(transition.requirements ?? {}), ...(approvalRequired ? { approvalRequired: true } : {}) }, outcome: {}, evidence: [], created_at: now, updated_at: now }; }
  private resolveTransitions(workflow: WorkflowRecord, from: string, eventName: string): WorkflowTransitionDefinition[] { const candidates = workflow.transitions?.[from] ?? []; const matches = candidates.filter((candidate) => typeof candidate !== "string" && candidate.event === eventName) as WorkflowTransitionDefinition[]; if (!matches.length) { if (candidates.some((candidate) => candidate === eventName)) throw new Error(`Transition target unresolved for ${from}:${eventName}`); throw new Error(`No executable transition for ${from}:${eventName}`); } return matches; }
  private transitionEvent(task: ProcessTask): string { const event = task.outcome?.["event"]; if (typeof event !== "string" || !event.trim()) throw new Error("Completed task must provide outcome.event for progression"); return event; }
  private async requireProcess(id: string): Promise<ProcessInstance> { const record = await this.persistence.read(PROCESS_COLLECTION, id); if (!record) throw new Error(`Process instance not found: ${id}`); return record as unknown as ProcessInstance; }
  private async requireWorkflow(id: string, version: string): Promise<WorkflowRecord> { const resolved = await this.persistence.resolveWorkflow?.(id, version); const record = resolved ?? await this.persistence.read(WORKFLOW_COLLECTION, id); if (!record) throw new Error(`Workflow definition not found: ${id}`); if (String(record.version) !== version) throw new Error(`Workflow version mismatch: expected ${version}, found ${record.version}`); return record as WorkflowRecord; }
  private workflowId(process: ProcessInstance): string { const id = process.workflow_id ?? process.state?.["workflow_id"]; if (typeof id !== "string" || !id) throw new Error("Process instance has no workflow_id"); return id; }
  private workflowVersion(process: ProcessInstance): string { const version = process.workflow_version ?? process.state?.["workflow_version"]; if (typeof version !== "string" || !version) throw new Error("Process instance has no workflow_version"); return version; }
}
