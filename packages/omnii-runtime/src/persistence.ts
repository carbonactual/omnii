export type PersistenceCollection =
  | "objects"
  | "relationships"
  | "dependencies"
  | "registries"
  | "events"
  | "state"
  | "executions"
  | "workflows"
  | "agents"
  | "audit"
  | "ledger";

export interface PersistenceRecord {
  id: string;
  version?: string;
  lifecycle?: string;
  authority?: Record<string, unknown>;
  provenance?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface PersistenceTransaction {
  readonly id: string;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface PersistencePort {
  create(collection: PersistenceCollection, record: PersistenceRecord): Promise<PersistenceRecord>;
  read(collection: PersistenceCollection, id: string): Promise<PersistenceRecord | undefined>;
  update(collection: PersistenceCollection, id: string, patch: Partial<PersistenceRecord>): Promise<PersistenceRecord>;
  archive(collection: PersistenceCollection, id: string): Promise<PersistenceRecord>;
  query(collection: PersistenceCollection, predicate?: (record: PersistenceRecord) => boolean): Promise<PersistenceRecord[]>;
  version(collection: PersistenceCollection, id: string, version: string): Promise<PersistenceRecord>;
  transaction<T>(work: (tx: PersistencePort) => Promise<T>): Promise<T>;
}

export class MemoryPersistenceAdapter implements PersistencePort {
  private readonly stores = new Map<PersistenceCollection, Map<string, PersistenceRecord>>();

  private store(collection: PersistenceCollection) {
    let store = this.stores.get(collection);
    if (!store) {
      store = new Map();
      this.stores.set(collection, store);
    }
    return store;
  }

  async create(collection: PersistenceCollection, record: PersistenceRecord) {
    const store = this.store(collection);
    if (store.has(record.id)) throw new Error(`Persistence record already exists: ${collection}/${record.id}`);
    const copy = structuredClone(record);
    store.set(record.id, copy);
    return structuredClone(copy);
  }

  async read(collection: PersistenceCollection, id: string) {
    const record = this.store(collection).get(id);
    return record ? structuredClone(record) : undefined;
  }

  async update(collection: PersistenceCollection, id: string, patch: Partial<PersistenceRecord>) {
    const store = this.store(collection);
    const current = store.get(id);
    if (!current) throw new Error(`Persistence record not found: ${collection}/${id}`);
    const updated = { ...current, ...structuredClone(patch), id, updated_at: new Date().toISOString() };
    store.set(id, updated);
    return structuredClone(updated);
  }

  async archive(collection: PersistenceCollection, id: string) {
    return this.update(collection, id, { lifecycle: "archived" });
  }

  async query(collection: PersistenceCollection, predicate?: (record: PersistenceRecord) => boolean) {
    const values = [...this.store(collection).values()].map(structuredClone);
    return predicate ? values.filter(predicate) : values;
  }

  async version(collection: PersistenceCollection, id: string, version: string) {
    return this.update(collection, id, { version });
  }

  async transaction<T>(work: (tx: PersistencePort) => Promise<T>) {
    const snapshot = new Map<PersistenceCollection, Map<string, PersistenceRecord>>();
    for (const [collection, records] of this.stores) snapshot.set(collection, new Map([...records].map(([id, record]) => [id, structuredClone(record)])));
    try {
      return await work(this);
    } catch (error) {
      this.stores.clear();
      for (const [collection, records] of snapshot) this.stores.set(collection, records);
      throw error;
    }
  }
}
