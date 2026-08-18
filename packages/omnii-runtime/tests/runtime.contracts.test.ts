import assert from "node:assert/strict";
import test from "node:test";
import { AgentRuntime } from "../src/agent-runtime";
import { AbbaRuntime } from "../src/abba-runtime";
import { EventStore, StateMachine } from "../src/event-runtime";
import { ExecutionRuntime } from "../src/execution-runtime";
import { GraphRuntime, Phase40GraphAdapter } from "../src/graph-runtime";
import { ObjectRuntime } from "../src/object-runtime";
import { RegistryRuntime } from "../src/registry-runtime";
import { RelationshipRuntime } from "../src/relationship-runtime";
import { TransitionRuntime, executeQuery } from "../src/transition-runtime";
import { WorkflowRuntime } from "../src/workflow-runtime";
import { AuditRuntime } from "../src/audit-runtime";
import { LedgerBoundary } from "../src/ledger-boundary";
import { Authority } from "../src/types";

const authority = (): Authority => ({
  id: crypto.randomUUID(),
  subject: "human-1",
  scope: ["write", "execute"],
  capabilities: ["write", "execute"],
  issued_at: new Date().toISOString(),
  revocable: true,
  provenance: { source: "test" },
});

const objectInput = () => ({
  type: "test.object",
  status: "active",
  identity: { subject: "test" },
  provenance: { source: "test" },
  authority: { id: authority().id },
  attributes: { name: "test" },
  relationships: [],
  dependencies: [],
  capabilities: ["write"],
  resources: [],
});

test("object creation and validation", () => {
  const runtime = new ObjectRuntime();
  const object = runtime.create(objectInput());
  assert.equal(runtime.validate(object.id).valid, true);
  assert.equal(runtime.read(object.id)?.id, object.id);
});

test("relationship creation preserves provenance and traverses", () => {
  const objects = new ObjectRuntime();
  const relationships = new RelationshipRuntime();
  const a = objects.create(objectInput());
  const b = objects.create(objectInput());
  const relationship = relationships.create({ type: "member_of", source: a.id, target: b.id, direction: "directed", status: "active", authority: { id: "auth" }, provenance: { source: "test" } });
  assert.equal(relationship.provenance.source, "test");
  assert.equal(relationships.traverse(a.id).length, 1);
});

test("registry resolves, versions, deprecates and audits", () => {
  const registries = new RegistryRuntime();
  const record = { ...objectInput(), id: crypto.randomUUID(), version: "1", timestamps: { created_at: new Date().toISOString() }, authority: { id: "auth" }, provenance: { source: "test" } };
  registries.objects.register(record, "human-1");
  registries.objects.version(record.id, "2", "human-1");
  registries.objects.deprecate(record.id, "human-1");
  assert.equal(registries.objects.resolve(record.id)?.status, "deprecated");
  assert.ok(registries.objects.auditLog().length >= 3);
});

test("unauthorized state transition fails", () => {
  const events = new EventStore();
  const machine = new StateMachine([{ from: "pending", to: "active" }]);
  const runtime = new TransitionRuntime(events, machine);
  const denied = { ...authority(), capabilities: [], scope: [] };
  assert.throws(() => runtime.execute({ command: { type: "activate", actor: "human-1", subject: "o1", authority: denied, capability: "execute" }, from: "pending", to: "active" }));
});

test("valid state transition emits attributable event", () => {
  const events = new EventStore();
  const runtime = new TransitionRuntime(events, new StateMachine([{ from: "pending", to: "active" }]));
  const result = runtime.execute({ command: { type: "activate", actor: "human-1", subject: "o1", authority: authority(), capability: "execute" }, from: "pending", to: "active" });
  assert.equal(result.state, "active");
  assert.equal(events.all()[0].subject, "o1");
});

test("query does not mutate event state", () => {
  const events = new EventStore();
  const before = events.all().length;
  executeQuery(() => events.all());
  assert.equal(events.all().length, before);
});

test("execution requires authorization and emits audit events", () => {
  const events = new EventStore();
  const runtime = new ExecutionRuntime(events);
  const execution = runtime.create({ intentReference: "intent-1", actorIdentity: "human-1", authorityContext: authority(), capability: "execute", resources: [], dependencies: [], input: { ok: true }, provenance: { source: "test" } });
  runtime.validate(execution.id);
  runtime.authorize(execution.id);
  const completed = runtime.run(execution.id, () => ({ result: "ok" }));
  assert.equal(completed.state, "completed");
  assert.ok(runtime.audit(execution.id).length >= 1);
});

