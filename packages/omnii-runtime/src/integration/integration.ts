export type IntegrationState =
  | "DISCOVERED"
  | "IMPORTED"
  | "QUARANTINED"
  | "TESTING"
  | "ADMITTED"
  | "ACTIVE"
  | "DEGRADED"
  | "REVOKED"
  | "DEPRECATED";

export type IntegrationTrustState =
  | "unknown"
  | "unverified"
  | "quarantined"
  | "trusted"
  | "degraded"
  | "revoked";

export interface IntegrationEndpointRef {
  readonly kind: string;
  readonly id: string;
  readonly namespace?: string;
  readonly name?: string;
}

export interface IntegrationConstraint {
  readonly key: string;
  readonly operator:
    | "eq"
    | "neq"
    | "in"
    | "not-in"
    | "gte"
    | "lte"
    | "contains"
    | "requires";
  readonly value: string | number | boolean | readonly string[];
  readonly reason?: string;
}

export interface IntegrationRecord {
  readonly integrationId: string;
  readonly source: IntegrationEndpointRef;
  readonly target: IntegrationEndpointRef;
  readonly relationship: string;
  readonly protocol: string;
  readonly trustState: IntegrationTrustState;
  readonly authorityRequirements: readonly string[];
  readonly provenance: Readonly<Record<string, unknown>>;
  readonly state: IntegrationState;
  readonly constraints?: readonly IntegrationConstraint[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

function requireNonEmpty(label: string, value: string): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} is required`);
  }
}

export function assertIntegrationRecord(record: IntegrationRecord): void {
  if (!record || typeof record !== "object") {
    throw new Error("integration record is required");
  }
  requireNonEmpty("integrationId", record.integrationId);
  requireNonEmpty("source.kind", record.source?.kind);
  requireNonEmpty("source.id", record.source?.id);
  requireNonEmpty("target.kind", record.target?.kind);
  requireNonEmpty("target.id", record.target?.id);
  requireNonEmpty("relationship", record.relationship);
  requireNonEmpty("protocol", record.protocol);
  if (!Array.isArray(record.authorityRequirements)) {
    throw new Error("authorityRequirements must be an array");
  }
  if (record.authorityRequirements.some((value) => typeof value !== "string" || value.trim() === "")) {
    throw new Error("authorityRequirements entries must be non-empty strings");
  }
  if (!record.provenance || typeof record.provenance !== "object" || Array.isArray(record.provenance)) {
    throw new Error("provenance is required");
  }
  if (Object.keys(record.provenance).length === 0) {
    throw new Error("provenance must not be empty");
  }
}
