import { JsonObject, ValidationResult } from "./types";

export interface RegistryRecord {
  id: string;
  version: string;
  status: string;
  authority: JsonObject;
  provenance: JsonObject;
  metadata?: JsonObject;
}

export interface RegistryAuditEntry {
  operation: "register" | "resolve" | "lookup" | "version" | "deprecate" | "audit";
  recordId: string;
  occurred_at: string;
  actor: string;
  authority: JsonObject;
}

export class Registry<T extends RegistryRecord> {
  private readonly records = new Map<string, T>();
  private readonly audits: RegistryAuditEntry[] = [];

  constructor(private readonly name: string, private readonly validateRecord: (record: T) => ValidationResult) {}

  register(record: T, actor: string): T {
    const validation = this.validateRecord(record);
    if (!validation.valid) throw new Error(`${this.name}: invalid record: ${validation.errors.join("; ")}`);
    if (this.records.has(record.id)) throw new Error(`${this.name}: record already exists: ${record.id}`);
    this.records.set(record.id, structuredClone(record));
    this.audit("register", record, actor);
    return structuredClone(record);
  }

  resolve(id: string, actor = "runtime"): T | undefined {
    const record = this.records.get(id);
    if (record) this.audit("resolve", record, actor);
    return record ? structuredClone(record) : undefined;
  }

  lookup(predicate: (record: T) => boolean, actor = "runtime"): T[] {
    const records = [...this.records.values()].filter(predicate).map((record) => structuredClone(record));
    for (const record of records) this.audit("lookup", record, actor);
    return records;
  }

  version(id: string, version: string, actor: string): T {
    const record = this.records.get(id);
    if (!record) throw new Error(`${this.name}: record not found: ${id}`);
    const updated = { ...record, version };
    const validation = this.validateRecord(updated);
    if (!validation.valid) throw new Error(`${this.name}: invalid versioned record: ${validation.errors.join("; ")}`);
    this.records.set(id, structuredClone(updated));
    this.audit("version", updated, actor);
    return structuredClone(updated);
  }

  deprecate(id: string, actor: string): T {
    const record = this.records.get(id);
    if (!record) throw new Error(`${this.name}: record not found: ${id}`);
    const updated = { ...record, status: "deprecated" };
    this.records.set(id, structuredClone(updated));
    this.audit("deprecate", updated, actor);
    return structuredClone(updated);
  }

  audit(operation: RegistryAuditEntry["operation"], record: T, actor: string): void {
    this.audits.push({ operation, recordId: record.id, occurred_at: new Date().toISOString(), actor, authority: structuredClone(record.authority) });
  }

  auditLog(): RegistryAuditEntry[] {
    return this.audits.map((entry) => structuredClone(entry));
  }
}
