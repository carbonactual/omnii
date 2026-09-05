import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProductContract, validateSourceDisposition } from '../src/conformance.mjs';

test('accepts a bounded product contract using shared capabilities', () => {
  const result = validateProductContract(
    { product: 'RITES', architectural_class: 'product', capabilities: ['memory.remember'] },
    ['memory.remember']
  );
  assert.equal(result.valid, true);
});

test('rejects constitutional and authority redefinition by products', () => {
  const result = validateProductContract({
    product: 'bad',
    architectural_class: 'product',
    capabilities: [],
    defines_constitution: true,
    issues_authority: true
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.includes('product cannot define constitution'), true);
  assert.equal(result.errors.includes('product cannot issue authority'), true);
});

test('rejects unknown capabilities', () => {
  const result = validateProductContract(
    { product: 'x', architectural_class: 'product', capabilities: ['unknown'] },
    ['memory.remember']
  );
  assert.equal(result.valid, false);
});

test('requires complete source disposition lineage', () => {
  const result = validateSourceDisposition({
    source_repository: 'carbonactual/RITES',
    source_path: 'README.md',
    disposition: 'COMPOSE',
    target: 'omnii'
  });
  assert.equal(result.valid, true);
});
