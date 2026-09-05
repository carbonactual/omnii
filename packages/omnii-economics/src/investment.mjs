export function createInvestment({ investorRef, assetRef, amount, thesis = null, horizon = null } = {}) {
  if (!investorRef) throw new Error('investorRef is required');
  if (!assetRef) throw new Error('assetRef is required');
  if (!(Number(amount) >= 0)) throw new Error('amount must be non-negative');
  return {
    id: `investment:${crypto.randomUUID()}`,
    investorRef,
    assetRef,
    amount: Number(amount),
    thesis,
    horizon,
    status: 'proposed',
    guaranteedReturn: false,
    authorityRef: null,
    evidenceRefs: [],
  };
}
