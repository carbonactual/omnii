export const BUNK_PROPERTY_INTELLIGENCE_DIMENSIONS = [
  "LOCATION",
  "TITLE_TENURE_RIGHTS",
  "EVIDENCE_PROVENANCE",
  "PHYSICAL_CONDITION",
  "DEVELOPMENT_POTENTIAL",
  "MARKET",
  "FINANCIAL",
  "ENVIRONMENT",
  "OPERATIONS",
  "MAINTENANCE",
  "PARTICIPANTS",
  "REPUTATION",
  "RISK",
  "LIFECYCLE",
] as const;

export type BunkPropertyIntelligenceDimension = (typeof BUNK_PROPERTY_INTELLIGENCE_DIMENSIONS)[number];

export interface BunkPropertyIntelligenceObservation {
  propertyId: string;
  dimension: BunkPropertyIntelligenceDimension;
  claim: string;
  sourceReference: string;
  observedAt: string;
  confidence: number;
  authorityReference?: string;
  validUntil?: string;
}

export const validateBunkPropertyIntelligenceObservation = (
  observation: BunkPropertyIntelligenceObservation,
): string[] => {
  const errors: string[] = [];
  if (!observation.propertyId.trim()) errors.push("propertyId is required");
  if (!observation.claim.trim()) errors.push("claim is required");
  if (!observation.sourceReference.trim()) errors.push("sourceReference is required");
  if (!observation.observedAt.trim()) errors.push("observedAt is required");
  if (!Number.isFinite(observation.confidence) || observation.confidence < 0 || observation.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }
  return errors;
};

export const assertBunkPropertyIntelligenceObservation = (
  observation: BunkPropertyIntelligenceObservation,
): BunkPropertyIntelligenceObservation => {
  const errors = validateBunkPropertyIntelligenceObservation(observation);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return observation;
};
