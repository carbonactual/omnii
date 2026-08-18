import { CanonicalObject, JsonObject, Relationship, ValidationResult } from "./types";

export class OmniiValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OmniiValidationError";
  }
}

export function validateCanonicalObject(object: CanonicalObject): ValidationResult {
  const errors: string[] = [];
  if (!object.id) errors.push("object.id is required");
  if (!object.type) errors.push("object.type is required");
  if (!object.version) errors.push("object.version is required");
  if (!object.status) errors.push("object.status is required");
  if (!object.identity || typeof object.identity !== "object") errors.push("object.identity is required");
  if (!object.provenance || typeof object.provenance !== "object") errors.push("object.provenance is required");
  if (!object.authority || typeof object.authority !== "object") errors.push("object.authority is required");
  if (!object.attributes || typeof object.attributes !== "object") errors.push("object.attributes is required");
  if (!Array.isArray(object.relationships)) errors.push("object.relationships must be an array");
  if (!Array.isArray(object.dependencies)) errors.push("object.dependencies must be an array");
  if (!Array.isArray(object.capabilities)) errors.push("object.capabilities must be an array");
  if (!Array.isArray(object.resources)) errors.push("object.resources must be an array");
  if (!object.timestamps || typeof object.timestamps !== "object") errors.push("object.timestamps is required");
  return { valid: errors.length === 0, errors };
}

export function validateRelationship(relationship: Relationship): ValidationResult {
  const errors: string[] = [];
  if (!relationship.id) errors.push("relationship.id is required");
  if (!relationship.type) errors.push("relationship.type is required");
  if (!relationship.source) errors.push("relationship.source is required");
  if (!relationship.target) errors.push("relationship.target is required");
  if (!["directed", "undirected"].includes(relationship.direction)) errors.push("relationship.direction is invalid");
  if (!relationship.status) errors.push("relationship.status is required");
  if (!relationship.authority || typeof relationship.authority !== "object") errors.push("relationship.authority is required");
  if (!relationship.provenance || typeof relationship.provenance !== "object") errors.push("relationship.provenance is required");
  return { valid: errors.length === 0, errors };
}

export function validateAuthority(authority: JsonObject): ValidationResult {
  const errors: string[] = [];
  if (!authority.id) errors.push("authority.id is required");
  if (!authority.subject) errors.push("authority.subject is required");
  if (!Array.isArray(authority.scope)) errors.push("authority.scope must be an array");
  if (!Array.isArray(authority.capabilities)) errors.push("authority.capabilities must be an array");
  if (!authority.issued_at) errors.push("authority.issued_at is required");
  if (typeof authority.revocable !== "boolean") errors.push("authority.revocable is required");
  return { valid: errors.length === 0, errors };
}

export function assertValid(result: ValidationResult): void {
  if (!result.valid) throw new OmniiValidationError(result.errors.join("; "));
}
