export type ResolutionStatus = "unverified" | "verified" | "stale" | "revoked" | "expired" | "conflicted" | "unresolved";

export interface NamespaceAdapter {
  id: string;
  name: string;
  method: string;
  resolver?: string;
  trustModel?: string;
  supportsForward: boolean;
  supportsReverse: boolean;
  metadata?: Record<string, unknown>;
}

export interface NameResolution {
  namespaceId: string;
  name: string;
  subjectId?: string;
  target?: Record<string, unknown>;
  status: ResolutionStatus;
  confidence: number;
  provenance: Record<string, unknown>;
  validFrom?: string;
  validTo?: string;
}

export function validateNameResolution(input: NameResolution): void {
  if (!input.namespaceId || !input.name) throw new Error("namespaceId and name are required");
  if (input.confidence < 0 || input.confidence > 1) throw new Error("confidence must be between 0 and 1");
  if (!input.provenance || Object.keys(input.provenance).length === 0) throw new Error("provenance is required");
}

export function normalizeResolution(input: NameResolution): NameResolution {
  validateNameResolution(input);
  return { ...input, name: input.name.normalize("NFC") };
}

export function isResolutionUsable(input: NameResolution, at = new Date()): boolean {
  if (["revoked", "expired", "conflicted", "unresolved"].includes(input.status)) return false;
  if (input.validFrom && new Date(input.validFrom) > at) return false;
  if (input.validTo && new Date(input.validTo) < at) return false;
  return true;
}
