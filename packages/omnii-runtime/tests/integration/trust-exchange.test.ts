import assert from "node:assert/strict";
import test from "node:test";

import {
  assertCapabilityCard,
  deriveCapabilityId,
  evaluateCapabilityAdmission,
  type CapabilityCard,
} from "../../src/integration/capability.js";
import {
  CAPABILITY_ADMISSION_GATES,
  assertCapabilityAdmissionOrder,
  degradeTrust,
  revokeTrust,
} from "../../src/integration/lifecycle.js";

const card: CapabilityCard = {
  capabilityId: deriveCapabilityId("search", "1.0.0"),
  name: "search",
  version: "1.0.0",
  implementations: [
    {
      implementationId: "impl:local-search",
      provider: "provider:local",
      protocol: "LOCAL",
      version: "1.0.0",
    },
  ],
};

test("capability identity is independent from provider identity", () => {
  assertCapabilityCard(card);
  assert.equal(card.capabilityId, "capability:search@1.0.0");
});

test("admission fails closed until every required gate passes", () => {
  const rejected = evaluateCapabilityAdmission({
    card,
    licenseChecked: true,
    securityChecked: false,
    sbomChecked: true,
    provenanceVerified: true,
    sandboxPassed: true,
    capabilityTestPassed: true,
    pulseTestPassed: true,
    policyApproved: true,
    evidenceRefs: ["evidence:1"],
  });
  assert.equal(rejected.admitted, false);

  const admitted = evaluateCapabilityAdmission({
    card,
    licenseChecked: true,
    securityChecked: true,
    sbomChecked: true,
    provenanceVerified: true,
    sandboxPassed: true,
    capabilityTestPassed: true,
    pulseTestPassed: true,
    policyApproved: true,
    evidenceRefs: ["evidence:1"],
  });
  assert.equal(admitted.admitted, true);
});

test("admission gates are ordered and trust can only degrade or revoke explicitly", () => {
  assert.doesNotThrow(() => assertCapabilityAdmissionOrder(CAPABILITY_ADMISSION_GATES));
  assert.throws(() => assertCapabilityAdmissionOrder(["SECURITY", "LICENSE"]));
  assert.equal(degradeTrust("trusted", "proof failed").state, "degraded");
  assert.equal(degradeTrust("revoked", "rechecked").state, "revoked");
  assert.equal(revokeTrust("security finding").state, "revoked");
});
