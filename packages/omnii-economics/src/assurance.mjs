export const ASSURANCE_DECISIONS = Object.freeze([
  'allow',
  'deny',
  'challenge',
  'hold',
  'quarantine',
  'escalate',
]);

export function evaluateAshAssurance({
  identityAssured = false,
  actorAuthenticated = false,
  authorityProven = false,
  policyApplicable = true,
  credentialsValid = true,
  provenanceIntact = true,
  evidenceIntact = true,
  antiDuplicationClear = true,
  riskState = 'unknown',
  privacySatisfied = true,
  revoked = false,
  requestedDecision = 'allow',
} = {}) {
  if (!ASSURANCE_DECISIONS.includes(requestedDecision)) throw new Error(`unsupported assurance decision: ${requestedDecision}`);
  const hardFailure = revoked || !identityAssured || !actorAuthenticated || !authorityProven || !policyApplicable || !credentialsValid || !provenanceIntact || !evidenceIntact || !antiDuplicationClear || !privacySatisfied;
  let decision = requestedDecision;
  if (hardFailure && decision === 'allow') decision = revoked ? 'deny' : 'hold';
  return {
    kind: 'ash-assurance',
    decision,
    identityAssured: Boolean(identityAssured),
    actorAuthenticated: Boolean(actorAuthenticated),
    authorityProven: Boolean(authorityProven),
    policyApplicable: Boolean(policyApplicable),
    credentialsValid: Boolean(credentialsValid),
    provenanceIntact: Boolean(provenanceIntact),
    evidenceIntact: Boolean(evidenceIntact),
    antiDuplicationClear: Boolean(antiDuplicationClear),
    riskState,
    privacySatisfied: Boolean(privacySatisfied),
    revoked: Boolean(revoked),
  };
}

export function protectIOTransition(transition, assurance) {
  if (!transition?.id) throw new Error('transition.id is required');
  if (assurance?.kind !== 'ash-assurance') throw new Error('assurance must be an ash-assurance record');
  return {
    ...transition,
    securityState: assurance.decision,
    status: assurance.decision === 'allow' ? 'authorized' : assurance.decision,
    ash: assurance,
  };
}
