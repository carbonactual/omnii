export interface BunkOperationalAction {
  propertyId: string;
  action: string;
  formSubmissionId: string;
  evidenceReferences?: string[];
  authorityReference?: string;
  operatingContextId?: string;
  economicIntent?: { capability: string; intentType: string };
}

export interface BunkOperationalResult {
  nextState: string;
  requiredActions: string[];
  eventType: string;
  economicRoute: "NONE" | "TIP";
}

export function resolveBunkOperationalAction(input: BunkOperationalAction): BunkOperationalResult {
  if (!input.propertyId.trim()) throw new Error("propertyId is required");
  if (!input.formSubmissionId.trim()) throw new Error("formSubmissionId is required");
  if (!input.evidenceReferences?.length) throw new Error("evidence is required");

  const economic = Boolean(input.economicIntent);
  if (economic && input.economicIntent!.capability !== "TIP:TRADE") {
    throw new Error("BUNK economic actions must route through TIP");
  }

  if (economic) {
    return {
      nextState: "ECONOMIC_REVIEW",
      requiredActions: ["REVIEW_EVIDENCE", "ECONOMIC_REVIEW", "TIP_EXECUTION_WHEN_AUTHORIZED"],
      eventType: "BUNK_ECONOMIC_ACTION_REQUESTED",
      economicRoute: "TIP",
    };
  }

  return {
    nextState: "REVIEW",
    requiredActions: ["REVIEW_EVIDENCE", "AUTHORITY_CHECK"],
    eventType: input.action === "VERIFY_PROPERTY" ? "BUNK_PROPERTY_VERIFICATION_REQUESTED" : "BUNK_ACTION_REQUESTED",
    economicRoute: "NONE",
  };
}
