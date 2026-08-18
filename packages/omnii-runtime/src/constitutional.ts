export const OMNII_CONSTITUTIONAL_INVARIANTS = {
  canonicalArchitecture: "OMNII",
  movementState: "OMNI",
  orchestrationIntelligence: "ABBA",
  forbiddenOmniRoles: ["repository", "operating-system", "governance", "authority", "runtime", "platform"] as const,
} as const;

export type ConstitutionalLayer =
  | "foundation"
  | "behavioral"
  | "reality"
  | "connection"
  | "coordination"
  | "becoming"
  | "civilization";

export interface ConstitutionalDoctrine {
  id: string;
  title: string;
  layer: ConstitutionalLayer;
  dependsOn: readonly string[];
  status: "materialized" | "proposed" | "implemented";
}

export interface ConstitutionalViolation {
  code: "UNKNOWN_DEPENDENCY" | "DEPENDENCY_CYCLE" | "OMNI_ROLE_COLLISION";
  doctrineId: string;
  message: string;
  dependencyId?: string;
}

export interface ConstitutionalValidationResult {
  valid: boolean;
  violations: readonly ConstitutionalViolation[];
  order: readonly string[];
}
