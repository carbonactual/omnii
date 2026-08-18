import assert from "node:assert/strict";
import test from "node:test";
import { RelationshipRuntime } from "../src/relationship-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("relationship mutation uses optimistic concurrency", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const runtime = new RelationshipRuntime(persistence);
  const relationship = await runtime.create({
    type: "contains",
    source: "o1",
    target: "o2",
    direction: "directed",
    status: "active",
    authority: { id: "auth" },
    provenance: { source: "test" }
  });
  const first = await runtime.read(relationship.id);
  const second = await runtime.read(relationship.id);
  assert.equal(first?.version, "1");
  assert.equal(second?.version, "1");
  await runtime.update(relationship.id, { status: "retired" }, first?.version);
  await assert.rejects(
    () => runtime.update(relationship.id, { status: "active" }, second?.version),
    /version conflict/
  );
});

test("execution/audit atomic boundary rejects stale execution versions", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const execution = {
    id: "exec-concurrency",
    version: "1",
    lifecycle: "active",
    authority: { id: "auth" },
    provenance: { source: "test" },
    payload: { state: "running" }
  };
  await persistence.create("executions", execution);
  await persistence.executionAudit({
    executionId: execution.id,
    expectedVersion: "1",
    executionPatch: { version: "2", lifecycle: "active", payload: { state: "completed" } },
    audit: { id: "audit-concurrency-1", authority: { id: "auth" }, provenance: { source: "test" }, payload: {} }
  });
  await assert.rejects(
    () => persistence.executionAudit({
      executionId: execution.id,
      expectedVersion: "1",
      executionPatch: { version: "2", lifecycle: "active", payload: { state: "failed" } },
      audit: { id: "audit-concurrency-2", authority: { id: "auth" }, provenance: { source: "test" }, payload: {} }
    }),
    /version conflict/
  );
  assert.equal((await persistence.read("executions", execution.id))?.version, "2");
});
