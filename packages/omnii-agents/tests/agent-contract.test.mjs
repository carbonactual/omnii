import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan, addDependency, canExecutePlan } from '../src/planning.mjs';
import { coordinateAgents } from '../src/coordination.mjs';
import { evaluateAgent } from '../src/evaluation.mjs';
import { transitionAgent } from '../src/lifecycle.mjs';

test('plan construction never implies execution and dependencies gate readiness', () => {
  const plan = addDependency(createPlan('ship feature'), 'evidence:1');
  assert.equal(plan.executed, false);
  assert.equal(canExecutePlan(plan), false);
  const ready = { ...plan, satisfiedDependencies: ['evidence:1'] };
  assert.equal(canExecutePlan(ready), true);
});

test('coordination preserves authority boundary', () => {
  const result = coordinateAgents([{ id: 'a', capabilities: ['research'] }], { requiredCapability: 'research' });
  assert.equal(result.candidates.length, 1);
  assert.equal(result.authorityGranted, false);
});

test('evaluation produces feedback without changing authority', () => {
  const result = evaluateAgent('a', { quality: 1, reliability: 0.5 });
  assert.equal(result.agentId, 'a');
  assert.equal(result.authorityChanged, false);
});

test('lifecycle transitions are explicit and bounded', () => {
  assert.equal(transitionAgent('registered', 'active'), 'active');
  assert.throws(() => transitionAgent('retired', 'active'), /invalid agent lifecycle transition/);
});
