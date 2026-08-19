import assert from "node:assert/strict";
import test from "node:test";
import { AuthorityRuntime, AuthorityRecord } from "../src/authority-runtime";
import { EventStore } from "../src/event-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

const issuer = (): AuthorityRecord => ({
  id: "governance-1",
  subject: "human-governance",
  issuer: "constitution",
  scope: ["authority:issue", "authority:delegate", "authority:revoke", "authority:suspend", "execute"],
  capabilities: ["authority:issue", "authority:delegate", "authority:revoke", "authority:suspend", "execute"],
  constraints: { resourceIds: ["resource-1"] },
  context: { tenant: "tenant-1" },
  issued_at: new Date().toISOString(),
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  revocable: true,
  provenance: { governance: true },
  version: "1",
  status: "active",
});

const childExpiry = () => new Date(Date.now() + 60 * 60 * 1000).toISOString();
const issueDefaults = () => ({ context: { tenant: "tenant-1" }, expires_at: childExpiry() });
const request = (overrides: Record<string, unknown> = {}) => ({
  ...issueDefaults(),
  subject: "human-1",
  scope: ["execute"],
  capabilities: ["execute"],
  ...overrides,
});

async function setup() {
  const persistence = new MemoryPersistenceAdapter();
  const events = new EventStore(persistence);
  return { persistence, events, runtime: new AuthorityRuntime({ persistence, events }) };
}

test("valid authority issuance is scoped and versioned", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request({ constraints: { resourceIds: ["resource-1"] }, idempotency_key: "issue-1" }), issuer());
  assert.equal(a.status, "active");
  assert.equal(a.version, "1");
  assert.equal(a.issuer, "human-governance");
});

test("invalid issuance cannot exceed issuer scope", async () => {
  const { runtime } = await setup();
  await assert.rejects(() => runtime.issue(request({ scope: ["delete"], capabilities: ["delete"] }), issuer()), /exceeds issuer authority/);
});

test("resource and context constraints are enforced", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request({ constraints: { resourceIds: ["resource-1"] } }), issuer());
  await assert.rejects(() => runtime.authorizeAction(a.id, "execute", { resourceId: "resource-2", context: { tenant: "tenant-1" } }));
  await assert.rejects(() => runtime.authorizeAction(a.id, "execute", { resourceId: "resource-1", context: { tenant: "tenant-2" } }));
});

test("capability mismatch is rejected", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request(), issuer());
  await assert.rejects(() => runtime.authorizeAction(a.id, "delete"));
});

test("expired authority is rejected", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request({ expires_at: new Date(Date.now() - 1000).toISOString() }), issuer());
  await assert.rejects(() => runtime.authorizeAction(a.id, "execute"), /expired/);
});

test("revoked authority is rejected", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request(), issuer());
  await runtime.revoke(a.id, issuer());
  await assert.rejects(() => runtime.authorizeAction(a.id, "execute"), /revoked/);
});

test("suspended authority is rejected by the shared authorization guard", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request(), issuer());
  await runtime.suspend(a.id, issuer(), "1");
  await assert.rejects(() => runtime.authorizeAction(a.id, "execute"), /suspended/);
});

test("delegation is bounded by parent scope, capability, resource, context and duration", async () => {
  const { runtime } = await setup();
  const parent = await runtime.issue(request({ subject: "human-delegator", scope: ["authority:issue", "authority:delegate", "execute"], capabilities: ["authority:issue", "authority:delegate", "execute"], constraints: { resourceIds: ["resource-1"] }, expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() }), issuer());
  const child = await runtime.delegate(parent.id, { ...request({ subject: "agent-1", expires_at: new Date(Date.now() + 20 * 60 * 1000).toISOString() }) }, parent);
  assert.equal(child.parent_authority_id, parent.id);
  await assert.rejects(() => runtime.delegate(parent.id, request({ subject: "agent-2", scope: ["delete"], capabilities: ["delete"] }), parent), /exceeds parent authority/);
});

test("ABBA cannot self-issue authority", async () => {
  const { runtime } = await setup();
  await assert.rejects(() => runtime.issue(request({ subject: "agent-1" }), { ...issuer(), id: "abba", subject: "ABBA" }), /cannot issue|Only non-agent governance authority may issue authority/);
});

test("agents cannot issue or delegate authority", async () => {
  const { runtime } = await setup();
  const agent = { ...issuer(), id: "agent-auth", subject: "agent-1", provenance: { agent_id: "agent-1" } };
  await assert.rejects(() => runtime.issue(request({ subject: "agent-2" }), agent), /non-agent governance/);
  await assert.rejects(() => runtime.delegate(agent.id, request({ subject: "agent-2" }), agent), /non-agent governance|not found/);
});

test("issuance is idempotent", async () => {
  const { runtime } = await setup();
  const first = await runtime.issue(request({ idempotency_key: "same" }), issuer());
  const second = await runtime.issue(request({ subject: "human-2", idempotency_key: "same" }), issuer());
  assert.equal(first.id, second.id);
});

test("revocation is version protected", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request(), issuer());
  const revoked = await runtime.revoke(a.id, issuer(), "1");
  assert.equal(revoked.status, "revoked");
  await assert.rejects(() => runtime.revoke(a.id, issuer(), "1"), /version conflict|revoked/);
});

test("audit events are generated", async () => {
  const { runtime, events } = await setup();
  const a = await runtime.issue(request(), issuer());
  await runtime.authorizeAction(a.id, "execute");
  await runtime.revoke(a.id, issuer());
  const types = (await events.all()).map((e) => e.type);
  assert.ok(types.includes("AUTHORITY_ISSUED"));
  assert.ok(types.includes("AUTHORITY_AUTHORIZATION"));
  assert.ok(types.includes("AUTHORITY_REVOKED"));
});

test("authority survives runtime recreation", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const first = new AuthorityRuntime({ persistence });
  const a = await first.issue(request(), issuer());
  const second = new AuthorityRuntime({ persistence });
  assert.equal((await second.inspect(a.id))?.subject, "human-1");
});

test("stale authority mutation is rejected", async () => {
  const { runtime } = await setup();
  const a = await runtime.issue(request(), issuer());
  const first = await runtime.suspend(a.id, issuer(), "1");
  assert.equal(first.version, "2");
  await assert.rejects(() => runtime.suspend(a.id, issuer(), "1"), /version conflict/);
});
