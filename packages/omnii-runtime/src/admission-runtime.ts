import type { JsonObject } from "./types";

export type AdmissionStatus = "admitted" | "reused" | "blocked";
export type AdmissionReason =
  | "unknown_object"
  | "verification_required"
  | "canonical_identity_required"
  | "object_revoked";

export interface AdmissionCandidate {
  id: string;
  kind: string;
  canonicalId?: string;
  known: boolean;
  verified: boolean;
  revoked?: boolean;
  provenance: JsonObject;
}

export interface AdmissionResult {
  status: AdmissionStatus;
  candidateId: string;
  canonicalId?: string;
  reason?: AdmissionReason;
}

export interface AdmissionRuntimeOptions {
  existingCanonicalIds?: ReadonlySet<string>;
}

export class AdmissionRuntime {
  private readonly existingCanonicalIds: Set<string>;

  constructor(options: AdmissionRuntimeOptions = {}) {
    this.existingCanonicalIds = new Set(options.existingCanonicalIds ?? []);
  }

  admit(candidate: AdmissionCandidate): AdmissionResult {
    if (candidate.revoked === true) {
      return { status: "blocked", candidateId: candidate.id, reason: "object_revoked" };
    }
    if (!candidate.known) {
      return { status: "blocked", candidateId: candidate.id, reason: "unknown_object" };
    }
    if (!candidate.verified) {
      return { status: "blocked", candidateId: candidate.id, reason: "verification_required" };
    }
    if (!candidate.canonicalId) {
      return { status: "blocked", candidateId: candidate.id, reason: "canonical_identity_required" };
    }
    if (this.existingCanonicalIds.has(candidate.canonicalId)) {
      return { status: "reused", candidateId: candidate.id, canonicalId: candidate.canonicalId };
    }
    this.existingCanonicalIds.add(candidate.canonicalId);
    return { status: "admitted", candidateId: candidate.id, canonicalId: candidate.canonicalId };
  }
}
