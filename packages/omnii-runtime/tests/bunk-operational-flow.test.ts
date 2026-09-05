import { describe, expect, it } from "vitest";
import { resolveBunkOperationalAction } from "../src/bunk-operational-flow";

describe("BUNK operational flow", () => {
  it("routes non-economic property verification through OMNII workflow and authority", () => {
    const result = resolveBunkOperationalAction({
      propertyId: "property-1",
      action: "VERIFY_PROPERTY",
      formSubmissionId: "form-1",
      evidenceReferences: ["proof-1"],
      authorityReference: "seal-1",
      operatingContextId: "ctx-1",
    });
    expect(result.economicRoute).toBe("NONE");
    expect(result.requiredActions).toContain("REVIEW_EVIDENCE");
    expect(result.eventType).toBe("BUNK_PROPERTY_VERIFICATION_REQUESTED");
  });

  it("routes economic activity to TIP without making TIP the only dependency", () => {
    const result = resolveBunkOperationalAction({
      propertyId: "property-1",
      action: "MAKE_OFFER",
      formSubmissionId: "form-2",
      evidenceReferences: ["proof-2"],
      authorityReference: "seal-2",
      economicIntent: { capability: "TIP:TRADE", intentType: "PROPERTY_OFFER" },
    });
    expect(result.economicRoute).toBe("TIP");
    expect(result.requiredActions).toContain("ECONOMIC_REVIEW");
  });

  it("allows non-economic inspection workflows without TIP", () => {
    const result = resolveBunkOperationalAction({
      propertyId: "property-1",
      action: "BOOK_INSPECTION",
      formSubmissionId: "form-3",
      evidenceReferences: ["proof-3"],
    });
    expect(result.economicRoute).toBe("NONE");
  });
});
