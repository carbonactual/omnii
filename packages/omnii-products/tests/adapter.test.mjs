import test from 'node:test';
import assert from 'node:assert/strict';
import { defineProductAdapter, isImplementedProduct } from '../src/index.mjs';

test('product adapter requires source lineage and canonical capabilities', () => {
  const adapter = defineProductAdapter({ productKey: 'nasc', productVersion: '1', capabilities: ['forms', 'workflow'], domains: ['institutional'], sourceLineage: ['carbonactual/abba-automation-ecosystem'] });
  assert.equal(adapter.productKey, 'nasc');
  assert.deepEqual(adapter.capabilities, ['forms', 'workflow']);
  assert.deepEqual(adapter.sourceLineage, ['carbonactual/abba-automation-ecosystem']);
});

test('implementation status is evidence based', () => {
  assert.equal(isImplementedProduct({ status: 'conforming', implementationEvidence: true }), true);
  assert.equal(isImplementedProduct({ status: 'specified', implementationEvidence: false }), false);
  assert.equal(isImplementedProduct({ status: 'conforming', implementationEvidence: false }), false);
});
