const TRANSITIONS = new Map([
  ['registered', new Set(['active', 'suspended', 'retired'])],
  ['active', new Set(['suspended', 'retired'])],
  ['suspended', new Set(['active', 'retired'])],
  ['retired', new Set()],
]);

export function transitionAgent(current, next) {
  if (!TRANSITIONS.get(current)?.has(next)) throw new Error(`invalid agent lifecycle transition: ${current} -> ${next}`);
  return next;
}

export function suspendAgent(current = 'active', reason = null) {
  return { state: transitionAgent(current, 'suspended'), reason };
}

export function retireAgent(current = 'active', reason = null) {
  return { state: transitionAgent(current, 'retired'), reason };
}
