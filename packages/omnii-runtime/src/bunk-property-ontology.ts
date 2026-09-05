export const BUNK_PROPERTY_CATEGORIES = [
  "LAND",
  "BUILDING",
  "UNIT",
  "INFRASTRUCTURE",
  "FIXTURE",
  "PERSONAL_PROPERTY",
  "PROPERTY_RIGHT",
  "TENURE",
  "ACCESS_RIGHT",
  "TEMPORAL_RIGHT",
  "SPATIAL_RIGHT",
  "BURIAL_RIGHT",
  "NATURAL_ASSET",
  "ECOLOGICAL_INTEREST",
  "BIOLOGICAL_RESOURCE",
  "CULTURAL_PROPERTY",
  "INTANGIBLE_PROPERTY",
  "DIGITAL_PROPERTY",
  "FINANCIAL_PROPERTY_INTEREST",
  "DEVELOPMENT_INTEREST",
  "CAPACITY_INTEREST",
  "SPACE_ASSET",
  "EXTRATERRESTRIAL_RESOURCE",
  "UNKNOWN_PROPERTY_CANDIDATE",
] as const;

export type BunkPropertyCategory = (typeof BUNK_PROPERTY_CATEGORIES)[number];

export const BUNK_PROPERTY_MATURITY = ["historical", "current", "emerging", "futuristic", "frontier", "unknown"] as const;
export type BunkPropertyMaturity = (typeof BUNK_PROPERTY_MATURITY)[number];

export const BUNK_PROPERTY_LEGAL_STATUS = [
  "unknown",
  "not_assessed",
  "recognized",
  "restricted",
  "prohibited",
  "disputed",
] as const;
export type BunkPropertyLegalStatus = (typeof BUNK_PROPERTY_LEGAL_STATUS)[number];

export const BUNK_PROPERTY_AUTHORITY_STATUS = ["unknown", "unverified", "authorized", "restricted", "revoked"] as const;
export type BunkPropertyAuthorityStatus = (typeof BUNK_PROPERTY_AUTHORITY_STATUS)[number];

export const BUNK_PROPERTY_EVIDENCE_STATUS = ["none", "partial", "substantial", "complete", "conflicting"] as const;
export type BunkPropertyEvidenceStatus = (typeof BUNK_PROPERTY_EVIDENCE_STATUS)[number];

export const BUNK_PROPERTY_ELIGIBILITY_STATUS = ["unknown", "eligible", "restricted", "ineligible"] as const;
export type BunkPropertyEligibilityStatus = (typeof BUNK_PROPERTY_ELIGIBILITY_STATUS)[number];

export const BUNK_PROPERTY_MARKET_STATUS = ["unknown", "not_listed", "listable", "listed", "trading", "suspended", "retired"] as const;
export type BunkPropertyMarketStatus = (typeof BUNK_PROPERTY_MARKET_STATUS)[number];

export interface BunkPropertyStatus {
  maturity: BunkPropertyMaturity;
  legalStatus: BunkPropertyLegalStatus;
  authorityStatus: BunkPropertyAuthorityStatus;
  evidenceStatus: BunkPropertyEvidenceStatus;
  eligibilityStatus: BunkPropertyEligibilityStatus;
  marketStatus: BunkPropertyMarketStatus;
}

export interface BunkPropertyClassification {
  category: BunkPropertyCategory;
  status: BunkPropertyStatus;
}

export const isUnknownOrFrontierProperty = (classification: BunkPropertyClassification): boolean =>
  classification.category === "UNKNOWN_PROPERTY_CANDIDATE" ||
  classification.status.maturity === "unknown" ||
  classification.status.maturity === "frontier" ||
  classification.status.maturity === "futuristic";

export const validateBunkPropertyClassification = (classification: BunkPropertyClassification): string[] => {
  const errors: string[] = [];

  if (isUnknownOrFrontierProperty(classification)) {
    if (classification.status.authorityStatus === "authorized") {
      errors.push("unknown or frontier property cannot be treated as inherently authorized");
    }
    if (classification.status.eligibilityStatus === "eligible") {
      errors.push("unknown or frontier property cannot derive market eligibility from classification alone");
    }
    if (classification.status.marketStatus === "trading") {
      errors.push("unknown or frontier property cannot derive active trading status from classification alone");
    }
  }

  return errors;
};

export const assertBunkPropertyClassification = (classification: BunkPropertyClassification): BunkPropertyClassification => {
  const errors = validateBunkPropertyClassification(classification);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return classification;
};
