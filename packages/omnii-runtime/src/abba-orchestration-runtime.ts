import { JsonObject } from "./types";
import { CapabilityRiskClass, CapabilitySideEffect } from "./capability-fabric-runtime";
import { CapabilityRouterRuntime, CapabilityRouteResult } from "./capability-router-runtime";

export interface AbbaRelationshipContext {
  id: string;
  type: string;
  source: string;
  target: string;
}

export type AbbaRelationshipStatus = "contextual" | "canonical";

export interface AbbaRelationshipResolver {
  resolve(id: string): Promise<AbbaRelationshipContext | undefined>;
}

export interface AbbaCommandRequest {
  principal: string;
  command: string;
  capabilityIds: string[];
  correlationId: string;
  idempotencyKey: string;
  riskClass?: CapabilityRiskClass;
  sideEffect?: CapabilitySideEffect;
  providerIds?: string[];
  selectionHints?: Record<string, number>;
  relationships?: AbbaRelationshipContext[];
  context?: JsonObject;
}

export interface AbbaCommandResult {
  principal: string;
  command: string;
  correlationId: string;
  idempotencyKey: string;
  context: JsonObject;
  relationships: AbbaRelationshipContext[];
  relationshipStatus: AbbaRelationshipStatus;
  routes: CapabilityRouteResult[];
  nextBoundary: "MISSION_OR_AUTHORITY" | "CAPABILITY_GAP";
  executable: false;
  warnings: string[];
}

/**
 * Internal ABBA orchestration component. It is not a second intelligence layer.
 * It composes context, relationships and CACF routing before the existing
 * mission/authority/execution boundaries take over.
 */
export class AbbaOrchestrationRuntime {
  constructor(private readonly router: CapabilityRouterRuntime, private readonly relationships?: AbbaRelationshipResolver) {}

  async command(request: AbbaCommandRequest): Promise<AbbaCommandResult> {
    const principal = request.principal.trim();
    const command = request.command.trim();
    if (!principal) throw new Error("abba_principal_required");
    if (!command) throw new Error("abba_command_required");
    if (!request.correlationId.trim()) throw new Error("abba_correlation_required");
    if (!request.idempotencyKey.trim()) throw new Error("abba_idempotency_required");

    const capabilityIds = [...new Set(request.capabilityIds.map((id) => id.trim()).filter(Boolean))];
    const routes = await Promise.all(capabilityIds.map((capabilityId) => this.router.route({
      capabilityId,
      riskClass: request.riskClass,
      sideEffect: request.sideEffect,
      providerIds: request.providerIds,
      selectionHints: request.selectionHints,
    })));

    const warnings = routes
      .filter((route) => route.candidates.length === 0)
      .map((route) => `no_active_provider:${route.capabilityId}`);

    if (capabilityIds.length === 0) warnings.push("capability_required");

    const relationshipInput = request.relationships ?? [];
    let resolvedRelationships = structuredClone(relationshipInput);
    let relationshipStatus: AbbaRelationshipStatus = "contextual";
    if (this.relationships && relationshipInput.length) {
      const resolved = await Promise.all(relationshipInput.map((relationship) => this.relationships?.resolve(relationship.id)));
      if (resolved.some((relationship) => !relationship)) {
        warnings.push("canonical_relationship_not_resolved");
      } else {
        resolvedRelationships = resolved.filter((relationship): relationship is AbbaRelationshipContext => Boolean(relationship));
        relationshipStatus = "canonical";
      }
    }

    const uniqueWarnings = [...new Set(warnings)].sort();
    return {
      principal,
      command,
      correlationId: request.correlationId,
      idempotencyKey: request.idempotencyKey,
      context: structuredClone(request.context ?? {}),
      relationships: resolvedRelationships,
      relationshipStatus,
      routes,
      nextBoundary: uniqueWarnings.length ? "CAPABILITY_GAP" : "MISSION_OR_AUTHORITY",
      executable: false,
      warnings: uniqueWarnings,
    };
  }
}
