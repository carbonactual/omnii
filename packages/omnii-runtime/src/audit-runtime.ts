import { randomUUID } from "node:crypto";
import { JsonObject } from "./types";
import { EventStore } from "./event-runtime";

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
  private readonly records: AuditRecord[] = [];

  constructor(private readonly events: EventStore) {}

  record(input: Omit<AuditRecord, "id" | "when">): AuditRecord {
    const record: AuditRecord = { ...input, id: randomUUID(), when: new Date().toISOString() };
    this.records.push(structuredClone(record));
    this.events.append({ type: "AUDIT_RECORDED", actor: record.who, subject: record.object, outcome: record.result, provenance: { audit_id: record.id, authority_id: record.authority }, payload: record as unknown as JsonObject });
    return structuredClone(record);
  }

  byObject(object: string): AuditRecord[] {
    return this.records.filter((record) => record.object === object).map((record) => structuredClone(record));
  }

  all(): AuditRecord[] {
    return this.records.map((record) => structuredClone(record));
  }
}
