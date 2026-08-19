import assert from "node:assert/strict";
import test from "node:test";
import { CharterRuntime } from "../src/charter-runtime";
import { MemoryPersistenceAdapter } from "../src/persistence";

test("Charter registers a canonical movement capability", async () => {
  const runtime = new CharterRuntime(new MemoryPersistenceAdapter());
  const capability = await runtime.registerCapability({
    type: "charter:vehicle",
    name: "Door-to-door vehicle",
    location: "origin",
    capacity: 4,
    state: "available",
    capabilities: ["passenger-movement"],
  });

  assert.equal(capability.type, "charter:vehicle");
  assert.equal(capability.status, "available");
  assert.equal(capability.attributes.capacity, 4);
});

test("Charter composes available capabilities into a journey", async () => {
  const runtime = new CharterRuntime(new MemoryPersistenceAdapter());
  const first = await runtime.registerCapability({ type: "charter:vehicle", name: "Pickup", state: "available" });
  const second = await runtime.registerCapability({ type: "charter:rail", name: "Train", state: "available" });

  const plan = await runtime.planJourney(
    { origin: "A", destination: "C", requirements: { accessible: true } },
    [first.id, second.id],
  );

  assert.equal(plan.status, "planned");
  assert.equal(plan.legs.length, 2);
  assert.equal(plan.legs[0].handoffRequired, true);
  assert.equal(plan.legs[1].handoffRequired, false);
});

test("Charter blocks a journey when no usable capability exists", async () => {
  const runtime = new CharterRuntime(new MemoryPersistenceAdapter());
  const unavailable = await runtime.registerCapability({ type: "charter:vehicle", name: "Offline", state: "unavailable" });

  const plan = await runtime.planJourney({ origin: "A", destination: "B" }, [unavailable.id]);

  assert.equal(plan.status, "blocked");
  assert.deepEqual(plan.reasons, ["No usable movement capability was supplied"]);
  assert.equal(plan.legs.length, 0);
});
