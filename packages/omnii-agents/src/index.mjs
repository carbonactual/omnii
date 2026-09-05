const TRANSITIONS = new Map([
  ['registered', new Set(['active', 'suspended', 'retired'])],
  ['active', new Set(['suspended', 'retired'])],
  ['suspended', new Set(['active', 'retired'])],
  ['retired', new Set()]
]);

export function createPlan(goal, steps = []) {
  if (!goal) throw new Error('goal is required');
  return { goal, steps: Array.isArray(steps) ? [...steps] : [], state: 'planned', executed: false };
}

export function evaluateAgent(agentId, signals = {}) {
  if (!agentId) throw new Error('agentId is required');
  const values = Object.values(signals).filter((v) => typeof v === 'boolean');
  const score = values.length ? values.filter(Boolean).length / values.length : 0;
  return { agentId, score, authorityChanged: false };
}

export function lifecycleTransition(current, next) {
  if (!TRANSITIONS.get(current)?.has(next)) throw new Error(`invalid agent lifecycle transition: ${current} -> ${next}`);
  return next;
}
