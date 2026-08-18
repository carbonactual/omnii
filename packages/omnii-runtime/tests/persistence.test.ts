import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { SupabasePersistenceAdapter } from "../src/supabase-persistence";

test("memory persistence preserves CRUD, versioning, archive and query semantics", async () => {
  const persistence = new MemoryPersistenceAdapter();
  await persistence.create("objects", { id: "o1", version: "1", lifecycle: "active", authority: { subject: "human-1" }, provenance: { source: "test" }, payload: { type: "test.object" } });
  assert.equal((await persistence.read("objects", "o1"))?.id, "o1");
  await persistence.version("objects", "o1", "2"); assert.equal((await persistence.read("objects", "o1"))?.version, "2");
  await persistence.archive("objects", "o1"); assert.equal((await persistence.read("objects", "o1"))?.lifecycle, "archived");
  assert.equal((await persistence.query("objects", (record) => record.lifecycle === "archived")).length, 1);
});

test("memory persistence rejects stale optimistic updates", async () => {
  const persistence = new MemoryPersistenceAdapter(); await persistence.create("objects", { id: "o1", version: "1", payload: {}, authority: {}, provenance: {} });
  await persistence.updateIfVersion("objects", "o1", "1", { version: "2" });
  await assert.rejects(() => persistence.updateIfVersion("objects", "o1", "1", { version: "3" }), /version conflict/);
});

test("memory persistence rolls back a failed transaction", async () => {
  const persistence = new MemoryPersistenceAdapter(); await persistence.create("objects", { id: "o1", payload: {}, authority: {}, provenance: {} });
  await assert.rejects(() => persistence.transaction(async (tx) => { await tx.update("objects", "o1", { payload: { changed: true } }); throw new Error("rollback"); }));
  assert.deepEqual((await persistence.read("objects", "o1"))?.payload, {});
});

test("state transition and event share the memory transaction boundary", async () => {
  const persistence = new MemoryPersistenceAdapter(); await persistence.create("state", { id: "s1", version: "1", lifecycle: "active", authority: {}, provenance: {}, payload: { state: "pending" } });
  const result = await persistence.stateEvent({ stateId: "s1", expectedVersion: "1", statePatch: { version: "2", payload: { state: "active" } }, event: { id: "e1", type: "STATE_TRANSITIONED", actor: "human-1", subject: "s1", provenance: {}, payload: {} } });
  assert.equal((result.state as Record<string, unknown>).version, "2"); assert.equal((await persistence.read("events", "e1"))?.id, "e1");
});

test("execution and audit are atomically recorded by the memory adapter", async () => {
  const persistence = new MemoryPersistenceAdapter(); await persistence.create("executions", { id: "x1", version: "1", state: "completed", authority: {}, provenance: {} });
  const result = await persistence.executionAudit({ executionId: "x1", executionPatch: { state: "completed", auditReference: "a1" }, audit: { id: "a1", object: "x1", result: "success", authority: {}, provenance: {} } });
  assert.equal((result.audit as Record<string, unknown>).id, "a1"); assert.equal((await persistence.read("audit", "a1"))?.id, "a1");
});

test("ledger and audit are atomically recorded by the memory adapter", async () => {
  const persistence = new MemoryPersistenceAdapter(); const result = await persistence.ledgerAudit({ ledger: { id: "l1", transactionReference: "tx1", valueReference: "value1", authority: {}, provenance: {} }, audit: { id: "a1", object: "l1", result: "recorded", authority: {}, provenance: {} } });
  assert.equal((result.ledger as Record<string, unknown>).id, "l1"); assert.equal((await persistence.read("audit", "a1"))?.id, "a1");
});

test("supabase adapter refuses to imply unsupported generic transactions", async () => { const persistence = new SupabasePersistenceAdapter({} as never); await assert.rejects(() => persistence.transaction(async () => undefined), /requires an explicit PostgreSQL RPC/); });
