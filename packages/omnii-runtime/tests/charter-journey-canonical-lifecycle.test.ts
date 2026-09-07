import assert from "node:assert/strict";
import test from "node:test";
import { CharterJourneyExecutionRuntime } from "../src/charter-journey-execution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";
import { ObjectRuntime } from "../src/object-runtime";
import { RelationshipRuntime } from "../src/relationship-runtime";

test("Charter journey runtime follows the canonical lifecycle", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const objects = new ObjectRuntime(persistence);
  const relationships = new RelationshipRuntime(persistence);
  const runtime = new CharterJourneyExecutionRuntime(objects, relationships);
  const journey = await objects.create({ type: "charter:journey", status: "intent", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });

  let execution = runtime.create(journey.id);
  for (const next of ["discovery", "eligibility", "availability", "reservation", "assignment", "preparation", "pickup", "active", "handoff", "completion", "evidence", "reconciliation", "closed"] as const) {
    execution = await runtime.transition(execution, next);
  }
  assert.equal(execution.state, "closed");

  const events = await runtime.listEvents(journey.id);
  assert.equal(events.length, 13);
  assert.equal(events[0].priorState, "intent");
  assert.equal(events.at(-1)?.resultingState, "closed");
});

test("Charter rejects an invalid journey transition", async () => {
  const persistence = new MemoryPersistenceAdapter();
  const runtime = new CharterJourneyExecutionRuntime(new ObjectRuntime(persistence), new RelationshipRuntime(persistence));
  const journey = await runtime.objects.create({ type: "charter:journey", status: "intent", identity: {}, provenance: { source: "test" }, authority: {}, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
  const execution = runtime.create(journey.id);
  await assert.rejects(runtime.transition(execution, "active"), /Invalid journey transition/);
});
