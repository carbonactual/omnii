export type BunkProductStatus = "CANONICAL" | "DRAFT_CANONICAL" | "EMERGING" | "CANDIDATE" | "DEPRECATED";

export interface BunkProductManifest {
  productId: "BUNK";
  ecosystemId: "OMNII";
  economicFoundationId: "TIP";
  status: BunkProductStatus;
  capabilities: string[];
  requiredOmniiCapabilities: string[];
  delegatedTipCapabilities: string[];
  ownedDomainCapabilities: string[];
  prohibitedDuplicates: string[];
}

export const REQUIRED_BUNK_OMNII_CAPABILITIES = [
  "identity", "authority", "graph", "relationships", "evidence",
  "persistence", "events", "agents", "workflows",
] as const;

export const PROHIBITED_BUNK_DUPLICATES = [
  "universal-identity", "universal-authority", "universal-graph",
  "universal-registry-ontology", "universal-persistence", "canonical-ledger",
  "canonical-economic-ontology",
] as const;

export const BUNK_PRODUCT_MANIFEST: BunkProductManifest = {
  productId: "BUNK",
  ecosystemId: "OMNII",
  economicFoundationId: "TIP",
  status: "CANONICAL",
  capabilities: [
    "discovery", "search", "listings", "wanted-requests", "matching", "property-views",
    "due-diligence", "valuation-feasibility", "inspection", "offers", "negotiation", "agreements",
    "tenancy", "payments", "operations", "maintenance", "vendor-artisan-coordination",
    "property-professionals", "development-workflows", "finance-investment-journeys",
    "portfolio-management", "property-intelligence", "risk-compliance", "recovery-reuse",
    "lifecycle-management",
  ],
  requiredOmniiCapabilities: [...REQUIRED_BUNK_OMNII_CAPABILITIES],
  delegatedTipCapabilities: [
    "trade", "investment", "financing", "collateral", "settlement", "tokenization",
    "insurance-risk-markets", "capacity-usage-markets", "secondary-markets",
  ],
  ownedDomainCapabilities: [
    "property-discovery", "property-listings", "wanted-requests", "property-matching", "property-views",
    "inspection-workflow", "property-offers", "tenancy-workflow", "property-payment-tracking",
    "property-operations", "maintenance", "property-professionals", "property-portfolio",
    "property-intelligence", "property-lifecycle", "recovery-reuse",
  ],
  prohibitedDuplicates: [...PROHIBITED_BUNK_DUPLICATES],
};

const unique = (items: string[]): boolean => new Set(items).size === items.length;

export const validateBunkProductManifest = (manifest: BunkProductManifest): string[] => {
  const errors: string[] = [];

  if (manifest.productId !== "BUNK") errors.push("productId must be BUNK");
  if (manifest.ecosystemId !== "OMNII") errors.push("ecosystemId must be OMNII");
  if (manifest.economicFoundationId !== "TIP") errors.push("economicFoundationId must be TIP");
  if (manifest.status !== "CANONICAL") errors.push("BUNK product manifest must be CANONICAL");

  for (const [label, values] of [
    ["capabilities", manifest.capabilities],
    ["requiredOmniiCapabilities", manifest.requiredOmniiCapabilities],
    ["delegatedTipCapabilities", manifest.delegatedTipCapabilities],
    ["ownedDomainCapabilities", manifest.ownedDomainCapabilities],
    ["prohibitedDuplicates", manifest.prohibitedDuplicates],
  ] as const) {
    if (values.length === 0) errors.push(`${label} must not be empty`);
    if (!unique(values)) errors.push(`${label} must not contain duplicates`);
  }

  for (const required of REQUIRED_BUNK_OMNII_CAPABILITIES) {
    if (!manifest.requiredOmniiCapabilities.includes(required)) {
      errors.push(`missing required OMNII capability: ${required}`);
    }
  }

  for (const prohibited of PROHIBITED_BUNK_DUPLICATES) {
    if (!manifest.prohibitedDuplicates.includes(prohibited)) {
      errors.push(`missing prohibited duplication rule: ${prohibited}`);
    }
  }

  const universalDuplicateTokens = new Set<string>(PROHIBITED_BUNK_DUPLICATES);
  for (const capability of [...manifest.capabilities, ...manifest.ownedDomainCapabilities]) {
    if (universalDuplicateTokens.has(capability)) {
      errors.push(`capability ${capability} must not duplicate universal capability`);
    }
  }

  if (manifest.delegatedTipCapabilities.some((capability) => capability.startsWith("BUNK:"))) {
    errors.push("delegated TIP capabilities must not be declared as BUNK capabilities");
  }

  return errors;
};

export const assertBunkProductConformance = (manifest: BunkProductManifest): BunkProductManifest => {
  const errors = validateBunkProductManifest(manifest);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return manifest;
};

assertBunkProductConformance(BUNK_PRODUCT_MANIFEST);
