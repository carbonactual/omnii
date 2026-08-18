import assert from "node:assert/strict";
import test from "node:test";
import { AbbaRuntime } from "../src/abba-runtime";
import { AgentRuntime } from "../src/agent-runtime";
import { EventStore } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { ObjectRuntime } from "../src/object-runtime";
import { RelationshipRuntime } from "../src/relationship-runtime";
import { RegistryRuntime } from "../src/registry-runtime";
import { authorize } from "../src/event-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

const baseObject = () => ({ type: "test.object", status: "active", identity: { subject: "test" }, provenance: { source: "test" }, authority: { id: "auth" }, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [] });

test("object update and archive remain explicit lifecycle operations", async () => {
  const runtime = new ObjectRuntime(new MemoryPersistenceAdapter()); const object = await runtime.create(baseObject()); const updated = await runtime.update(object.id, { attributes: { name: "updated" } }, "1");
  assert.deepEqual(updated.attributes, { name: "updated" }); assert.equal(updated.id, object.id); assert.equal((await runtime.archive(object.id)).status, "archived");
});

test("relationship retirement is persisted", async () => {
  const runtime = new RelationshipRuntime(new MemoryPersistenceAdapter()); const relationship = await runtime.create({ type: "knows", source: "a", target: "b", direction: "directed", status: "active", authority: { id: "auth" }, provenance: { source: "test" } });
  assert.equal((await runtime.retire(relationship.id)).status, "retired");
});

test("dependency registry preserves source target and dependency type", async () => {
  const registries = new RegistryRuntime(new MemoryPersistenceAdapter()); const record = { id: "dep-1", version: "1", status: "active", authority: { id: "auth" }, provenance: { source: "test" }, source: "object-a", target: "resource-b", dependencyType: "requires" };
  await registries.dependencies.register(record, "human-1"); assert.deepEqual(await registries.dependencies.resolve("dep-1"), record);
});

test("expired and revoked authority are rejected", () => {
  const expired = { id: "auth", subject: "human-1", scope: ["execute"], capabilities: ["execute"], issued_at: new Date(Date.now() - 10_000).toISOString(), expires_at: new Date(Date.now() - 1_000).toISOString(), revocable: true };
  const revoked = { id: "auth2", subject: "human-1", scope: ["execute"], capabilities: ["execute"], issued_at: new Date().toISOString(), revocable: true, revoked_at: new Date().toISOString() };
  assert.throws(() => authorize(expired, "execute")); assert.throws(() => authorize(revoked, "execute"));
});

test("ABBA receives delegated authority and does not mint it", async () => {
  const persistence = new MemoryPersistenceAdapter(); const events = new EventStore(persistence); const executions = new ExecutionRuntime(events, persistence); const agents = new AgentRuntime(executions, events, persistence);
  const agentAuthority = { id: "agent-auth", subject: "agent-4", scope: [], capabilities: [], issued_at: new Date().toISOString(), revocable: true };
  const agent = await agents.register({ identity: "agent-4", authority: agentAuthority, capabilities: ["execute"], tools: [], context: {}, memory: {}, policyConstraints: {}, executionBoundary: {} }); await agents.verify(agent.identity);
  const delegated = { id: "delegated-auth", subject: agent.identity, scope: ["execute"], capabilities: ["execute"], issued_at: new Date().toISOString(), revocable: true, provenance: { issuer: "governance" } };
  const abba = new AbbaRuntime({ request: () => delegated }, agents, events); const requested = await abba.requestAuthority({ subject: agent.identity, capability: "execute", purpose: "authorized work", resourceIds: [], context: {} }); await abba.delegate({ purpose: "authorized work", capability: "execute", targetAgent: agent.identity, input: {} }, requested);
  assert.equal((await agents.read(agent.identity))?.state, "active");
});
