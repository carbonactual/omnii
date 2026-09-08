import assert from "node:assert/strict";
import test from "node:test";
import { CapabilityRegistryRuntime, CapabilityDescriptor } from "../src/capability-fabric-runtime";
import { CapabilityRouterRuntime } from "../src/capability-router-runtime";
import { AbbaOrchestrationRuntime } from "../src/abba-orchestration-runtime";

const descriptor = (overrides: Partial<CapabilityDescriptor> = {}): CapabilityDescriptor => ({
  id: "capability.analytics.chart_query",
  name: "chart_query",
  version: "1.0.0",
  providerId: "amplitude",
  domain: "intelligence",
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
  latencyHint: 5,
  reliabilityHint: 0.95,
  auditPolicy: "standard",
  provenance: { source: "connected-plugin" },
  ...overrides,
});

test("ABBA command composes capability routing without authorizing execution", async () => {
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor({ providerId: "amplitude" }), "ABBA");
  await registry.register(descriptor({ providerId: "posthog", reliabilityHint: 0.9 }), "ABBA");
  const runtime = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(registry));
  const result = await runtime.command({
    principal: "human-1",
    command: "find the conversion trend",
    capabilityIds: [descriptor().id],
    correlationId: "corr-1",
    idempotencyKey: "cmd-1",
    relationships: [{ id: "r-1", type: "uses", source: "product-1", target: "chart-1" }],
  });
  assert.equal(result.principal, "human-1");
  assert.equal(result.routes.length, 1);
  assert.equal(result.routes[0].authorized, false);
  assert.equal(result.relationships.length, 1);
  assert.equal(result.relationshipStatus, "contextual");
  assert.equal(result.nextBoundary, "MISSION_OR_AUTHORITY");
});

test("ABBA command refuses empty capability discovery rather than inventing a provider", async () => {
  const registry = new CapabilityRegistryRuntime();
  const runtime = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(registry));
  const result = await runtime.command({
    principal: "human-1",
    command: "do an unknown thing",
    capabilityIds: ["capability.unknown"],
    correlationId: "corr-2",
    idempotencyKey: "cmd-2",
  });
  assert.equal(result.routes[0].candidates.length, 0);
  assert.equal(result.nextBoundary, "CAPABILITY_GAP");
  assert.deepEqual(result.warnings, ["no_active_provider:capability.unknown"]);
});

test("ABBA command marks a missing capability declaration as a gap", async () => {
  const runtime = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(new CapabilityRegistryRuntime()));
  const result = await runtime.command({
    principal: "human-1",
    command: "explain this request",
    capabilityIds: [],
    correlationId: "corr-3",
    idempotencyKey: "cmd-3",
  });
  assert.equal(result.nextBoundary, "CAPABILITY_GAP");
  assert.deepEqual(result.warnings, ["capability_required"]);
});

test("ABBA does not promote caller-supplied relationships to canonical graph truth", async () => {
  const runtime = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(new CapabilityRegistryRuntime()));
  const result = await runtime.command({
    principal: "human-1",
    command: "use relationship context",
    capabilityIds: [],
    correlationId: "corr-4",
    idempotencyKey: "cmd-4",
    relationships: [{ id: "r-2", type: "claims", source: "a", target: "b" }],
  });
  assert.equal(result.relationshipStatus, "contextual");
});
