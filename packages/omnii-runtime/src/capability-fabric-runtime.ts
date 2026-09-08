import { JsonObject } from "./types";

export type CapabilityStatus = "candidate" | "available" | "verified" | "unavailable" | "deprecated" | "retired";
export type CapabilityAuthorityClass = "none" | "provider-scoped" | "delegated" | "human-required";
export type CapabilityRiskClass = "low" | "medium" | "high" | "critical";
export type CapabilitySideEffect = "none" | "compute" | "network" | "external-query" | "external-write" | "secret-management";

export interface CapabilityDescriptor {
  id: string;
  name: string;
  version: string;
  providerId: string;
  domain: string;
  operation: string;
  status: CapabilityStatus;
  authorityClass: CapabilityAuthorityClass;
  riskClass: CapabilityRiskClass;
  sideEffect: CapabilitySideEffect;
  identityScope: string;
  inputSchema: JsonObject;
  outputSchema: JsonObject;
  dependencies: string[];
  costHint: number;
  latencyHint: number;
  reliabilityHint: number;
  auditPolicy: string;
  provenance: JsonObject;
  metadata?: JsonObject;
}

export interface CapabilityExecutionContext {
  principal: string;
  authorityRef?: string;
  correlationId: string;
  idempotencyKey: string;
  intent: JsonObject;
  provenance?: JsonObject;
}

export interface CapabilityAdapterResult {
  success: boolean;
  output?: JsonObject;
  evidenceRefs?: string[];
  providerReference?: string;
  error?: string;
}

export interface CapabilityAdapter {
  descriptor: CapabilityDescriptor;
  execute(input: JsonObject, context: CapabilityExecutionContext): Promise<CapabilityAdapterResult>;
}

const credentialKey = /(api[_-]?key|token|secret|password|credential|private[_-]?key|authorization|bearer)/i;
const credentialValue = /^(?:bearer\s+)?[A-Za-z0-9_./+=:-]{16,}$/i;

function containsCredentialMaterial(value: unknown, sensitiveKey = false): boolean {
  if (typeof value === "string") return sensitiveKey && credentialValue.test(value);
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((item) => containsCredentialMaterial(item, sensitiveKey));
  return Object.entries(value).some(([key, child]) => containsCredentialMaterial(child, credentialKey.test(key)));
}

const activeStatuses = new Set<CapabilityStatus>(["available", "verified"]);

export class CapabilityRegistryRuntime {
  private readonly descriptors = new Map<string, CapabilityDescriptor>();

  async register(descriptor: CapabilityDescriptor, _actor: string): Promise<CapabilityDescriptor> {
    if (!descriptor.id || !descriptor.providerId) throw new Error("capability_identity_required");
    if (containsCredentialMaterial(descriptor)) throw new Error("credential_material_forbidden");
    const key = `${descriptor.id}::${descriptor.providerId}`;
    if (this.descriptors.has(key)) throw new Error("duplicate_capability_provider");
    this.descriptors.set(key, structuredClone(descriptor));
    return structuredClone(descriptor);
  }

  async resolve(id: string, providerId?: string): Promise<CapabilityDescriptor | undefined> {
    if (providerId) {
      const item = this.descriptors.get(`${id}::${providerId}`);
      return item ? structuredClone(item) : undefined;
    }
    const first = [...this.descriptors.values()]
      .filter((item) => item.id === id)
      .sort((left, right) => left.providerId.localeCompare(right.providerId))[0];
    return first ? structuredClone(first) : undefined;
  }

  async lookup(predicate: (item: CapabilityDescriptor) => boolean): Promise<CapabilityDescriptor[]> {
    return [...this.descriptors.values()]
      .filter((item) => predicate(item))
      .sort((left, right) => left.id.localeCompare(right.id) || left.providerId.localeCompare(right.providerId))
      .map((item) => structuredClone(item));
  }

  async active(id: string): Promise<CapabilityDescriptor[]> {
    return this.lookup((item) => item.id === id && activeStatuses.has(item.status));
  }

  async list(): Promise<CapabilityDescriptor[]> {
    return this.lookup(() => true);
  }

  async deprecate(id: string, providerId: string): Promise<CapabilityDescriptor> {
    const key = `${id}::${providerId}`;
    const item = this.descriptors.get(key);
    if (!item) throw new Error("capability_not_found");
    const updated = { ...item, status: "deprecated" as const };
    this.descriptors.set(key, updated);
    return structuredClone(updated);
  }
}
