import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const schemaPath = path.join(root, 'schemas/omnii-digital-disposition.schema.json');
const contractPath = path.join(root, 'docs/architecture/OMNII_INTERNET_RECYCLE_BIN.md');

assert.ok(fs.existsSync(schemaPath), 'Disposition schema must exist');
assert.ok(fs.existsSync(contractPath), 'Disposition contract must exist');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const contract = fs.readFileSync(contractPath, 'utf8');

assert.equal(schema.$id, 'omnii://schemas/digital-disposition/v1');
assert.equal(schema.additionalProperties, true);
assert.deepEqual(
  ['id', 'subject', 'state', 'requested_action', 'authority', 'provenance', 'evidence', 'dependencies', 'lifecycle'],
  schema.required
);

for (const state of ['recoverable', 'revoked', 'expired', 'orphaned', 'quarantined', 'preserved', 'archived', 'suppressed', 'purgable', 'purged', 'unknown']) {
  assert.ok(schema.properties.state.enum.includes(state), `state ${state} must be supported`);
  assert.match(contract, new RegExp(`\\`${state}\\``));
}

assert.match(contract, /Delete is a disposition instruction/);
assert.match(contract, /Permanent destruction is a material lifecycle event/);
assert.match(contract, /not a new identity, ownership, authority, ledger, storage, registry or constitutional root primitive/i);
assert.match(contract, /dependency \/ copy resolution/);
assert.match(contract, /ASH/);
assert.match(contract, /PHOENIX/);
assert.match(contract, /VAULT/);
assert.match(contract, /CONTINUITY/);

execFileSync(process.execPath, ['scripts/validate-digital-disposition.mjs'], { cwd: root, stdio: 'inherit' });
console.log('Digital disposition invariants: PASS');
