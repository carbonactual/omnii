import assert from "node:assert/strict";
import test from "node:test";
import { CapabilityRegistryRuntime, CapabilityDescriptor } from "../src/capability-fabric-runtime";
import { CapabilityRouterRuntime } from "../src/capability-router-runtime";

const descriptor = (overrides: Partial<CapabilityDescriptor> = {}): CapabilityDescriptor => ({
  id: "capability.build.application",
  name: "build_application",
  version: "1.0.0",
  providerId: "provider-a",
  domain: "technology",
  operation: "build",
  status: "verified",
  authorityClass: "delegated",
  riskClass: "medium",
  sideEffect: "compute",
  identityScope: "organization",
  inputSchema: { type: "object" },
  outputSchema: { type: "object" },
  dependencies: [],
  costHint: 1,
  latencyHint: 5,
  reliabilityHint: 0.9,
  auditPolicy: "standard",
  provenance: { source: "connected-plugin" },
  ...overrides,
});

test("routes deterministically and prefers stronger evidence", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "slow-cheap", reliabilityHint: 0.8, latencyHint: 100, costHint: 1 }), "ABBA");
  await registry.register(descriptor({ providerId: "fast-reliable", reliabilityHint: 0.99, latencyHint: 10, costHint: 2 }), "ABBA");
  const result = await new CapabilityRouterRuntime(registry).route({ capabilityId: descriptor().id, riskClass: "medium" });
  assert.equal(result.candidates[0].providerId, "fast-reliable");
  assert.equal(result.authorized, false);
});

test("excludes unavailable providers", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "down", status: "unavailable" }), "ABBA");
  await registry.register(descriptor({ providerId: "up" }), "ABBA");
  const result = await new CapabilityRouterRuntime(registry).route({ capabilityId: descriptor().id });
  assert.deepEqual(result.candidates.map((item) => item.providerId), ["up"]);
});

test("never converts route selection into permission", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ sideEffect: "external-write", riskClass: "high" }), "ABBA");
  const result = await new CapabilityRouterRuntime(registry).route({ capabilityId: descriptor().id, requireApproval: true });
  assert.equal(result.authorized, false);
  assert.equal(result.requiresApproval, true);
  assert.equal(result.requiresAuthority, true);
});

test("uses non-authoritative provider selection evidence only as a routing preference", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "provider-a", reliabilityHint: 0.8 }), "ABBA");
  await registry.register(descriptor({ providerId: "provider-b", reliabilityHint: 0.8 }), "ABBA");
  const result = await new CapabilityRouterRuntime(registry).route({
    capabilityId: descriptor().id,
    selectionHints: { "capability.build.application::provider-b": 1, "capability.build.application::provider-a": 0 },
  });
  assert.equal(result.candidates[0].providerId, "provider-b");
  assert.equal(result.authorized, false);
});
