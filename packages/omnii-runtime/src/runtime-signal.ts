import { randomUUID } from "node:crypto";
import { JsonObject } from "./types";

export interface RuntimeSignal<T extends JsonObject = JsonObject> {
  id: string;
  receivedAt: string;
  source: string;
  eventType: string;
  payload: T;
  correlationId: string;
  idempotencyKey: string;
  operatingContextId?: string;
  actorId?: string;
  subjectId?: string;
  institutionId?: string;
  domain?: string;
  location?: JsonObject;
  provenance?: JsonObject;
}

export type RuntimeSignalInput<T extends JsonObject = JsonObject> = Omit<RuntimeSignal<T>, "id" | "receivedAt"> & {
  id?: string;
  receivedAt?: string;
};

export function createRuntimeSignal<T extends JsonObject>(input: RuntimeSignalInput<T>): RuntimeSignal<T> {
  if (!input.source) throw new Error("Runtime signal source is required");
  if (!input.eventType) throw new Error("Runtime signal eventType is required");
  if (!input.correlationId) throw new Error("Runtime signal correlationId is required");
  if (!input.idempotencyKey) throw new Error("Runtime signal idempotencyKey is required");

  return {
    ...input,
    id: input.id ?? randomUUID(),
    receivedAt: input.receivedAt ?? new Date().toISOString(),
  };
}

export function signalIdempotencyKey(signal: RuntimeSignal): string {
  return signal.idempotencyKey;
}
