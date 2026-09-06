export const LIFECYCLE_ACTIONS = Object.freeze([
  'correction',
  'supersession',
  'revocation',
  'cancellation',
  'reversal',
  'restatement',
  'recovery',
  'retirement',
  'transformation',
]);

export const LIFECYCLE_STATUSES = Object.freeze([
  'active',
  'corrected',
  'superseded',
  'revoked',
  'cancelled',
  'reversed',
  'restated',
  'recovered',
  'retired',
  'transformed',
]);

function requireRef(name, value) {
  if (!value) throw new Error(`${name} is required`);
}

export function createLifecycleTransition({
  action,
  subjectRef,
  priorTransitionRef = null,
  reason,
  actorRef = null,
  authorityRef = null,
  evidenceRefs = [],
  resultingState = null,
  effectiveAt = null,
  metadata = {},
} = {}) {
  if (!LIFECYCLE_ACTIONS.includes(action)) throw new Error(`unsupported lifecycle action: ${action}`);
  requireRef('subjectRef', subjectRef);
  requireRef('reason', reason);

  const statusMap = {
    correction: 'corrected',
    supersession: 'superseded',
    revocation: 'revoked',
    cancellation: 'cancelled',
    reversal: 'reversed',
    restatement: 'restated',
    recovery: 'recovered',
    retirement: 'retired',
    transformation: 'transformed',
  };

  return {
    id: `lifecycle:${crypto.randomUUID()}`,
    kind: 'io-lifecycle-transition',
    action,
    subjectRef,
    priorTransitionRef,
    reason,
    actorRef,
    authorityRef,
    evidenceRefs: Array.isArray(evidenceRefs) ? [...evidenceRefs] : [],
    resultingState,
    effectiveAt,
    status: statusMap[action],
    metadata: { ...metadata },
  };
}

export function preserveHistoricalTrace({ originalRef, lifecycleTransitionRef, currentRef } = {}) {
  requireRef('originalRef', originalRef);
  requireRef('lifecycleTransitionRef', lifecycleTransitionRef);
  requireRef('currentRef', currentRef);
  return {
    originalRef,
    lifecycleTransitionRef,
    currentRef,
    historyPreserved: true,
  };
}
