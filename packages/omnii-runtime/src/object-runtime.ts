import { randomUUID } from "node:crypto";
import { CanonicalObject, RuntimeResult } from "./types";
import { assertValid, validateCanonicalObject } from "./validation";

export type ObjectTransition = { from: string; to: string };

export class ObjectRuntime {
  private readonly objects = new Map<string, CanonicalObject>();
  private readonly transitions = new Map<string, ObjectTransition[]>();

  create(input: Omit<CanonicalObject, "id" | "version" | "timestamps"> & Partial<Pick<CanonicalObject, "id" | "version" | "timestamps">>): CanonicalObject {
    const now = new Date().toISOString();
    const object: CanonicalObject = {
      ...input,
      id: input.id ?? randomUUID(),
      version: input.version ?? "1",
      timestamps: input.timestamps ?? { created_at: now, updated_at: now },
    };
    assertValid(validateCanonicalObject(object));
    if (this.objects.has(object.id)) throw new Error(`Object already exists: ${object.id}`);
    this.objects.set(object.id, structuredClone(object));
    this.transitions.set(object.id, []);
    return structuredClone(object);
  }

  read(id: string): CanonicalObject | undefined {
    const object = this.objects.get(id);
    return object ? structuredClone(object) : undefined;
  }

  update(id: string, patch: Partial<Omit<CanonicalObject, "id">>): CanonicalObject {
    const current = this.objects.get(id);
    if (!current) throw new Error(`Object not found: ${id}`);
    const updated = { ...current, ...patch, id, timestamps: { ...current.timestamps, updated_at: new Date().toISOString() } };
    assertValid(validateCanonicalObject(updated));
    this.objects.set(id, structuredClone(updated));
    return structuredClone(updated);
  }

  validate(id: string) {
    const object = this.objects.get(id);
    if (!object) return { valid: false, errors: [`Object not found: ${id}`] };
    return validateCanonicalObject(object);
  }

  transition(id: string, to: string): RuntimeResult<CanonicalObject> {
    const current = this.objects.get(id);
    if (!current) throw new Error(`Object not found: ${id}`);
    if (!to) throw new Error("Transition target is required");
    const transitions = this.transitions.get(id) ?? [];
    transitions.push({ from: current.status, to });
    const updated = this.update(id, { status: to });
    this.transitions.set(id, transitions);
    return { value: updated, eventIds: [] };
  }

  archive(id: string): CanonicalObject {
    return this.update(id, { status: "archived" });
  }

  list(): CanonicalObject[] {
    return [...this.objects.values()].map((object) => structuredClone(object));
  }
}
