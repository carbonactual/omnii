import { randomUUID } from "node:crypto";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";
import { CanonicalObject, Relationship } from "./types";

export type CharterCapabilityState =
  | "discoverable"
  | "eligible"
  | "available"
  | "reserved"
  | "assigned"
  | "active"
  | "degraded"
  | "restricted"
  | "unavailable"
  | "maintenance"
  | "recovery"
  | "retired"
  | "unknown";

export interface CharterCapabilityInput {
  type: string;
  name: string;
  location?: string;
  capacity?: number;
  availableFrom?: string;
  availableTo?: string;
  state?: CharterCapabilityState;
  capabilities?: string[];
  requirements?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface JourneyRequest {
  origin: string;
  destination: string;
  requestedFrom?: string;
  requestedTo?: string;
  requirements?: Record<string, unknown>;
}

export interface JourneyLeg {
  capabilityId: string;
  sequence: number;
  from: string;
  to: string;
  handoffRequired: boolean;
}

export interface JourneyPlan {
  journeyId: string;
  request: JourneyRequest;
  legs: JourneyLeg[];
  status: "planned" | "blocked";
  reasons: string[];
}

/**
 * Charter's first executable runtime composition.
 * It deliberately composes the existing OMNII ObjectRuntime and RelationshipRuntime.
 */
export class CharterRuntime {
  readonly objects: ObjectRuntime;
  readonly relationships: RelationshipRuntime;

  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {
    this.objects = new ObjectRuntime(persistence);
    this.relationships = new RelationshipRuntime(persistence);
  }

  async registerCapability(input: CharterCapabilityInput): Promise<CanonicalObject> {
    const now = new Date().toISOString();
    return this.objects.create({
      type: input.type,
      status: input.state ?? "discoverable",
      identity: { name: input.name },
      provenance: { source: "charter-runtime", created_at: now },
      authority: {},
      attributes: {
        location: input.location,
        capacity: input.capacity,
        available_from: input.availableFrom,
        available_to: input.availableTo,
        requirements: input.requirements ?? {},
      },
      relationships: [],
      dependencies: [],
      capabilities: input.capabilities ?? [],
      resources: [],
      timestamps: { created_at: now, updated_at: now },
      metadata: input.metadata,
    });
  }

  async setCapabilityState(capabilityId: string, state: CharterCapabilityState): Promise<CanonicalObject> {
    return this.objects.transition(capabilityId, state).then((result) => result.value);
  }

  async linkCapability(capabilityId: string, targetId: string, type = "charter:capability-supports"): Promise<Relationship> {
    return this.relationships.create({
      id: randomUUID(),
      type,
      source: capabilityId,
      target: targetId,
      direction: "directed",
      status: "active",
      authority: {},
      provenance: { source: "charter-runtime" },
    });
  }

  async planJourney(request: JourneyRequest, capabilityIds: string[]): Promise<JourneyPlan> {
    const candidates: CanonicalObject[] = [];
    for (const id of capabilityIds) {
      const capability = await this.objects.read(id);
      if (capability) candidates.push(capability);
    }

    const usable = candidates.filter((capability) =>
      ["available", "eligible", "discoverable"].includes(capability.status),
    );

    const reasons: string[] = [];
    if (!usable.length) reasons.push("No usable movement capability was supplied");

    const journey = await this.objects.create({
      type: "charter:journey",
      status: usable.length ? "planned" : "blocked",
      identity: { name: `${request.origin} → ${request.destination}` },
      provenance: { source: "charter-runtime" },
      authority: {},
      attributes: {
        origin: request.origin,
        destination: request.destination,
        requested_from: request.requestedFrom,
        requested_to: request.requestedTo,
        requirements: request.requirements ?? {},
      },
      relationships: [],
      dependencies: [],
      capabilities: [],
      resources: [],
      timestamps: { created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    });

    const legs: JourneyLeg[] = usable.map((capability, index) => ({
      capabilityId: capability.id,
      sequence: index,
      from: index === 0 ? request.origin : `handoff:${usable[index - 1].id}`,
      to: index === usable.length - 1 ? request.destination : `handoff:${capability.id}`,
      handoffRequired: index < usable.length - 1,
    }));

    for (const leg of legs) {
      await this.linkCapability(leg.capabilityId, journey.id, "charter:journey-leg");
    }

    return { journeyId: journey.id, request, legs, status: usable.length ? "planned" : "blocked", reasons };
  }
}
