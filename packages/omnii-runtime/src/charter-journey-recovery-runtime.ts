import { JourneyExecution } from "./charter-journey-execution-runtime";
import { ObjectRuntime } from "./object-runtime";

export interface JourneyRecovery {
  journeyId: string;
  reason: string;
  failedCapabilityId: string;
  replacementCapabilityId: string;
  state: "recovery" | "reassigned" | "resumed";
}

export class CharterJourneyRecoveryRuntime {
  constructor(private readonly objects: ObjectRuntime) {}

  async begin(input: JourneyExecution, failedCapabilityId: string, reason: string): Promise<JourneyRecovery> {
    if (!(await this.objects.read(failedCapabilityId))) throw new Error(`Failed capability not found: ${failedCapabilityId}`);
    return {
      journeyId: input.journeyId,
      reason,
      failedCapabilityId,
      replacementCapabilityId: "",
      state: "recovery",
    };
  }

  async reassign(input: JourneyRecovery, replacementCapabilityId: string): Promise<JourneyRecovery> {
    const replacement = await this.objects.read(replacementCapabilityId);
    if (!replacement) throw new Error(`Replacement capability not found: ${replacementCapabilityId}`);
    if (!["available", "eligible", "discoverable", "ready"].includes(replacement.status)) {
      throw new Error(`Replacement capability is not executable: ${replacement.status}`);
    }
    if (replacement.id === input.failedCapabilityId) throw new Error("Replacement capability must differ from failed capability");
    return { ...input, replacementCapabilityId, state: "reassigned" };
  }

  resume(input: JourneyRecovery): JourneyRecovery {
    if (input.state !== "reassigned") throw new Error(`Recovery must be reassigned before resume: ${input.state}`);
    return { ...input, state: "resumed" };
  }
}
