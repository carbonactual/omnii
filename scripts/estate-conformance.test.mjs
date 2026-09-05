import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEstateProduct } from './estate-conformance.mjs';

test('estate validator accepts products composed from shared capabilities', () => {
  const result = validateEstateProduct({
    product: 'RITES',
    architectural_class: 'product',
    capabilities: ['memory.remember'],
    defines_constitution: false,
    issues_authority: false,
  });
  assert.equal(result.valid, true);
});

test('estate validator rejects hidden constitutional or authority redefinitions', () => {
  const result = validateEstateProduct({
    product: 'bad',
    architectural_class: 'product',
    capabilities: [],
    defines_constitution: true,
    issues_authority: true,
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.length >= 2, true);
});
