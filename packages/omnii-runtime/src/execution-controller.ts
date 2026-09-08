import { JsonObject } from "./types";
import { DispatchDecision } from "./runtime-resolver";
import type { MissionAssessment } from "./mission-intelligence-runtime";

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
  missionAssessment?: MissionAssessment;
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

const blockedResult = (request: ExecutionRequest, error: string): ExecutionResult => ({
  requestId: request.id,
  status: "blocked",
  correlationId: request.correlationId,
  idempotencyKey: request.idempotencyKey,
  evidenceRefs: [],
  error,
});

export async function executeGoverned(
  request: ExecutionRequest,
  dispatch: DispatchDecision,
  adapter: ExecutionAdapter,
): Promise<ExecutionResult> {
  if (!request.missionAssessment) return blockedResult(request, "mission_readiness_required");
  if (request.missionAssessment.readiness !== "ready") {
    return blockedResult(request, `mission_not_ready:${request.missionAssessment.readiness}`);
  }
  if (!dispatch.allowed) return blockedResult(request, dispatch.reason ?? "dispatch_denied");
  if (request.enabled === false) return blockedResult(request, "capability_disabled");

  for (const precondition of request.preconditions ?? []) {
    if (!(await precondition(request.input))) return blockedResult(request, "precondition_failed");
  }

  const startedAt = new Date().toISOString();
  try {
    const result = await adapter.execute(request);
    const completedAt = new Date().toISOString();
    if (!result.success) {
      return {
        requestId: request.id,
        status: "failed",
        correlationId: request.correlationId,
        idempotencyKey: request.idempotencyKey,
        startedAt,
        completedAt,
        output: result.output,
        evidenceRefs: result.evidenceRefs ?? [],
        error: result.error ?? "execution_failed",
      };
    }
    return {
      requestId: request.id,
      status: "completed",
      correlationId: request.correlationId,
      idempotencyKey: request.idempotencyKey,
      startedAt,
      completedAt,
      output: result.output ?? {},
      evidenceRefs: result.evidenceRefs ?? [],
    };
  } catch (error) {
    return {
      requestId: request.id,
      status: "failed",
      correlationId: request.correlationId,
      idempotencyKey: request.idempotencyKey,
      startedAt,
      completedAt: new Date().toISOString(),
      evidenceRefs: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
