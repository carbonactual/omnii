import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projectBunkOutcome } from "../src/bunk-outcome-projection";

describe("BUNK outcome projection", () => {
  it("projects a governed outcome with traceable provenance", () => {
    const result = projectBunkOutcome({ propertyId: "property-1", actionType: "PROPERTY_VERIFICATION", result: "VERIFIED", authorityReference: "seal-1", evidenceReferences: ["proof-1"] });
    assert.equal(result.pulseEventType, "BUNK_PROPERTY_VERIFIED");
    assert.equal(result.provenance.root, "OMNII");
  });
});
