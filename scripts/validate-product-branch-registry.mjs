import fs from 'node:fs';

const registryPath = 'config/canonical-product-branch-registry.json';
const schemaPath = 'schemas/canonical-product-branch-record.schema.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const errors = [];
if (!Array.isArray(registry.records) || registry.records.length === 0) errors.push('product branch registry is empty');
if (!schema.required.includes('product_id')) errors.push('schema missing product_id requirement');

const ids = new Set();
for (const record of registry.records ?? []) {
  if (ids.has(record.product_id)) errors.push(`duplicate product_id: ${record.product_id}`);
  ids.add(record.product_id);
  for (const field of schema.required) {
    if (record[field] === undefined || record[field] === null || record[field] === '') {
      errors.push(`${record.product_id}: missing ${field}`);
    }
  }
  if (record.repository_role === 'mixed-legacy-host' && record.status !== 'separation-required' && record.status !== 'composition-on-shared-host') {
    errors.push(`${record.product_id}: mixed legacy host must be explicitly marked`);
  }
}

const bunk = registry.records.find((r) => r.product_id === 'BUNK');
if (!bunk) errors.push('BUNK branch record is required');
else if (bunk.repository_role !== 'mixed-legacy-host') errors.push('BUNK repository boundary must remain explicit');

if (errors.length) {
  errors.forEach((error) => console.error(`product-branch: ${error}`));
  process.exit(1);
}
console.log(`product-branch: PASS (${registry.records.length} records)`);
