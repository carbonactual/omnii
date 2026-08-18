import { randomUUID } from "node:crypto";
import { JsonObject } from "./types";
import { EventStore } from "./event-runtime";

export interface LedgerEntry {
  id: string;
  transactionReference: string;
  valueReference: string;
  resourceReference?: string;
  contributionReference?: string;
  quantity?: number;
  unit?: string;
  moneyAmount?: number;
  moneyCurrency?: string;
  ownershipReference?: string;
  obligationReference?: string;
  provenance: JsonObject;
  authority: JsonObject;
  recordedAt: string;
}

export class LedgerBoundary {
  private readonly entries = new Map<string, LedgerEntry>();

  constructor(private readonly events: EventStore) {}

  append(input: Omit<LedgerEntry, "id" | "recordedAt">): LedgerEntry {
    const entry: LedgerEntry = { ...input, id: randomUUID(), recordedAt: new Date().toISOString() };
    if (!entry.transactionReference || !entry.valueReference) throw new Error("Ledger entry requires transactionReference and valueReference");
    this.entries.set(entry.id, structuredClone(entry));
    this.events.append({ type: "LEDGER_ENTRY_RECORDED", actor: String(entry.authority["subject"] ?? "unknown"), subject: entry.transactionReference, outcome: "recorded", provenance: entry.provenance, payload: entry as unknown as JsonObject });
    return structuredClone(entry);
  }

  read(id: string): LedgerEntry | undefined {
    const entry = this.entries.get(id);
    return entry ? structuredClone(entry) : undefined;
  }

  byTransaction(transactionReference: string): LedgerEntry[] {
    return [...this.entries.values()].filter((entry) => entry.transactionReference === transactionReference).map((entry) => structuredClone(entry));
  }
}
