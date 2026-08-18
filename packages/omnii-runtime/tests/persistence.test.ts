import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { SupabasePersistenceAdapter } from "../src/supabase-persistence";

test("memory persistence preserves CRUD, versioning, archive and query semantics", async () => {
  const persistence = new MemoryPersistenceAdapter();
  await persistence.create("objects", { id: "o1", version: "1", lifecycle: "active", authority: { subject: "human-1" }, provenance: { source: "test" }, payload: { type: "test.object" } });
  assert.equal((await persistence.read("objects", "o1"))?.id, "o1");
  await persistence.version("objects", "o1", "2");
  assert.equal((await persistence.read("objects", "o1"))?.version, "2");
  await persistence.archive("objects", "o1");
  assert.equal((await persistence.read("objects", "o1"))?.lifecycle, "archived");
  assert.equal((await persistence.query("objects", (record) => record.lifecycle === "archived")).length, 1);
});

test("memory persistence rolls back a failed transaction", async () => {
  const persistence = new MemoryPersistenceAdapter();
  await persistence.create("objects", { id: "o1", payload: {}, authority: {}, provenance: {} });
  await assert.rejects(() => persistence.transaction(async (tx) => {
    await tx.update("objects", "o1", { payload: { changed: true } });
    throw new Error("rollback");
  }));
  assert.deepEqual((await persistence.read("objects", "o1"))?.payload, {});
});

test("supabase adapter refuses to imply unsupported multi-record atomicity", async () => {
  const fakeClient = {} as never;
  const persistence = new SupabasePersistenceAdapter(fakeClient);
  await assert.rejects(() => persistence.transaction(async () => undefined), /requires a database RPC/);
});
