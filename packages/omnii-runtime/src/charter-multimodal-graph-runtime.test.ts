import assert from "node:assert/strict";
import test from "node:test";
import { CharterMultimodalGraphRuntime } from "./charter-multimodal-graph-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

test("CharterMultimodalGraphRuntime composes and validates a continuous multimodal journey", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const runtime = new CharterMultimodalGraphRuntime(objects, relationships);
  const journey = await objects.create({ type: "journey", status: "active", identity: {}, provenance: { source: "test" }, authority: { scope: ["movement"], capabilities: ["operate"] }, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const road = await objects.create({ type: "movement_capability", status: "active", identity: {}, provenance: { source: "test" }, authority: { scope: ["movement"], capabilities: ["operate"] }, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const graph = await runtime.compose(journey.id,
    [{ id: "A", kind: "origin" }, { id: "B", kind: "handoff" }, { id: "C", kind: "destination" }],
    [{ from: "A", to: "B", mode: "road", capabilityId: road.id, sequence: 1, status: "ready" }, { from: "B", to: "C", mode: "rail", sequence: 2, status: "ready" }]);
  assert.equal(runtime.validateContinuity(graph).valid, true);
});

test("CharterMultimodalGraphRuntime rejects discontinuous journeys", () => {
  const persistence = new MemoryPersistenceAdapter();
  const runtime = new CharterMultimodalGraphRuntime(new ObjectRuntime(persistence), new RelationshipRuntime(persistence));
  const result = runtime.validateContinuity({ journeyId: "j", nodes: [], edges: [
    { from: "A", to: "B", mode: "road", sequence: 1, status: "ready" },
    { from: "C", to: "D", mode: "rail", sequence: 2, status: "ready" },
  ]});
  assert.equal(result.valid, false);
  assert.equal(result.errors.some((error) => error.includes("discontinuity")), true);
});
