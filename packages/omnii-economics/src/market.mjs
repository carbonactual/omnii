export function createMarketOffer({ sellerRef, itemRef, quantity = 1, terms = {} } = {}) {
  if (!sellerRef) throw new Error('sellerRef is required');
  if (!itemRef) throw new Error('itemRef is required');
  if (!(Number(quantity) > 0)) throw new Error('quantity must be positive');
  return { id: `offer:${crypto.randomUUID()}`, sellerRef, itemRef, quantity: Number(quantity), terms, status: 'open' };
}

export function createTrade({ offerRef, buyerRef, authorityRef = null } = {}) {
  if (!offerRef) throw new Error('offerRef is required');
  if (!buyerRef) throw new Error('buyerRef is required');
  return { id: `trade:${crypto.randomUUID()}`, offerRef, buyerRef, authorityRef, executed: false, settlementStatus: 'pending' };
}
