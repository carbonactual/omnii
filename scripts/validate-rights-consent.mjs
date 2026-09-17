import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schemaPath = path.join(root, 'schemas/omnii-rights-consent.schema.json');
const contractPath = path.join(root, 'docs/architecture/OMNII_INTERNET_RIGHTS_CONSENT_RELATIONSHIP_LIFECYCLE.md');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const contract = fs.readFileSync(contractPath, 'utf8');

const requiredClasses = ['copyright','patent','intellectual_property','ownership','license','consent','approval','partnership','delegation','transfer','assignment'];
const requiredStates = ['asserted','identified','verified','active','disputed','unknown','revoked','expired','terminated','transferred','assigned','preserved','archived','recoverable','purgable','purged'];
const invariants = [
  'OWNERSHIP != ACCESS',
  'OWNERSHIP != LICENSE',
  'LICENSE != ASSIGNMENT',
  'CONSENT != APPROVAL',
  'APPROVAL != AUTHORITY',
  'AUTHORITY != OWNERSHIP',
  'PARTNERSHIP != OWNERSHIP',
  'TRANSFER != COPY',
  'TRANSFER != PAYMENT'
];

if (schema.$id !== 'omnii://schemas/rights-consent/v1') throw new Error('wrong rights-consent schema id');
if (schema.additionalProperties !== true) throw new Error('provider extension fields must remain preservable');
for (const value of requiredClasses) if (!schema.properties.class.enum.includes(value)) throw new Error(`missing class: ${value}`);
for (const value of requiredStates) if (!schema.properties.status.enum.includes(value)) throw new Error(`missing state: ${value}`);
for (const term of invariants) if (!contract.includes(term)) throw new Error(`missing invariant: ${term}`);

const scope = schema.properties.scope;
for (const field of ['rights','actions','territory','context']) {
  if (scope.properties[field]?.type !== 'array') throw new Error(`scope.${field} must be an array`);
}

console.log('internet rights/consent/relationship conformance: PASS');
