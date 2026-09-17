import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const mustExist = [
  'docs/architecture/OMNII_INTERNET_RECYCLE_BIN.md',
  'schemas/omnii-digital-disposition.schema.json'
];

for (const file of mustExist) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing digital disposition file: ${file}`);
}

const contract = read('docs/architecture/OMNII_INTERNET_RECYCLE_BIN.md');
const schema = json('schemas/omnii-digital-disposition.schema.json');

const states = [
  'active', 'deactivated', 'disposition_requested', 'recoverable', 'revoked',
  'expired', 'orphaned', 'quarantined', 'preserved', 'archived', 'suppressed',
  'purgable', 'purged', 'unknown'
];
for (const state of states) {
  if (!schema.properties.state.enum.includes(state) || !contract.includes(`\`${state}\``)) {
    throw new Error(`Digital disposition state missing from contract/schema: ${state}`);
  }
}

const requiredSchemaProperties = [
  'id', 'subject', 'state', 'requested_action', 'authority', 'provenance',
  'evidence', 'dependencies', 'lifecycle'
];
for (const property of requiredSchemaProperties) {
  if (!(property in schema.properties) || !schema.required.includes(property)) {
    throw new Error(`Digital disposition schema missing required property: ${property}`);
  }
}

const requiredContractTerms = [
  'Delete is a disposition instruction',
  'dependency / copy resolution',
  'Permanent destruction is a material lifecycle event',
  'ASH',
  'PHOENIX',
  'VAULT',
  'TRACEABILITY/EVENT',
  'CONTINUITY',
  'This is not a new identity, ownership, authority, ledger, storage, registry or constitutional root primitive.'
];
for (const term of requiredContractTerms) {
  if (!contract.includes(term)) throw new Error(`Digital disposition contract missing invariant: ${term}`);
}

if (schema.additionalProperties !== true) {
  throw new Error('Provider/extension metadata must remain preservable in the disposition schema');
}

if (!schema.$id.endsWith('/digital-disposition/v1')) {
  throw new Error(`Unexpected digital disposition schema id: ${schema.$id}`);
}

console.log('Internet Recycle Bin conformance: PASS');
console.log(`Disposition contract: ${schema.$id}`);
console.log(`States covered: ${states.length}`);
console.log('Lifecycle: active → disposition request → dependency/copy resolution → recover/retain/suppress/quarantine → purge');
