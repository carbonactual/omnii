export type CausalRelationType = "causes" | "contributes_to" | "enables" | "prevents" | "requires" | "triggers" | "correlates_with" | "intended_to" | "suspected_cause" | "inferred_cause" | "disputed_cause" | "unknown_cause";

export interface CausalRelation {
  id: string;
  type: CausalRelationType;
  source: string;
  target: string;
  confidence: number;
  provenance: Record<string, unknown>;
  conditions?: Record<string, unknown>;
  status: "proposed" | "active" | "disputed" | "superseded";
}

export function createCausalRelation(input: CausalRelation): CausalRelation {
  if (input.source === input.target) throw new Error("causal relation cannot target itself");
  if (input.confidence < 0 || input.confidence > 1) throw new Error("confidence must be between 0 and 1");
  if (!input.provenance || Object.keys(input.provenance).length === 0) throw new Error("provenance is required");
  return { ...input };
}
