import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

export type JourneyExecutionState = "planned" | "ready" | "active" | "delayed" | "blocked" | "completed" | "cancelled";

export interface JourneyExecution {
  journeyId: string;
  state: JourneyExecutionState;
  currentLeg?: string;
  completedLegs: string[];
  blockedReason?: string;
}

export class CharterJourneyExecutionRuntime {
  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime) {}

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

  delay(input: JourneyExecution, reason: string): JourneyExecution {
    return { ...input, state: "delayed", blockedReason: reason };
  }

  block(input: JourneyExecution, reason: string): JourneyExecution {
    return { ...input, state: "blocked", blockedReason: reason };
  }

  cancel(input: JourneyExecution, reason: string): JourneyExecution {
    return { ...input, state: "cancelled", blockedReason: reason };
  }

  finish(input: JourneyExecution): JourneyExecution {
    return { ...input, state: "completed", currentLeg: undefined, blockedReason: undefined };
  }
}
