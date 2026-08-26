import { JsonObject } from "./types";

export interface RegistryConformanceRecord {
  id: string;
  version: string;
  lifecycle: string;
  authority: JsonObject;
  provenance: JsonObject;
  payload: JsonObject;
}

export interface RegistryConformanceResult {
  valid: boolean;
  errors: string[];
}

const allowedLifecycles = new Set(["proposed", "active", "deprecated", "suspended", "retired"]);
const isString = (value: unknown): value is string => typeof value === "string" && value.length > 0;

export const validateRegistryConformance = (
  record: RegistryConformanceRecord,
): RegistryConformanceResult => {
  const errors: string[] = [];
  const payload = record.payload ?? {};
  const provenance = record.provenance ?? {};
  const authorityPolicy = payload["authority_policy"] as JsonObject | undefined;
  const boundaryPolicy = payload["boundary_policy"] as JsonObject | undefined;
  const relationshipPolicy = payload["relationship_policy"] as JsonObject | undefined;
  const continuityPolicy = payload["continuity_policy"] as JsonObject | undefined;
  const expectedRelations = payload["expected_relations"];
  const dependencies = payload["dependencies"];

  if (!isString(record.id) || !record.id.startsWith("registry:")) errors.push("REGISTRY_IDENTITY");
  if (!isString(record.version)) errors.push("VERSION");
  if (!allowedLifecycles.has(record.lifecycle)) errors.push("LIFECYCLE");
  if (!isString(provenance["source"]) || !isString(provenance["catalog_version"])) errors.push("PROVENANCE");
  if (payload["type"] !== "registry") errors.push("REGISTRY_TYPE");
  if (!isString(payload["domain"])) errors.push("REGISTRY_DOMAIN");
  if (!isString(payload["canonical_source"])) errors.push("CANONICAL_SOURCE");
  if (
    !Array.isArray(expectedRelations) ||
    expectedRelations.some((relation) => typeof relation !== "string") ||
    new Set(expectedRelations as unknown[]).size !== expectedRelations.length
  ) {
    errors.push("RELATION_VOCABULARY");
  }
  if (typeof payload["open_world"] !== "boolean") errors.push("OPEN_WORLD");
  if (authorityPolicy?.["non_granting"] !== true) errors.push("AUTHORITY_ESCALATION_POLICY");
  if (boundaryPolicy?.["authority_boundary_explicit"] !== true) errors.push("BOUNDARY_POLICY");
  if (relationshipPolicy?.["typed"] !== true || relationshipPolicy?.["provenance_required"] !== true) {
    errors.push("RELATIONSHIP_POLICY");
  }
  if (continuityPolicy?.["lineage_required"] !== true || continuityPolicy?.["silent_delete_forbidden"] !== true) {
    errors.push("CONTINUITY_POLICY");
  }
  if (
    dependencies !== undefined &&
    (!Array.isArray(dependencies) ||
      dependencies.some((dependency) => typeof dependency !== "string") ||
      (Array.isArray(dependencies) && (dependencies as string[]).includes(record.id)))
  ) {
    errors.push("DEPENDENCY_POLICY");
  }

  return { valid: errors.length === 0, errors };
};
