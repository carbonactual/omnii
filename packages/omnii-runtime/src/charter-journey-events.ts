import { ObjectRuntime } from "./object-runtime";
import { JourneyExecutionEvent, JourneyExecutionState } from "./charter-journey-execution-runtime";

export class CharterJourneyEventStore {
  constructor(private readonly objects: ObjectRuntime) {}

  async append(input: Omit<JourneyExecutionEvent, "eventId" | "timestamp">): Promise<JourneyExecutionEvent> {
    const now = new Date().toISOString();
    const event = await this.objects.create({
      type: "charter:journey-event",
      status: "recorded",
      identity: { name: input.eventType },
      provenance: input.provenance,
      authority: input.authorityRef ? { ref: input.authorityRef } : {},
      attributes: {
        journey_id: input.journeyId,
        event_type: input.eventType,
        actor: input.actor,
        timestamp: now,
        prior_state: input.priorState,
        resulting_state: input.resultingState,
        payload: input.payload,
        evidence_refs: input.evidenceRefs ?? [],
      },
      relationships: [],
      dependencies: [],
      capabilities: [],
      resources: [],
      metadata: {},
    });
    return { eventId: event.id, ...input, timestamp: now };
  }

  async byJourney(journeyId: string): Promise<JourneyExecutionEvent[]> {
    const objects = await this.objects.list();
    return objects
      .filter((object) => object.type === "charter:journey-event" && object.attributes.journey_id === journeyId)
      .map((object) => ({
        eventId: object.id,
        journeyId,
        eventType: String(object.attributes.event_type ?? ""),
        actor: String(object.attributes.actor ?? ""),
        timestamp: String(object.attributes.timestamp ?? object.timestamps.created_at),
        priorState: object.attributes.prior_state as JourneyExecutionState,
        resultingState: object.attributes.resulting_state as JourneyExecutionState,
        payload: (object.attributes.payload ?? {}) as Record<string, unknown>,
        provenance: object.provenance,
        authorityRef: typeof object.authority.ref === "string" ? String(object.authority.ref) : undefined,
        evidenceRefs: Array.isArray(object.attributes.evidence_refs) ? object.attributes.evidence_refs as string[] : [],
      }));
  }
}
