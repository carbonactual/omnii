import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan, evaluateAgent, lifecycleTransition } from '../src/index.mjs';

test('agent planning creates plans without executing them', () => {
  const plan = createPlan('nasc-form', ['validate', 'review']);
  assert.equal(plan.state, 'planned');
  assert.equal(plan.executed, false);
});

test('agent evaluation records quality without changing authority', () => {
  const result = evaluateAgent('agent:1', { correct: true, safe: true });
  assert.equal(result.authorityChanged, false);
  assert.equal(result.score, 1);
});

test('agent lifecycle is explicit and bounded', () => {
  assert.equal(lifecycleTransition('registered', 'active'), 'active');
  assert.equal(lifecycleTransition('active', 'suspended'), 'suspended');
  assert.throws(() => lifecycleTransition('retired', 'active'));
});
