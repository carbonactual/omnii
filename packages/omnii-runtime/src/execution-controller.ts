import { JsonObject } from "./types";
import { DispatchDecision } from "./runtime-resolver";

export type ExecutionStatus = "accepted" | "completed" | "failed" | "blocked";

export interface ExecutionRequest {
  id: string;
  action: string;
  capability: string;
  actorIdentity: string;
  correlationId: string;
  idempotencyKey: string;
  input: JsonObject;
  scope?: string[];
  preconditions?: Array<(input: JsonObject) => boolean | Promise<boolean>>;
  enabled?: boolean;
  metadata?: JsonObject;
}

export interface ExecutionAdapterResult {
  success: boolean;
  output?: JsonObject;
  evidenceRefs?: string[];
  error?: string;
}

export interface ExecutionAdapter {
  execute(request: ExecutionRequest): Promise<ExecutionAdapterResult>;
}

export interface ExecutionResult {
  requestId: string;
  status: ExecutionStatus;
  correlationId: string;
  idempotencyKey: string;
  startedAt?: string;
  completedAt?: string;
  output?: JsonObject;
  evidenceRefs: string[];
  error?: string;
}

export async function executeGoverned(
  request: ExecutionRequest,
  dispatch: DispatchDecision,
  adapter: ExecutionAdapter,
): Promise<ExecutionResult> {
  if (!dispatch.allowed) {
    return { requestId: request.id, status: "blocked", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, evidenceRefs: [], error: dispatch.reason ?? "dispatch_denied" };
  }
  if (request.enabled === false) {
    return { requestId: request.id, status: "blocked", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, evidenceRefs: [], error: "capability_disabled" };
  }
  for (const precondition of request.preconditions ?? []) {
    if (!(await precondition(request.input))) {
      return { requestId: request.id, status: "blocked", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, evidenceRefs: [], error: "precondition_failed" };
    }
  }

  const startedAt = new Date().toISOString();
  try {
    const result = await adapter.execute(request);
    const completedAt = new Date().toISOString();
    if (!result.success) {
      return { requestId: request.id, status: "failed", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, startedAt, completedAt, output: result.output, evidenceRefs: result.evidenceRefs ?? [], error: result.error ?? "execution_failed" };
    }
    return { requestId: request.id, status: "completed", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, startedAt, completedAt, output: result.output ?? {}, evidenceRefs: result.evidenceRefs ?? [] };
  } catch (error) {
    return { requestId: request.id, status: "failed", correlationId: request.correlationId, idempotencyKey: request.idempotencyKey, startedAt, completedAt: new Date().toISOString(), evidenceRefs: [], error: error instanceof Error ? error.message : String(error) };
  }
}
