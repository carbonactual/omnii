import assert from "node:assert/strict";
import test from "node:test";
import { CharterJourneyExecutionRuntime } from "./charter-journey-execution-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

test("Charter journey runtime follows the canonical lifecycle", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const runtime = new CharterJourneyExecutionRuntime(objects, relationships);
  const journey = await objects.create({ type: "charter:journey", status: "intent", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });

  let execution = runtime.create(journey.id);
  execution = await runtime.transition(execution, "discovery");
  execution = await runtime.transition(execution, "eligibility");
  execution = await runtime.transition(execution, "availability");
  execution = await runtime.transition(execution, "reservation");
  execution = await runtime.transition(execution, "assignment");
  execution = await runtime.transition(execution, "preparation");
  execution = await runtime.transition(execution, "pickup");
  execution = await runtime.transition(execution, "active");
  execution = await runtime.transition(execution, "handoff");
  execution = await runtime.transition(execution, "completion");
  execution = await runtime.transition(execution, "evidence");
  execution = await runtime.transition(execution, "reconciliation");
  execution = await runtime.transition(execution, "closed");

  assert.equal(execution.state, "closed");
});

test("Charter rejects an invalid journey transition", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const runtime = new CharterJourneyExecutionRuntime(new ObjectRuntime(persistence), new RelationshipRuntime(persistence));
  const execution = runtime.create("missing-or-unpersisted-journey");
  await assert.rejects(runtime.transition(execution, "active"), /Invalid journey transition|Journey not found/);
});
