import type { JsonObject } from "./types";

export type AdmissionStatus = "admitted" | "reused" | "blocked";
export type AdmissionReason =
  | "unknown_object"
  | "verification_required"
  | "verification_unavailable"
  | "canonical_identity_required"
  | "object_revoked";

export interface AdmissionCandidate {
  id: string;
  kind: string;
  provenance: JsonObject;
}

export interface AdmissionVerification {
  known: boolean;
  verified: boolean;
  revoked?: boolean;
  canonicalId?: string;
}

export interface AdmissionResult {
  status: AdmissionStatus;
  candidateId: string;
  canonicalId?: string;
  reason?: AdmissionReason;
}

export interface AdmissionRuntimeOptions {
  existingCanonicalIds?: ReadonlySet<string>;
  inspect: (candidate: AdmissionCandidate) => AdmissionVerification | Promise<AdmissionVerification>;
}

export class AdmissionRuntime {
  private readonly existingCanonicalIds: Set<string>;
  private readonly inspect: AdmissionRuntimeOptions["inspect"];

  constructor(options: AdmissionRuntimeOptions) {
    this.existingCanonicalIds = new Set(options.existingCanonicalIds ?? []);
    this.inspect = options.inspect;
  }

  async admit(candidate: AdmissionCandidate): Promise<AdmissionResult> {
    let verification: AdmissionVerification;
    try {
      verification = await this.inspect(candidate);
    } catch {
      return { status: "blocked", candidateId: candidate.id, reason: "verification_unavailable" };
    }

    if (verification.revoked === true) {
      return { status: "blocked", candidateId: candidate.id, reason: "object_revoked" };
    }
    if (!verification.known) {
      return { status: "blocked", candidateId: candidate.id, reason: "unknown_object" };
    }
    if (!verification.verified) {
      return { status: "blocked", candidateId: candidate.id, reason: "verification_required" };
    }
    if (!verification.canonicalId) {
      return { status: "blocked", candidateId: candidate.id, reason: "canonical_identity_required" };
    }
    if (this.existingCanonicalIds.has(verification.canonicalId)) {
      return { status: "reused", candidateId: candidate.id, canonicalId: verification.canonicalId };
    }
    this.existingCanonicalIds.add(verification.canonicalId);
    return { status: "admitted", candidateId: candidate.id, canonicalId: verification.canonicalId };
  }
}
