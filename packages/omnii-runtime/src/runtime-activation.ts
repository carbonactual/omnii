import { Authority } from "./types";
import { EventStore, OmniiEvent } from "./event-runtime";
import { Execution, ExecutionRuntime } from "./execution-runtime";
import { AuthorityRecord, AuthorityRuntime } from "./authority-runtime";
import { OperatingContext } from "./operating-context-runtime";
import { RuntimeSignal } from "./runtime-signal";
import { JsonObject } from "./types";

export type DispatchStatus = "accepted" | "blocked";

export interface ActivationRoute {
  routeId: string;
  capability: string;
  actorIdentity: string;
  workflowReference?: string;
  workflowVersion?: string;
  resources?: string[];
  requiresApproval?: boolean;
}

export interface ActivationResolution {
  context?: OperatingContext;
  authority?: AuthorityRecord;
  route?: ActivationRoute;
  status: DispatchStatus;
  reason?: string;
}

export interface ActivationExecutionResult {
  execution: Execution;
  evidence: JsonObject;
  completionProjected: boolean;
}

export interface ReconciliationResult {
  matched: boolean;
  expected: JsonObject;
  observed: JsonObject;
  discrepancy?: JsonObject;
}

export interface FeedbackObservation {
  kind: string;
  value: number;
  unit: string;
  dimension: string;
  provenance: JsonObject;
}

export interface RuntimeActivationDependencies {
  contextResolver: (signal: RuntimeSignal) => Promise<OperatingContext | undefined>;
  routeResolver: (signal: RuntimeSignal, context: OperatingContext, authority: AuthorityRecord) => Promise<ActivationRoute | undefined>;
  executionHandler: (route: ActivationRoute, signal: RuntimeSignal) => Promise<JsonObject>;
  authorityRuntime?: AuthorityRuntime;
  executionRuntime?: ExecutionRuntime;
  events?: EventStore;
}

export interface RuntimeActivationResult {
  signal: RuntimeSignal;
  resolution: ActivationResolution;
  execution?: ActivationExecutionResult;
  reconciliation?: ReconciliationResult;
  feedback?: FeedbackObservation;
  eventIds: string[];
}

export class RuntimeActivation {
  private readonly authorities: AuthorityRuntime;
  private readonly executions: ExecutionRuntime;
  private readonly events: EventStore;

  constructor(private readonly deps: RuntimeActivationDependencies) {
    this.authorities = deps.authorityRuntime ?? new AuthorityRuntime();
    this.executions = deps.executionRuntime ?? new ExecutionRuntime(deps.events ?? new EventStore());
    this.events = deps.events ?? new EventStore();
  }

