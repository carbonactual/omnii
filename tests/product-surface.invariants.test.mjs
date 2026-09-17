import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const schema = JSON.parse(fs.readFileSync('schemas/omnii-product-surface.schema.json', 'utf8'));
const law = fs.readFileSync('docs/canonical/OMNII_INSTALLABLE_PRODUCT_SURFACE_LAW.md', 'utf8');

test('product surface schema requires canonical product lifecycle fields', () => {
  const required = new Set(schema.required);
  for (const field of [
    'product_id', 'canonical_url', 'version', 'launch_url', 'scope',
    'display_mode', 'installability', 'supported_surfaces', 'deep_links',
    'permissions', 'update_policy', 'continuity_policy', 'exit_policy'
  ]) {
    assert.equal(required.has(field), true, `missing required field ${field}`);
  }
  assert.equal(schema.additionalProperties, true);
});

test('canonical law preserves authority and offline invariants', () => {
  for (const phrase of [
    'Product ≠ Constitution',
    'Authentication is not authorization.',
    'Authorization is not approval.',
    'Approval is not execution.',
    'offline/cache semantics',
    'residual-state'
  ]) {
    assert.equal(law.includes(phrase), true, `missing law phrase: ${phrase}`);
  }
});
