const TRANSITIONS = Object.freeze({
  intake: ['validation'],
  validation: ['authority_review'],
  authority_review: ['decision'],
  decision: ['action', 'closed'],
  action: ['closed'],
  closed: [],
});

export function createProcess({ id, processType, subjectRef = null, stage = 'intake', context = {} } = {}) {
  if (!id) throw new Error('id is required');
  if (!processType) throw new Error('processType is required');
  return { id, processType, subjectRef, stage, context, status: 'open', authorityRef: null, evidenceRefs: [] };
}

export function canTransitionProcess(from, to) {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function transitionProcess(process, to) {
  if (!canTransitionProcess(process?.stage, to)) throw new Error(`invalid workflow transition: ${process?.stage} -> ${to}`);
  return { ...process, stage: to };
}
