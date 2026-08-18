import { randomUUID } from "node:crypto";
import { JsonObject } from "./types";
import { EventStore } from "./event-runtime";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

export interface AuditRecord {
  id: string;
  who: string;
  what: string;
  why: string;
  authority: string;
  capability: string;
  resource: string[];
  when: string;
  object: string;
  result: string;
  metadata?: JsonObject;
}

export class AuditRuntime {
  constructor(private readonly events: EventStore, private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async record(input: Omit<AuditRecord, "id" | "when">): Promise<AuditRecord> {
    const record: AuditRecord = { ...input, id: randomUUID(), when: new Date().toISOString() };
    const created = await this.persistence.create("audit", record);
    await this.events.append({ type: "AUDIT_RECORDED", actor: record.who, subject: record.object, outcome: record.result, provenance: { audit_id: record.id, authority_id: record.authority }, payload: record as unknown as JsonObject, idempotency_key: `audit:${record.id}` });
    return structuredClone(created as unknown as AuditRecord);
  }

  async byObject(object: string): Promise<AuditRecord[]> {
    const records = await this.persistence.query("audit", (record) => record["object"] === object);
    return records.map((record) => structuredClone(record as unknown as AuditRecord));
  }

  async all(): Promise<AuditRecord[]> {
    const records = await this.persistence.query("audit");
    return records.map((record) => structuredClone(record as unknown as AuditRecord));
  }
}