  async activate(signal: RuntimeSignal): Promise<RuntimeActivationResult> {
    const intake = await this.events.append({
      type: "RUNTIME_SIGNAL_RECEIVED",
      actor: signal.actorId ?? signal.source,
      subject: signal.subjectId,
      correlation_id: signal.correlationId,
      idempotency_key: `runtime:signal:${signal.idempotencyKey}`,
      outcome: "received",
      provenance: signal.provenance ?? {},
      payload: {
        signal_id: signal.id,
        event_type: signal.eventType,
        source: signal.source,
        operating_context_id: signal.operatingContextId ?? null,
      },
    });
    const eventIds = [intake.id];

    const context = await this.deps.contextResolver(signal);
    if (!context) return this.blocked(signal, "context_unresolved", eventIds);

    const authorityId = typeof signal.provenance?.["authorityId"] === "string" ? String(signal.provenance["authorityId"]) : undefined;
    if (!authorityId) return this.blocked(signal, "authority_unresolved", eventIds);

    let authority: AuthorityRecord;
    try {
      authority = await this.authorities.validate(authorityId, { context: { operatingContextId: context.id } });
    } catch {
      return this.blocked(signal, "authority_invalid", eventIds);
    }

    const route = await this.deps.routeResolver(signal, context, authority);
    if (!route) return this.blocked(signal, "route_unresolved", eventIds);

    if (route.requiresApproval) return this.blocked(signal, "approval_required", eventIds);

    try {
      await this.authorities.authorizeAction(authority.id, route.capability, {
        context: { operatingContextId: context.id },
      });
    } catch {
      return this.blocked(signal, "capability_denied", eventIds);
    }

    const resolution: ActivationResolution = { context, authority, route, status: "accepted" };
    const execution = await this.executions.create({
      intentReference: signal.eventType,
      actorIdentity: route.actorIdentity,
      authorityContext: authority as Authority,
      capability: route.capability,
      resources: route.resources ?? [],
      dependencies: [],
      input: signal.payload,
      provenance: {
        source: signal.source,
        signalId: signal.id,
        routeId: route.routeId,
        workflowReference: route.workflowReference ?? null,
        workflowVersion: route.workflowVersion ?? null,
        operatingContextId: context.id,
      },
      correlationId: signal.correlationId,
      idempotencyKey: `runtime:execution:${signal.idempotencyKey}`,
    });
    const validated = await this.executions.validate(execution.id);
    const authorized = await this.executions.authorize(validated.id);
    const completed = await this.executions.run(authorized.id, (input) => this.deps.executionHandler(route, { ...signal, payload: input }));

    const executionEvent = await this.events.append({
      type: completed.state === "completed" ? "RUNTIME_EXECUTION_COMPLETED" : "RUNTIME_EXECUTION_FAILED",
      actor: route.actorIdentity,
      subject: completed.id,
      correlation_id: signal.correlationId,
      idempotency_key: `runtime:execution-event:${signal.idempotencyKey}`,
      outcome: completed.state,
      provenance: {
        signalId: signal.id,
        authorityId: authority.id,
        routeId: route.routeId,
        operatingContextId: context.id,
      },
      payload: completed.output ?? {},
    });
    eventIds.push(executionEvent.id);

    const evidence: JsonObject = {
      executionId: completed.id,
      status: completed.state,
      output: completed.output ?? {},
      capability: route.capability,
      authorityId: authority.id,
      recordedAt: new Date().toISOString(),
    };

    const completionProjected = completed.state === "completed";
    const observed = this.observedState(completed);
    const expected = this.expectedState(signal, route);
    const reconciliation = this.reconcile(expected, observed);

    const reconciliationEvent = await this.events.append({
      type: "RUNTIME_RECONCILIATION",
      actor: route.actorIdentity,
      subject: completed.id,
      correlation_id: signal.correlationId,
      idempotency_key: `runtime:reconciliation:${signal.idempotencyKey}`,
      outcome: reconciliation.matched ? "matched" : "discrepancy",
      provenance: { signalId: signal.id, authorityId: authority.id },
      payload: { expected, observed, discrepancy: reconciliation.discrepancy ?? null },
    });
    eventIds.push(reconciliationEvent.id);

    const feedback = this.feedback(completed, reconciliation);
    const feedbackEvent = await this.events.append({
      type: "RUNTIME_FEEDBACK_OBSERVED",
      actor: route.actorIdentity,
      subject: completed.id,
      correlation_id: signal.correlationId,
      idempotency_key: `runtime:feedback:${signal.idempotencyKey}`,
      outcome: "observed",
      provenance: { signalId: signal.id, authorityId: authority.id },
      payload: feedback as unknown as JsonObject,
    });
    eventIds.push(feedbackEvent.id);

    return { signal, resolution, execution: { execution: completed, evidence, completionProjected }, reconciliation, feedback, eventIds };
  }

  private async blocked(signal: RuntimeSignal, reason: string, eventIds: string[]): Promise<RuntimeActivationResult> {
    const blocked = await this.events.append({
      type: "RUNTIME_EXECUTION_BLOCKED",
      actor: signal.actorId ?? signal.source,
      subject: signal.subjectId,
      correlation_id: signal.correlationId,
      idempotency_key: `runtime:blocked:${signal.idempotencyKey}`,
      outcome: "blocked",
      provenance: signal.provenance ?? {},
      payload: { signalId: signal.id, reason },
    });
    return { signal, resolution: { status: "blocked", reason }, eventIds: [...eventIds, blocked.id] };
  }

  private expectedState(signal: RuntimeSignal, route: ActivationRoute): JsonObject {
    return { eventType: signal.eventType, routeId: route.routeId, expected: true };
  }

  private observedState(execution: Execution): JsonObject {
    return { executionId: execution.id, state: execution.state, completed: execution.state === "completed" };
  }

  private reconcile(expected: JsonObject, observed: JsonObject): ReconciliationResult {
    const matched = expected["expected"] === true && observed["completed"] === true;
    return matched
      ? { matched, expected, observed }
      : { matched, expected, observed, discrepancy: { reason: "expected outcome not observed" } };
  }

  private feedback(execution: Execution, reconciliation: ReconciliationResult): FeedbackObservation {
    return {
      kind: reconciliation.matched ? "completion" : "exception",
      value: reconciliation.matched ? 1 : 0,
      unit: "outcome",
      dimension: execution.capability,
      provenance: { executionId: execution.id, correlationId: execution.correlationId ?? null },
    };
  }
}
