import { JourneyExecution } from "./charter-journey-execution-runtime";
import { ObjectRuntime } from "./object-runtime";
import { RelationshipRuntime } from "./relationship-runtime";

export interface JourneyHandoff {
  journeyId: string;
  fromLegId: string;
  toLegId: string;
  state: "ready" | "active" | "completed";
}

export class CharterJourneyHandoffRuntime {
  constructor(readonly objects: ObjectRuntime, readonly relationships: RelationshipRuntime) {}

  async start(input: JourneyExecution, fromLegId: string, toLegId: string): Promise<JourneyHandoff> {
    if (input.currentLeg !== fromLegId) throw new Error(`Handoff must begin from current leg: ${fromLegId}`);
    if (fromLegId === toLegId) throw new Error("Handoff requires distinct legs");
    if (!(await this.objects.read(fromLegId))) throw new Error(`Journey leg not found: ${fromLegId}`);
    if (!(await this.objects.read(toLegId))) throw new Error(`Journey leg not found: ${toLegId}`);
    return { journeyId: input.journeyId, fromLegId, toLegId, state: "active" };
  }

  complete(input: JourneyHandoff): JourneyHandoff {
    if (input.state !== "active") throw new Error(`Cannot complete handoff from state: ${input.state}`);
    return { ...input, state: "completed" };
  }
}
