export const BUNK_PROPERTY_LIFECYCLE_STAGES = [
  "DISCOVERY",
  "IDENTIFICATION",
  "MAPPING",
  "REGISTRATION",
  "TENURE_RIGHTS",
  "EVIDENCE_DUE_DILIGENCE",
  "VALUATION_FEASIBILITY",
  "PLANNING_APPROVAL",
  "ACQUISITION_ASSEMBLY",
  "FINANCE_INVESTMENT",
  "DESIGN_ENGINEERING",
  "PROCUREMENT_CONSTRUCTION",
  "INSPECTION_CERTIFICATION",
  "LISTING_MARKET",
  "MATCH_NEGOTIATION",
  "CONTRACT",
  "SETTLEMENT",
  "OCCUPANCY_USE",
  "OPERATIONS",
  "MAINTENANCE",
  "INSURANCE_TAX_COMPLIANCE",
  "MEASUREMENT_INTELLIGENCE",
  "REFINANCE_REINVESTMENT",
  "TRANSFER_INHERITANCE",
  "REDEVELOPMENT_ADAPTATION",
  "RECOVERY_REUSE_REPURPOSE",
  "RETIRE_PRESERVE_ARCHIVE",
] as const;

export type BunkPropertyLifecycleStage = (typeof BUNK_PROPERTY_LIFECYCLE_STAGES)[number];

export const BUNK_TERMINAL_LIFECYCLE_STAGES = ["RETIRE_PRESERVE_ARCHIVE"] as const;
export type BunkTerminalLifecycleStage = (typeof BUNK_TERMINAL_LIFECYCLE_STAGES)[number];

export interface BunkPropertyLifecycleTransition {
  from: BunkPropertyLifecycleStage;
  to: BunkPropertyLifecycleStage;
  authorityId?: string;
  evidenceIds: string[];
  reason?: string;
}

export const validateBunkPropertyLifecycleTransition = (
  transition: BunkPropertyLifecycleTransition,
): string[] => {
  const errors: string[] = [];
  if (transition.from === "RETIRE_PRESERVE_ARCHIVE" && transition.to !== "RETIRE_PRESERVE_ARCHIVE") {
    errors.push("retired or archived property cannot silently re-enter an active lifecycle stage");
  }
  if (transition.evidenceIds.length === 0) errors.push("property lifecycle transitions require evidence references");
  if (transition.from !== transition.to && !transition.authorityId) {
    errors.push("state-changing property lifecycle transitions require explicit authority");
  }
  return errors;
};

export const assertBunkPropertyLifecycleTransition = (
  transition: BunkPropertyLifecycleTransition,
): BunkPropertyLifecycleTransition => {
  const errors = validateBunkPropertyLifecycleTransition(transition);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return transition;
};
