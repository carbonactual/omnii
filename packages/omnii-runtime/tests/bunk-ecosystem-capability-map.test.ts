import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  assertBunkEcosystemCapabilityUse,
  BUNK_ECOSYSTEM_CAPABILITIES,
} from "../src/bunk-ecosystem-capability-map";

describe("BUNK whole-ecosystem capability map", () => {
  it("exposes OMNII capabilities beyond TIP", () => {
    assert.equal(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "IDENTITY"), true);
    assert.equal(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "WORKFLOW"), true);
    assert.equal(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "EVIDENCE"), true);
    assert.equal(BUNK_ECOSYSTEM_CAPABILITIES.some((c) => c.family === "ECONOMICS" && c.provider === "TIP"), true);
  });

  it("rejects BUNK from claiming universal primitives", () => {
    assert.throws(
      () => assertBunkEcosystemCapabilityUse({ capability: "universal-identity", provider: "BUNK" }),
      /universal identity|cannot own/i,
    );
  });
});
