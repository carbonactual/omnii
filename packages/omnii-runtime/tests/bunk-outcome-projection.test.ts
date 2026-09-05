import { describe, expect, it } from "vitest";
import { projectBunkOutcome } from "../src/bunk-outcome-projection";

describe("BUNK outcome projection", () => {
  it("projects a governed outcome with traceable provenance", () => {
    const result = projectBunkOutcome({
      propertyId: "property-1",
      actionType: "PROPERTY_VERIFICATION",
      result: "VERIFIED",
      authorityReference: "seal-1",
      evidenceReferences: ["proof-1"],
    });
    expect(result.pulseEventType).toBe("BUNK_PROPERTY_VERIFIED");
    expect(result.provenance.root).toBe("OMNII");
  });
});
