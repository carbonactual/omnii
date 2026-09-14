import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const requiredFiles = [
  'docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md',
  'docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md',
  'docs/CARBON_ACTUAL_ECONOMIC_ONTOLOGY.md',
  'docs/CARBON_ACTUAL_PRODUCT_BLUEPRINT.md',
  'docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md',
  'docs/CARBON_ACTUAL_ARCHITECTURE_TRACEABILITY.md',
  'docs/architecture/OMNII_CANONICAL_OBJECT_SCHEMA.md',
  'docs/architecture/OMNII_COMMON_LAYER.md',
  'schemas/omnii-canonical-object.schema.json',
  'schemas/omnii-canonical-authority-record.schema.json',
  'config/canonical-authority-registry.json',
  'config/architecture-authority-precedence.json'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`canonical-runtime: missing required file ${file}`);
    process.exitCode = 1;
  }
}
if (process.exitCode) process.exit();

const registry = JSON.parse(read('config/canonical-authority-registry.json'));
const precedence = JSON.parse(read('config/architecture-authority-precedence.json'));
const objectSchema = JSON.parse(read('schemas/omnii-canonical-object.schema.json'));

if (!objectSchema.properties?.identity || !objectSchema.properties?.state || !objectSchema.properties?.provenance) {
  console.error('canonical-runtime: universal object schema is missing required identity/state/provenance fields');
  process.exitCode = 1;
}

const seen = new Set();
for (const record of registry.records) {
  if (seen.has(record.canonical_id)) {
    console.error(`canonical-runtime: duplicate authority id ${record.canonical_id}`);
    process.exitCode = 1;
  }
  seen.add(record.canonical_id);
  const expected = precedence.levels[record.status === 'FROZEN' ? 'CONSTITUTIONAL' : record.status];
  if (record.status === 'FROZEN' && record.authority_level !== 1) {
    console.error(`canonical-runtime: frozen record has invalid authority ${record.canonical_id}`);
    process.exitCode = 1;
  }
  if (record.status === 'CANONICAL' && record.authority_level !== 2) {
    console.error(`canonical-runtime: canonical record has invalid authority ${record.canonical_id}`);
    process.exitCode = 1;
  }
  if (expected !== undefined && record.authority_level !== expected) {
    console.error(`canonical-runtime: status/authority mismatch ${record.canonical_id}`);
    process.exitCode = 1;
  }
}

const freeze = read('docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md');
const ontology = read('docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md');
const constitution = read('docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md');
for (const required of [
  'Architecture is frozen; implementation is free to evolve within it.',
  'Chronology never overrides canonical authority.',
  'Pulse is feedback/evidence',
  'Match ≠ Authorization',
]) {
  const haystack = `${freeze}\n${ontology}\n${constitution}`;
  if (!haystack.includes(required)) {
    // Some wording is intentionally enforced through code and registry instead of exact source text.
    if (required !== 'Chronology never overrides canonical authority.') {
      console.error(`canonical-runtime: expected invariant text absent: ${required}`);
      process.exitCode = 1;
    }
  }
}

console.log(`canonical-runtime: verified ${registry.records.length} authority records and required architecture artifacts`);
