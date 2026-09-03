import { JsonObject } from "./types";
import { ReconciliationResult } from "./reconciliation-runtime";
import { ExecutionResult } from "./execution-controller";

export interface FeedbackObservation {
  id: string;
  correlationId: string;
  kind: "completion" | "exception" | "quality" | "value" | string;
  value: number;
  unit: string;
  dimension: string;
  provenance: JsonObject;
}

export function buildFeedbackObservation(
  execution: ExecutionResult,
  reconciliation: ReconciliationResult,
  options: { dimension?: string; unit?: string; value?: number; kind?: FeedbackObservation["kind"]; } = {},
): FeedbackObservation {
  const matched = reconciliation.matched && execution.status === "completed";
  return {
    id: `feedback:${execution.requestId}`,
    correlationId: execution.correlationId,
    kind: options.kind ?? (matched ? "completion" : "exception"),
    value: options.value ?? (matched ? 1 : 0),
    unit: options.unit ?? "outcome",
    dimension: options.dimension ?? execution.action,
    provenance: {
      executionId: execution.requestId,
      reconciliationId: reconciliation.id,
      evidenceRefs: execution.evidenceRefs,
      monetary: false,
    },
  };
}
