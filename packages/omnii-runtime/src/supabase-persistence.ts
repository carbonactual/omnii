import { SupabaseClient } from "@supabase/supabase-js";
import { PersistenceCollection, PersistencePort, PersistenceRecord } from "./persistence";

const TABLES: Record<PersistenceCollection, string> = {
  objects: "omnii_objects",
  relationships: "omnii_relationships",
  dependencies: "omnii_dependencies",
  registries: "omnii_registries",
  events: "omnii_events",
  state: "omnii_state",
  executions: "omnii_executions",
  workflows: "omnii_workflows",
  agents: "omnii_agents",
  audit: "omnii_audit",
  ledger: "omnii_ledger",
};

export class SupabasePersistenceAdapter implements PersistencePort {
  constructor(private readonly client: SupabaseClient) {}

  async create(collection: PersistenceCollection, record: PersistenceRecord) {
    const { data, error } = await this.client.from(TABLES[collection]).insert(record).select("*").single();
    if (error) throw error;
    return data as PersistenceRecord;
  }

  async read(collection: PersistenceCollection, id: string) {
    const { data, error } = await this.client.from(TABLES[collection]).select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? undefined) as PersistenceRecord | undefined;
  }

  async update(collection: PersistenceCollection, id: string, patch: Partial<PersistenceRecord>) {
    const { data, error } = await this.client.from(TABLES[collection]).update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id).select("*").single();
    if (error) throw error;
    return data as PersistenceRecord;
  }

  async archive(collection: PersistenceCollection, id: string) {
    return this.update(collection, id, { lifecycle: "archived" });
  }

  async query(collection: PersistenceCollection, predicate?: (record: PersistenceRecord) => boolean) {
    const { data, error } = await this.client.from(TABLES[collection]).select("*");
    if (error) throw error;
    const records = (data ?? []) as PersistenceRecord[];
    return predicate ? records.filter(predicate) : records;
  }

  async version(collection: PersistenceCollection, id: string, version: string) {
    return this.update(collection, id, { version });
  }

  async transaction<T>(work: (tx: PersistencePort) => Promise<T>): Promise<T> {
    // Supabase/PostgREST does not expose a client-side transaction primitive.
    // Atomic multi-record work must therefore be implemented by a database RPC.
    // This adapter deliberately refuses to imply atomicity it cannot guarantee.
    throw new Error("Durable transaction requires a database RPC; use an explicit transactional operation instead");
  }
}

export { TABLES as OMNII_PERSISTENCE_TABLES };
