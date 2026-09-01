import { randomUUID } from "node:crypto";
import { PersistencePort } from "./persistence";

export type NABPassportState = "research" | "designed" | "ready" | "active" | "expired" | "revoked";

export interface NABPassportProfile {
  state: NABPassportState;
  identityRef: string;
  provenanceRefs: string[];
  issuedBy?: string;
  issuedAt?: string;
  expiresAt?: string;
}

export interface NABTokenizationProfile {
  state: "not-applicable" | "research" | "designed" | "token-ready" | "issuer-pending" | "issued" | "suspended" | "revoked";
  assetOrRightReference: string;
  issuer: string;
  jurisdiction: string;
  regulatedActivity: boolean;
  custody: string;
  settlement: string;
  legalEffect: string;
  tokenStandard?: string;
  contractReference?: string;
  fractionalization?: "not-supported" | "supported" | "lawful-when-authorized";
}

export interface NABAssetCertificationInput {
  assetId: string;
  biographyRefs: string[];
  credentialRefs: string[];
  passport: NABPassportProfile;
  tokenization?: NABTokenizationProfile;
}

export interface NABAssetCertificationRecord extends NABAssetCertificationInput {
  id: string;
  createdAt: string;
}

export class NABCertificationRuntime {
  constructor(private readonly persistence: PersistencePort) {}

  async recordAssetCertification(input: NABAssetCertificationInput): Promise<NABAssetCertificationRecord> {
    const id = `nab-certification:${input.assetId}`;
    const existing = await this.persistence.read("registries", id);
    if (existing) throw new Error(`NAB asset certification ${input.assetId} already registered`);

    if (input.tokenization?.state === "issued") {
      const token = input.tokenization;
      if (!token.issuer.trim() || !token.custody.trim() || !token.settlement.trim() || !token.legalEffect.trim()) {
        throw new Error("NAB issued tokenization requires issuer, custody, settlement, and legalEffect");
      }
    }

    const record: NABAssetCertificationRecord = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await this.persistence.create("registries", {
      id,
      subject_type: "nab_asset_certification",
      ...record,
    });

    return record;
  }

  async getAssetCertification(assetId: string): Promise<NABAssetCertificationRecord | null> {
    const record = await this.persistence.read("registries", `nab-certification:${assetId}`);
    return record ? (record as unknown as NABAssetCertificationRecord) : null;
  }
}
