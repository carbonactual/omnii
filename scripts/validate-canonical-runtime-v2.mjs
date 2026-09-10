import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const mustExist = [
  'docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md',
  'docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md',
  'docs/CARBON_ACTUAL_ECONOMIC_ONTOLOGY.md',
  'docs/CARBON_ACTUAL_PRODUCT_BLUEPRINT.md',
  'docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md',
  'docs/CARBON_ACTUAL_ARCHITECTURE_TRACEABILITY.md',
  'docs/architecture/OMNII_CANONICAL_OBJECT_SCHEMA.md',
  'schemas/omnii-canonical-object.schema.json',
  'schemas/omnii-canonical-authority-record.schema.json',
  'config/canonical-authority-registry.json',
  'config/architecture-authority-precedence.json'
];
const errors = mustExist.filter((p) => !fs.existsSync(path.join(root, p))).map((p) => `missing ${p}`);
if (errors.length) { errors.forEach((e) => console.error(e)); process.exit(1); }

const registry = JSON.parse(read('config/canonical-authority-registry.json'));
const precedence = JSON.parse(read('config/architecture-authority-precedence.json'));
const object = JSON.parse(read('schemas/omnii-canonical-object.schema.json'));
const expectedFrozen = ['carbon-actual','omni','being','abba','value','pulse','io','union','communication','continuum','governance','mathematics','integration','hash','seal','hapi','hapi-world','terminal','mint','root','index','vault','actual','atlas','becoming','ash','phoenix','universal-object-model'];

for (const field of ['identity','state','provenance']) if (!object.properties?.[field]) errors.push(`object schema missing ${field}`);
const seen = new Set();
for (const r of registry.records) {
  if (seen.has(r.canonical_id)) errors.push(`duplicate ${r.canonical_id}`);
  seen.add(r.canonical_id);
  const key = r.status === 'FROZEN' ? 'CONSTITUTIONAL' : r.status;
  if (precedence.levels[key] !== undefined && r.authority_level !== precedence.levels[key]) errors.push(`authority mismatch ${r.canonical_id}`);
}
for (const id of expectedFrozen) {
  const r = registry.records.find((x) => x.canonical_id === id);
  if (!r) errors.push(`missing frozen ${id}`);
  else if (r.status !== 'FROZEN' || r.authority_level !== 1) errors.push(`not frozen ${id}`);
}

const invariantText = `${read('docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md')}\n${read('docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md')}\n${read('docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md')}`;
for (const text of ['Architecture is frozen; implementation is free to evolve within it.','Pulse is feedback/evidence']) if (!invariantText.includes(text)) errors.push(`missing invariant: ${text}`);
if (errors.length) { errors.forEach((e) => console.error(`canonical-runtime: ${e}`)); process.exit(1); }
console.log(`canonical-runtime: PASS (${registry.records.length} authority records)`);
