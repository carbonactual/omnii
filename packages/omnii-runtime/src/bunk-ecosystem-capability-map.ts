export type BunkEcosystemCapabilityFamily =
  | "IDENTITY"
  | "AUTHORITY"
  | "REGISTRY"
  | "EVIDENCE"
  | "PERSISTENCE"
  | "WORKFLOW"
  | "AGENT"
  | "INTELLIGENCE"
  | "EVENTS"
  | "SECURITY"
  | "OPERATING_CONTEXT"
  | "ECONOMICS"
  | "DISCOVERY"
  | "INTEGRATION";

export interface BunkEcosystemCapability {
  family: BunkEcosystemCapabilityFamily;
  capability: string;
  provider: "OMNII" | "TIP";
}

export const BUNK_ECOSYSTEM_CAPABILITIES: readonly BunkEcosystemCapability[] = [
  { family: "IDENTITY", capability: "identity-and-hapi-context", provider: "OMNII" },
  { family: "AUTHORITY", capability: "seal-and-authority", provider: "OMNII" },
  { family: "REGISTRY", capability: "registries-graph-and-index", provider: "OMNII" },
  { family: "EVIDENCE", capability: "proof-evidence-and-provenance", provider: "OMNII" },
  { family: "PERSISTENCE", capability: "vault-state-and-atlas", provider: "OMNII" },
  { family: "WORKFLOW", capability: "forms-workflows-tasks-and-processes", provider: "OMNII" },
  { family: "AGENT", capability: "agents-routing-and-execution", provider: "OMNII" },
  { family: "INTELLIGENCE", capability: "intelligence-matching-and-scenarios", provider: "OMNII" },
  { family: "EVENTS", capability: "events-pulse-audit-and-reconciliation", provider: "OMNII" },
  { family: "SECURITY", capability: "security-consent-policy-and-controls", provider: "OMNII" },
  { family: "OPERATING_CONTEXT", capability: "canonical-operating-context", provider: "OMNII" },
  { family: "ECONOMICS", capability: "trade-investment-finance-value-markets", provider: "TIP" },
  { family: "DISCOVERY", capability: "search-maps-match-and-discovery", provider: "OMNII" },
  { family: "INTEGRATION", capability: "external-authority-and-service-connectors", provider: "OMNII" },
];

const FORBIDDEN_BUNK_CAPABILITIES = new Set([
  "universal-identity",
  "universal-authority",
  "universal-graph",
  "universal-registry-ontology",
  "universal-persistence",
  "canonical-ledger",
  "canonical-economic-ontology",
]);

export function assertBunkEcosystemCapabilityUse(input: {
  capability: string;
  provider: string;
}): { capability: string; provider: string } {
  if (input.provider === "BUNK" && FORBIDDEN_BUNK_CAPABILITIES.has(input.capability)) {
    throw new Error(`BUNK cannot own ${input.capability}`);
  }
  return input;
}
