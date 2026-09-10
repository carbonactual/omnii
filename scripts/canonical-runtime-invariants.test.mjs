import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));

const registry = json('config/canonical-authority-registry.json');
const precedence = json('config/architecture-authority-precedence.json');
const manifest = json('config/canonical-runtime-manifest.json');

const byId = new Map(registry.records.map((r) => [r.canonical_id, r]));

 test('authority registry has unique canonical identifiers', () => {
  assert.equal(byId.size, registry.records.length);
});

test('frozen concepts remain constitutional', () => {
  for (const record of registry.records.filter((r) => r.status === 'FROZEN')) {
    assert.equal(record.authority_level, precedence.levels.CONSTITUTIONAL);
  }
});

test('canonical runtime policy blocks semantic authority escalation', () => {
  assert.equal(manifest.policy.chronology_overrides_authority, false);
  assert.equal(manifest.policy.match_grants_authority, false);
  assert.equal(manifest.policy.interpretation_grants_authority, false);
  assert.equal(manifest.policy.pulse_is_automatic_currency, false);
  assert.equal(manifest.policy.product_may_create_competing_universal_primitive, false);
});

test('core boundary statements remain explicit', () => {
  const corpus = [
    read('docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md'),
    read('docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md'),
    read('docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md'),
    read('docs/CARBON_ACTUAL_ECONOMIC_ONTOLOGY.md'),
    read('docs/architecture/OMNII_CANONICAL_RUNTIME_RECONCILIATION.md'),
    read('docs/architecture/OMNII_ABBA_SWARM_TEAM_WORKFLOW_BOUNDARY.md'),
    read('docs/architecture/OMNII_PROJECTION_BOUNDARY.md')
  ].join('\n');

  for (const required of [
    'Interpretation ≠ Authority',
    'Pulse',
    'Match',
    'Products are compositions',
    'Blockchain is optional'
  ]) {
    assert.match(corpus, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
