import { randomUUID } from "node:crypto";
import { Relationship, RuntimeResult } from "./types";
import { assertValid, validateRelationship } from "./validation";

export class RelationshipRuntime {
  private readonly relationships = new Map<string, Relationship>();

  create(input: Omit<Relationship, "id"> & Partial<Pick<Relationship, "id">>): Relationship {
    const relationship: Relationship = { ...input, id: input.id ?? randomUUID() };
    assertValid(validateRelationship(relationship));
    if (this.relationships.has(relationship.id)) throw new Error(`Relationship already exists: ${relationship.id}`);
    this.relationships.set(relationship.id, structuredClone(relationship));
    return structuredClone(relationship);
  }

  read(id: string): Relationship | undefined {
    const relationship = this.relationships.get(id);
    return relationship ? structuredClone(relationship) : undefined;
  }

  update(id: string, patch: Partial<Omit<Relationship, "id">>): Relationship {
    const current = this.relationships.get(id);
    if (!current) throw new Error(`Relationship not found: ${id}`);
    const updated = { ...current, ...patch, id };
    assertValid(validateRelationship(updated));
    this.relationships.set(id, structuredClone(updated));
    return structuredClone(updated);
  }

  validate(id: string) {
    const relationship = this.relationships.get(id);
    if (!relationship) return { valid: false, errors: [`Relationship not found: ${id}`] };
    return validateRelationship(relationship);
  }

  traverse(source: string, relationshipType?: string): Relationship[] {
    return [...this.relationships.values()]
      .filter((r) => r.source === source && (!relationshipType || r.type === relationshipType))
      .map((r) => structuredClone(r));
  }

  retire(id: string): Relationship {
    return this.update(id, { status: "retired" });
  }

  list(): Relationship[] {
    return [...this.relationships.values()].map((r) => structuredClone(r));
  }
}
