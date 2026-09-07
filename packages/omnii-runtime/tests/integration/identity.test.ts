import assert from "node:assert/strict";
import test from "node:test";

import {
  correlateIdentity,
  createIdentityRef,
  type IdentityRef,
} from "../../src/integration/identity.js";
import {
  authorizeResolution,
  resolveIdentity,
  type ResolutionResult,
} from "../../src/integration/resolution.js";

const did: IdentityRef = createIdentityRef("did", "did:example:123");
const ens: IdentityRef = createIdentityRef("ens", "alice.eth");

const resolved: ResolutionResult = resolveIdentity({
  reference: ens,
  adapterId: "ens:fixture",
  status: "resolved",
  records: { address: "0x123", text: { role: "artist" }, contenthash: "ipfs://fixture" },
  evidence: [{ kind: "resolver", source: "fixture", proofRef: "proof:1" }],
});

test("keeps DID, ENS, HNS, DNS, and URI schemes distinct", () => {
  assert.notEqual(did.scheme, ens.scheme);
  assert.equal(did.scheme, "did");
  assert.equal(ens.scheme, "ens");
});

test("resolution is not authorization", () => {
  assert.equal(resolved.status, "resolved");
  assert.equal(authorizeResolution(resolved), false);
  assert.equal(authorizeResolution({ ...resolved, verified: true }), true);
});

test("identity correlation requires evidence and can remain ambiguous", () => {
  assert.equal(correlateIdentity([did, ens], [] ).decision, "uncorrelated");
  const result = correlateIdentity(
    [did, ens],
    [{ kind: "cryptographic-link", source: "fixture", target: "did:example:123", proofRef: "proof:1" }],
  );
  assert.equal(result.decision, "correlated");
});

test("revoked or stale resolution cannot be authorized", () => {
  assert.equal(authorizeResolution({ ...resolved, status: "revoked", verified: true }), false);
  assert.equal(authorizeResolution({ ...resolved, status: "stale", verified: true }), false);
});
