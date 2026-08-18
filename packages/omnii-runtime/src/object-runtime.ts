import { randomUUID } from "node:crypto";
import { CanonicalObject, RuntimeResult } from "./types";
import { assertValid, validateCanonicalObject } from "./validation";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

export type ObjectTransition = { from: string; to: string };

export class ObjectRuntime {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}

  async create(input: Omit<CanonicalObject, "id" | "version" | "timestamps"> & Partial<Pick<CanonicalObject, "id" | "version" | "timestamps">>): Promise<CanonicalObject> {
    const now = new Date().toISOString();
    const object: CanonicalObject = {
      ...input,
      id: input.id ?? randomUUID(),
      version: input.version ?? "1",
      timestamps: input.timestamps ?? { created_at: now, updated_at: now },
    };
    assertValid(validateCanonicalObject(object));
    const created = await this.persistence.create("objects", object);
    return structuredClone(created as unknown as CanonicalObject);
  }

  async read(id: string): Promise<CanonicalObject | undefined> {
    const object = await this.persistence.read("objects", id);
    return object ? structuredClone(object as unknown as CanonicalObject) : undefined;
  }

  async update(id: string, patch: Partial<Omit<CanonicalObject, "id">>, expectedVersion?: string): Promise<CanonicalObject> {
    const current = await this.read(id);
    if (!current) throw new Error(`Object not found: ${id}`);
    if (expectedVersion !== undefined && current.version !== expectedVersion) throw new Error(`Object version conflict: expected ${expectedVersion}, found ${current.version}`);
    const nextVersion = String(Number(current.version) + 1);
    const updated: CanonicalObject = { ...current, ...patch, id, version: nextVersion, timestamps: { ...current.timestamps, updated_at: new Date().toISOString() } };
    assertValid(validateCanonicalObject(updated));
    const persisted = await this.persistence.update("objects", id, updated);
    return structuredClone(persisted as unknown as CanonicalObject);
  }

  async validate(id: string) {
    const object = await this.read(id);
    if (!object) return { valid: false, errors: [`Object not found: ${id}`] };
    return validateCanonicalObject(object);
  }

  async transition(id: string, to: string, expectedVersion?: string): Promise<RuntimeResult<CanonicalObject>> {
    if (!to) throw new Error("Transition target is required");
    const current = await this.read(id);
    if (!current) throw new Error(`Object not found: ${id}`);
    const updated = await this.update(id, { status: to }, expectedVersion ?? current.version);
    return { value: updated, eventIds: [] };
  }

  async archive(id: string, expectedVersion?: string): Promise<CanonicalObject> {
    return this.update(id, { status: "archived" }, expectedVersion);
  }

  async list(): Promise<CanonicalObject[]> {
    const objects = await this.persistence.query("objects");
    return objects.map((object) => structuredClone(object as unknown as CanonicalObject));
  }
}
