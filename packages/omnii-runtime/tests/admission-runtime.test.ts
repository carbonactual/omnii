import assert from "node:assert/strict";
import test from "node:test";
import { AdmissionRuntime, type AdmissionCandidate } from "../src/admission-runtime";

const candidate: AdmissionCandidate = {
  id: "candidate-1",
  kind: "person",
  canonicalId: "person-1",
  known: true,
  verified: true,
  provenance: { source: "verified-registry" },
};

test("admission blocks unknown objects", () => {
  const runtime = new AdmissionRuntime();
  const result = runtime.admit({ ...candidate, known: false });
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "unknown_object");
});

test("admission blocks unverified objects", () => {
  const runtime = new AdmissionRuntime();
  const result = runtime.admit({ ...candidate, verified: false });
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "verification_required");
});

test("admission requires canonical identity", () => {
  const runtime = new AdmissionRuntime();
  const result = runtime.admit({ ...candidate, canonicalId: undefined });
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "canonical_identity_required");
});

test("admission admits a known verified canonical object", () => {
  const runtime = new AdmissionRuntime();
  const result = runtime.admit(candidate);
  assert.deepEqual(result, {
    status: "admitted",
    candidateId: "candidate-1",
    canonicalId: "person-1",
  });
});

test("admission reuses an existing canonical identity instead of duplicating truth", () => {
  const runtime = new AdmissionRuntime({ existingCanonicalIds: new Set(["person-1"]) });
  const result = runtime.admit(candidate);
  assert.deepEqual(result, {
    status: "reused",
    candidateId: "candidate-1",
    canonicalId: "person-1",
  });
});

test("admission blocks revoked objects", () => {
  const runtime = new AdmissionRuntime();
  const result = runtime.admit({ ...candidate, revoked: true });
  assert.equal(result.status, "blocked");
  assert.equal(result.reason, "object_revoked");
});

test("admission reuses a canonical identity after it has been admitted", () => {
  const runtime = new AdmissionRuntime();
  assert.equal(runtime.admit(candidate).status, "admitted");
  const second = runtime.admit({ ...candidate, id: "candidate-2" });
  assert.equal(second.status, "reused");
  assert.equal(second.canonicalId, "person-1");
});
