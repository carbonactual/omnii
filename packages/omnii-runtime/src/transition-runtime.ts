import { randomUUID } from "node:crypto";
import { Authority, JsonObject } from "./types";
import { authorize, EventStore, OmniiEvent, StateMachine } from "./event-runtime";

export type Command = {
  id?: string;
  type: string;
  actor: string;
  subject: string;
  authority: Authority;
  capability: string;
  input?: JsonObject;
  correlation_id?: string;
};

export type Query<T> = () => T;

export type TransitionRequest = {
  command: Command;
  from: string;
  to: string;
};

export class TransitionRuntime {
  constructor(private readonly events: EventStore, private readonly stateMachine: StateMachine) {}

  execute(request: TransitionRequest): { state: string; event: OmniiEvent } {
    authorize(request.command.authority, request.command.capability);
    const state = this.stateMachine.transition(request.from, request.to);
    const event = this.events.append({
      type: "STATE_TRANSITIONED",
      actor: request.command.actor,
      subject: request.command.subject,
      correlation_id: request.command.correlation_id ?? request.command.id ?? randomUUID(),
      outcome: "success",
      provenance: { authority_id: request.command.authority.id, command_id: request.command.id ?? null },
      payload: { from: request.from, to: request.to, command_type: request.command.type },
    });
    return { state, event };
  }
}

export function executeQuery<T>(query: Query<T>): T {
  return query();
}
