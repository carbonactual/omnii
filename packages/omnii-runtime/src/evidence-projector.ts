import { JsonObject } from "./types";
import { ExecutionResult } from "./execution-controller";

export interface EvidenceRecord {
  id: string;
  executionId: string;
  correlationId: string;
  status: ExecutionResult["status"];
  outcome: JsonObject;
  refs: string[];
  recordedAt: string;
  provenance: JsonObject;
}

export interface StateProjection {
  canProjectCompletion: boolean;
  state: "pending" | "completed" | "failed" | "blocked";
  reason: string;
}

export interface EvidenceProjection {
  evidence: EvidenceRecord;
  projection: StateProjection;
}

export function projectOutcome(
  result: ExecutionResult,
  options: { evidenceId?: string; completionPredicate?: (result: ExecutionResult) => boolean } = {},
): EvidenceProjection {
  const completionPredicate = options.completionPredicate ?? ((candidate) => candidate.status === "completed");
  const id = options.evidenceId ?? `evidence:${result.requestId}`;
  const canProjectCompletion = completionPredicate(result);
  const state = result.status === "blocked" ? "blocked" : result.status === "failed" ? "failed" : canProjectCompletion ? "completed" : "pending";
  return {
    evidence: {
      id,
      executionId: result.requestId,
      correlationId: result.correlationId,
      status: result.status,
      outcome: result.output ?? { error: result.error ?? null },
      refs: [...result.evidenceRefs],
      recordedAt: new Date().toISOString(),
      provenance: { idempotencyKey: result.idempotencyKey },
    },
    projection: {
      canProjectCompletion,
      state,
      reason: canProjectCompletion ? "execution_outcome_satisfies_completion_predicate" : result.error ?? "completion_not_proven",
    },
  };
}
