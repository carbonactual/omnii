import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";
import { EventEngine } from "./event-engine";
import { CharterJourneyEventStore } from "./charter-journey-events";

export type JourneyExecutionState =
  | "intent" | "discovery" | "eligibility" | "availability" | "reservation" | "assignment" | "preparation"
  | "pickup" | "boarding" | "active" | "handoff" | "completion" | "evidence" | "reconciliation" | "closed"
  | "planned" | "ready" | "delayed" | "blocked" | "completed" | "cancelled" | "denied" | "disrupted" | "incident" | "abandoned" | "recovery";

export interface JourneyExecution {
  journeyId: string;
  state: JourneyExecutionState;
  currentLeg?: string;
  completedLegs: string[];
  blockedReason?: string;
}

export interface JourneyExecutionEvent {
  eventId: string;
  journeyId: string;
  eventType: string;
  actor: string;
  timestamp: string;
  priorState: JourneyExecutionState;
  resultingState: JourneyExecutionState;
  payload: Record<string, unknown>;
  provenance: Record<string, unknown>;
  authorityRef?: string;
  evidenceRefs?: string[];
}

export const JOURNEY_TRANSITIONS: Record<JourneyExecutionState, readonly JourneyExecutionState[]> = {
  intent: ["discovery", "denied", "cancelled"], discovery: ["eligibility", "denied", "cancelled"],
  eligibility: ["availability", "denied", "cancelled"], availability: ["reservation", "denied", "cancelled"],
  reservation: ["assignment", "cancelled", "disrupted"], assignment: ["preparation", "cancelled", "disrupted"],
  preparation: ["pickup", "boarding", "cancelled", "disrupted"], pickup: ["boarding", "active", "cancelled", "incident"],
  boarding: ["active", "cancelled", "incident"], active: ["handoff", "completion", "delayed", "disrupted", "incident", "recovery", "abandoned"],
  handoff: ["active", "completion", "delayed", "disrupted", "recovery", "incident"], completion: ["evidence"],
  evidence: ["reconciliation"], reconciliation: ["closed", "recovery"],
  recovery: ["assignment", "preparation", "pickup", "boarding", "active", "handoff", "completion", "cancelled", "abandoned"],
  delayed: ["active", "disrupted", "recovery", "cancelled", "abandoned"], disrupted: ["recovery", "active", "cancelled", "abandoned"],
  incident: ["recovery", "active", "completion", "cancelled", "abandoned"], abandoned: [], denied: [], cancelled: [], closed: [], completed: [],
  planned: ["ready", "cancelled", "blocked"], ready: ["active", "cancelled", "blocked"], blocked: ["ready", "cancelled"],
};

export class CharterJourneyExecutionRuntime {
  readonly events: CharterJourneyEventStore;

  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime, eventEngine = new EventEngine(objects.persistence)) {
    this.events = new CharterJourneyEventStore(eventEngine);
  }

  create(journeyId: string): JourneyExecution { return { journeyId, state: "intent", completedLegs: [] }; }

  async transition(input: JourneyExecution, to: JourneyExecutionState, actor = "charter-runtime", payload: Record<string, unknown> = {}): Promise<JourneyExecution> {
    if (!(await this.objects.read(input.journeyId))) throw new Error(`Journey not found: ${input.journeyId}`);
    if (!JOURNEY_TRANSITIONS[input.state].includes(to)) throw new Error(`Invalid journey transition: ${input.state} -> ${to}`);
    const next = { ...input, state: to };
    await this.events.append({ journeyId: input.journeyId, eventType: `journey:${to}`, actor, priorState: input.state, resultingState: to, payload, provenance: { source: "charter-journey-execution-runtime" } });
    return next;
  }

  async recordEvent(input: Omit<JourneyExecutionEvent, "eventId" | "timestamp">): Promise<JourneyExecutionEvent> { return this.events.append(input); }
  async listEvents(journeyId: string): Promise<JourneyExecutionEvent[]> { return this.events.byJourney(journeyId); }

  async start(journeyId: string): Promise<JourneyExecution> {
    if (!(await this.objects.read(journeyId))) throw new Error(`Journey not found: ${journeyId}`);
    return { journeyId, state: "active", completedLegs: [] };
  }
  async progress(input: JourneyExecution, legId: string): Promise<JourneyExecution> {
    if (!(await this.objects.read(legId))) throw new Error(`Journey leg not found: ${legId}`);
    return { ...input, state: "active", currentLeg: legId };
  }
  async completeLeg(input: JourneyExecution, legId: string): Promise<JourneyExecution> {
    if (!(await this.objects.read(legId))) throw new Error(`Journey leg not found: ${legId}`);
    const completedLegs = input.completedLegs.includes(legId) ? input.completedLegs : [...input.completedLegs, legId];
    return { ...input, state: "active", currentLeg: undefined, completedLegs };
  }
  delay(input: JourneyExecution, reason: string): JourneyExecution { return { ...input, state: "delayed", blockedReason: reason }; }
  block(input: JourneyExecution, reason: string): JourneyExecution { return { ...input, state: "blocked", blockedReason: reason }; }
  cancel(input: JourneyExecution, reason: string): JourneyExecution { return { ...input, state: "cancelled", blockedReason: reason }; }
  finish(input: JourneyExecution): JourneyExecution { return { ...input, state: "completed", currentLeg: undefined, blockedReason: undefined }; }
}
