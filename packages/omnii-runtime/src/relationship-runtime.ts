import { randomUUID } from "node:crypto";
import { Relationship } from "./types";
import { assertValid, validateRelationship } from "./validation";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

export class RelationshipRuntime {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async create(input: Omit<Relationship, "id"> & Partial<Pick<Relationship, "id">>): Promise<Relationship> {
    const relationship: Relationship = { ...input, id: input.id ?? randomUUID() };
    assertValid(validateRelationship(relationship));
    const persisted = await this.persistence.create("relationships", relationship);
    return structuredClone(persisted as unknown as Relationship);
  }

  async read(id: string): Promise<Relationship | undefined> {
    const relationship = await this.persistence.read("relationships", id);
    return relationship ? structuredClone(relationship as unknown as Relationship) : undefined;
  }

  async update(id: string, patch: Partial<Omit<Relationship, "id">>, expectedVersion?: string): Promise<Relationship> {
    const current = await this.read(id);
    if (!current) throw new Error(`Relationship not found: ${id}`);
    const currentVersion = String((current as unknown as Record<string, unknown>).version ?? "1");
    if (expectedVersion !== undefined && currentVersion !== expectedVersion) throw new Error(`Relationship version conflict: expected ${expectedVersion}, found ${currentVersion}`);
    const updated = { ...current, ...patch, id, version: String(Number(currentVersion) + 1) };
    assertValid(validateRelationship(updated));
    const persisted = await this.persistence.update("relationships", id, updated as unknown as Record<string, unknown>);
    return structuredClone(persisted as unknown as Relationship);
  }

  async validate(id: string) {
    const relationship = await this.read(id);
    if (!relationship) return { valid: false, errors: [`Relationship not found: ${id}`] };
    return validateRelationship(relationship);
  }

  async traverse(source: string, relationshipType?: string): Promise<Relationship[]> {
    const relationships = await this.persistence.query("relationships", (record) => record["source"] === source && (!relationshipType || record["type"] === relationshipType));
    return relationships.map((relationship) => structuredClone(relationship as unknown as Relationship));
  }

  async retire(id: string): Promise<Relationship> {
    return this.update(id, { status: "retired" });
  }

  async list(): Promise<Relationship[]> {
    const relationships = await this.persistence.query("relationships");
    return relationships.map((relationship) => structuredClone(relationship as unknown as Relationship));
  }
}
