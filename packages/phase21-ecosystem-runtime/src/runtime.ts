import {
  CrossEcosystemAgreement,
  Ecosystem,
  EcosystemContext,
  ExecutionRequest,
  ExecutionResult,
  RuntimeEvent,
} from "./types";

const now = () => new Date().toISOString();

export class EcosystemRuntime {
  private readonly ecosystems = new Map<string, Ecosystem>();
  private readonly agreements = new Map<string, CrossEcosystemAgreement>();
  private readonly events: RuntimeEvent[] = [];

  register(ecosystem: Ecosystem): void {
    if (this.ecosystems.has(ecosystem.id)) {
      throw new Error(`ecosystem already exists: ${ecosystem.id}`);
    }
    this.ecosystems.set(ecosystem.id, ecosystem);
  }

  get(ecosystemId: string): Ecosystem {
    const ecosystem = this.ecosystems.get(ecosystemId);
    if (!ecosystem) throw new Error(`unknown ecosystem: ${ecosystemId}`);
    return ecosystem;
  }

  addAgreement(agreement: CrossEcosystemAgreement): void {
    this.get(agreement.sourceEcosystemId);
    this.get(agreement.targetEcosystemId);
    if (agreement.sourceEcosystemId === agreement.targetEcosystemId) {
      throw new Error("cross-ecosystem agreement requires distinct ecosystems");
    }
    this.agreements.set(agreement.id, agreement);
  }

  transition(ecosystemId: string, next: Ecosystem["lifecycle"], context: EcosystemContext): RuntimeEvent {
    const ecosystem = this.get(ecosystemId);
    this.assertContext(ecosystem, context);

    const allowed: Record<Ecosystem["lifecycle"], Ecosystem["lifecycle"][]> = {
      proposed: ["constituted", "retired"],
      constituted: ["active", "restricted", "retiring"],
      active: ["restricted", "suspended", "retiring"],
      restricted: ["active", "suspended", "retiring"],
      suspended: ["recovering", "retiring"],
      recovering: ["active", "suspended", "retiring"],
      retiring: ["retired"],
      retired: [],
    };

    if (!allowed[ecosystem.lifecycle].includes(next)) {
      return this.record(context, "ecosystem.lifecycle.transition", "rejected", `invalid transition ${ecosystem.lifecycle} -> ${next}`);
    }

    ecosystem.lifecycle = next;
    return this.record(context, "ecosystem.lifecycle.transition", "accepted");
  }

  execute(context: EcosystemContext, request: ExecutionRequest): ExecutionResult {
    const source = this.get(context.ecosystemId);
    const rejected = (reason: string): ExecutionResult => ({
      accepted: false,
      reason,
      event: this.record(context, request.action, "rejected", reason),
    });

    try {
      this.assertContext(source, context);
    } catch (error) {
      return rejected(error instanceof Error ? error.message : "invalid ecosystem context");
    }

    if (source.lifecycle !== "active" && source.lifecycle !== "restricted") {
      return rejected(`ecosystem is not executable: ${source.lifecycle}`);
    }

    if (!source.capabilities.has(request.capability)) {
      return rejected(`capability not granted in ecosystem: ${request.capability}`);
    }

    if (request.resource && !source.resources.has(request.resource)) {
      return rejected(`resource is outside ecosystem scope: ${request.resource}`);
    }

    if (request.targetEcosystemId && request.targetEcosystemId !== source.id) {
      if (!this.hasAgreement(source.id, request.targetEcosystemId, request.action)) {
        return rejected("cross-ecosystem operation requires an explicit governed agreement");
      }
    }

    return { accepted: true, event: this.record(context, request.action, "accepted") };
  }

  inspect(ecosystemId: string): RuntimeEvent[] {
    this.get(ecosystemId);
    return this.events.filter((event) => event.ecosystemId === ecosystemId);
  }

  private hasAgreement(sourceId: string, targetId: string, action: string): boolean {
    return [...this.agreements.values()].some(
      (agreement) =>
        agreement.sourceEcosystemId === sourceId &&
        agreement.targetEcosystemId === targetId &&
        agreement.allowedOperations.has(action) &&
        (!agreement.expiresAt || agreement.expiresAt > now()),
    );
  }

  private assertContext(ecosystem: Ecosystem, context: EcosystemContext): void {
    if (context.ecosystemId !== ecosystem.id) throw new Error("ecosystem context mismatch");
    if (!ecosystem.participants.has(context.actorId) && context.authority.id !== ecosystem.steward.id) {
      throw new Error("actor is not a participant or authorized steward");
    }
    if (context.authority.scope !== ecosystem.id && context.authority.id !== ecosystem.steward.id) {
      throw new Error("authority scope does not cover ecosystem");
    }
  }

  private record(
    context: EcosystemContext,
    action: string,
    outcome: RuntimeEvent["outcome"],
    _reason?: string,
  ): RuntimeEvent {
    const event: RuntimeEvent = {
      id: `evt_${this.events.length + 1}`,
      type: "ecosystem.runtime.action",
      ecosystemId: context.ecosystemId,
      actorId: context.actorId,
      authorityId: context.authority.id,
      action,
      outcome,
      timestamp: now(),
      correlationId: context.correlationId,
      provenance: `omnii:phase21:${context.correlationId}`,
    };
    this.events.push(event);
    return event;
  }
}
