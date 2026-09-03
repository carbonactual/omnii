import { describe, expect, it } from "vitest";
import { buildFeedbackObservation } from "./feedback-runtime";

describe("feedback runtime", () => {
  it("publishes non-monetary completion feedback", () => {
    const feedback = buildFeedbackObservation(
      { requestId: "exec-1", status: "completed", correlationId: "corr-1", idempotencyKey: "idem-1", evidenceRefs: [], output: { ok: true } },
      { id: "recon-1", correlationId: "corr-1", kind: "scheduled_completion", matched: true, expected: { status: "completed" }, observed: { status: "completed" }, evidenceRefs: [], recordedAt: "2026-09-03T00:00:00Z" },
    );
    expect(feedback.value).toBe(1);
    expect(feedback.unit).toBe("outcome");
    expect(feedback.provenance.monetary).toBe(false);
  });
});
