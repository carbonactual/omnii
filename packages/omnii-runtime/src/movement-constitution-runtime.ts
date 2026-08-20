import { CharterRuntime, JourneyPlan, JourneyRequest } from "./charter-runtime";
import { NABEvent, NABRuntime, NABStateAssertion } from "./nab-runtime";
import { MemoryPersistenceAdapter, PersistencePort } from "./persistence";
import { CanonicalObject, Relationship } from "./types";

export type MovementJourneyMode =
  | "charter"
  | "pilgrim"
  | "social"
  | "commercial"
  | "emergency"
  | "logistics";

export interface UniversalMovementRequest extends JourneyRequest {
  mode?: MovementJourneyMode;
  purpose?: string;
  need?: string;
  want?: string;
  services?: string[];
  stages?: string[];
  subjectId?: string;
}

export interface UniversalMovementPlan extends JourneyPlan {
  mode: MovementJourneyMode;
}

/**
 * Canonical runtime seam for Universal Movement.
 *
 * Charter remains responsible for executable movement planning.
 * NAB remains responsible for reusable registry, biography and state evidence.
 * Both operate over one persistence boundary so a journey has one identity.
 */
export class MovementConstitutionRuntime {
  readonly charter: CharterRuntime;
  readonly nab: NABRuntime;

  constructor(private readonly persistence: PersistencePort = new MemoryPersistenceAdapter()) {
    this.charter = new CharterRuntime(persistence);
    this.nab = new NABRuntime(this.charter.objects, this.charter.relationships);
  }

  async registerSubject(
    type: string,
    attributes: Record<string, unknown>,
    metadata: Record<string, unknown> = {},
  ): Promise<CanonicalObject> {
    return this.nab.register(type, attributes, metadata);
  }

  async plan(request: UniversalMovementRequest, capabilityIds: string[]): Promise<UniversalMovementPlan> {
    const mode = request.mode ?? "charter";
    const plan = await this.charter.planJourney(request, capabilityIds);
    const journey = await this.charter.objects.read(plan.journeyId);
    if (!journey) throw new Error(`Movement journey not found: ${plan.journeyId}`);

    const nextAttributes = {
      ...journey.attributes,
      movement_mode: mode,
      purpose: request.purpose,
      need: request.need,
      want: request.want,
      services: request.services ?? [],
      stages: request.stages ?? [],
      subject_id: request.subjectId,
    };

    await this.charter.objects.update(plan.journeyId, { attributes: nextAttributes });

    if (request.subjectId) {
      const subject = await this.charter.objects.read(request.subjectId);
      if (!subject) throw new Error(`Movement subject not found: ${request.subjectId}`);
      await this.charter.relationships.create({
        type: "movement:subject-journey",
        source: request.subjectId,
        target: plan.journeyId,
        direction: "directed",
        status: "active",
        authority: subject.authority,
        provenance: { source: "movement-constitution-runtime" },
        metadata: { mode },
      });
    }

    return { ...plan, mode };
  }

  async recordEvent(journeyId: string, type: string, occurredAt = new Date().toISOString(), metadata: Record<string, unknown> = {}) : Promise<Relationship> {
    const event: NABEvent = {
      subjectId: journeyId,
      type,
      occurredAt,
      source: "movement-constitution-runtime",
      metadata: { ...metadata },
    };
    return this.nab.appendBiographyEvent(event);
  }

  async recordState(
    journeyId: string,
    state: string,
    observedAt = new Date().toISOString(),
    confidence: NABStateAssertion["confidence"] = "verified",
    metadata: Record<string, unknown> = {},
  ): Promise<Relationship> {
    const assertion: NABStateAssertion = {
      subjectId: journeyId,
      state,
      observedAt,
      source: "movement-constitution-runtime",
      confidence,
      metadata,
    } as NABStateAssertion & { metadata: Record<string, unknown> };
    return this.nab.recordState(assertion);
  }

  async journeyBiography(journeyId: string): Promise<CanonicalObject[]> {
    return this.nab.biography(journeyId);
  }

  async journeyState(journeyId: string): Promise<CanonicalObject[]> {
    return this.nab.currentState(journeyId);
  }
}
