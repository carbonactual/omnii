import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { approveBunkVerification, evaluateBunkVerification } from "../src/bunk-verification-orchestration";

describe("BUNK verification orchestration", () => {
  it("keeps intelligence separate from authority", () => {
    const recommendation = evaluateBunkVerification({ propertyId: "property-1", evidenceReferences: ["proof-1"], confidence: 0.95 });
    assert.equal(recommendation.kind, "RECOMMENDATION");
    assert.throws(() => approveBunkVerification(recommendation, null), /authority/i);
  });

  it("accepts only an explicit authority reference for approval", () => {
    const recommendation = evaluateBunkVerification({ propertyId: "property-1", evidenceReferences: ["proof-1"], confidence: 0.95 });
    const result = approveBunkVerification(recommendation, { sealReference: "seal-1" });
    assert.equal(result.status, "VERIFIED");
    assert.equal(result.eventType, "BUNK_PROPERTY_VERIFIED");
  });
});
