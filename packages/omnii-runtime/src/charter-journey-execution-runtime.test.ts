import { describe, expect, it } from "vitest";
import { CharterJourneyExecutionRuntime } from "./charter-journey-execution-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

describe("CharterJourneyExecutionRuntime", () => {
  it("tracks journey progress and exceptions", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const objects = new ObjectRuntime(persistence);
    const relationships = new RelationshipRuntime(persistence);
    const runtime = new CharterJourneyExecutionRuntime(objects, relationships);
    const journey = await objects.create({ type: "journey", status: "active", identity: {}, provenance: { source: "test" }, authority: { scope: ["movement"], capabilities: ["operate"] }, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
    const leg = await objects.create({ type: "journey_leg", status: "active", identity: {}, provenance: { source: "test" }, authority: { scope: ["movement"], capabilities: ["operate"] }, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata: {} });
    let state = await runtime.start(journey.id);
    state = await runtime.progress(state, leg.id);
    expect(state.currentLeg).toBe(leg.id);
    state = await runtime.completeLeg(state, leg.id);
    expect(state.completedLegs).toContain(leg.id);
    state = runtime.delay(state, "connection delay");
    expect(state.state).toBe("delayed");
    state = runtime.finish(state);
    expect(state.state).toBe("completed");
  });
});
