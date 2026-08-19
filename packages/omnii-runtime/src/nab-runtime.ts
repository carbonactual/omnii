import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { CanonicalObject, Relationship } from "./types";

export interface NABEvent {
  subjectId: string;
  type: string;
  occurredAt: string;
  source?: string;
  evidenceRefs?: string[];
  metadata?: Record<string, unknown>;
}

export interface NABStateAssertion {
  subjectId: string;
  state: string;
  observedAt: string;
  source: string;
  confidence?: "verified" | "reported" | "inferred" | "disputed" | "unknown";
  expiresAt?: string;
  evidenceRefs?: string[];
}

export class NABRuntime {
  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime) {}

  async register(type: string, attributes: Record<string, unknown>, metadata: Record<string, unknown> = {}): Promise<CanonicalObject> {
    return this.objects.create({
      type,
      status: "active",
      identity: {},
      provenance: { source: "nab-runtime" },
      authority: {},
      attributes,
      relationships: [],
      dependencies: [],
      capabilities: [],
      resources: [],
      metadata: { ...metadata, nab: { registry: true } },
    });
  }

  async appendBiographyEvent(event: NABEvent): Promise<Relationship> {
    const subject = await this.objects.read(event.subjectId);
    if (!subject) throw new Error(`NAB subject not found: ${event.subjectId}`);
    const record = await this.register("nab_biography_event", {
      subjectId: event.subjectId,
      eventType: event.type,
      occurredAt: event.occurredAt,
      evidenceRefs: event.evidenceRefs ?? [],
    }, { source: event.source ?? "unknown", eventMetadata: event.metadata ?? {} });
    return this.relationships.create({
      type: "nab_biography_event",
      source: event.subjectId,
      target: record.id,
      direction: "directed",
      status: "active",
      authority: subject.authority,
      provenance: { source: event.source ?? "nab-runtime" },
      metadata: { occurredAt: event.occurredAt },
    });
  }

  async recordState(assertion: NABStateAssertion): Promise<Relationship> {
    const subject = await this.objects.read(assertion.subjectId);
    if (!subject) throw new Error(`NAB subject not found: ${assertion.subjectId}`);
    const record = await this.register("nab_state_assertion", {
      subjectId: assertion.subjectId,
      state: assertion.state,
      observedAt: assertion.observedAt,
      expiresAt: assertion.expiresAt,
      evidenceRefs: assertion.evidenceRefs ?? [],
      confidence: assertion.confidence ?? "unknown",
    }, { source: assertion.source });
    return this.relationships.create({
      type: "nab_state_assertion",
      source: assertion.subjectId,
      target: record.id,
      direction: "directed",
      status: "active",
      authority: subject.authority,
      provenance: { source: assertion.source },
      metadata: { observedAt: assertion.observedAt, state: assertion.state, confidence: assertion.confidence ?? "unknown" },
    });
  }

  async biography(subjectId: string): Promise<CanonicalObject[]> {
    const relationships = await this.relationships.traverse(subjectId, "nab_biography_event");
    const records = await Promise.all(relationships.map((relationship) => this.objects.read(relationship.target)));
    return records.filter((record): record is CanonicalObject => Boolean(record));
  }

  async currentState(subjectId: string): Promise<CanonicalObject[]> {
    const relationships = await this.relationships.traverse(subjectId, "nab_state_assertion");
    const records = await Promise.all(relationships.map((relationship) => this.objects.read(relationship.target)));
    return records.filter((record): record is CanonicalObject => Boolean(record));
  }
}
