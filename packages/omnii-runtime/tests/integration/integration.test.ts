import assert from "node:assert/strict";
import test from "node:test";

import {
  assertIntegrationRecord,
  isValidIntegrationTransition,
  type IntegrationRecord,
} from "../../src/integration/integration.js";

const validRecord: IntegrationRecord = {
  integrationId: "integration:example",
  source: { kind: "service", id: "source:example" },
  target: { kind: "capability", id: "target:example" },
  relationship: "provides",
  protocol: "mcp",
  trustState: "quarantined",
  authorityRequirements: ["policy-check"],
  provenance: { source: "fixture", evidenceId: "evidence:1" },
  state: "QUARANTINED",
};

test("accepts a complete universal integration record", () => {
  assert.doesNotThrow(() => assertIntegrationRecord(validRecord));
});

test("rejects an integration with missing constitutional identity fields", () => {
  assert.throws(() =>
    assertIntegrationRecord({
      ...validRecord,
      source: { kind: "service", id: "" },
    }),
  );
});

test("rejects an integration with missing provenance", () => {
  assert.throws(() =>
    assertIntegrationRecord({
      ...validRecord,
      provenance: {},
    }),
  );
});

test("allows admission progression but blocks unsafe lifecycle jumps", () => {
  assert.equal(isValidIntegrationTransition("DISCOVERED", "IMPORTED"), true);
  assert.equal(isValidIntegrationTransition("IMPORTED", "QUARANTINED"), true);
  assert.equal(isValidIntegrationTransition("DISCOVERED", "ACTIVE"), false);
  assert.equal(isValidIntegrationTransition("REVOKED", "ACTIVE"), false);
});
