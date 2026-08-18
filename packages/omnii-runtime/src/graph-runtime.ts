import { CanonicalObject, Relationship } from "./types";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { EventStore, OmniiEvent } from "./event-runtime";
import { DependencyRecord, RegistryRuntime } from "./registry-runtime";

export class GraphRuntime {
  constructor(
    readonly objects: ObjectRuntime,
    readonly relationships: RelationshipRuntime,
    readonly events: EventStore,
    readonly registries: RegistryRuntime,
  ) {}

  addObject(object: Parameters<ObjectRuntime["create"]>[0]): CanonicalObject {
    return this.objects.create(object);
  }

  addRelationship(relationship: Parameters<RelationshipRuntime["create"]>[0]): Relationship {
    const source = this.objects.read(relationship.source);
    const target = this.objects.read(relationship.target);
    if (!source || !target) throw new Error("Relationship endpoints must resolve to canonical objects");
    return this.relationships.create(relationship);
  }

  resolve(id: string): CanonicalObject | undefined {
    return this.objects.read(id);
  }

  traverse(source: string, relationshipType?: string): CanonicalObject[] {
    return this.relationships.traverse(source, relationshipType)
      .map((relationship) => this.objects.read(relationship.target))
      .filter((object): object is CanonicalObject => Boolean(object));
  }

  dependencyLookup(source: string): DependencyRecord[] {
    return this.registries.dependencies.lookup((dependency) => dependency.source === source);
  }

  relationshipLookup(source: string, relationshipType?: string): Relationship[] {
    return this.relationships.traverse(source, relationshipType);
  }

  eventCorrelation(subject: string): OmniiEvent[] {
    return this.events.bySubject(subject);
  }
}

export interface CivilizationViewNode {
  id: string;
  civilizationType: string;
  canonicalObjectId: string;
  metadata?: Record<string, unknown>;
}

export interface CivilizationViewRelation {
  id: string;
  type: string;
  sourceNodeId: string;
  targetNodeId: string;
  canonicalRelationshipId: string;
}

/** Phase 40 adapter: civilization views are projections over canonical OMNII objects/relationships. */
export class Phase40GraphAdapter {
  constructor(private readonly graph: GraphRuntime) {}

  toNode(objectId: string, civilizationType: string): CivilizationViewNode {
    const object = this.graph.resolve(objectId);
    if (!object) throw new Error(`Canonical object not found: ${objectId}`);
    return { id: `civilization:${object.id}`, civilizationType, canonicalObjectId: object.id, metadata: object.metadata };
  }

  toRelation(relationshipId: string): CivilizationViewRelation {
    const relationship = this.graph.relationships.read(relationshipId);
    if (!relationship) throw new Error(`Canonical relationship not found: ${relationshipId}`);
    return {
      id: `civilization:${relationship.id}`,
      type: relationship.type,
      sourceNodeId: `civilization:${relationship.source}`,
      targetNodeId: `civilization:${relationship.target}`,
      canonicalRelationshipId: relationship.id,
    };
  }
}
