export type JsonObject = Record<string, unknown>;
export type CanonicalObjectStatus = string;

export interface CanonicalObject { [key: string]: unknown; id: string; type: string; version: string; status: CanonicalObjectStatus; identity: JsonObject; provenance: JsonObject; authority: JsonObject; attributes: JsonObject; relationships: string[]; dependencies: string[]; capabilities: string[]; resources: string[]; timestamps: JsonObject; metadata?: JsonObject; }
export interface Relationship { [key: string]: unknown; id: string; type: string; source: string; target: string; direction: "directed" | "undirected"; status: string; effective_from?: string; effective_to?: string; authority: JsonObject; provenance: JsonObject; constraints?: JsonObject; metadata?: JsonObject; }
export interface Authority { [key: string]: unknown; id: string; subject: string; issuer?: string; scope: string[]; capabilities: string[]; constraints?: JsonObject; issued_at: string; expires_at?: string; revocable: boolean; revoked_at?: string; provenance?: JsonObject; }
export interface RuntimeResult<T> { value: T; eventIds: string[]; }
export interface ValidationResult { valid: boolean; errors: string[]; }
