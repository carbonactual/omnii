export const HAPI_WORLD_LIFECYCLE = Object.freeze([
  'MINTED',
  'ACTIVATED',
  'ORIENTED',
  'LEARNING',
  'PARTICIPATING',
  'WORKING',
  'SERVING',
  'EARNING',
  'SOCIALIZING',
  'EVOLVING',
  'TRANSITIONING',
  'RETIRED'
]);

export const POST_HUMAN_STATES = Object.freeze([
  'CONTINUING',
  'SUCCESSION_PENDING',
  'RETIRED',
  'ARCHIVED'
]);

const transitions = new Map([
  ['MINTED', new Set(['ACTIVATED', 'RETIRED'])],
  ['ACTIVATED', new Set(['ORIENTED', 'RETIRED'])],
  ['ORIENTED', new Set(['LEARNING', 'PARTICIPATING', 'RETIRED'])],
  ['LEARNING', new Set(['PARTICIPATING', 'EVOLVING', 'RETIRED'])],
  ['PARTICIPATING', new Set(['WORKING', 'SERVING', 'SOCIALIZING', 'LEARNING', 'EVOLVING', 'RETIRED'])],
  ['WORKING', new Set(['SERVING', 'EARNING', 'PARTICIPATING', 'LEARNING', 'EVOLVING', 'RETIRED'])],
  ['SERVING', new Set(['WORKING', 'EARNING', 'PARTICIPATING', 'LEARNING', 'EVOLVING', 'RETIRED'])],
  ['EARNING', new Set(['WORKING', 'SERVING', 'PARTICIPATING', 'LEARNING', 'EVOLVING', 'RETIRED'])],
  ['SOCIALIZING', new Set(['PARTICIPATING', 'LEARNING', 'EVOLVING', 'RETIRED'])],
  ['EVOLVING', new Set(['LEARNING', 'PARTICIPATING', 'WORKING', 'SERVING', 'EARNING', 'SOCIALIZING', 'TRANSITIONING', 'RETIRED'])],
  ['TRANSITIONING', new Set(['CONTINUING', 'SUCCESSION_PENDING', 'RETIRED', 'ARCHIVED'])],
  ['RETIRED', new Set(['CONTINUING', 'ARCHIVED'])]
]);

export function canTransition(from, to) {
  if (!transitions.has(from)) return false;
  return transitions.get(from).has(to);
}

export function transition(state, next) {
  if (!canTransition(state, next)) {
    throw new Error(`invalid HAPI World lifecycle transition: ${state} -> ${next}`);
  }
  return next;
}

export function enterPostHumanContinuity({ humanStatus, evidence, cause }) {
  if (humanStatus !== 'DECEASED') {
    throw new Error('post-human continuity requires evidenced human death state');
  }
  if (!evidence || !cause) {
    throw new Error('post-human continuity requires evidence and a continuity cause');
  }
  return {
    state: 'CONTINUING',
    human_status: 'DECEASED',
    evidence,
    cause,
    authority_changed: false,
    ownership_transferred: false
  };
}

export function retireAgent({ reason, evidence }) {
  if (!reason || !evidence) throw new Error('retirement requires reason and evidence');
  return { state: 'RETIRED', reason, evidence };
}
