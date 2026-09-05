export function calculatePulse({ valueSent = 0, valueReturned = 0, evidenceRefs = [] } = {}) {
  const sent = Number(valueSent);
  const returned = Number(valueReturned);
  if (![sent, returned].every(Number.isFinite)) throw new Error('valueSent and valueReturned must be numeric');
  const delta = returned - sent;
  return {
    kind: 'pulse',
    valueSent: sent,
    valueReturned: returned,
    delta,
    signal: delta > 0 ? 'asset-side' : delta < 0 ? 'liability-side' : 'balanced',
    evidenceRefs: [...evidenceRefs],
    authorityGranted: false,
  };
}
