import type { IdentityRef, NameRef, CorrelationEvidence } from "./identity.js";

export type ResolutionStatus =
  | "resolved"
  | "unresolved"
  | "stale"
  | "revoked"
  | "conflicted"
  | "ambiguous"
  | "error";

export interface ResolutionMethodRef {
  readonly adapterId: string;
  readonly scheme: string;
  readonly method?: string;
  readonly version?: string;
  readonly source?: string;
}

export interface ResolutionResult {
  readonly reference: IdentityRef | NameRef;
  readonly adapterId: string;
  readonly status: ResolutionStatus;
  readonly records: Readonly<Record<string, unknown>>;
  readonly evidence: readonly CorrelationEvidence[];
  readonly resolvedAt?: string;
  readonly expiresAt?: string;
  readonly verified?: boolean;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ResolveIdentityRequest {
  readonly reference: IdentityRef | NameRef;
  readonly adapterId: string;
  readonly status: ResolutionStatus;
  readonly records: Readonly<Record<string, unknown>>;
  readonly evidence: readonly CorrelationEvidence[];
  readonly resolvedAt?: string;
  readonly expiresAt?: string;
  readonly verified?: boolean;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export function resolveIdentity(input: ResolveIdentityRequest): ResolutionResult {
  if (!input.adapterId.trim()) throw new Error("adapterId is required");
  if (!input.reference || !input.reference.scheme) throw new Error("resolution reference is required");
  return { ...input };
}

export function authorizeResolution(result: ResolutionResult): boolean {
  return result.status === "resolved" && result.verified === true;
}

export function normalizeResolutionReference(reference: IdentityRef | NameRef): string {
  const value = "value" in reference ? reference.value : reference.name;
  if (!reference.scheme || !value) throw new Error("scheme and value are required");
  return `${reference.scheme}:${value}`.normalize("NFC");
}

export interface EnsResolutionMetadata {
  readonly forward?: { readonly name: string; readonly records: Readonly<Record<string, unknown>> };
  readonly reverse?: { readonly address: string; readonly name?: string };
  readonly text?: Readonly<Record<string, string>>;
  readonly contenthash?: string;
  readonly wildcard?: boolean;
  readonly dnsLinked?: boolean;
}

export interface HnsResolutionMetadata {
  readonly domain: string;
  readonly records?: Readonly<Record<string, unknown>>;
  readonly proof?: string;
  readonly dnsCompatible?: boolean;
}

export interface DnsResolutionMetadata {
  readonly name: string;
  readonly recordTypes: readonly string[];
  readonly dnssec?: { readonly validated: boolean; readonly proofRef?: string };
}
