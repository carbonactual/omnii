import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { NABCertificationRuntime } from "../src/nab-certification-runtime";

test("NAB certification links vehicle biography, passport, inspection and credentials", async () => {
  const runtime = new NABCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.recordAssetCertification({
    assetId: "vehicle-001",
    biographyRefs: ["nab-biography-001"],
    credentialRefs: ["credential-registration-001", "credential-inspection-001"],
    passport: {
      state: "ready",
      identityRef: "nab-vehicle-001",
      provenanceRefs: ["evidence-manufacture-001", "evidence-import-001"],
    },
  });

  assert.equal(record.assetId, "vehicle-001");
  assert.equal(record.passport.state, "ready");
  assert.equal(record.credentialRefs.length, 2);
});

test("NAB certification keeps tokenization separate and lawful", async () => {
  const runtime = new NABCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.recordAssetCertification({
    assetId: "vehicle-002",
    biographyRefs: [],
    credentialRefs: [],
    passport: { state: "ready", identityRef: "nab-vehicle-002", provenanceRefs: [] },
    tokenization: {
      state: "token-ready",
      assetOrRightReference: "vehicle-002",
      issuer: "authorized-issuer-required",
      jurisdiction: "NG",
      regulatedActivity: true,
      custody: "regulated-custodian-required",
      settlement: "regulated-provider-required",
      legalEffect: "none-until-issued-and-lawfully-recognized",
      fractionalization: "lawful-when-authorized",
    },
  });

  assert.equal(record.tokenization?.state, "token-ready");
  assert.equal(record.tokenization?.fractionalization, "lawful-when-authorized");
});
