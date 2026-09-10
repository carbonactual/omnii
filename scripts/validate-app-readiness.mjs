import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const errors = [];

const mustExist = [
  'package.json',
  'package-lock.json',
  'apps/web/package.json',
  'scripts/validate-canonical-authority.mjs',
  'scripts/validate-canonical-runtime-v2.mjs',
  'scripts/validate-product-branch-registry.mjs',
  '.github/workflows/canonical-architecture-conformance.yml',
  '.github/workflows/canonical-runtime-conformance.yml',
];
for (const file of mustExist) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`missing ${file}`);
}

const rootPackage = json('package.json');
const webPackage = json('apps/web/package.json');
const productRegistry = json('config/canonical-product-branch-registry.json');

for (const script of ['conformance', 'test:canonical']) {
  if (!rootPackage.scripts?.[script]) errors.push(`root package missing ${script} script`);
}
if (rootPackage.packageManager !== 'npm@10.9.8') errors.push('root package manager is not npm@10.9.8');
if (rootPackage.engines?.node !== '22.23.2') errors.push('root Node floor is not 22.23.2');
if (webPackage.scripts?.build !== 'next build') errors.push('web package is missing Next build entry');
if (webPackage.private !== true) errors.push('web package must remain private app shell');

const records = productRegistry.records ?? [];
const ids = new Set();
for (const record of records) {
  if (ids.has(record.product_id)) errors.push(`duplicate product ${record.product_id}`);
  ids.add(record.product_id);
}
const requiredProducts = ['ABBA', 'ABBA_MAS', 'HAPI_WORLD', 'HAPI_WORLD_NEXUS', 'RITES', 'NGIN', 'BUNK', 'INSTITUTEGPT', 'NOUN_BOT'];
for (const id of requiredProducts) if (!ids.has(id)) errors.push(`missing product branch ${id}`);

const bunk = records.find((record) => record.product_id === 'BUNK');
if (bunk?.repository_role !== 'mixed-legacy-host' || bunk?.status !== 'separation-required') {
  errors.push('BUNK must remain explicitly separation-required until extraction is verified');
}

if (errors.length) {
  errors.forEach((error) => console.error(`app-readiness: ${error}`));
  process.exit(1);
}

console.log(`app-readiness: PASS (${records.length} registered product branches; web build entry present)`);
