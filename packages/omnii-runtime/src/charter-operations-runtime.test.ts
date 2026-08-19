import { describe, expect, it } from "vitest";
import { CharterOperationsRuntime } from "./charter-operations-runtime";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

const authority = { scope: ["movement"], capabilities: ["operate"] };
const provenance = { source: "test" };

async function object(runtime: ObjectRuntime, type: string, metadata: Record<string, unknown> = {}) {
  return runtime.create({ type, status: "active", identity: {}, provenance, authority, attributes: {}, relationships: [], dependencies: [], capabilities: [], resources: [], metadata });
}

describe("CharterOperationsRuntime", () => {
  it("assigns an available capability", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const objects = new ObjectRuntime(persistence);
    const relationships = new RelationshipRuntime(persistence);
    const operations = new CharterOperationsRuntime(objects, relationships);
    const journey = await object(objects, "journey");
    const capability = await object(objects, "movement_capability", { movement: { availability: "available", mode: "road" } });
    const result = await operations.assign({ capabilityId: capability.id, journeyId: journey.id, personnelIds: [], status: "assigned" });
    expect(result.value.status).toBe("assigned");
    expect(result.eventIds).toHaveLength(1);
  });

  it("rejects unavailable capabilities", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const objects = new ObjectRuntime(persistence);
    const relationships = new RelationshipRuntime(persistence);
    const operations = new CharterOperationsRuntime(objects, relationships);
    const journey = await object(objects, "journey");
    const capability = await object(objects, "movement_capability", { movement: { availability: "maintenance", mode: "road" } });
    await expect(operations.assign({ capabilityId: capability.id, journeyId: journey.id, personnelIds: [], status: "assigned" })).rejects.toThrow("not assignable");
  });

  it("recomposes a failed journey with an available replacement", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const objects = new ObjectRuntime(persistence);
    const relationships = new RelationshipRuntime(persistence);
    const operations = new CharterOperationsRuntime(objects, relationships);
    const journey = await object(objects, "journey");
    const replacement = await object(objects, "movement_capability", { movement: { availability: "available", mode: "road" } });
    const result = await operations.recover({ journeyId: journey.id, status: "detected" }, replacement.id);
    expect(result.status).toBe("recomposed");
    expect(result.replacementCapabilityId).toBe(replacement.id);
  });
});
