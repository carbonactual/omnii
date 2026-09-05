export interface BunkOutcomeProjection {
  propertyId: string;
  actionType: string;
  result: string;
  authorityReference?: string;
  evidenceReferences: string[];
  provenance: { root: "OMNII"; product: "BUNK" };
  pulseEventType: string;
}

export function projectBunkOutcome(input: {
  propertyId: string;
  actionType: string;
  result: string;
  authorityReference?: string;
  evidenceReferences: string[];
}): BunkOutcomeProjection {
  if (!input.propertyId.trim()) throw new Error("propertyId is required");
  if (!input.actionType.trim()) throw new Error("actionType is required");
  if (!input.result.trim()) throw new Error("result is required");
  if (!input.evidenceReferences.length) throw new Error("evidence is required");
  return {
    propertyId: input.propertyId,
    actionType: input.actionType,
    result: input.result,
    authorityReference: input.authorityReference,
    evidenceReferences: [...input.evidenceReferences],
    provenance: { root: "OMNII", product: "BUNK" },
    pulseEventType: `BUNK_${input.actionType === "PROPERTY_VERIFICATION" ? "PROPERTY_VERIFIED" : "ACTION_COMPLETED"}`,
  };
}
