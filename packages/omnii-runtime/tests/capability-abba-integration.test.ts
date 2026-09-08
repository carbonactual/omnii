import assert from "node:assert/strict";
import test from "node:test";
import { CapabilityCatalogAdapter, CapabilityRegistryRuntime, CapabilityDescriptor } from "../src/capability-fabric-runtime";

const descriptor: CapabilityDescriptor = {
  id: "capability.analytics.chart_query",
  name: "chart_query",
  version: "1.0.0",
  providerId: "amplitude",
  domain: "analytics",
  operation: "query",
  status: "verified",
  authorityClass: "provider-scoped",
  riskClass: "low",
  sideEffect: "none",
  identityScope: "organization",
  inputSchema: { type: "object" },
  outputSchema: { type: "object" },
  dependencies: [],
  costHint: 1,
  latencyHint: 1,
  reliabilityHint: 0.99,
  auditPolicy: "standard",
  provenance: { source: "amplitude" },
};

test("adapts canonical CACF capabilities to ABBA discovery without granting authority", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor, "ABBA");
  const catalog = new CapabilityCatalogAdapter(registry);
  const results = await catalog.lookup((item) => item.name === "chart_query", "ABBA");
  assert.equal(results.length, 1);
  assert.equal(results[0].id, descriptor.id);
  assert.deepEqual(results[0].authority, { class: "provider-scoped", granted: false });
  assert.deepEqual(results[0].constraints, { riskClass: "low", sideEffect: "none", identityScope: "organization" });
});
