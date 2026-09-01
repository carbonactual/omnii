import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { TransportCertificationRuntime } from "../src/transport-certification-runtime";

test("transport evidence can be bound to a subject with issuer, integrity, confidence and lifecycle", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerEvidence({
    evidenceId: "evidence-vehicle-inspection-001",
    subjectId: "vehicle-001",
    claim: "vehicle passed inspection",
    source: "authorized-inspection-provider",
    method: "inspection",
    standards: ["national-inspection-profile"],
    jurisdiction: "NG",
    observedAt: "2026-09-01T08:00:00Z",
    expiresAt: "2027-09-01T00:00:00Z",
    integrity: { algorithm: "sha-256", digest: "abc123" },
    confidence: "verified",
    authorityRef: "authority:inspection-provider",
    lifecycle: "active",
  });

  assert.equal(record.evidenceId, "evidence-vehicle-inspection-001");
  assert.equal(record.integrity.algorithm, "sha-256");
  assert.equal(record.lifecycle, "active");
});

test("tokenization cannot be marked issued without issuer, custody, settlement and legal-effect evidence", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());

  await assert.rejects(
    () => runtime.registerTokenization({
      tokenizationId: "tokenization-001",
      assetOrRightReference: "vehicle-001",
      state: "issued",
      instrumentType: "asset-or-right-representation",
      issuer: "",
      jurisdiction: "NG",
      regulatedActivity: true,
      custody: "",
      settlement: "",
      legalEffect: "",
    }),
    /issued tokenization requires issuer, custody, settlement, and legalEffect/,
  );
});

test("tokenization supports fractionalization while keeping legal effect explicit", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerTokenization({
    tokenizationId: "tokenization-002",
    assetOrRightReference: "fleet-capacity-001",
    state: "token-ready",
    instrumentType: "capacity-right",
    issuer: "authorized-issuer-required",
    jurisdiction: "NG",
    regulatedActivity: true,
    custody: "regulated-custodian-required",
    settlement: "regulated-provider-required",
    legalEffect: "none-until-issued-and-lawfully-recognized",
    tokenStandard: "future-standard",
    fractionalization: "lawful-when-authorized",
  });

  assert.equal(record.state, "token-ready");
  assert.equal(record.fractionalization, "lawful-when-authorized");
  assert.equal(record.legalEffect, "none-until-issued-and-lawfully-recognized");
});
