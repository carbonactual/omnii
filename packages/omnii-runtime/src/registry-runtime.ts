import { CanonicalObject, JsonObject, Relationship, ValidationResult } from "./types";
import { Registry, RegistryRecord } from "./registry";
import { validateCanonicalObject, validateRelationship } from "./validation";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";

export interface DependencyRecord extends RegistryRecord { source: string; target: string; dependencyType: string; }
export interface CapabilityRecord extends RegistryRecord { name: string; constraints: JsonObject; }
export interface ResourceRecord extends RegistryRecord { resourceType: string; attributes: JsonObject; }

const registryRecordValidation = (record: RegistryRecord): ValidationResult => ({ valid: Boolean(record.id && record.version && record.status && record.authority && record.provenance), errors: [...(!record.id ? ["id is required"] : []), ...(!record.version ? ["version is required"] : []), ...(!record.status ? ["status is required"] : []), ...(!record.authority ? ["authority is required"] : []), ...(!record.provenance ? ["provenance is required"] : [])] });
const dependencyValidation = (record: DependencyRecord): ValidationResult => { const base = registryRecordValidation(record); const errors = [...base.errors]; if (!record.source) errors.push("source is required"); if (!record.target) errors.push("target is required"); if (!record.dependencyType) errors.push("dependencyType is required"); return { valid: errors.length === 0, errors }; };

export class RegistryRuntime {
  readonly objects: Registry<CanonicalObject & RegistryRecord>;
  readonly relationships: Registry<Relationship & RegistryRecord>;
  readonly dependencies: Registry<DependencyRecord>;
  readonly capabilities: Registry<CapabilityRecord>;
  readonly resources: Registry<ResourceRecord>;

  constructor(persistence: PersistencePort = new MemoryPersistenceAdapter()) {
    this.objects = new Registry<CanonicalObject & RegistryRecord>("object", (record) => validateCanonicalObject(record), persistence);
    this.relationships = new Registry<Relationship & RegistryRecord>("relationship", (record) => validateRelationship(record), persistence);
    this.dependencies = new Registry<DependencyRecord>("dependency", dependencyValidation, persistence);
    this.capabilities = new Registry<CapabilityRecord>("capability", registryRecordValidation, persistence);
    this.resources = new Registry<ResourceRecord>("resource", registryRecordValidation, persistence);
  }
}
