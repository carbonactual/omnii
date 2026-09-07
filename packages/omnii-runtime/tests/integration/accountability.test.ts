import assert from "node:assert/strict";
import test from "node:test";

import {
  accountIntegrationOutcome,
  type IntegrationOutcome,
} from "../../src/integration/accountability.js";

const outcome = (status: IntegrationOutcome["status"]): IntegrationOutcome => ({
  integrationId: "integration:search",
  status,
  completed: status === "success",
  valueSent: 42,
  proofRefs: ["proof:1"],
  evidenceRefs: ["evidence:1"],
});

test("successful integration mints feedback and routes it to Terminal without tokenization", () => {
  let terminalObject: unknown;
  const result = accountIntegrationOutcome(outcome("success"), {
    mintPulse: (feedback) => `mint:${feedback.pulseId}`,
    routeToTerminal: (minted) => { terminalObject = minted; },
  });
  assert.equal(result.minted.location, "terminal");
  assert.equal(result.minted.tokenized, false);
  assert.equal(result.minted.indexTokenId, undefined);
  assert.equal(result.unresolvedValue, 42);
  assert.deepEqual(terminalObject, result.minted);
});

test("failed integrations still produce accountable feedback and preserve consumed value", () => {
  const result = accountIntegrationOutcome(outcome("dns-failure"));
  assert.equal(result.feedback.kind, "exception");
  assert.equal(result.minted.tokenized, false);
  assert.equal(result.unresolvedValue, 42);
});

test("zero or negative value cannot be smuggled through the accountability boundary", () => {
  assert.throws(() => accountIntegrationOutcome({ ...outcome("timeout"), valueSent: -1 }));
  assert.doesNotThrow(() => accountIntegrationOutcome({ ...outcome("timeout"), valueSent: 0 }));
});
