import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
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
  'config/architecture-authority-precedence.json',
  'config/canonical-runtime-manifest.json',
  'config/canonical-product-branch-registry.json',
  'schemas/canonical-product-branch-record.schema.json'
];
const errors = mustExist.filter((p) => !fs.existsSync(path.join(root, p))).map((p) => `missing ${p}`);
if (errors.length) { errors.forEach((e) => console.error(e)); process.exit(1); }

const registry = json('config/canonical-authority-registry.json');
const precedence = json('config/architecture-authority-precedence.json');
const manifest = json('config/canonical-runtime-manifest.json');
const productRegistry = json('config/canonical-product-branch-registry.json');
const object = json('schemas/omnii-canonical-object.schema.json');
const productSchema = json('schemas/canonical-product-branch-record.schema.json');
const expectedFrozen = ['carbon-actual','omni','being','abba','value','pulse','io','union','communication','continuum','governance','mathematics','integration','hash','seal','hapi','hapi-world','terminal','mint','root','index','vault','actual','atlas','becoming','ash','phoenix','universal-object-model'];

for (const field of ['identity','state','provenance']) if (!object.properties?.[field]) errors.push(`object schema missing ${field}`);
if (manifest.product_branch_registry !== 'config/canonical-product-branch-registry.json') errors.push('runtime manifest is not bound to product branch registry');
if (manifest.policy.mixed_repository_hosting_is_silent !== false) errors.push('mixed repository hosting must not be silent');

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

const productIds = new Set();
for (const record of productRegistry.records ?? []) {
  if (productIds.has(record.product_id)) errors.push(`duplicate product ${record.product_id}`);
  productIds.add(record.product_id);
  for (const field of productSchema.required) if (!record[field]) errors.push(`${record.product_id}: missing ${field}`);
}
const requiredProducts = ['ABBA','ABBA_MAS','HAPI_WORLD','HAPI_WORLD_NEXUS','RITES','NGIN','BUNK','INSTITUTEGPT','NOUN_BOT'];
for (const id of requiredProducts) if (!productIds.has(id)) errors.push(`missing product branch ${id}`);
const bunk = productRegistry.records.find((r) => r.product_id === 'BUNK');
if (bunk?.repository_role !== 'mixed-legacy-host' || bunk?.status !== 'separation-required') errors.push('BUNK legacy repository boundary is not explicit');

const invariantText = `${read('docs/CARBON_ACTUAL_ARCHITECTURE_FREEZE.md')}\n${read('docs/CARBON_ACTUAL_UNIVERSAL_CAPABILITY_ONTOLOGY.md')}\n${read('docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md')}\n${read('docs/architecture/OMNII_CANONICAL_RUNTIME_RECONCILIATION.md')}`;
for (const text of ['Architecture is frozen; implementation is free to evolve within it.','Pulse is feedback/evidence','Interpretation ≠ Authority','Match ≠ Authorization']) {
  if (!invariantText.includes(text)) errors.push(`missing invariant: ${text}`);
}
if (errors.length) { errors.forEach((e) => console.error(`canonical-runtime: ${e}`)); process.exit(1); }
console.log(`canonical-runtime: PASS (${registry.records.length} authority records, ${productRegistry.records.length} product branches)`);
