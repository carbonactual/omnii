import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";
export interface OmniiEvent { id: string; type: string; occurred_at: string; recorded_at?: string; actor: string; subject?: string; correlation_id?: string; idempotency_key?: string; outcome?: string; provenance: JsonObject; payload?: JsonObject; }
export class EventStore {
  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}
  async append(input: Omit<OmniiEvent, "id" | "occurred_at" | "recorded_at">): Promise<OmniiEvent> { if (input.idempotency_key) { const existing = await this.persistence.query("events", (record) => record["idempotency_key"] === input.idempotency_key); if (existing.length) return structuredClone(existing[0] as unknown as OmniiEvent); } const event = { ...input, id: randomUUID(), occurred_at: new Date().toISOString(), recorded_at: new Date().toISOString() }; const created = await this.persistence.create("events", event); return structuredClone(created as unknown as OmniiEvent); }
  async get(id: string): Promise<OmniiEvent | undefined> { const event = await this.persistence.read("events", id); return event ? structuredClone(event as unknown as OmniiEvent) : undefined; }
  async bySubject(subject: string): Promise<OmniiEvent[]> { const events = await this.persistence.query("events", (record) => record["subject"] === subject); return events.map((event) => structuredClone(event as unknown as OmniiEvent)); }
  async all(): Promise<OmniiEvent[]> { const events = await this.persistence.query("events"); return events.map((event) => structuredClone(event as unknown as OmniiEvent)); }
}
export function authorize(authority: Authority, operation: string, now = new Date()): void {
  const lifecycle = (authority as Authority & { status?: string }).status;
  if (lifecycle === "revoked" || (authority.revocable && authority.revoked_at)) throw new Error("Authority has been revoked");
  if (lifecycle === "suspended") throw new Error("Authority has been suspended");
  if (lifecycle === "expired" || (authority.expires_at && new Date(authority.expires_at).getTime() <= now.getTime())) throw new Error("Authority has expired");
  if (!authority.capabilities.includes(operation) && !authority.capabilities.includes("*")) throw new Error(`Capability not delegated: ${operation}`);
  if (!authority.scope.includes(operation) && !authority.scope.includes("*")) throw new Error(`Authority scope does not permit: ${operation}`);
}
export type Transition = { from: string; to: string };
export class StateMachine { constructor(private readonly transitions: Transition[]) {} canTransition(from: string, to: string): boolean { return this.transitions.some((transition) => transition.from === from && transition.to === to); } transition(from: string, to: string): string { if (!this.canTransition(from, to)) throw new Error(`Invalid state transition: ${from} -> ${to}`); return to; } }
