export const BUNK_TIP_ECONOMIC_INTENTS = [
  "PROPERTY_SALE",
  "PROPERTY_LEASE",
  "PROPERTY_RENTAL",
  "PROPERTY_SERVICE_MARKET",
  "PROPERTY_FINANCING",
  "PROPERTY_INVESTMENT",
  "PROPERTY_POOLING",
  "PROPERTY_FRACTIONALIZATION",
  "PROPERTY_DECIMALIZATION",
  "PROPERTY_COLLATERAL",
  "PROPERTY_INSURANCE_RISK",
  "PROPERTY_SECONDARY_MARKET",
  "PROPERTY_CAPACITY_USAGE",
  "PROPERTY_TOKENIZATION",
  "PROPERTY_SETTLEMENT",
] as const;

export type BunkTipEconomicIntent = (typeof BUNK_TIP_ECONOMIC_INTENTS)[number];

export interface BunkTipEconomicRequest {
  propertyId: string;
  intent: BunkTipEconomicIntent;
  tipCapability: string;
  authorityId: string;
  jurisdiction: string;
  policyReference: string;
  provenanceReference: string;
}

export const validateBunkTipEconomicRequest = (request: BunkTipEconomicRequest): string[] => {
  const errors: string[] = [];
  for (const [name, value] of Object.entries(request)) {
    if (typeof value !== "string" || value.trim() === "") errors.push(`${name} is required`);
  }
  if (!request.tipCapability.startsWith("TIP:")) errors.push("economic capability must resolve through TIP");
  return errors;
};

export const assertBunkTipEconomicRequest = (request: BunkTipEconomicRequest): BunkTipEconomicRequest => {
  const errors = validateBunkTipEconomicRequest(request);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return request;
};
