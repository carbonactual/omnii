import test from 'node:test';
import assert from 'node:assert/strict';
import { createMintRecord } from '../src/mint.mjs';
import { classifyTokenization } from '../src/tokenization.mjs';
import { createRightsRecord } from '../src/rights.mjs';
import { createLifecycleTransition, preserveHistoricalTrace } from '../src/lifecycle.mjs';
import { createAgentAuthority, authorizeAgentAction, revokeAgentAuthority } from '../src/agent-authority.mjs';
import { createGovernedIOTransition } from '../src/integration.mjs';

test('integrated value lifecycle preserves separation of mint, token and rights', () => {
  const mint = createMintRecord({ objectRef: 'asset:1', issuerRef: 'human:1', pulseRef: 'pulse:1' });
  const token = classifyTokenization({ underlyingRef: 'asset:1', mintRef: mint.id, representation: 'fractional', tokenClass: 'fractional', eligible: true, quantity: 100, decimals: 2 });
  const right = createRightsRecord({ subjectRef: token.id, kind: 'claim', holderRef: 'human:2' });
  assert.equal(mint.kind, 'mint');
  assert.equal(token.mintRef, mint.id);
  assert.equal(right.subjectRef, token.id);
  assert.notEqual(token.createsOwnership, true);
});

test('lifecycle correction preserves the original trace', () => {
  const correction = createLifecycleTransition({
    action: 'correction',
    subjectRef: 'io-transition:1',
    priorTransitionRef: 'io-transition:0',
    reason: 'source data correction',
    actorRef: 'human:1',
    authorityRef: 'seal:1',
  });
  const trace = preserveHistoricalTrace({
    originalRef: 'io-transition:0',
    lifecycleTransitionRef: correction.id,
    currentRef: 'io-transition:1',
  });
  assert.equal(correction.status, 'corrected');
  assert.equal(trace.historyPreserved, true);
});

test('agent actions remain attributable to a principal and can escalate', () => {
  const authority = createAgentAuthority({
    agentRef: 'agent:1',
    principalRef: 'human:1',
    scope: ['mint', 'tokenize'],
    capabilities: ['value-movement'],
    escalationRequiredFor: ['tokenize'],
  });
  assert.equal(authorizeAgentAction(authority, { action: 'mint', capability: 'value-movement' }).decision, 'allow');
  assert.equal(authorizeAgentAction(authority, { action: 'tokenize', capability: 'value-movement' }).decision, 'escalate');
  assert.equal(revokeAgentAuthority(authority, 'human revocation').status, 'revoked');
});

test('governed IO transition combines ASH and agent authority', () => {
  const authority = createAgentAuthority({ agentRef: 'agent:1', principalRef: 'human:1', scope: ['mint'] });
  const result = createGovernedIOTransition({
    action: 'mint',
    actorRef: 'agent:1',
    principalRef: 'human:1',
    valueRef: 'value:1',
    agentAuthority: authority,
    agentAction: { action: 'mint' },
    assurance: {
      identityAssured: true,
      actorAuthenticated: true,
      authorityProven: true,
      provenanceIntact: true,
      evidenceIntact: true,
      antiDuplicationClear: true,
      privacySatisfied: true,
    },
  });
  assert.equal(result.status, 'authorized');
  assert.equal(result.principalRef, 'human:1');
  assert.equal(result.valueRef, 'value:1');
});
