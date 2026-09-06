export type AssuranceDecision =
  | 'allow'
  | 'deny'
  | 'challenge'
  | 'hold'
  | 'quarantine'
  | 'escalate';

export interface IOTransitionEnvelope {
  id: string;
  action: string;
  actorRef?: string | null;
  principalRef?: string | null;
  subjectRef?: string | null;
  purpose?: string | null;
  inputRefs: string[];
  outputRefs: string[];
  pulseRef?: string | null;
  feedbackRef?: string | null;
  valueRef?: string | null;
  mintRef?: string | null;
  representationRef?: string | null;
  rightsRefs: string[];
  provenanceRefs: string[];
  evidenceRefs: string[];
  ledgerRef?: string | null;
  settlementRef?: string | null;
  policyRef?: string | null;
  previousState?: unknown;
  resultingState?: unknown;
  temporalValidity?: unknown;
  status: string;
  metadata: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ASHAssuranceEnvelope {
  kind: 'ash-assurance';
  decision: AssuranceDecision;
  identityAssured: boolean;
  actorAuthenticated: boolean;
  authorityProven: boolean;
  policyApplicable: boolean;
  credentialsValid: boolean;
  provenanceIntact: boolean;
  evidenceIntact: boolean;
  antiDuplicationClear: boolean;
  riskState: string;
  privacySatisfied: boolean;
  revoked: boolean;
}

export interface ProtectedIOTransition extends IOTransitionEnvelope {
  securityState: AssuranceDecision;
  ash: ASHAssuranceEnvelope;
}

export interface IOTransitionGuard {
  verifyIdentity: (transition: IOTransitionEnvelope) => boolean;
  verifyAuthority: (transition: IOTransitionEnvelope) => boolean;
  verifyPolicy: (transition: IOTransitionEnvelope) => boolean;
  verifyProvenance: (transition: IOTransitionEnvelope) => boolean;
  verifyEvidence: (transition: IOTransitionEnvelope) => boolean;
  verifyAntiDuplication: (transition: IOTransitionEnvelope) => boolean;
  verifyPrivacy: (transition: IOTransitionEnvelope) => boolean;
  revoked?: (transition: IOTransitionEnvelope) => boolean;
  riskState?: (transition: IOTransitionEnvelope) => string;
}

/**
 * Runtime boundary for consequential IO actions. It preserves the economic
 * references and delegates trust decisions to ASH-compatible guards.
 */
export function protectIOTransition(
  transition: IOTransitionEnvelope,
  guard: IOTransitionGuard,
): ProtectedIOTransition {
  if (!transition?.id) throw new Error('transition.id is required');
  if (!transition.action) throw new Error('transition.action is required');

  const identityAssured = guard.verifyIdentity(transition);
  const actorAuthenticated = identityAssured;
  const authorityProven = guard.verifyAuthority(transition);
  const policyApplicable = guard.verifyPolicy(transition);
  const credentialsValid = identityAssured;
  const provenanceIntact = guard.verifyProvenance(transition);
  const evidenceIntact = guard.verifyEvidence(transition);
  const antiDuplicationClear = guard.verifyAntiDuplication(transition);
  const privacySatisfied = guard.verifyPrivacy(transition);
  const revoked = guard.revoked?.(transition) ?? false;
  const riskState = guard.riskState?.(transition) ?? 'unknown';

  let decision: AssuranceDecision = 'allow';
  if (revoked) decision = 'deny';
  else if (!identityAssured || !actorAuthenticated || !authorityProven || !policyApplicable || !credentialsValid || !provenanceIntact || !evidenceIntact || !antiDuplicationClear || !privacySatisfied) decision = 'hold';

  const ash: ASHAssuranceEnvelope = {
    kind: 'ash-assurance',
    decision,
    identityAssured,
    actorAuthenticated,
    authorityProven,
    policyApplicable,
    credentialsValid,
    provenanceIntact,
    evidenceIntact,
    antiDuplicationClear,
    riskState,
    privacySatisfied,
    revoked,
  };

  return {
    ...transition,
    securityState: decision,
    status: decision === 'allow' ? 'authorized' : decision,
    ash,
  };
}
