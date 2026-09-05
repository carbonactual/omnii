export interface BunkVerificationRecommendation {
  kind: "RECOMMENDATION";
  propertyId: string;
  evidenceReferences: string[];
  confidence: number;
  recommendation: "VERIFY" | "REVIEW";
}

export interface BunkVerificationAuthority {
  sealReference: string;
}

export interface BunkVerificationResult {
  status: "VERIFIED";
  propertyId: string;
  evidenceReferences: string[];
  authorityReference: string;
  eventType: "BUNK_PROPERTY_VERIFIED";
}

export function evaluateBunkVerification(input: {
  propertyId: string;
  evidenceReferences: string[];
  confidence: number;
}): BunkVerificationRecommendation {
  if (!input.propertyId.trim()) throw new Error("propertyId is required");
  if (!input.evidenceReferences.length) throw new Error("evidence is required");
  if (input.confidence < 0 || input.confidence > 1) throw new Error("confidence must be between 0 and 1");
  return {
    kind: "RECOMMENDATION",
    propertyId: input.propertyId,
    evidenceReferences: [...input.evidenceReferences],
    confidence: input.confidence,
    recommendation: input.confidence >= 0.9 ? "VERIFY" : "REVIEW",
  };
}

export function approveBunkVerification(
  recommendation: BunkVerificationRecommendation,
  authority: BunkVerificationAuthority | null,
): BunkVerificationResult {
  if (!authority?.sealReference?.trim()) throw new Error("explicit authority is required");
  return {
    status: "VERIFIED",
    propertyId: recommendation.propertyId,
    evidenceReferences: recommendation.evidenceReferences,
    authorityReference: authority.sealReference,
    eventType: "BUNK_PROPERTY_VERIFIED",
  };
}

export function rejectBunkVerification(
  recommendation: BunkVerificationRecommendation,
  reason: string,
): { status: "REJECTED"; propertyId: string; reason: string } {
  if (!reason.trim()) throw new Error("rejection reason is required");
  return { status: "REJECTED", propertyId: recommendation.propertyId, reason };
}
