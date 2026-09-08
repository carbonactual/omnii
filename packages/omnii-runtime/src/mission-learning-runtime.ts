export interface MissionCapabilityOutcome {
  capability: string;
  success: boolean;
}

export interface MissionMemberOutcome {
  memberId: string;
  success: boolean;
}

export interface MissionOutcome {
  missionId: string;
  successful: boolean;
  capabilityOutcomes: MissionCapabilityOutcome[];
  memberOutcomes: MissionMemberOutcome[];
}

export interface MissionSignalHistory {
  capabilities?: Record<string, { attempts: number; successes: number }>;
  members?: Record<string, { attempts: number; successes: number }>;
}

export interface MissionSignal {
  capability: string;
  attempts: number;
  successes: number;
  successRate: number;
}

export interface MissionMemberSignal {
  memberId: string;
  attempts: number;
  successes: number;
  successRate: number;
}

export interface MissionLearningResult {
  missionId: string;
  capabilitySignals: MissionSignal[];
  memberSignals: MissionMemberSignal[];
  selectionHints: Record<string, number>;
  warnings: string[];
  authorityGranted: false;
}

const clampNonNegativeInt = (value: number): number =>
  Number.isInteger(value) && value >= 0 ? value : 0;

const rate = (attempts: number, successes: number): number =>
  attempts === 0 ? 0 : successes / attempts;

function aggregateCapabilities(
  outcomes: MissionCapabilityOutcome[],
  history: Record<string, { attempts: number; successes: number }>,
): MissionSignal[] {
  const merged = new Map<string, { attempts: number; successes: number }>();
  for (const [name, value] of Object.entries(history)) {
    merged.set(name, {
      attempts: clampNonNegativeInt(value.attempts),
      successes: clampNonNegativeInt(Math.min(value.successes, value.attempts)),
    });
  }
  const seen = new Set<string>();
  for (const outcome of outcomes) {
    const capability = outcome.capability.trim();
    if (!capability || seen.has(capability)) continue;
    seen.add(capability);
    const current = merged.get(capability) ?? { attempts: 0, successes: 0 };
    merged.set(capability, {
      attempts: current.attempts + 1,
      successes: current.successes + (outcome.success ? 1 : 0),
    });
  }
  return [...merged.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([capability, value]) => ({ capability, ...value, successRate: rate(value.attempts, value.successes) }));
}

function aggregateMembers(
  outcomes: MissionMemberOutcome[],
  history: Record<string, { attempts: number; successes: number }>,
): MissionMemberSignal[] {
  const merged = new Map<string, { attempts: number; successes: number }>();
  for (const [id, value] of Object.entries(history)) {
    merged.set(id, {
      attempts: clampNonNegativeInt(value.attempts),
      successes: clampNonNegativeInt(Math.min(value.successes, value.attempts)),
    });
  }
  const seen = new Set<string>();
  for (const outcome of outcomes) {
    const memberId = outcome.memberId.trim();
    if (!memberId || seen.has(memberId)) continue;
    seen.add(memberId);
    const current = merged.get(memberId) ?? { attempts: 0, successes: 0 };
    merged.set(memberId, {
      attempts: current.attempts + 1,
      successes: current.successes + (outcome.success ? 1 : 0),
    });
  }
  return [...merged.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([memberId, value]) => ({ memberId, ...value, successRate: rate(value.attempts, value.successes) }));
}

export class MissionLearningRuntime {
  learn(outcome: MissionOutcome, history: MissionSignalHistory = {}): MissionLearningResult {
    const capabilitySignals = aggregateCapabilities(outcome.capabilityOutcomes, history.capabilities ?? {});
    const memberSignals = aggregateMembers(outcome.memberOutcomes, history.members ?? {});
    const selectionHints: Record<string, number> = {};

    for (const signal of capabilitySignals) selectionHints[signal.capability] = signal.successRate;
    for (const signal of memberSignals) selectionHints[signal.memberId] = signal.successRate;

    const warnings = outcome.successful ? [] : ["outcome_unsuccessful"];
    return {
      missionId: outcome.missionId,
      capabilitySignals,
      memberSignals,
      selectionHints,
      warnings,
      authorityGranted: false,
    };
  }
}
