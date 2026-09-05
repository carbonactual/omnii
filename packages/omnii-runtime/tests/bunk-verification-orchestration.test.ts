import { describe, expect, it } from "vitest";
import { approveBunkVerification, evaluateBunkVerification } from "../src/bunk-verification-orchestration";

describe("BUNK verification orchestration", () => {
  it("keeps intelligence separate from authority", () => {
    const recommendation = evaluateBunkVerification({ propertyId: "property-1", evidenceReferences: ["proof-1"], confidence: 0.95 });
    expect(recommendation.kind).toBe("RECOMMENDATION");
    expect(() => approveBunkVerification(recommendation, null)).toThrow(/authority/i);
  });

  it("accepts only an explicit authority reference for approval", () => {
    const recommendation = evaluateBunkVerification({ propertyId: "property-1", evidenceReferences: ["proof-1"], confidence: 0.95 });
    const result = approveBunkVerification(recommendation, { sealReference: "seal-1" });
    expect(result.status).toBe("VERIFIED");
    expect(result.eventType).toBe("BUNK_PROPERTY_VERIFIED");
  });
});
