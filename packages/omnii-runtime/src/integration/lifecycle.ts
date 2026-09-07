import type { IntegrationState } from "./integration.js";

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
