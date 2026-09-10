import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registryPath = path.join(root, 'config', 'canonical-authority-registry.json');
const schemaPath = path.join(root, 'schemas', 'omnii-canonical-authority-record.schema.json');

function fail(message) {
  console.error(`canonical-authority: ${message}`);
  process.exitCode = 1;
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const expectedStatuses = new Set(schema.properties.status.enum);
const expectedPrecedence = new Map([
  ['CONSTITUTIONAL', 1],
  ['CANONICAL', 2],
  ['AMENDMENT', 3],
  ['CAPABILITY', 4],
  ['DOMAIN', 5],
  ['IMPLEMENTATION', 6],
  ['EXPERIMENTAL', 7],
  ['CONVERSATION', 8],
]);

if (!Array.isArray(registry.records) || registry.records.length === 0) {
  fail('registry must contain at least one record');
  process.exit();
}

const ids = new Set();
for (const record of registry.records) {
  if (ids.has(record.canonical_id)) fail(`duplicate canonical_id: ${record.canonical_id}`);
  ids.add(record.canonical_id);

  if (!expectedStatuses.has(record.status)) fail(`invalid status for ${record.canonical_id}: ${record.status}`);
  if (!Number.isInteger(record.authority_level) || record.authority_level < 1 || record.authority_level > 9) {
    fail(`invalid authority_level for ${record.canonical_id}`);
  }
  if (!record.canonical_source) fail(`missing canonical_source for ${record.canonical_id}`);

  const expectedLevel = expectedPrecedence.get(record.status);
  if (expectedLevel && record.authority_level !== expectedLevel) {
    fail(`authority/status mismatch for ${record.canonical_id}: ${record.status} requires level ${expectedLevel}`);
  }

  if (record.status === 'FROZEN' && record.branch !== undefined && record.branch !== null) {
    fail(`frozen record cannot be branch-scoped: ${record.canonical_id}`);
  }
}

const requiredFrozen = [
  'carbon-actual', 'omni', 'being', 'abba', 'value', 'pulse', 'io', 'union',
  'communication', 'continuum', 'governance', 'mathematics', 'integration',
  'hash', 'seal', 'hapi', 'hapi-world', 'terminal', 'mint', 'root', 'index',
  'vault', 'actual', 'atlas', 'becoming', 'ash', 'phoenix', 'universal-object-model'
];
for (const id of requiredFrozen) {
  const record = registry.records.find((item) => item.canonical_id === id);
  if (!record) fail(`missing required frozen concept: ${id}`);
  else if (record.status !== 'FROZEN' || record.authority_level !== 1) fail(`protected concept is not frozen: ${id}`);
}

console.log(`canonical-authority: validated ${registry.records.length} records`);
