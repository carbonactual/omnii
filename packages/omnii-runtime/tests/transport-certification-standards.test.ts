import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { TransportCertificationRuntime } from "../src/transport-certification-runtime";

test("certification records support standards, issuers, evidence and verification methods", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerSurface({
    id: "nab-vehicle-credential",
    name: "NAB Vehicle Credential",
    role: "vehicle identity, biography and compliance evidence",
    architecture: "present",
    runtime: "present",
    product: "present",
    integration: "issuer integrations required",
    sourceRefs: ["docs/architecture/NAB_CONSTITUTION.md"],
    verification: {
      status: "verified",
      methods: ["digital-signature", "verifiable-credential", "registry-check", "evidence-hash"],
      standards: ["W3C VC 2.0", "W3C DID 1.1", "ISO/IEC 18013-5"],
      issuer: "authorized-registry-or-authority",
      jurisdiction: "NG",
      evidenceRefs: ["evidence:vehicle-origin", "evidence:inspection"],
    },
  });

  assert.deepEqual(record.verification.standards, ["W3C VC 2.0", "W3C DID 1.1", "ISO/IEC 18013-5"]);
  assert.equal(record.verification.methods.includes("verifiable-credential"), true);
});

test("tokenization state is separate from certification and records jurisdictional controls", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerSurface({
    id: "fleet-asset-tokenization",
    name: "Fleet Asset Tokenization Readiness",
    role: "governed digital representation of eligible transport assets or rights",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "issuer, custody and settlement integrations required",
    sourceRefs: ["docs/architecture/CHARTER_TRANSPORT_VALUE_CHAIN_AND_HANDOFF.md"],
    tokenization: {
      state: "token-ready",
      instrumentType: "asset-or-right-representation",
      issuer: "authorized-issuer-required",
      jurisdiction: "NG",
      regulatedActivity: true,
      custody: "external-regulated-custodian-required",
      settlement: "IO-or-regulated-provider-required",
      legalEffect: "none-until-issued-and-lawfully-recognized",
    },
  });

  assert.equal(record.tokenization.state, "token-ready");
  assert.equal(record.tokenization.regulatedActivity, true);
  assert.equal(record.tokenization.legalEffect, "none-until-issued-and-lawfully-recognized");
});

test("future certification supports autonomy, software state and human oversight", async () => {
  const runtime = new TransportCertificationRuntime(new MemoryPersistenceAdapter());
  const record = await runtime.registerSurface({
    id: "autonomous-vessel",
    name: "Autonomous Vessel Capability",
    role: "future autonomous maritime movement capability",
    architecture: "present",
    runtime: "planned",
    product: "planned",
    integration: "maritime authority and operational test integrations required",
    sourceRefs: ["docs/architecture/UNIVERSAL_MOVEMENT_CONSTITUTION.md"],
    future: {
      maturity: "emerging",
      autonomyLevel: 4,
      humanOversight: "remote-operator-required",
      safetyCase: "required",
      cybersecurity: "required",
      softwareUpdateState: "tracked",
      operationalDesignDomain: "defined-per-jurisdiction",
    },
  });

  assert.equal(record.future.autonomyLevel, 4);
  assert.equal(record.future.humanOversight, "remote-operator-required");
  assert.equal(record.future.safetyCase, "required");
});
