import assert from "node:assert/strict";
import test from "node:test";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { NABRuntime } from "./nab-runtime";

test("NABRuntime registers a subject and records biography/state", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const nab = new NABRuntime(objects, relationships);
  const subject = await nab.register("vehicle", { make: "Example", model: "One" });
  await nab.appendBiographyEvent({ subjectId: subject.id, type: "registered", occurredAt: "2026-01-01T00:00:00Z", source: "registry" });
  await nab.recordState({ subjectId: subject.id, state: "available", observedAt: "2026-01-01T01:00:00Z", source: "fleet", confidence: "verified" });
  assert.equal((await nab.biography(subject.id)).length, 1);
  assert.equal((await nab.currentState(subject.id))[0]?.attributes["state"], "available");
});

test("NABRuntime rejects biography events for unknown subjects", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const nab = new NABRuntime(new ObjectRuntime(persistence), new RelationshipRuntime(persistence));
  await assert.rejects(
    () => nab.appendBiographyEvent({ subjectId: "missing", type: "registered", occurredAt: "2026-01-01T00:00:00Z" }),
    /NAB subject not found/
  );
});
