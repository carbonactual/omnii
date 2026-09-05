export function evaluateAgent(agentId, signals = {}) {
  if (!agentId) throw new Error('agentId is required');
  const numeric = Object.values(signals).filter((value) => typeof value === 'number' && Number.isFinite(value));
  const boolean = Object.values(signals).filter((value) => typeof value === 'boolean');
  const values = numeric.length ? numeric : boolean.map((value) => (value ? 1 : 0));
  const score = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  return { agentId, score, authorityChanged: false, feedbackOnly: true };
}
