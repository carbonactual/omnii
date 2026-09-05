import test from 'node:test';
import assert from 'node:assert/strict';
import { BUILT_PRODUCT_REPOSITORIES, catalogBuiltProducts, registerProduct } from '../src/catalog.mjs';

test('built product catalog preserves canonical repository lineage', () => {
  const products = catalogBuiltProducts();
  assert.equal(products.length, 13);
  assert.ok(products.some((item) => item.productKey === 'ABBA' && item.repository === 'carbonactual/abba'));
  assert.ok(products.some((item) => item.productKey === 'BUNK' && item.repository === 'carbonactual/omnii'));
});

test('product registration requires capabilities and source lineage', () => {
  const adapter = registerProduct({
    productKey: 'TEST',
    productVersion: '1.0.0',
    capabilities: ['world.orientation'],
    domains: ['test'],
    sourceLineage: ['carbonactual/example@abc123:path']
  }, { status: 'conforming', implementationEvidence: true });
  assert.equal(adapter.status, 'conforming');
  assert.equal(adapter.implementationEvidence, true);
});

test('implementation evidence cannot silently promote a specified product', () => {
  assert.throws(() => registerProduct({
    productKey: 'TEST',
    capabilities: ['world.orientation'],
    domains: ['test'],
    sourceLineage: ['source']
  }, { status: 'specified', implementationEvidence: true }), /upgrade/);
});

assert.equal(BUILT_PRODUCT_REPOSITORIES.length, 13);
console.log('product catalog contract tests passed');
