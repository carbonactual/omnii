import { randomUUID } from "node:crypto";
import { PersistencePort } from "./persistence";

export type EvidenceLifecycle = "active" | "expired" | "revoked" | "disputed";
export type EvidenceConfidence = "unverified" | "low" | "medium" | "high" | "verified";

export interface TransportEvidenceInput {
  evidenceId: string;
  subjectId: string;
  claim: string;
  source: string;
  method: string;
  standards: string[];
  jurisdiction: string;
  observedAt: string;
  expiresAt?: string;
  integrity: { algorithm: string; digest: string };
  confidence: EvidenceConfidence;
  authorityRef?: string;
  lifecycle: EvidenceLifecycle;
  metadata?: Record<string, unknown>;
}

export interface TransportEvidenceRecord extends TransportEvidenceInput {
  recordId: string;
  createdAt: string;
}

export interface TransportTokenizationInput {
  tokenizationId: string;
  assetOrRightReference: string;
  state: "not-applicable" | "research" | "designed" | "token-ready" | "issuer-pending" | "issued" | "suspended" | "revoked";
  instrumentType: string;
  issuer: string;
  jurisdiction: string;
  regulatedActivity: boolean;
  custody: string;
  settlement: string;
  legalEffect: string;
  tokenStandard?: string;
  contractReference?: string;
  fractionalization?: "not-supported" | "supported" | "lawful-when-authorized";
  evidenceRefs?: string[];
}

export interface TransportTokenizationRecord extends TransportTokenizationInput {
  recordId: string;
  createdAt: string;
}

export class TransportProofRuntime {
  constructor(private readonly persistence: PersistencePort) {}

  async registerEvidence(input: TransportEvidenceInput): Promise<TransportEvidenceRecord> {
    const key = `transport-evidence:${input.evidenceId}`;
    if (await this.persistence.read("events", key)) throw new Error(`Transport evidence ${input.evidenceId} already registered`);
    const record: TransportEvidenceRecord = { ...input, recordId: randomUUID(), createdAt: new Date().toISOString() };
    await this.persistence.create("events", { id: key, ...record });
    return record;
  }

  async getEvidence(evidenceId: string): Promise<TransportEvidenceRecord | null> {
    const record = await this.persistence.read("events", `transport-evidence:${evidenceId}`);
    return record ? (record as unknown as TransportEvidenceRecord) : null;
  }

  async registerTokenization(input: TransportTokenizationInput): Promise<TransportTokenizationRecord> {
    const key = `transport-tokenization:${input.tokenizationId}`;
    if (await this.persistence.read("registries", key)) throw new Error(`Transport tokenization ${input.tokenizationId} already registered`);
    if (input.state === "issued" && (!input.issuer.trim() || !input.custody.trim() || !input.settlement.trim() || !input.legalEffect.trim())) {
      throw new Error("issued tokenization requires issuer, custody, settlement, and legalEffect");
    }
    const record: TransportTokenizationRecord = { ...input, recordId: randomUUID(), createdAt: new Date().toISOString() };
    await this.persistence.create("registries", { id: key, ...record });
    return record;
  }

  async getTokenization(tokenizationId: string): Promise<TransportTokenizationRecord | null> {
    const record = await this.persistence.read("registries", `transport-tokenization:${tokenizationId}`);
    return record ? (record as unknown as TransportTokenizationRecord) : null;
  }
}
