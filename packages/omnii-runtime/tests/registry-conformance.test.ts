import assert from "node:assert/strict";
import test from "node:test";
import { RegistryConformanceRecord, validateRegistryConformance } from "../src/registry-conformance";

const base: RegistryConformanceRecord = {
  id: "registry:provenance",
  version: "1",
  lifecycle: "active",
  authority: {},
  provenance: { source: "OMNII constitutional registry catalog", catalog_version: "2026-08-26" },
  payload: {
    type: "registry",
    domain: "provenance",
    canonical_source: "OMNII Provenance Contract",
    expected_relations: ["derived_from", "verified_by"],
    open_world: true,
    authority_policy: { non_granting: true },
    boundary_policy: { authority_boundary_explicit: true },
    relationship_policy: { typed: true, provenance_required: true },
    continuity_policy: { lineage_required: true, silent_delete_forbidden: true },
    dependencies: [],
  },
};

test("accepts a structurally complete registry envelope", () => {
  const result = validateRegistryConformance(base);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("rejects registries that can silently grant authority", () => {
  const result = validateRegistryConformance({
    ...base,
    payload: { ...base.payload, authority_policy: { non_granting: false } },
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.includes("AUTHORITY_ESCALATION_POLICY"), true);
});

test("rejects a registry with a self-dependency", () => {
  const result = validateRegistryConformance({
    ...base,
    payload: { ...base.payload, dependencies: ["registry:provenance"] },
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.includes("DEPENDENCY_POLICY"), true);
});
