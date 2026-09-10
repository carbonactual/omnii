import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
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

  assert.match(corpus, /interpretation never becomes authority/i);
  assert.match(corpus, /matching never becomes authorization/i);
  assert.match(corpus, /Pulse/i);
  assert.match(corpus, /Products remain compositions/i);
  assert.match(corpus, /Blockchain is an implementation option, not a constitutional requirement/i);
});

test('canonical freeze states implementation evolution without changing the architecture', () => {
  const freeze = read('docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md');
  assert.match(freeze, /\*\*Status:\*\*\s+FROZEN/);
  assert.match(freeze, /Freezing the architecture does not freeze technology selection or prevent improvement\./);
});

test('semantic boundaries cannot be silently inverted', () => {
  const manifestText = read('config/canonical-runtime-manifest.json');
  assert.match(manifestText, /"mixed_repository_hosting_is_silent"\s*:\s*false/);
  assert.match(manifestText, /"match_grants_authority"\s*:\s*false/);
  assert.match(manifestText, /"interpretation_grants_authority"\s*:\s*false/);
  assert.match(manifestText, /"pulse_is_automatic_currency"\s*:\s*false/);
  assert.doesNotMatch(manifestText, /"product_may_create_competing_universal_primitive"\s*:\s*true/);
});

test('canonical runtime verifier remains executable', () => {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/validate-canonical-runtime-v2.mjs')], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /canonical-runtime: PASS/);
});
