import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";

export interface OmniiEvent {
  id: string;
  type: string;
  occurred_at: string;
  recorded_at?: string;
  actor: string;
  subject?: string;
  correlation_id?: string;
  outcome?: string;
  provenance: JsonObject;
  payload?: JsonObject;
}

export class EventStore {
  private readonly events: OmniiEvent[] = [];

  append(input: Omit<OmniiEvent, "id" | "occurred_at" | "recorded_at">): OmniiEvent {
    const event: OmniiEvent = {
      ...input,
      id: randomUUID(),
      occurred_at: new Date().toISOString(),
      recorded_at: new Date().toISOString(),
    };
    this.events.push(structuredClone(event));
    return structuredClone(event);
  }

  get(id: string): OmniiEvent | undefined {
    const event = this.events.find((candidate) => candidate.id === id);
    return event ? structuredClone(event) : undefined;
  }

  bySubject(subject: string): OmniiEvent[] {
    return this.events.filter((event) => event.subject === subject).map((event) => structuredClone(event));
  }

  all(): OmniiEvent[] {
    return this.events.map((event) => structuredClone(event));
  }
}

export function authorize(authority: Authority, operation: string, now = new Date()): void {
  if (authority.revocable && authority.revoked_at) throw new Error("Authority has been revoked");
  if (authority.expires_at && new Date(authority.expires_at).getTime() <= now.getTime()) throw new Error("Authority has expired");
  if (!authority.capabilities.includes(operation) && !authority.capabilities.includes("*")) throw new Error(`Capability not delegated: ${operation}`);
  if (!authority.scope.includes(operation) && !authority.scope.includes("*")) throw new Error(`Authority scope does not permit: ${operation}`);
}

export type Transition = { from: string; to: string };

export class StateMachine {
  constructor(private readonly transitions: Transition[]) {}

  canTransition(from: string, to: string): boolean {
    return this.transitions.some((transition) => transition.from === from && transition.to === to);
  }

  transition(from: string, to: string): string {
    if (!this.canTransition(from, to)) throw new Error(`Invalid state transition: ${from} -> ${to}`);
    return to;
  }
}
