import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveBunkOperationalAction } from "../src/bunk-operational-flow";

describe("BUNK operational flow", () => {
  it("routes non-economic property verification through OMNII workflow and authority", () => {
    const result = resolveBunkOperationalAction({ propertyId: "property-1", action: "VERIFY_PROPERTY", formSubmissionId: "form-1", evidenceReferences: ["proof-1"], authorityReference: "seal-1", operatingContextId: "ctx-1" });
    assert.equal(result.economicRoute, "NONE");
    assert.equal(result.requiredActions.includes("REVIEW_EVIDENCE"), true);
    assert.equal(result.eventType, "BUNK_PROPERTY_VERIFICATION_REQUESTED");
  });

  it("routes economic activity to TIP without making TIP the only dependency", () => {
    const result = resolveBunkOperationalAction({ propertyId: "property-1", action: "MAKE_OFFER", formSubmissionId: "form-2", evidenceReferences: ["proof-2"], authorityReference: "seal-2", economicIntent: { capability: "TIP:TRADE", intentType: "PROPERTY_OFFER" } });
    assert.equal(result.economicRoute, "TIP");
    assert.equal(result.requiredActions.includes("ECONOMIC_REVIEW"), true);
  });

  it("allows non-economic inspection workflows without TIP", () => {
    const result = resolveBunkOperationalAction({ propertyId: "property-1", action: "BOOK_INSPECTION", formSubmissionId: "form-3", evidenceReferences: ["proof-3"] });
    assert.equal(result.economicRoute, "NONE");
  });
});
