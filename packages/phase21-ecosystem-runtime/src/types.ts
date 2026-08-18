export type EcosystemLifecycle =
  | "proposed"
  | "constituted"
  | "active"
  | "restricted"
  | "suspended"
  | "recovering"
  | "retiring"
  | "retired";

export type AuthorityKind = "human" | "organization" | "delegated-agent" | "governance";

export interface UniversalObjectRef {
  id: string;
  type: string;
  version: string;
}

export interface AuthorityRef {
  id: string;
  kind: AuthorityKind;
  scope: string;
}

export interface EcosystemPolicy {
  crossEcosystemAccess: "deny" | "allow-by-agreement";
  dataVisibility: "private" | "members" | "governed";
  defaultAgentAuthority: "none" | "delegated";
}

export interface Ecosystem {
  id: string;
  type: "ecosystem";
  version: string;
  constitutionalRef: string;
  governanceRef: string;
  jurisdiction?: string;
  steward: AuthorityRef;
  participants: Set<string>;
  capabilities: Set<string>;
  resources: Set<string>;
  policy: EcosystemPolicy;
  lifecycle: EcosystemLifecycle;
  createdAt: string;
  effectiveAt: string;
  provenance: string;
}

export interface EcosystemContext {
  ecosystemId: string;
  actorId: string;
  authority: AuthorityRef;
  correlationId: string;
}

export interface CrossEcosystemAgreement {
  id: string;
  sourceEcosystemId: string;
  targetEcosystemId: string;
  allowedOperations: Set<string>;
  authorizedBy: AuthorityRef;
  expiresAt?: string;
}

export interface RuntimeEvent {
  id: string;
  type: string;
  ecosystemId: string;
  actorId: string;
  authorityId: string;
  action: string;
  outcome: "accepted" | "rejected";
  timestamp: string;
  correlationId: string;
  provenance: string;
}

export interface ExecutionRequest {
  action: string;
  capability: string;
  resource?: string;
  targetEcosystemId?: string;
}

export interface ExecutionResult {
  accepted: boolean;
  reason?: string;
  event: RuntimeEvent;
}
