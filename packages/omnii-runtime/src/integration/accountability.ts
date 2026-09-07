export type IntegrationOutcomeStatus =
  | "success"
  | "partial-success"
  | "timeout"
  | "dns-failure"
  | "authentication-failure"
  | "authorization-failure"
  | "incompatible"
  | "security-rejection"
  | "unexpected-output"
  | "failed";

export interface IntegrationOutcome {
  readonly integrationId: string;
  readonly status: IntegrationOutcomeStatus;
  readonly completed: boolean;
  readonly valueSent: number;
  readonly proofRefs: readonly string[];
  readonly evidenceRefs: readonly string[];
  readonly errorCode?: string;
  readonly errorMessage?: string;
  readonly outputDigest?: string;
}

export interface IntegrationFeedback {
  readonly pulseId: string;
  readonly kind: "completion" | "exception" | "quality" | "value";
  readonly value: number;
  readonly unit: string;
  readonly provenance: Readonly<Record<string, unknown>>;
}

export interface MintedPulseTerminalObject {
  readonly pulseId: string;
  readonly objectKind: "pulse-feedback";
  readonly location: "terminal";
  readonly tokenized: false;
  readonly indexTokenId?: never;
  readonly provenance: Readonly<Record<string, unknown>>;
}

export interface IntegrationAccountability {
  readonly outcome: IntegrationOutcome;
  readonly feedback: IntegrationFeedback;
  readonly minted: MintedPulseTerminalObject;
  readonly unresolvedValue: number;
}

export interface IntegrationAccountabilityDependencies {
  readonly mintPulse?: (feedback: IntegrationFeedback) => string;
  readonly routeToTerminal?: (minted: MintedPulseTerminalObject) => void;
}

function assertNonNegativeFinite(label: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${label} must be a finite non-negative number`);
}

export function normalizeIntegrationFeedback(outcome: IntegrationOutcome): IntegrationFeedback {
  assertNonNegativeFinite("valueSent", outcome.valueSent);
  const exceptional = outcome.status !== "success" && outcome.status !== "partial-success";
  return {
    pulseId: `pulse:${outcome.integrationId}:${outcome.status}`,
    kind: exceptional ? "exception" : "completion",
    value: outcome.completed ? 1 : 0,
    unit: "outcome",
    provenance: {
      integrationId: outcome.integrationId,
      status: outcome.status,
      proofRefs: [...outcome.proofRefs],
      evidenceRefs: [...outcome.evidenceRefs],
      outputDigest: outcome.outputDigest,
      errorCode: outcome.errorCode,
    },
  };
}

export function accountIntegrationOutcome(
  outcome: IntegrationOutcome,
  dependencies: IntegrationAccountabilityDependencies = {},
): IntegrationAccountability {
  if (!outcome.integrationId.trim()) throw new Error("integrationId is required");
  const feedback = normalizeIntegrationFeedback(outcome);
  const mintedPulseId = dependencies.mintPulse?.(feedback) ?? feedback.pulseId;
  const minted: MintedPulseTerminalObject = {
    pulseId: mintedPulseId,
    objectKind: "pulse-feedback",
    location: "terminal",
    tokenized: false,
    provenance: feedback.provenance,
  };
  dependencies.routeToTerminal?.(minted);
  return {
    outcome,
    feedback: { ...feedback, pulseId: mintedPulseId },
    minted,
    unresolvedValue: outcome.valueSent,
  };
}
