import test from 'node:test';
import assert from 'node:assert/strict';
import { createValueVector } from '../src/value.mjs';
import { calculatePulse } from '../src/pulse.mjs';
import { classifyTokenization } from '../src/tokenization.mjs';
import { createMarketOffer, createTrade } from '../src/market.mjs';
import { createInvestment } from '../src/investment.mjs';

test('value and Pulse remain distinct', () => {
  const value = createValueVector({ sent: 100, dimensions: { time: 40, energy: 60 } });
  const pulse = calculatePulse({ valueSent: 100, valueReturned: 130 });
  assert.equal(value.kind, 'value');
  assert.equal(pulse.signal, 'asset-side');
  assert.equal(pulse.authorityGranted, false);
});

test('tokenization represents rights and does not create ownership', () => {
  const result = classifyTokenization({ underlyingRef: 'right:1', representation: 'fractional', eligible: true });
  assert.equal(result.status, 'eligible');
  assert.equal(result.createsOwnership, false);
});

test('market primitives separate offer from executed trade', () => {
  const offer = createMarketOffer({ sellerRef: 'agent:a', itemRef: 'service:1', quantity: 1 });
  assert.equal(offer.status, 'open');
  const trade = createTrade({ offerRef: offer.id, buyerRef: 'agent:b', authorityRef: null });
  assert.equal(trade.executed, false);
});

test('investment tracks exposure and does not imply guaranteed return', () => {
  const investment = createInvestment({ investorRef: 'agent:a', assetRef: 'asset:1', amount: 500 });
  assert.equal(investment.amount, 500);
  assert.equal(investment.guaranteedReturn, false);
});
