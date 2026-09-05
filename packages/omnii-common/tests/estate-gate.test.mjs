import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEstateBoundary } from '../src/estate-gate.mjs';

test('accepts canonical product boundary declarations', () => {
  const result = validateEstateBoundary({ product: 'OMNI', class: 'product', runtime: 'canonical OMNII projection', consequential_gate: 'authorityRef' });
  assert.equal(result.valid, true);
});

test('rejects a product boundary that claims constitutional or authority power', () => {
  const result = validateEstateBoundary({ product: 'BAD', class: 'product', definesConstitution: true, issuesAuthority: true });
  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, ['product-cannot-define-constitution', 'product-cannot-issue-authority']);
});

test('rejects missing consequential gate', () => {
  const result = validateEstateBoundary({ product: 'BAD', class: 'product', runtime: 'x' });
  assert.equal(result.valid, false);
  assert.equal(result.errors.includes('consequential-gate-required'), true);
});
