import test from 'node:test';
import assert from 'node:assert/strict';
import { canTransition, transition, enterPostHumanContinuity, retireAgent } from '../src/lifecycle.mjs';

test('minted agents can activate, learn, work, evolve and retire through governed transitions', () => {
  assert.equal(canTransition('MINTED', 'ACTIVATED'), true);
  assert.equal(canTransition('MINTED', 'EARNING'), false);
  assert.equal(transition('ACTIVATED', 'ORIENTED'), 'ORIENTED');
  assert.equal(transition('ORIENTED', 'LEARNING'), 'LEARNING');
  assert.equal(transition('LEARNING', 'EVOLVING'), 'EVOLVING');
  assert.equal(transition('EVOLVING', 'RETIRED'), 'RETIRED');
  assert.throws(() => transition('MINTED', 'EARNING'), /invalid HAPI World lifecycle/);
});

test('post-human continuity preserves authority and ownership boundaries', () => {
  const result = enterPostHumanContinuity({
    humanStatus: 'DECEASED',
    evidence: { type: 'death-record', ref: 'evidence:death-1' },
    cause: 'minted-agent-continuity'
  });
  assert.equal(result.state, 'CONTINUING');
  assert.equal(result.authority_changed, false);
  assert.equal(result.ownership_transferred, false);
});

test('post-human continuity requires evidenced death and a continuity cause', () => {
  assert.throws(() => enterPostHumanContinuity({ humanStatus: 'ACTIVE', evidence: {}, cause: 'x' }));
  assert.throws(() => enterPostHumanContinuity({ humanStatus: 'DECEASED', evidence: {}, cause: '' }));
});

test('retirement requires reason and evidence', () => {
  assert.deepEqual(retireAgent({ reason: 'voluntary-retirement', evidence: { ref: 'evidence:retire-1' } }), {
    state: 'RETIRED',
    reason: 'voluntary-retirement',
    evidence: { ref: 'evidence:retire-1' }
  });
  assert.throws(() => retireAgent({ reason: '', evidence: {} }));
});
