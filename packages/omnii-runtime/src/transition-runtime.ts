import { Authority } from "./types";
import { authorize, EventStore, OmniiEvent, StateMachine } from "./event-runtime";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";
export type Command = { id?: string; type: string; actor: string; subject: string; authority: Authority; capability: string; input?: Record<string, unknown>; correlation_id?: string; idempotency_key?: string };
export type Query<T> = () => T;
export type TransitionRequest = { command: Command; from: string; to: string };
export class TransitionRuntime {
  constructor(private readonly events: EventStore, private readonly stateMachine: StateMachine, private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {}
  async execute(request: TransitionRequest): Promise<{ state: string; event: OmniiEvent }> {
    authorize(request.command.authority, request.command.capability);
    const existing = await this.persistence.read("state", request.command.subject);
    const currentVersion = existing?.version ?? "1";
    const persistedState = existing ? String((existing.payload as Record<string, unknown> | undefined)?.["state"] ?? request.from) : request.from;
    if (persistedState !== request.from) throw new Error(`State conflict: expected ${request.from}, found ${persistedState}`);
    const state = this.stateMachine.transition(persistedState, request.to);
    if (!existing) await this.persistence.create("state", { id: request.command.subject, version: "1", lifecycle: "active", authority: request.command.authority, provenance: { source: "TransitionRuntime" }, payload: { state: persistedState } });
    const eventId = request.command.idempotency_key ? `state-event:${request.command.idempotency_key}` : `${request.command.id ?? "state"}:${request.command.subject}:${request.to}`;
    const event = { id: eventId, type: "STATE_TRANSITIONED", actor: request.command.actor, subject: request.command.subject, occurred_at: new Date().toISOString(), recorded_at: new Date().toISOString(), correlation_id: request.command.correlation_id ?? request.command.id ?? eventId, idempotency_key: request.command.idempotency_key, outcome: "success", provenance: { authority_id: request.command.authority.id, command_id: request.command.id ?? null }, payload: { from: request.from, to: request.to, command_type: request.command.type } };
    await this.persistence.stateEvent({ stateId: request.command.subject, expectedVersion: currentVersion, statePatch: { version: String(Number(currentVersion) + 1), payload: { state: request.to }, authority: request.command.authority, provenance: { source: "TransitionRuntime", command_id: request.command.id ?? null } }, event });
    const stored = await this.events.get(eventId);
    return { state, event: stored ?? event };
  }
}
export function executeQuery<T>(query: Query<T>): T { return query(); }
