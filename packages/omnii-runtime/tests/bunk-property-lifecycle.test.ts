import assert from "node:assert/strict";
import test from "node:test";
import {
  BUNK_PROPERTY_LIFECYCLE_STAGES,
  validateBunkPropertyLifecycleTransition,
} from "../src/bunk-property-lifecycle";

test("BUNK lifecycle spans the full property journey", () => {
  assert.equal(BUNK_PROPERTY_LIFECYCLE_STAGES[0], "DISCOVERY");
  assert.equal(BUNK_PROPERTY_LIFECYCLE_STAGES.includes("MAINTENANCE"), true);
  assert.equal(BUNK_PROPERTY_LIFECYCLE_STAGES.includes("RECOVERY_REUSE_REPURPOSE"), true);
  assert.equal(BUNK_PROPERTY_LIFECYCLE_STAGES.at(-1), "RETIRE_PRESERVE_ARCHIVE");
});

test("active lifecycle transition requires authority and evidence", () => {
  assert.deepEqual(validateBunkPropertyLifecycleTransition({
    from: "LISTING_MARKET",
    to: "MATCH_NEGOTIATION",
    authorityId: "authority-1",
    evidenceIds: ["listing-proof-1"],
  }), []);
});

test("lifecycle transition rejects silent resurrection and missing evidence", () => {
  const errors = validateBunkPropertyLifecycleTransition({
    from: "RETIRE_PRESERVE_ARCHIVE",
    to: "OPERATIONS",
    evidenceIds: [],
  });

  assert.match(errors.join("; "), /cannot silently re-enter/);
  assert.match(errors.join("; "), /require evidence/);
  assert.match(errors.join("; "), /require explicit authority/);
});
