import { describe, expect, it } from "vitest";
import { MemoryPersistenceAdapter } from "./persistence";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { NABRuntime } from "./nab-runtime";

describe("NABRuntime", () => {
  it("registers a subject and records biography/state", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const objects = new ObjectRuntime(persistence);
    const relationships = new RelationshipRuntime(persistence);
    const nab = new NABRuntime(objects, relationships);

    const subject = await nab.register("vehicle", { make: "Example", model: "One" });
    await nab.appendBiographyEvent({ subjectId: subject.id, type: "registered", occurredAt: "2026-01-01T00:00:00Z", source: "registry" });
    await nab.recordState({ subjectId: subject.id, state: "available", observedAt: "2026-01-01T01:00:00Z", source: "fleet", confidence: "verified" });

    expect((await nab.biography(subject.id)).length).toBe(1);
    expect((await nab.currentState(subject.id))[0]?.attributes["state"]).toBe("available");
  });

  it("rejects biography events for unknown subjects", async () => {
    const persistence = new MemoryPersistenceAdapter();
    const nab = new NABRuntime(new ObjectRuntime(persistence), new RelationshipRuntime(persistence));
    await expect(nab.appendBiographyEvent({ subjectId: "missing", type: "registered", occurredAt: "2026-01-01T00:00:00Z" })).rejects.toThrow("NAB subject not found");
  });
});
