import { DEFAULT_PROTOCOL_PROFILES, type ProtocolIntent, type ProtocolKind } from "./protocols.js";

export interface RouteCandidate {
  readonly routeId: string;
  readonly capabilityId: string;
  readonly protocol: ProtocolKind;
  readonly providerId: string;
  readonly capabilityFit: number;
  readonly authoritySatisfied: boolean;
  readonly privacyScore: number;
  readonly availability: number;
  readonly trustScore: number;
  readonly valueScore: number;
  readonly latencyScore: number;
  readonly costScore: number;
  readonly dataBoundaryScore: number;
  readonly jurisdictionScore: number;
  readonly safe: boolean;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface RouteContext {
  readonly intent: ProtocolIntent;
  readonly requiredCapabilityId: string;
  readonly authorityRequired?: boolean;
  readonly privateData?: boolean;
  readonly jurisdiction?: string;
  readonly maxCost?: number;
  readonly maxLatencyMs?: number;
}

export interface RouteDecision {
  readonly selected?: RouteCandidate;
  readonly ranked: readonly RouteCandidate[];
  readonly outcome: "selected" | "no-safe-route";
  readonly reasons: readonly string[];
}

const DEFAULT_INTENT_PREFERENCE: Readonly<Record<ProtocolIntent, ProtocolKind>> = {
  deterministic: "CLI",
  "structured-tool-data": "MCP",
  "agent-delegation": "A2A",
  "direct-service": "API",
  "embedded-performance": "SDK",
  "browser-external-world": "WEB",
  "private-edge": "LOCAL",
};

function clamp(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}

function score(candidate: RouteCandidate, preferred: ProtocolKind): number {
  const preference = candidate.protocol === preferred ? 1 : 0;
  return (
    clamp(candidate.capabilityFit) * 0.22 +
    (candidate.authoritySatisfied ? 0.12 : 0) +
    clamp(candidate.privacyScore) * 0.10 +
    clamp(candidate.availability) * 0.10 +
    clamp(candidate.trustScore) * 0.18 +
    clamp(candidate.valueScore) * 0.08 +
    clamp(candidate.latencyScore) * 0.06 +
    clamp(candidate.costScore) * 0.04 +
    clamp(candidate.dataBoundaryScore) * 0.05 +
    clamp(candidate.jurisdictionScore) * 0.05 +
    preference * 0.10
  );
}

export function rankIntegrationRoutes(
  context: RouteContext,
  candidates: readonly RouteCandidate[],
): RouteDecision {
  const preferred = DEFAULT_INTENT_PREFERENCE[context.intent];
  const safe = candidates.filter((candidate) => {
    if (!candidate.safe || candidate.capabilityId !== context.requiredCapabilityId) return false;
    if (context.authorityRequired && !candidate.authoritySatisfied) return false;
    if (context.privateData && candidate.privacyScore < 0.7) return false;
    return true;
  });
  const ranked = [...safe].sort((a, b) => score(b, preferred) - score(a, preferred));
  if (ranked.length === 0) {
    return {
      ranked: [],
      outcome: "no-safe-route",
      reasons: ["no candidate satisfies capability, safety, and authority constraints"],
    };
  }
  return {
    selected: ranked[0],
    ranked,
    outcome: "selected",
    reasons: [
      `preferred protocol for ${context.intent} is ${preferred}`,
      "provider popularity is not a constitutional authority signal",
    ],
  };
}

export function supportsProtocolIntent(protocol: ProtocolKind, intent: ProtocolIntent): boolean {
  return DEFAULT_PROTOCOL_PROFILES.find((profile) => profile.kind === protocol)?.supports.includes(intent) ?? false;
}
