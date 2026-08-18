import { CanonicalObject, Relationship } from "./types";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { EventStore, OmniiEvent } from "./event-runtime";
import { DependencyRecord, RegistryRuntime } from "./registry-runtime";

export class GraphRuntime {
  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime, readonly events: EventStore, readonly registries: RegistryRuntime) {}

  async addObject(object: Parameters<ObjectRuntime["create"]>[0]): Promise<CanonicalObject> { return this.objects.create(object); }

  async addRelationship(relationship: Parameters<RelationshipRuntime["create"]>[0]): Promise<Relationship> {
    const source = await this.objects.read(relationship.source);
    const target = await this.objects.read(relationship.target);
    if (!source || !target) throw new Error("Relationship endpoints must resolve to canonical objects");
    return this.relationships.create(relationship);
  }

  async resolve(id: string): Promise<CanonicalObject | undefined> { return this.objects.read(id); }

  async traverse(source: string, relationshipType?: string): Promise<CanonicalObject[]> {
    const relationships = await this.relationships.traverse(source, relationshipType);
    const objects = await Promise.all(relationships.map((relationship) => this.objects.read(relationship.target)));
    return objects.filter((object): object is CanonicalObject => Boolean(object));
  }

  async dependencyLookup(source: string): Promise<DependencyRecord[]> { return this.registries.dependencies.lookup((dependency) => dependency.source === source); }
  async relationshipLookup(source: string, relationshipType?: string): Promise<Relationship[]> { return this.relationships.traverse(source, relationshipType); }
  async eventCorrelation(subject: string): Promise<OmniiEvent[]> { return this.events.bySubject(subject); }
}

export interface CivilizationViewNode { id: string; civilizationType: string; canonicalObjectId: string; metadata?: Record<string, unknown>; }
export interface CivilizationViewRelation { id: string; type: string; sourceNodeId: string; targetNodeId: string; canonicalRelationshipId: string; }

/** Phase 40 adapter: civilization views are projections over canonical OMNII objects/relationships. */
export class Phase40GraphAdapter {
  constructor(private readonly graph: GraphRuntime) {}

  async toNode(objectId: string, civilizationType: string): Promise<CivilizationViewNode> {
    const object = await this.graph.resolve(objectId);
    if (!object) throw new Error(`Canonical object not found: ${objectId}`);
    return { id: `civilization:${object.id}`, civilizationType, canonicalObjectId: object.id, metadata: object.metadata };
  }

  async toRelation(relationshipId: string): Promise<CivilizationViewRelation> {
    const relationship = await this.graph.relationships.read(relationshipId);
    if (!relationship) throw new Error(`Canonical relationship not found: ${relationshipId}`);
    return { id: `civilization:${relationship.id}`, type: relationship.type, sourceNodeId: `civilization:${relationship.source}`, targetNodeId: `civilization:${relationship.target}`, canonicalRelationshipId: relationship.id };
  }
}
