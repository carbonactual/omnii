import { describe, expect, it } from "vitest";
import { EventEngine, normalizeEventInput } from "./event-engine";
import { MemoryPersistenceAdapter } from "./persistence";

const input = {
  event_type: "ORDER_CREATED",
  event_version: "1",
  schema_version: "1",
  lifecycle: "active",
  status: "accepted",
  occurred_at: "2026-09-07T18:00:00.000Z",
  actor_ref: "person:1",
  subject_ref: "order:1",
  correlation_id: "order:1",
  reality_state: "actual" as const,
  source: "test",
  provenance: { source: "unit-test" },
  evidence_refs: ["evidence:1"],
  metadata: { channel: "api" },
  payload: { type: "ORDER_CREATED", amount: 25 },
  idempotency_key: "order-created:1",
};

describe("Event Engine", () => {
  it("normalizes a canonical envelope and mirrors payload.type", () => {
    const event = normalizeEventInput({ ...input, payload: { amount: 25 } });
    expect(event.id).toBeTruthy();
    expect(event.payload.type).toBe("ORDER_CREATED");
    expect(event.recorded_at).toBeTruthy();
    expect(event.event_hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects payload.type that disagrees with event_type", () => {
    expect(() => normalizeEventInput({ ...input, payload: { type: "WRONG" } })).toThrow("payload.type must equal event_type");
  });

  it("returns the original event on idempotent replay", async () => {
    const engine = new EventEngine(new MemoryPersistenceAdapter());
    const first = await engine.append(input);
    const second = await engine.append({ ...input, id: "different-id" });
    expect(second.id).toBe(first.id);
    expect(second.event_hash).toBe(first.event_hash);
  });

  it("rejects an idempotency key reused with different contents", async () => {
    const engine = new EventEngine(new MemoryPersistenceAdapter());
    await engine.append(input);
    await expect(engine.append({ ...input, payload: { type: "ORDER_CREATED", amount: 99 } })).rejects.toThrow("omnii_event_idempotency_conflict");
  });

  it("maps runtime signals without losing actor, subject, context or source", async () => {
    const engine = new EventEngine(new MemoryPersistenceAdapter());
    const event = await engine.appendSignal({
      id: "signal:1",
      receivedAt: "2026-09-07T18:01:00.000Z",
      source: "device",
      eventType: "TEMPERATURE_OBSERVED",
      payload: { value: 29 },
      correlationId: "room:1",
      idempotencyKey: "temperature:1",
      operatingContextId: "context:1",
      actorId: "sensor:1",
      subjectId: "room:1",
      institutionId: "facility:1",
      domain: "environment",
      location: { lat: 9, lng: 7 },
      provenance: { source: "sensor" },
    });
    expect(event.actor_ref).toBe("sensor:1");
    expect(event.subject_ref).toBe("room:1");
    expect(event.institution_ref).toBe("facility:1");
    expect(event.operating_context_id).toBe("context:1");
    expect(event.reality_state).toBe("observed");
    expect(event.metadata.domain).toBe("environment");
  });

  it("queries and replays deterministically", async () => {
    const engine = new EventEngine(new MemoryPersistenceAdapter());
    await engine.append({ ...input, idempotency_key: "later", occurred_at: "2026-09-07T18:02:00.000Z", payload: { type: "ORDER_CREATED", seq: 2 } });
    await engine.append({ ...input, idempotency_key: "earlier", occurred_at: "2026-09-07T18:01:00.000Z", payload: { type: "ORDER_CREATED", seq: 1 } });
    const seen: number[] = [];
    const count = await engine.replay((event) => seen.push(Number(event.payload.seq)), { query: { correlation_id: "order:1" } });
    expect(count).toBe(2);
    expect(seen).toEqual([1, 2]);
  });

  it("uses unknown reality as the safe default when reading legacy records", async () => {
    const persistence = new MemoryPersistenceAdapter();
    await persistence.create("events", {
      id: "legacy:1",
      version: "1",
      lifecycle: "active",
      authority: {},
      provenance: {},
      payload: { type: "LEGACY" },
      correlation_id: "legacy:1",
      idempotency_key: "legacy:1",
      created_at: "2026-09-07T18:00:00.000Z",
    });
    const engine = new EventEngine(persistence);
    const legacy = await engine.get("legacy:1");
    expect(legacy?.reality_state).toBe("unknown");
    expect(legacy?.event_type).toBe("LEGACY");
  });
});
