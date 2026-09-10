import assert from 'node:assert/strict';
import test from 'node:test';
import { defineProductAdapter, isImplementedProduct } from './adapter.mjs';

test('product adapter requires stable product key and capabilities', () => {
  assert.throws(() => defineProductAdapter({}), /productKey/);
  const adapter = defineProductAdapter({
    productKey: 'TEST_PRODUCT',
    capabilities: ['identity.resolve'],
    sourceLineage: ['test/source'],
  });
  assert.equal(adapter.productKey, 'TEST_PRODUCT');
  assert.deepEqual(adapter.capabilities, ['identity.resolve']);
  assert.equal(isImplementedProduct(adapter), false);
});

test('implemented adapter is explicitly evidenced', () => {
  const adapter = defineProductAdapter({
    productKey: 'TEST_PRODUCT',
    capabilities: ['identity.resolve'],
    sourceLineage: ['test/source'],
    implementationEvidence: true,
  });
  assert.equal(isImplementedProduct(adapter), true);
});
