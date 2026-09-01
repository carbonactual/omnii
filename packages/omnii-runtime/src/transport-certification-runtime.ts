import { randomUUID } from "node:crypto";
import { PersistencePort } from "./persistence";

export type CertificationPresence = "present" | "partial" | "planned" | "unknown";

export type CertificationVerificationMethod =
  | "registry-check"
  | "digital-signature"
  | "verifiable-credential"
  | "decentralized-identifier"
  | "evidence-hash"
  | "telemetry-attestation"
  | "sensor-observation"
  | "inspection"
  | "human-review"
  | "authority-attestation"
  | "automated-test"
  | "safety-case";

export interface VerificationProfile {
  status: "verified" | "partial" | "unverified" | "disputed" | "revoked" | "pending";
  methods: CertificationVerificationMethod[];
  standards: string[];
  issuer: string;
  jurisdiction: string;
  evidenceRefs: string[];
  issuedAt?: string;
  expiresAt?: string;
  verificationPolicy?: string;
}

export type TokenizationState =
  | "not-applicable"
  | "research"
  | "designed"
  | "token-ready"
  | "issuer-pending"
  | "issued"
  | "suspended"
  | "revoked";

export interface TokenizationProfile {
  state: TokenizationState;
  instrumentType: string;
  issuer: string;
  jurisdiction: string;
  regulatedActivity: boolean;
  custody: string;
  settlement: string;
  legalEffect: string;
  tokenStandard?: string;
  contractReference?: string;
  assetOrRightReference?: string;
  fractionalization?: "not-supported" | "supported" | "lawful-when-authorized";
}

export interface FutureCertificationProfile {
  maturity: "operational" | "pilot" | "ready" | "emerging" | "research" | "vision";
  autonomyLevel?: 0 | 1 | 2 | 3 | 4 | 5;
  humanOversight?: "onboard" | "remote-operator" | "remote-operator-required" | "supervisory" | "none";
  safetyCase?: "not-required" | "required" | "submitted" | "approved";
  cybersecurity?: "not-applicable" | "required" | "assessed" | "approved";
  softwareUpdateState?: "not-applicable" | "tracked" | "controlled" | "verified";
  operationalDesignDomain?: string;
}

export interface TransportSurfaceInput {
  id: string;
  name: string;
  role: string;
  architecture: CertificationPresence;
  runtime: CertificationPresence;
  product: CertificationPresence;
  integration: string;
  sourceRefs: string[];
  verification?: VerificationProfile;
  tokenization?: TokenizationProfile;
  future?: FutureCertificationProfile;
}

export interface TransportSurfaceRecord extends TransportSurfaceInput {
  recordId: string;
  createdAt: string;
}

export interface TransportCertificationRecord {
  id: string;
  status: "certified" | "needs-integration" | "not-ready";
  architecture: CertificationPresence;
  runtime: CertificationPresence;
  product: CertificationPresence;
  integration: string;
  sourceRefs: string[];
  verification?: VerificationProfile;
  tokenization?: TokenizationProfile;
  future?: FutureCertificationProfile;
}

export class TransportCertificationRuntime {
  constructor(private readonly persistence: PersistencePort) {}

  async registerSurface(input: TransportSurfaceInput): Promise<TransportSurfaceRecord> {
    const key = `transport-certification:${input.id}`;
    const existing = await this.persistence.read("registries", key);
    if (existing) throw new Error(`Transport surface ${input.id} already registered`);

    const record: TransportSurfaceRecord = {
      ...input,
      recordId: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await this.persistence.create("registries", { id: key, ...record });
    return record;
  }

  async getSurface(id: string): Promise<TransportSurfaceRecord | null> {
    const record = await this.persistence.read("registries", `transport-certification:${id}`);
    return record ? (record as unknown as TransportSurfaceRecord) : null;
  }

  async certify(ids: string[]): Promise<TransportCertificationRecord[]> {
    const result: TransportCertificationRecord[] = [];
    for (const id of ids) {
      const surface = await this.getSurface(id);
      if (!surface) continue;

      const fullyPresent =
        surface.architecture === "present" &&
        surface.runtime === "present" &&
        surface.product === "present" &&
        surface.integration.trim().toLowerCase() === "none";

      result.push({
        id: surface.id,
        status: fullyPresent
          ? "certified"
          : surface.architecture === "present"
            ? "needs-integration"
            : "not-ready",
        architecture: surface.architecture,
        runtime: surface.runtime,
        product: surface.product,
        integration: surface.integration,
        sourceRefs: [...surface.sourceRefs],
        verification: surface.verification,
        tokenization: surface.tokenization,
        future: surface.future,
      });
    }
    return result;
  }
}
