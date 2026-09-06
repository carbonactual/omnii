import test from 'node:test';
import assert from 'node:assert/strict';
import { createValueVector } from '../src/value.mjs';
import { calculatePulse } from '../src/pulse.mjs';
import { createMintRecord } from '../src/mint.mjs';
import { classifyTokenization, TOKEN_CLASSES, TRANSFORMATION_LAYERS } from '../src/tokenization.mjs';
import { createRightsRecord } from '../src/rights.mjs';
import { createIOTransition } from '../src/transition.mjs';
import { evaluateAshAssurance, protectIOTransition } from '../src/assurance.mjs';
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
  const mint = createMintRecord({ objectRef: 'value:1', issuerRef: 'human:1', pulseRef: 'pulse:1' });
  const result = classifyTokenization({ underlyingRef: 'value:1', mintRef: mint.id, representation: 'fractional', tokenClass: 'fractional', eligible: true, quantity: 100, decimals: 2 });
  assert.equal(result.status, 'eligible');
  assert.equal(result.mintRef, mint.id);
  assert.equal(result.createsOwnership, false);
  assert.equal(result.createsAuthority, false);
});

test('canonical transformation sequence is explicit and blockchain remains last/optional', () => {
  assert.deepEqual(TRANSFORMATION_LAYERS, ['democratization', 'decentralization', 'decimalization', 'fractionalization', 'tokenization', 'ledgers', 'blockchain']);
  assert.ok(TOKEN_CLASSES.includes('liability'));
  assert.ok(TOKEN_CLASSES.includes('capacity'));
  assert.ok(TOKEN_CLASSES.includes('capability'));
});

test('rights remain distinct from ownership, custody, control and authority', () => {
  const right = createRightsRecord({ subjectRef: 'asset:1', kind: 'access', holderRef: 'human:1' });
  assert.equal(right.rightKind, 'access');
  assert.equal(right.subjectRef, 'asset:1');
});

test('ASH protects an IO transition without rewriting economic references', () => {
  const transition = createIOTransition({ action: 'mint', actorRef: 'agent:1', principalRef: 'human:1', valueRef: 'value:1' });
  const allowed = protectIOTransition(transition, evaluateAshAssurance({ identityAssured: true, actorAuthenticated: true, authorityProven: true }));
  assert.equal(allowed.status, 'authorized');
  assert.equal(allowed.valueRef, 'value:1');

  const held = protectIOTransition(transition, evaluateAshAssurance({ identityAssured: true, actorAuthenticated: true, authorityProven: false }));
  assert.equal(held.status, 'hold');
  assert.equal(held.valueRef, 'value:1');
});

test('revoked authorization is denied', () => {
  const result = evaluateAshAssurance({ identityAssured: true, actorAuthenticated: true, authorityProven: true, revoked: true });
  assert.equal(result.decision, 'deny');
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
