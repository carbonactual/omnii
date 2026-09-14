import type { EventEngine, CanonicalEvent } from "./event-engine";
import { JourneyExecutionEvent, JourneyExecutionState } from "./charter-journey-execution-runtime";

export class CharterJourneyEventStore {
  constructor(private readonly events: EventEngine) {}

  async append(input: Omit<JourneyExecutionEvent, "eventId" | "timestamp">): Promise<JourneyExecutionEvent> {
    const event = await this.events.append({
      event_type: input.eventType,
      event_version: "1",
      schema_version: "1",
      lifecycle: "active",
      status: "accepted",
      occurred_at: new Date().toISOString(),
      actor_ref: input.actor,
      subject_ref: input.journeyId,
      correlation_id: input.journeyId,
      reality_state: "actual",
      source: "charter-journey-execution-runtime",
      provenance: input.provenance,
      evidence_refs: input.evidenceRefs ?? [],
      metadata: { authority_ref: input.authorityRef },
      payload: {
        journey_id: input.journeyId,
        event_type: input.eventType,
        prior_state: input.priorState,
        resulting_state: input.resultingState,
        payload: input.payload,
      },
      idempotency_key: `charter-journey:${input.journeyId}:${input.eventType}:${cryptoRandomId()}`,
    });
    return this.toJourneyEvent(event);
  }

  async byJourney(journeyId: string): Promise<JourneyExecutionEvent[]> {
    const events = await this.events.query({ correlation_id: journeyId });
    return events.map((event) => this.toJourneyEvent(event));
  }

  private toJourneyEvent(event: CanonicalEvent): JourneyExecutionEvent {
    const payload = event.payload as Record<string, unknown>;
    return {
      eventId: event.id,
      journeyId: event.subject_ref ?? event.correlation_id,
      eventType: event.event_type,
      actor: event.actor_ref ?? "",
      timestamp: event.occurred_at,
      priorState: payload.prior_state as JourneyExecutionState,
      resultingState: payload.resulting_state as JourneyExecutionState,
      payload: (payload.payload ?? {}) as Record<string, unknown>,
      provenance: event.provenance,
      authorityRef: event.authority_ref,
      evidenceRefs: event.evidence_refs as string[],
    };
  }
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
