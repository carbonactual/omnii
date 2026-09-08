import assert from "node:assert/strict";
import test from "node:test";
import { AbbaRuntime } from "../src/abba-runtime";
import { AbbaOrchestrationRuntime } from "../src/abba-orchestration-runtime";
import { CapabilityRegistryRuntime, CapabilityDescriptor } from "../src/capability-fabric-runtime";
import { CapabilityRouterRuntime } from "../src/capability-router-runtime";
import { AgentRuntime } from "../src/agent-runtime";
import { EventStore } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

const descriptor = (providerId: string): CapabilityDescriptor => ({
  id: "capability.analytics.chart_query",
  name: "chart_query",
  version: "1.0.0",
  providerId,
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
  provenance: { source: "test" },
});

test("ABBA is the single command orchestration boundary", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const executions = new ExecutionRuntime(events, persistence);
  const agents = new AgentRuntime(executions, events, persistence);
  const registry = new CapabilityRegistryRuntime();
  await registry.register(descriptor("amplitude"), "ABBA");
  await registry.register(descriptor("posthog"), "ABBA");
  const orchestration = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(registry));
  const abba = new AbbaRuntime({ request: () => null }, agents, events, "ABBA", undefined, undefined, orchestration);

  const result = await abba.command({
    principal: "human-1",
    command: "inspect conversion",
    capabilityIds: ["capability.analytics.chart_query"],
    correlationId: "corr-1",
    idempotencyKey: "cmd-1",
  });

  assert.equal(result.executable, false);
  assert.equal(result.routes[0].selectedProviderId, "amplitude");
  assert.equal(result.nextBoundary, "MISSION_OR_AUTHORITY");
});

test("ABBA command cannot invent an unregistered capability", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  const executions = new ExecutionRuntime(events, persistence);
  const agents = new AgentRuntime(executions, events, persistence);
  const orchestration = new AbbaOrchestrationRuntime(new CapabilityRouterRuntime(new CapabilityRegistryRuntime()));
  const abba = new AbbaRuntime({ request: () => null }, agents, events, "ABBA", undefined, undefined, orchestration);

  const result = await abba.command({
    principal: "human-1",
    command: "do unknown work",
    capabilityIds: ["capability.alien.operation"],
    correlationId: "corr-2",
    idempotencyKey: "cmd-2",
  });

  assert.equal(result.nextBoundary, "CAPABILITY_GAP");
  assert.deepEqual(result.warnings, ["no_active_provider:capability.alien.operation"]);
});
