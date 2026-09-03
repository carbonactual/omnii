import { JsonObject } from "./types";

export type ReconciliationKind = "form_decision" | "scheduled_completion" | "payment" | "registry" | "dispatch" | "inventory" | string;

export interface ReconciliationInput {
  correlationId: string;
  kind: ReconciliationKind;
  expected: JsonObject;
  observed: JsonObject;
  evidenceRefs?: string[];
  authorityId?: string;
  subjectId?: string;
}

export interface ReconciliationResult {
  id: string;
  correlationId: string;
  kind: ReconciliationKind;
  matched: boolean;
  expected: JsonObject;
  observed: JsonObject;
  discrepancy?: JsonObject;
  evidenceRefs: string[];
  authorityId?: string;
  subjectId?: string;
  recordedAt: string;
}

export function reconcileExpectedObserved(input: ReconciliationInput): ReconciliationResult {
  const expectedKeys = new Set(Object.keys(input.expected));
  const observedKeys = new Set(Object.keys(input.observed));
  const keys = new Set([...expectedKeys, ...observedKeys]);
  const differences: JsonObject = {};
  for (const key of keys) {
    const expected = input.expected[key];
    const observed = input.observed[key];
    if (JSON.stringify(expected) !== JSON.stringify(observed)) differences[key] = { expected, observed };
  }
  const matched = Object.keys(differences).length === 0;
  return {
    id: `reconciliation:${input.correlationId}:${input.kind}`,
    correlationId: input.correlationId,
    kind: input.kind,
    matched,
    expected: structuredClone(input.expected),
    observed: structuredClone(input.observed),
    discrepancy: matched ? undefined : { fields: differences, reason: "expected_and_observed_state_differ" },
    evidenceRefs: [...(input.evidenceRefs ?? [])],
    authorityId: input.authorityId,
    subjectId: input.subjectId,
    recordedAt: new Date().toISOString(),
  };
}
