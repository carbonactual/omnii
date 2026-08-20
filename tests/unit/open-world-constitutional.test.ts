import { describe, expect, it } from "vitest";
import { createKnowledgeAssertion, isKnowledgeAssertionCurrent, createCausalRelation, createScenarioBranch, validateScenarioPath, assessCompleteness, recordReconciliation } from "../../packages/omnii-runtime/src";

describe("OMNII open-world constitutional hardening", () => {
  it("keeps observation, claim and inference distinct and tracks multiple times", () => {
    const assertion = createKnowledgeAssertion({
      id: "k1", kind: "observation", subject: "vehicle-1", predicate: "available", confidence: 0.8,
      verification: "unverified", provenance: { source: "sensor-1" }, occurred_at: "2026-08-20T10:00:00Z",
      observed_at: "2026-08-20T10:01:00Z", effective_at: "2026-08-20T10:02:00Z"
    });
    expect(assertion.recorded_at).toBeTruthy();
    expect(isKnowledgeAssertionCurrent(assertion, new Date("2026-08-20T10:03:00Z"))).toBe(true);
  });

  it("requires provenance for causal claims and supports non-causal relation types", () => {
    expect(() => createCausalRelation({ id: "c1", type: "causes", source: "a", target: "b", confidence: 0.7, provenance: {}, status: "proposed" })).toThrow(/provenance/);
    expect(createCausalRelation({ id: "c2", type: "correlates_with", source: "a", target: "b", confidence: 0.4, provenance: { source: "study" }, status: "proposed" }).type).toBe("correlates_with");
  });

  it("allows branching scenario graphs without treating hypothetical paths as actual", () => {
    const nodes = [
      { id: "a", kind: "decision", reality: "actual" as const, state: "completed" as const },
      { id: "b", kind: "outcome", reality: "hypothetical" as const, state: "proposed" as const },
      { id: "c", kind: "outcome", reality: "counterfactual" as const, state: "proposed" as const }
    ];
    const edges = [{ from: "a", to: "b", relation: "branch" as const }, { from: "a", to: "c", relation: "branch" as const }];
    expect(validateScenarioPath(nodes, edges)).toBe(true);
    expect(createScenarioBranch(nodes, edges, "a").edges).toHaveLength(2);
  });

  it("exposes completeness gaps and requires reconciliation evidence for recovery", () => {
    const assessment = assessCompleteness("proposal-1", { structural: 1, evidence: 0.5 }, [{ id: "g1", dimension: "regulatory", requirement: "review", severity: "high", status: "open" }]);
    expect(assessment.gaps).toHaveLength(1);
    expect(() => recordReconciliation({ id: "r1", subject: "asset-1", expected: { qty: 1 }, actual: { qty: 0 }, status: "mismatched", evidence: [] })).toThrow(/exception/);
    expect(recordReconciliation({ id: "r2", subject: "asset-1", expected: { qty: 1 }, actual: { qty: 1 }, status: "matched", evidence: ["obs-1"] }).status).toBe("matched");
  });
});
