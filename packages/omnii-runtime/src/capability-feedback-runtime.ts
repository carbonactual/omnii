export interface CapabilityOutcomeObservation {
  capabilityId: string;
  providerId: string;
  success: boolean;
  observedLatency?: number;
  observedCost?: number;
}

export interface CapabilitySignalHistory {
  attempts: number;
  successes: number;
  latencyTotal?: number;
  costTotal?: number;
}

export interface CapabilitySignal {
  capabilityId: string;
  providerId: string;
  attempts: number;
  successes: number;
  successRate: number;
  averageLatency?: number;
  averageCost?: number;
}

export interface CapabilityFeedbackResult {
  signals: CapabilitySignal[];
  selectionHints: Record<string, number>;
  warnings: string[];
  authorityGranted: false;
}

const nonNegativeInt = (value: number): number => Number.isInteger(value) && value >= 0 ? value : 0;
const nonNegativeFinite = (value: number | undefined): number | undefined =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
const boundedRate = (attempts: number, successes: number): number => attempts === 0 ? 0 : successes / attempts;

export class CapabilityFeedbackRuntime {
  learn(input: {
    outcomes: CapabilityOutcomeObservation[];
    history?: Record<string, CapabilitySignalHistory>;
  }): CapabilityFeedbackResult {
    const merged = new Map<string, CapabilitySignalHistory>();
    for (const [key, value] of Object.entries(input.history ?? {})) {
      merged.set(key, {
        attempts: nonNegativeInt(value.attempts),
        successes: Math.min(nonNegativeInt(value.successes), nonNegativeInt(value.attempts)),
        latencyTotal: nonNegativeFinite(value.latencyTotal) ?? 0,
        costTotal: nonNegativeFinite(value.costTotal) ?? 0,
      });
    }

    const warnings: string[] = [];
    for (const outcome of input.outcomes) {
      const capabilityId = outcome.capabilityId.trim();
      const providerId = outcome.providerId.trim();
      if (!capabilityId || !providerId) continue;
      const key = `${capabilityId}::${providerId}`;
      const current = merged.get(key) ?? { attempts: 0, successes: 0, latencyTotal: 0, costTotal: 0 };
      const latency = nonNegativeFinite(outcome.observedLatency);
      const cost = nonNegativeFinite(outcome.observedCost);
      merged.set(key, {
        attempts: current.attempts + 1,
        successes: current.successes + (outcome.success ? 1 : 0),
        latencyTotal: (current.latencyTotal ?? 0) + (latency ?? 0),
        costTotal: (current.costTotal ?? 0) + (cost ?? 0),
      });
      if (!outcome.success) warnings.push("provider_outcome_unsuccessful");
    }

    const signals: CapabilitySignal[] = [...merged.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => {
        const separator = key.indexOf("::");
        const capabilityId = separator >= 0 ? key.slice(0, separator) : key;
        const providerId = separator >= 0 ? key.slice(separator + 2) : "";
        const averageLatency = value.attempts > 0 && (value.latencyTotal ?? 0) > 0 ? (value.latencyTotal ?? 0) / value.attempts : undefined;
        const averageCost = value.attempts > 0 && (value.costTotal ?? 0) > 0 ? (value.costTotal ?? 0) / value.attempts : undefined;
        return {
          capabilityId,
          providerId,
          attempts: value.attempts,
          successes: value.successes,
          successRate: boundedRate(value.attempts, value.successes),
          averageLatency,
          averageCost,
        };
      });

    const selectionHints: Record<string, number> = {};
    for (const signal of signals) selectionHints[`${signal.capabilityId}::${signal.providerId}`] = signal.successRate;
    return {
      signals,
      selectionHints,
      warnings: [...new Set(warnings)].sort(),
      authorityGranted: false,
    };
  }
}
