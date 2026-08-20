export type EpistemicKind = "observation" | "claim" | "inference" | "hypothesis" | "simulation";
export type VerificationState = "unverified" | "partially_verified" | "verified" | "disputed" | "superseded";

export interface KnowledgeAssertion {
  id: string;
  kind: EpistemicKind;
  subject: string;
  predicate: string;
  object?: string;
  confidence: number;
  verification: VerificationState;
  provenance: Record<string, unknown>;
  occurred_at?: string;
  observed_at?: string;
  recorded_at: string;
  effective_at?: string;
  superseded_at?: string;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeAssertionInput extends Omit<KnowledgeAssertion, "recorded_at"> { recorded_at?: string; }

export function createKnowledgeAssertion(input: KnowledgeAssertionInput): KnowledgeAssertion {
  if (input.confidence < 0 || input.confidence > 1) throw new Error("confidence must be between 0 and 1");
  if (!input.provenance || Object.keys(input.provenance).length === 0) throw new Error("provenance is required");
  return { ...input, recorded_at: input.recorded_at ?? new Date().toISOString() };
}

export function isKnowledgeAssertionCurrent(assertion: KnowledgeAssertion, at = new Date()): boolean {
  if (assertion.verification === "superseded" || assertion.superseded_at) return false;
  if (assertion.effective_at && new Date(assertion.effective_at) > at) return false;
  return true;
}
