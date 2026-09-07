export type IdentityScheme = "did" | "ens" | "hns" | "dns" | "uri" | (string & {});

export interface IdentityRef {
  readonly scheme: IdentityScheme;
  readonly value: string;
  readonly method?: string;
  readonly controller?: string;
  readonly network?: string;
}

export interface NameRef {
  readonly scheme: IdentityScheme;
  readonly name: string;
  readonly normalized?: string;
  readonly namespace?: string;
  readonly network?: string;
}

export type CorrelationDecision =
  | "correlated"
  | "ambiguous"
  | "conflicted"
  | "stale"
  | "revoked"
  | "uncorrelated";

export interface CorrelationEvidence {
  readonly kind: string;
  readonly source: string;
  readonly target?: string;
  readonly proofRef: string;
  readonly strength?: "low" | "medium" | "high";
}

export interface CorrelationCandidate {
  readonly identity: IdentityRef;
  readonly score: number;
  readonly evidenceRefs: readonly string[];
}

export interface IdentityCorrelationDecision {
  readonly decision: CorrelationDecision;
  readonly candidates: readonly CorrelationCandidate[];
  readonly evidence: readonly CorrelationEvidence[];
}

export function createIdentityRef(
  scheme: IdentityScheme,
  value: string,
  metadata: Omit<IdentityRef, "scheme" | "value"> = {},
): IdentityRef {
  if (!scheme.trim()) throw new Error("identity scheme is required");
  if (!value.trim()) throw new Error("identity value is required");
  return { scheme, value, ...metadata };
}

export function correlateIdentity(
  identities: readonly IdentityRef[],
  evidence: readonly CorrelationEvidence[],
): IdentityCorrelationDecision {
  if (identities.length === 0) {
    return { decision: "uncorrelated", candidates: [], evidence: [] };
  }
  const validEvidence = evidence.filter((item) => item.proofRef.trim().length > 0);
  if (validEvidence.length === 0) {
    return {
      decision: "uncorrelated",
      candidates: identities.map((identity) => ({ identity, score: 0, evidenceRefs: [] })),
      evidence: [],
    };
  }

  const candidates = identities.map((identity) => {
    const refs = validEvidence
      .filter((item) => item.target === identity.value)
      .map((item) => item.proofRef);
    const score = Math.min(1, refs.length / Math.max(1, validEvidence.length));
    return { identity, score, evidenceRefs: refs };
  });
  const topScore = Math.max(...candidates.map((candidate) => candidate.score));
  const top = candidates.filter((candidate) => candidate.score === topScore && topScore > 0);

  if (top.length === 1) return { decision: "correlated", candidates, evidence: validEvidence };
  if (top.length > 1) return { decision: "ambiguous", candidates, evidence: validEvidence };
  return { decision: "uncorrelated", candidates, evidence: validEvidence };
}
