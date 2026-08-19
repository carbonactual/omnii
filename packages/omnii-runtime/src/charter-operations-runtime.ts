import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { CanonicalObject, Relationship, RuntimeResult } from "./types";

export type MovementAvailability = "available" | "reserved" | "assigned" | "active" | "degraded" | "maintenance" | "unavailable" | "unknown";

export interface MovementCapability extends Omit<CanonicalObject, "capabilities"> {
  capabilities: string[];
  movement: {
    mode: string;
    availability: MovementAvailability;
    location?: string;
    capacity?: number;
    ready?: boolean;
  };
}

export interface MovementAssignment {
  capabilityId: string;
  personnelIds: string[];
  journeyId: string;
  status: "assigned" | "active" | "released" | "cancelled";
}

export interface MovementRecovery {
  journeyId: string;
  failedCapabilityId?: string;
  status: "detected" | "dispatching" | "recovering" | "recomposed" | "completed";
  replacementCapabilityId?: string;
}

export class CharterOperationsRuntime {
  constructor(
    readonly objects: ObjectRuntime,
    readonly relationships: RelationshipRuntime,
  ) {}

  async availability(capabilityId: string): Promise<MovementAvailability> {
    const object = await this.objects.read(capabilityId);
    if (!object) throw new Error(`Capability not found: ${capabilityId}`);
    return ((object.metadata?.["movement"] as Record<string, unknown> | undefined)?.["availability"] as MovementAvailability | undefined) ?? "unknown";
  }

  async assign(input: MovementAssignment): Promise<RuntimeResult<MovementAssignment>> {
    const capability = await this.objects.read(input.capabilityId);
    const journey = await this.objects.read(input.journeyId);
    if (!capability) throw new Error(`Capability not found: ${input.capabilityId}`);
    if (!journey) throw new Error(`Journey not found: ${input.journeyId}`);
    const state = await this.availability(input.capabilityId);
    if (!["available", "reserved"].includes(state)) throw new Error(`Capability is not assignable: ${state}`);
    const relationship: Omit<Relationship, "id"> = {
      type: "movement_assignment",
      source: input.journeyId,
      target: input.capabilityId,
      direction: "directed",
      status: "active",
      authority: capability.authority,
      provenance: { source: "charter-operations-runtime" },
      metadata: { personnelIds: input.personnelIds, assignmentStatus: input.status },
    };
    const created = await this.relationships.create(relationship);
    return { value: input, eventIds: [created.id] };
  }

  async recover(input: MovementRecovery, replacementCapabilityId: string): Promise<MovementRecovery> {
    const journey = await this.objects.read(input.journeyId);
    const replacement = await this.objects.read(replacementCapabilityId);
    if (!journey) throw new Error(`Journey not found: ${input.journeyId}`);
    if (!replacement) throw new Error(`Replacement capability not found: ${replacementCapabilityId}`);
    const state = await this.availability(replacementCapabilityId);
    if (!["available", "reserved"].includes(state)) throw new Error(`Replacement capability is not available: ${state}`);
    await this.relationships.create({
      type: "movement_recovery",
      source: input.journeyId,
      target: replacementCapabilityId,
      direction: "directed",
      status: "active",
      authority: replacement.authority,
      provenance: { source: "charter-operations-runtime" },
      metadata: { failedCapabilityId: input.failedCapabilityId, recoveryStatus: "recomposed" },
    });
    return { ...input, status: "recomposed", replacementCapabilityId };
  }
}
