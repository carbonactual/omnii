import { describe, expect, it } from "vitest";
import { projectOutcome } from "./evidence-projector";

describe("evidence projector", () => {
  it("permits completion only when the outcome proves completion", () => {
    const result = projectOutcome({ requestId: "exec-1", status: "completed", correlationId: "corr-1", idempotencyKey: "idem-1", evidenceRefs: [], output: { done: true } });
    expect(result.evidence.executionId).toBe("exec-1");
    expect(result.projection.canProjectCompletion).toBe(true);
    expect(result.projection.state).toBe("completed");
  });
  it("never projects completion from a failed outcome", () => {
    const result = projectOutcome({ requestId: "exec-2", status: "failed", correlationId: "corr-2", idempotencyKey: "idem-2", evidenceRefs: [], error: "failed" });
    expect(result.projection.canProjectCompletion).toBe(false);
    expect(result.projection.state).toBe("failed");
  });
});
