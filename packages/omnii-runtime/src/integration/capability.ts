import type { IdentityRef } from "./identity.js";
import type { ResolutionResult } from "./resolution.js";
import type { IntegrationState } from "./integration.js";

export interface CapabilityPermission {
  readonly action: string;
  readonly resource?: string;
  readonly effect: "allow" | "deny";
}

export interface CapabilityDependency {
  readonly capabilityId: string;
  readonly versionRange?: string;
  readonly optional?: boolean;
}

export interface CapabilityTrustProfile {
  readonly state: "unknown" | "quarantined" | "testing" | "admitted" | "degraded" | "revoked";
  readonly evidenceRefs: readonly string[];
  readonly lastCheckedAt?: string;
  readonly findings?: readonly string[];
}

export interface CapabilityImplementation {
  readonly implementationId: string;
  readonly provider: IdentityRef | string;
  readonly protocol: string;
  readonly version: string;
  readonly endpoint?: string;
  readonly license?: string;
  readonly maintainer?: string;
  readonly dependencies?: readonly CapabilityDependency[];
  readonly permissions?: readonly CapabilityPermission[];
  readonly dataBoundary?: readonly string[];
  readonly jurisdiction?: readonly string[];
  readonly provenance?: Readonly<Record<string, unknown>>;
  readonly sbomRef?: string;
  readonly trust?: CapabilityTrustProfile;
  readonly quality?: number;
  readonly reliability?: number;
  readonly latencyMs?: number;
  readonly cost?: number;
  readonly valueScore?: number;
  readonly fallbackSetId?: string;
  readonly revocable?: boolean;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface CapabilitySubstitutionSet {
  readonly substitutionSetId: string;
  readonly capabilityId: string;
  readonly implementationIds: readonly string[];
  readonly policy?: Readonly<Record<string, unknown>>;
}

export interface CapabilityCard {
  readonly capabilityId: string;
  readonly name: string;
  readonly description?: string;
  readonly version: string;
  readonly implementations: readonly CapabilityImplementation[];
  readonly requiredPermissions?: readonly CapabilityPermission[];
  readonly dependencies?: readonly CapabilityDependency[];
  readonly substitutionSets?: readonly CapabilitySubstitutionSet[];
  readonly registryVersion?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface CapabilityRegistryEntry {
  readonly capabilityId: string;
  readonly card: CapabilityCard;
  readonly integrations: readonly string[];
  readonly status: IntegrationState;
  readonly identityRefs?: readonly IdentityRef[];
  readonly resolutionRefs?: readonly ResolutionResult[];
}

export interface CapabilityAdmissionInput {
  readonly card: CapabilityCard;
  readonly licenseChecked: boolean;
  readonly securityChecked: boolean;
  readonly sbomChecked: boolean;
  readonly provenanceVerified: boolean;
  readonly sandboxPassed: boolean;
  readonly capabilityTestPassed: boolean;
  readonly pulseTestPassed: boolean;
  readonly policyApproved: boolean;
  readonly sealRequired?: boolean;
  readonly sealApproved?: boolean;
  readonly evidenceRefs: readonly string[];
}

export interface TrustFinding {
  readonly gate: string;
  readonly severity: "info" | "low" | "medium" | "high" | "critical";
  readonly message: string;
  readonly evidenceRef?: string;
}

export interface AdmissionDecision {
  readonly admitted: boolean;
  readonly state: "QUARANTINED" | "TESTING" | "ADMITTED";
  readonly completedGates: readonly string[];
  readonly findings: readonly TrustFinding[];
  readonly evidenceRefs: readonly string[];
}

export function deriveCapabilityId(name: string, version: string): string {
  const normalizedName = name.trim().normalize("NFC").toLowerCase();
  const normalizedVersion = version.trim().normalize("NFC");
  if (!normalizedName || !normalizedVersion) throw new Error("capability name and version are required");
  return `capability:${normalizedName}@${normalizedVersion}`;
}

export function assertCapabilityCard(card: CapabilityCard): void {
  if (!card.capabilityId || !card.name || !card.version) throw new Error("capability identity is required");
  if (!Array.isArray(card.implementations) || card.implementations.length === 0) {
    throw new Error("capability requires at least one implementation");
  }
  const seen = new Set<string>();
  for (const implementation of card.implementations) {
    if (!implementation.implementationId || !implementation.protocol || !implementation.version) {
      throw new Error("implementation identity, protocol, and version are required");
    }
    if (seen.has(implementation.implementationId)) throw new Error("duplicate implementationId");
    seen.add(implementation.implementationId);
  }
}

export function evaluateCapabilityAdmission(input: CapabilityAdmissionInput): AdmissionDecision {
  assertCapabilityCard(input.card);
  const gates: Array<[string, boolean]> = [
    ["LICENSE", input.licenseChecked],
    ["SECURITY", input.securityChecked],
    ["SBOM", input.sbomChecked],
    ["PROVENANCE", input.provenanceVerified],
    ["SANDBOX", input.sandboxPassed],
    ["CAPABILITY_TEST", input.capabilityTestPassed],
    ["PULSE_TEST", input.pulseTestPassed],
    ["POLICY", input.policyApproved],
  ];
  if (input.sealRequired) gates.push(["SEAL", input.sealApproved === true]);
  const completedGates = gates.filter(([, passed]) => passed).map(([name]) => name);
  const failed = gates.filter(([, passed]) => !passed).map(([name]) => ({
    gate: name,
    severity: name === "SECURITY" ? "high" as const : "medium" as const,
    message: `${name} gate not satisfied`,
  }));
  return {
    admitted: failed.length === 0,
    state: failed.length === 0 ? "ADMITTED" : completedGates.length === 0 ? "QUARANTINED" : "TESTING",
    completedGates,
    findings: failed,
    evidenceRefs: [...input.evidenceRefs],
  };
}
