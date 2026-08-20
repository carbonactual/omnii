import assert from "node:assert/strict";
import test from "node:test";
import { MovementConstitutionRuntime } from "../src/movement-constitution-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("Universal Movement shares one journey identity across Charter and NAB", async () => {
  const runtime = new MovementConstitutionRuntime(new MemoryPersistenceAdapter());
  const capability = await runtime.charter.registerCapability({
    type: "charter:vehicle",
    name: "Accessible vehicle",
    state: "available",
    capabilities: ["passenger-movement", "accessibility"],
  });
  const subject = await runtime.registerSubject("being", { name: "Passenger" });

  const plan = await runtime.plan(
    {
      origin: "A",
      destination: "C",
      mode: "commercial",
      purpose: "Reach destination",
      need: "Safe movement",
      want: "Accessible journey",
      subjectId: subject.id,
    },
    [capability.id],
  );

  assert.equal(plan.status, "planned");
  assert.equal(plan.mode, "commercial");
  const journey = await runtime.charter.objects.read(plan.journeyId);
  assert.equal(journey?.type, "charter:journey");
  assert.equal(journey?.attributes.movement_mode, "commercial");
  assert.equal(journey?.attributes.need, "Safe movement");
});

test("Pilgrim is a journey mode composed through Charter", async () => {
  const runtime = new MovementConstitutionRuntime(new MemoryPersistenceAdapter());
  const vehicle = await runtime.charter.registerCapability({ type: "charter:vehicle", name: "Guide vehicle", state: "available" });
  const guide = await runtime.charter.registerCapability({ type: "charter:guide", name: "Local guide", state: "available" });

  const plan = await runtime.plan(
    {
      origin: "Trailhead",
      destination: "Shrine",
      mode: "pilgrim",
      purpose: "Pilgrimage",
      stages: ["trailhead", "waypoint", "shrine"],
      services: ["guide", "water"],
    },
    [vehicle.id, guide.id],
  );

  assert.equal(plan.mode, "pilgrim");
  assert.equal(plan.status, "planned");
  assert.equal(plan.legs.length, 2);
  const journey = await runtime.charter.objects.read(plan.journeyId);
  assert.equal(journey?.attributes.movement_mode, "pilgrim");
  assert.deepEqual(journey?.attributes.stages, ["trailhead", "waypoint", "shrine"]);
});

test("Movement outcomes are recorded by NAB against the same journey", async () => {
  const runtime = new MovementConstitutionRuntime(new MemoryPersistenceAdapter());
  const capability = await runtime.charter.registerCapability({ type: "charter:vehicle", name: "Shuttle", state: "available" });
  const plan = await runtime.plan({ origin: "A", destination: "B", mode: "emergency", purpose: "Medical transfer" }, [capability.id]);

  await runtime.recordEvent(plan.journeyId, "journey_started", "2026-08-20T12:00:00.000Z");
  await runtime.recordState(plan.journeyId, "active", "2026-08-20T12:01:00.000Z");

  const biography = await runtime.journeyBiography(plan.journeyId);
  const state = await runtime.journeyState(plan.journeyId);

  assert.equal(biography.length, 1);
  assert.equal(biography[0].attributes.eventType, "journey_started");
  assert.equal(state.length, 1);
  assert.equal(state[0].attributes.state, "active");
});
