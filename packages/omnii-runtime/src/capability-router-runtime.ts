import { CapabilityDescriptor, CapabilityRegistryRuntime, CapabilityRiskClass, CapabilitySideEffect } from "./capability-fabric-runtime";

export interface CapabilityRouteRequest {
  capabilityId: string;
  riskClass?: CapabilityRiskClass;
  sideEffect?: CapabilitySideEffect;
  providerIds?: string[];
  requireApproval?: boolean;
}

export interface CapabilityRouteCandidate {
  capabilityId: string;
  providerId: string;
  score: number;
  riskClass: CapabilityRiskClass;
  sideEffect: CapabilitySideEffect;
  reliabilityHint: number;
  latencyHint: number;
  costHint: number;
  requiresAuthority: boolean;
  requiresApproval: boolean;
}

export interface CapabilityRouteResult {
  capabilityId: string;
  candidates: CapabilityRouteCandidate[];
  selectedProviderId?: string;
  authorized: false;
  requiresAuthority: boolean;
  requiresApproval: boolean;
  explanation: string[];
}

const riskRank: Record<CapabilityRiskClass, number> = { low: 1, medium: 2, high: 3, critical: 4 };

export class CapabilityRouterRuntime {
  constructor(private readonly registry: CapabilityRegistryRuntime) {}

  async route(request: CapabilityRouteRequest): Promise<CapabilityRouteResult> {
    const descriptors = await this.registry.active(request.capabilityId);
    const filtered = descriptors.filter((item) => !request.providerIds || request.providerIds.includes(item.providerId));
    const candidates = filtered.map((item) => this.toCandidate(item, request)).sort((left, right) =>
      right.score - left.score || left.providerId.localeCompare(right.providerId),
    );
    const selected = candidates[0];
    const requiresAuthority = candidates.some((candidate) => candidate.requiresAuthority);
    const requiresApproval = Boolean(request.requireApproval) || candidates.some((candidate) => candidate.requiresApproval);
    return {
      capabilityId: request.capabilityId,
      candidates,
      selectedProviderId: selected?.providerId,
      authorized: false,
      requiresAuthority,
      requiresApproval,
      explanation: selected
        ? [`selected_provider=${selected.providerId}`, `candidate_count=${candidates.length}`, `authorization=separate_authority_gate`]
        : ["no_active_provider"]
    };
  }

  private toCandidate(item: CapabilityDescriptor, request: CapabilityRouteRequest): CapabilityRouteCandidate {
    const riskCompatible = !request.riskClass || riskRank[item.riskClass] <= riskRank[request.riskClass];
    const sideEffectCompatible = !request.sideEffect || item.sideEffect === request.sideEffect;
    const requiresAuthority = item.authorityClass === "delegated" || item.authorityClass === "human-required";
    const requiresApproval = item.riskClass === "high" || item.riskClass === "critical" || requiresAuthority;
    const score =
      (riskCompatible ? 100 : -1000) +
      (sideEffectCompatible ? 50 : -500) +
      item.reliabilityHint * 30 -
      item.latencyHint * 0.05 -
      item.costHint * 0.1;
    return {
      capabilityId: item.id,
      providerId: item.providerId,
      score,
      riskClass: item.riskClass,
      sideEffect: item.sideEffect,
      reliabilityHint: item.reliabilityHint,
      latencyHint: item.latencyHint,
      costHint: item.costHint,
      requiresAuthority,
      requiresApproval
    };
  }
}
