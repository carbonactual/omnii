import assert from "node:assert/strict";
import test from "node:test";
import { AdmissionRuntime, type AdmissionCandidate } from "../src/admission-runtime";

const candidate: AdmissionCandidate = {
  id: "candidate-1",
  kind: "person",
  provenance: { source: "verified-registry" },
};

const inspect = () => ({ known: true, verified: true, canonicalId: "person-1" });

test("admission blocks unknown objects", async () => {
  const runtime = new AdmissionRuntime({ inspect: () => ({ known: false, verified: false }) });
  const result = await runtime.admit(candidate);
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "unknown_object");
});

test("admission blocks unverified objects", async () => {
  const runtime = new AdmissionRuntime({ inspect: () => ({ known: true, verified: false }) });
  const result = await runtime.admit(candidate);
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "verification_required");
});

test("admission requires canonical identity", async () => {
  const runtime = new AdmissionRuntime({ inspect: () => ({ known: true, verified: true }) });
  const result = await runtime.admit(candidate);
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "canonical_identity_required");
});

test("admission admits a known verified canonical object", async () => {
  const runtime = new AdmissionRuntime({ inspect });
  const result = await runtime.admit(candidate);
  assert.deepEqual(result, {
    status: "admitted",
    candidateId: "candidate-1",
    canonicalId: "person-1",
  });
});

test("admission reuses an existing canonical identity instead of duplicating truth", async () => {
  const runtime = new AdmissionRuntime({ existingCanonicalIds: new Set(["person-1"]), inspect });
  const result = await runtime.admit(candidate);
  assert.deepEqual(result, {
    status: "reused",
    candidateId: "candidate-1",
    canonicalId: "person-1",
  });
});

test("admission blocks revoked objects", async () => {
  const runtime = new AdmissionRuntime({ inspect: () => ({ known: true, verified: true, revoked: true, canonicalId: "person-1" }) });
  const result = await runtime.admit(candidate);
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "object_revoked");
});

test("admission reuses a canonical identity after it has been admitted", async () => {
  const runtime = new AdmissionRuntime({ inspect });
  assert.equal((await runtime.admit(candidate)).status, "admitted");
  const second = await runtime.admit({ ...candidate, id: "candidate-2" });
  assert.equal(second.status, "reused");
  assert.equal(second.canonicalId, "person-1");
});

test("admission fails closed when inspection is unavailable", async () => {
  const runtime = new AdmissionRuntime({ inspect: async () => { throw new Error("registry unavailable"); } });
  const result = await runtime.admit(candidate);
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "verification_unavailable");
});