test("graph resolves objects, relationships and phase 40 adapter", () => {
  const objects = new ObjectRuntime();
  const relationships = new RelationshipRuntime();
  const events = new EventStore();
  const registries = new RegistryRuntime();
  const graph = new GraphRuntime(objects, relationships, events, registries);
  const a = graph.addObject(objectInput());
  const b = graph.addObject(objectInput());
  const relation = graph.addRelationship({ type: "contains", source: a.id, target: b.id, direction: "directed", status: "active", authority: { id: "auth" }, provenance: { source: "test" } });
  assert.equal(graph.traverse(a.id)[0].id, b.id);
  const adapter = new Phase40GraphAdapter(graph);
  assert.equal(adapter.toNode(a.id, "civilization").canonicalObjectId, a.id);
  assert.equal(adapter.toRelation(relation.id).canonicalRelationshipId, relation.id);
});

test("workflow composes authorization and execution", () => {
  const events = new EventStore();
  const executions = new ExecutionRuntime(events);
  const workflows = new WorkflowRuntime(executions, events);
  workflows.register({ id: "wf", trigger: "manual", validate: () => true, plan: (context) => context, capability: "execute", authority: authority(), execute: () => ({ done: true }) });
  const instance = workflows.start("wf", { input: "x" });
  const completed = workflows.run(instance.id, "human-1");
  assert.equal(completed.state, "completed");
});

test("agent capability and authority are both required", () => {
  const events = new EventStore();
  const executions = new ExecutionRuntime(events);
  const agents = new AgentRuntime(executions, events);
  const agent = agents.register({ identity: "agent-1", authority: authority(), capabilities: ["execute"], tools: [], context: {}, memory: {}, policyConstraints: {}, executionBoundary: {} });
  agents.verify(agent.identity);
  agents.authorizeAgent(agent.identity, "execute");
  const execution = agents.execute(agent.identity, "execute", "intent-1", {}, () => ({ ok: true }));
  assert.equal(execution.state, "completed");
});

test("agent revocation blocks execution", () => {
  const events = new EventStore();
  const executions = new ExecutionRuntime(events);
  const agents = new AgentRuntime(executions, events);
  const agent = agents.register({ identity: "agent-2", authority: authority(), capabilities: ["execute"], tools: [], context: {}, memory: {}, policyConstraints: {}, executionBoundary: {} });
  agents.verify(agent.identity);
  agents.authorizeAgent(agent.identity, "execute");
  agents.revoke(agent.identity);
  assert.throws(() => agents.execute(agent.identity, "execute", "intent-1", {}, () => ({ ok: true })));
});

test("ABBA cannot self-authorize", () => {
  const events = new EventStore();
  const executions = new ExecutionRuntime(events);
  const agents = new AgentRuntime(executions, events);
  const agent = agents.register({ identity: "agent-3", authority: authority(), capabilities: ["execute"], tools: [], context: {}, memory: {}, policyConstraints: {}, executionBoundary: {} });
  agents.verify(agent.identity);
  const abba = new AbbaRuntime({ request: () => null }, agents, events);
  assert.throws(() => abba.requestAuthority({ subject: "ABBA", capability: "execute", purpose: "test", resourceIds: [], context: {} }));
});

test("audit records WHO WHAT WHY authority capability resource time object result", () => {
  const events = new EventStore();
  const audit = new AuditRuntime(events);
  const record = audit.record({ who: "human-1", what: "update", why: "test", authority: "auth-1", capability: "write", resource: ["r1"], object: "o1", result: "success" });
  assert.equal(record.who, "human-1");
  assert.equal(record.object, "o1");
  assert.ok(record.when);
  assert.equal(audit.byObject("o1").length, 1);
});

test("ledger keeps value and money as distinct fields", () => {
  const events = new EventStore();
  const ledger = new LedgerBoundary(events);
  const entry = ledger.append({ transactionReference: "tx1", valueReference: "value1", moneyAmount: 10, moneyCurrency: "USD", provenance: { source: "test" }, authority: { subject: "human-1" } });
  assert.equal(entry.valueReference, "value1");
  assert.equal(entry.moneyAmount, 10);
  assert.equal(ledger.byTransaction("tx1").length, 1);
});
