import test from "node:test";
import assert from "node:assert/strict";
import { CharterOperationsRuntime } from "./charter-operations-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

const authority = { scope: ["movement"], capabilities: ["operate"] };
const provenance = { source: "test" };

async function object(runtime: ObjectRuntime, type: string, metadata: Record<string, unknown> = {}) {
  return runtime.create({ type, status: "active", identity: {}, provenance, authority, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata });
}

test("CharterOperationsRuntime assigns an available capability", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const operations = new CharterOperationsRuntime(objects, relationships);
  const journey = await object(objects, "journey");
  const capability = await object(objects, "movement_capability", { movement: { availability: "available", mode: "road" } });
  const result = await operations.assign({ capabilityId: capability.id, journeyId: journey.id, personnelIds: [], status: "assigned" });
  assert.equal(result.value.status, "assigned");
  assert.equal(result.eventIds.length, 1);
});

test("CharterOperationsRuntime rejects unavailable capabilities", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const operations = new CharterOperationsRuntime(objects, relationships);
  const journey = await object(objects, "journey");
  const capability = await object(objects, "movement_capability", { movement: { availability: "maintenance", mode: "road" } });
  await assert.rejects(
    operations.assign({ capabilityId: capability.id, journeyId: journey.id, personnelIds: [], status: "assigned" }),
    /not assignable/,
  );
});

test("CharterOperationsRuntime recomposes a failed journey with an available replacement", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const operations = new CharterOperationsRuntime(objects, relationships);
  const journey = await object(objects, "journey");
  const replacement = await object(objects, "movement_capability", { movement: { availability: "available", mode: "road" } });
  const result = await operations.recover({ journeyId: journey.id, status: "detected" }, replacement.id);
  assert.equal(result.status, "recomposed");
  assert.equal(result.replacementCapabilityId, replacement.id);
});
