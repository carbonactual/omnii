import assert from "node:assert/strict";
import test from "node:test";
import { CharterJourneyExecutionRuntime } from "../src/charter-journey-execution-runtime";
import { CharterJourneyHandoffRuntime } from "../src/charter-journey-handoff-runtime";
import { CharterJourneyEvidenceRuntime } from "../src/charter-journey-evidence";
import { CharterJourneyRecoveryRuntime } from "../src/charter-journey-recovery-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { ObjectRuntime } from "../src/object-runtime";
import { RelationshipRuntime } from "../src/relationship-runtime";

test("Charter preserves multimodal handoff semantics", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const execution = new CharterJourneyExecutionRuntime(objects, relationships);
  const handoffRuntime = new CharterJourneyHandoffRuntime(objects, relationships);
  const journey = await objects.create({ type: "charter:journey", status: "active", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const firstLeg = await objects.create({ type: "journey_leg", status: "active", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const secondLeg = await objects.create({ type: "journey_leg", status: "active", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  let state = execution.create(journey.id);
  state = { ...state, state: "active", currentLeg: firstLeg.id };
  const handoff = await handoffRuntime.start(state, firstLeg.id, secondLeg.id);
  assert.equal(handoff.state, "active");
  assert.equal(handoffRuntime.complete(handoff).state, "completed");
});

test("Charter records evidence references without replacing the evidence source", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const evidence = new CharterJourneyEvidenceRuntime(objects);
  const journey = await objects.create({ type: "charter:journey", status: "active", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const attached = await evidence.attach({ journeyId: journey.id, type: "gps", sourceRef: "telemetry:event-1", provenance: { source: "test" }, attributes: { lat: 9.08, lon: 7.49 } });
  assert.equal(attached.sourceRef, "telemetry:event-1");
  assert.equal((await evidence.list(journey.id)).length, 1);
});

test("Charter recovery requires an available replacement capability", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const recovery = new CharterJourneyRecoveryRuntime(objects);
  const journey = await objects.create({ type: "charter:journey", status: "active", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const failed = await objects.create({ type: "vehicle", status: "maintenance", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const replacement = await objects.create({ type: "vehicle", status: "available", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const started = await recovery.begin({ journeyId: journey.id, state: "active", completedLegs: [] }, failed.id, "breakdown");
  const reassigned = await recovery.reassign(started, replacement.id);
  assert.equal(recovery.resume(reassigned).state, "resumed");
  await assert.rejects(recovery.reassign(started, failed.id), /Replacement capability must differ/);
});
