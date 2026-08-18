import { randomUUID } from "node:crypto";
import { Relationship } from "./types";
import { assertValid, validateRelationship } from "./validation";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

export class RelationshipRuntime {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async create(input: Omit<Relationship, "id"> & Partial<Pick<Relationship, "id">>): Promise<Relationship> {
    const relationship = { ...input, id: input.id ?? randomUUID(), version: String((input as unknown as { version?: string }).version ?? "1") } as unknown as Relationship;
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
    const expected = expectedVersion ?? currentVersion;
    if (currentVersion !== expected) throw new Error(`Relationship version conflict: expected ${expected}, found ${currentVersion}`);
    const updated = { ...current, ...patch, id, version: String(Number(currentVersion) + 1) } as unknown as Relationship;
    assertValid(validateRelationship(updated));
    const persisted = await this.persistence.updateIfVersion("relationships", id, expected, updated);
    return structuredClone(persisted as unknown as Relationship);
  }

  async validate(id: string) {
    const relationship = await this.read(id);
    return relationship ? validateRelationship(relationship) : { valid: false, errors: [`Relationship not found: ${id}`] };
  }

  async traverse(source: string, relationshipType?: string): Promise<Relationship[]> {
    const relationships = await this.persistence.query("relationships", (record) => record["source"] === source && (!relationshipType || record["type"] === relationshipType));
    return relationships.map((relationship) => structuredClone(relationship as unknown as Relationship));
  }

  async retire(id: string, expectedVersion?: string): Promise<Relationship> {
    return this.update(id, { status: "retired" }, expectedVersion);
  }

  async list(): Promise<Relationship[]> {
    const relationships = await this.persistence.query("relationships");
    return relationships.map((relationship) => structuredClone(relationship as unknown as Relationship));
  }
}
