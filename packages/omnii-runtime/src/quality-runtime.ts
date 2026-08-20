export type QualityDimension = "structural" | "evidence" | "logical" | "operational" | "regulatory" | "safety" | "economic" | "continuity";
export interface CompletenessGap { id: string; dimension: QualityDimension; requirement: string; severity: "low" | "medium" | "high" | "critical"; status: "open" | "resolved" | "accepted"; evidence?: string[]; }
export interface QualityAssessment { subject: string; dimensions: Record<QualityDimension, number>; gaps: CompletenessGap[]; assessed_at: string; }
export interface ReconciliationRecord { id: string; subject: string; expected: Record<string, unknown>; actual: Record<string, unknown>; status: "matched" | "mismatched" | "unknown" | "recovered"; evidence: string[]; exception?: string; recovery?: string; recorded_at: string; }

const DIMENSIONS: QualityDimension[] = ["structural", "evidence", "logical", "operational", "regulatory", "safety", "economic", "continuity"];

export function assessCompleteness(subject: string, scores: Partial<Record<QualityDimension, number>>, gaps: CompletenessGap[] = []): QualityAssessment {
  const dimensions = Object.fromEntries(DIMENSIONS.map(d => [d, Math.max(0, Math.min(1, scores[d] ?? 0))])) as Record<QualityDimension, number>;
  return { subject, dimensions, gaps: [...gaps], assessed_at: new Date().toISOString() };
}

export function recordReconciliation(input: Omit<ReconciliationRecord, "recorded_at">): ReconciliationRecord {
  if (input.status === "mismatched" && !input.exception) throw new Error("mismatched reconciliation requires an exception");
  if (input.status === "recovered" && !input.recovery) throw new Error("recovered reconciliation requires a recovery record");
  return { ...input, recorded_at: new Date().toISOString() };
}
