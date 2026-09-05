export function createSettlement({ transactionRef, valueRef = null, evidenceRefs = [] } = {}) {
  if (!transactionRef) throw new Error('transactionRef is required');
  return { id: `settlement:${crypto.randomUUID()}`, transactionRef, valueRef, evidenceRefs: [...evidenceRefs], status: 'pending' };
}

export function recordSettlement(settlement, evidenceRefs = []) {
  if (!settlement) throw new Error('settlement is required');
  if (!evidenceRefs.length) throw new Error('settlement evidence is required');
  return { ...settlement, evidenceRefs: [...new Set([...(settlement.evidenceRefs || []), ...evidenceRefs])], status: 'recorded' };
}
