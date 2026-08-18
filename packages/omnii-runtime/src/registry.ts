import { JsonObject, ValidationResult } from "./types";
import { MemoryPersistenceAdapter, PersistencePort, PersistenceRecord } from "./persistence";

export interface RegistryRecord { id: string; version: string; status: string; authority: JsonObject; provenance: JsonObject; metadata?: JsonObject; }
export interface RegistryAuditEntry { operation: "register" | "resolve" | "lookup" | "version" | "deprecate" | "audit"; recordId: string; occurred_at: string; actor: string; authority: JsonObject; }

const asPersistenceRecord = (value: unknown): PersistenceRecord => value as PersistenceRecord;

export class Registry<T extends RegistryRecord> {
  constructor(private readonly name: string, private readonly validateRecord: (record: T) => ValidationResult, private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async register(record: T, actor: string): Promise<T> { const validation = this.validateRecord(record); if (!validation.valid) throw new Error(`${this.name}: invalid record: ${validation.errors.join("; ")}`); const created = await this.persistence.create("registries", asPersistenceRecord({ ...record, registry_type: this.name, audit_actor: actor })); return structuredClone(created as unknown as T); }
  async resolve(id: string, _actor = "runtime"): Promise<T | undefined> { const record = await this.persistence.read("registries", id); return record ? structuredClone(record as unknown as T) : undefined; }
  async lookup(predicate: (record: T) => boolean, _actor = "runtime"): Promise<T[]> { const records = await this.persistence.query("registries", (record) => record["registry_type"] === this.name && predicate(record as unknown as T)); return records.map((record) => structuredClone(record as unknown as T)); }
  async version(id: string, version: string, actor: string): Promise<T> { const record = await this.resolve(id, actor); if (!record) throw new Error(`${this.name}: record not found: ${id}`); const updated = { ...record, version }; const validation = this.validateRecord(updated); if (!validation.valid) throw new Error(`${this.name}: invalid versioned record: ${validation.errors.join("; ")}`); const persisted = await this.persistence.update("registries", id, asPersistenceRecord({ ...updated, registry_type: this.name, audit_actor: actor })); return structuredClone(persisted as unknown as T); }
  async deprecate(id: string, actor: string): Promise<T> { const record = await this.resolve(id, actor); if (!record) throw new Error(`${this.name}: record not found: ${id}`); const persisted = await this.persistence.update("registries", id, asPersistenceRecord({ ...record, status: "deprecated", registry_type: this.name, audit_actor: actor })); return structuredClone(persisted as unknown as T); }
  async audit(operation: RegistryAuditEntry["operation"], record: T, actor: string): Promise<void> { await this.persistence.create("audit", asPersistenceRecord({ id: `${this.name}:${operation}:${record.id}:${Date.now()}`, operation, recordId: record.id, occurred_at: new Date().toISOString(), actor, authority: structuredClone(record.authority), provenance: structuredClone(record.provenance) })); }
  async auditLog(): Promise<RegistryAuditEntry[]> { const records = await this.persistence.query("audit", (record) => record["recordId"] !== undefined && typeof record["operation"] === "string"); return records.map((record) => ({ operation: record["operation"] as RegistryAuditEntry["operation"], recordId: String(record["recordId"]), occurred_at: String(record["occurred_at"]), actor: String(record["actor"]), authority: structuredClone(record["authority"] as JsonObject) })); }
}
