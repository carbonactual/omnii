import type { IntegrationState, IntegrationTrustState } from "./integration.js";

const TRANSITIONS: Readonly<Record<IntegrationState, readonly IntegrationState[]>> = {
  DISCOVERED: ["IMPORTED", "QUARANTINED", "DEPRECATED"],
  IMPORTED: ["QUARANTINED", "TESTING", "DEPRECATED"],
  QUARANTINED: ["TESTING", "REVOKED", "DEPRECATED"],
  TESTING: ["ADMITTED", "QUARANTINED", "REVOKED", "DEPRECATED"],
  ADMITTED: ["ACTIVE", "DEGRADED", "REVOKED", "DEPRECATED"],
  ACTIVE: ["DEGRADED", "REVOKED", "DEPRECATED"],
  DEGRADED: ["ACTIVE", "REVOKED", "DEPRECATED", "TESTING"],
  REVOKED: ["DEPRECATED"],
  DEPRECATED: [],
};

export function isValidIntegrationTransition(
  from: IntegrationState,
  to: IntegrationState,
): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function assertIntegrationTransition(
  from: IntegrationState,
  to: IntegrationState,
): void {
  if (!isValidIntegrationTransition(from, to)) {
    throw new Error(`illegal integration lifecycle transition: ${from} -> ${to}`);
  }
}

export function transitionIntegrationState(
  current: IntegrationState,
  next: IntegrationState,
): IntegrationState {
  assertIntegrationTransition(current, next);
  return next;
}

export const CAPABILITY_ADMISSION_GATES = [
  "DISCOVER",
  "IMPORT",
  "QUARANTINE",
  "LICENSE",
  "SECURITY",
  "SBOM",
  "PROVENANCE",
  "SANDBOX",
  "CAPABILITY_TEST",
  "PULSE_TEST",
  "POLICY",
  "SEAL",
  "ADMIT",
] as const;

export type CapabilityAdmissionGate = (typeof CAPABILITY_ADMISSION_GATES)[number];

export function assertCapabilityAdmissionOrder(
  completed: readonly CapabilityAdmissionGate[],
): void {
  let previous = -1;
  for (const gate of completed) {
    const index = CAPABILITY_ADMISSION_GATES.indexOf(gate);
    if (index <= previous) throw new Error(`invalid capability admission gate order: ${gate}`);
    previous = index;
  }
}

export function degradeTrust(
  current: IntegrationTrustState,
  reason: string,
): { state: IntegrationTrustState; reason: string } {
  if (!reason.trim()) throw new Error("trust degradation reason is required");
  if (current === "revoked") return { state: "revoked", reason };
  if (current === "degraded" || current === "quarantined") return { state: current, reason };
  return { state: "degraded", reason };
}

export function revokeTrust(reason: string): { state: "revoked"; reason: string } {
  if (!reason.trim()) throw new Error("revocation reason is required");
  return { state: "revoked", reason };
}
