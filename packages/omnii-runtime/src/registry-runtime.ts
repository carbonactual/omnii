import { CanonicalObject, JsonObject, Relationship, ValidationResult } from "./types";
import { Registry, RegistryRecord } from "./registry";
import { validateCanonicalObject, validateRelationship } from "./validation";

export interface DependencyRecord extends RegistryRecord {
  source: string;
  target: string;
  dependencyType: string;
}

export interface CapabilityRecord extends RegistryRecord {
  name: string;
  constraints: JsonObject;
}

export interface ResourceRecord extends RegistryRecord {
  resourceType: string;
  attributes: JsonObject;
}

const registryRecordValidation = (record: RegistryRecord): ValidationResult => ({
  valid: Boolean(record.id && record.version && record.status && record.authority && record.provenance),
  errors: [
    ...(!record.id ? ["id is required"] : []),
    ...(!record.version ? ["version is required"] : []),
    ...(!record.status ? ["status is required"] : []),
    ...(!record.authority ? ["authority is required"] : []),
    ...(!record.provenance ? ["provenance is required"] : []),
  ],
});

const dependencyValidation = (record: DependencyRecord): ValidationResult => {
  const base = registryRecordValidation(record);
  const errors = [...base.errors];
  if (!record.source) errors.push("source is required");
  if (!record.target) errors.push("target is required");
  if (!record.dependencyType) errors.push("dependencyType is required");
  return { valid: errors.length === 0, errors };
};

export class RegistryRuntime {
  readonly objects = new Registry<CanonicalObject & RegistryRecord>("object", validateCanonicalObject);
  readonly relationships = new Registry<Relationship & RegistryRecord>("relationship", validateRelationship);
  readonly dependencies = new Registry<DependencyRecord>("dependency", dependencyValidation);
  readonly capabilities = new Registry<CapabilityRecord>("capability", registryRecordValidation);
  readonly resources = new Registry<ResourceRecord>("resource", registryRecordValidation);
}
