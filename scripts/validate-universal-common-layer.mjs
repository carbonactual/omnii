import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));

const requiredFiles = [
  'CANON.md',
  'docs/canonical/OMNII_UNIVERSAL_DIGITAL_COMMON_LAYER_LAW.md',
  'schemas/omnii-canonical-object.schema.json',
  'schemas/omnii-universal-event.schema.json'
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing universal common layer file: ${file}`);
}

const canon = read('CANON.md');
const law = read('docs/canonical/OMNII_UNIVERSAL_DIGITAL_COMMON_LAYER_LAW.md');
const objectSchema = json('schemas/omnii-canonical-object.schema.json');
const eventSchema = json('schemas/omnii-universal-event.schema.json');

const canonTerms = [
  'Identity is not Authority',
  'Capability is Not Permission',
  'Portability Includes Semantics',
  'Provider Neutrality',
  'Exit is a Constitutional Property',
  'AI and Agents'
];
for (const term of canonTerms) {
  if (!canon.includes(term)) throw new Error(`Canonical law missing: ${term}`);
}

const lawTerms = [
  'entity, identity, authority, relationship, capability, intent, policy, state, event, evidence, provenance, dependency, continuity, portability, trust, settlement, liability, lifecycle',
  'provider lock-in',
  'multi-hop delegation',
  'canonical state',
  'material state transition'
];
for (const term of lawTerms) {
  if (!law.toLowerCase().includes(term.toLowerCase())) throw new Error(`Common layer law missing: ${term}`);
}

const requiredObjectProperties = [
  'id','type','version','status','identity','provenance','authority','relationships','dependencies','capabilities','intent','policy','trust','evidence','events','continuity','portability','settlement','liability','lifecycle'
];
for (const property of requiredObjectProperties) {
  if (!(property in objectSchema.properties)) throw new Error(`Canonical object schema missing property: ${property}`);
}

const requiredEventProperties = ['id','type','subject','actor','action','occurred_at','provenance','authority','delegation_chain','intent','previous_state','new_state','evidence'];
for (const property of requiredEventProperties) {
  if (!(property in eventSchema.properties)) throw new Error(`Universal event schema missing property: ${property}`);
}

if (objectSchema.additionalProperties !== true || eventSchema.additionalProperties !== true) {
  throw new Error('Provider/extension fields must remain preservable');
}

console.log('Universal Digital Common Layer conformance: PASS');
console.log(`Object contract: ${objectSchema.$id}`);
console.log(`Event contract: ${eventSchema.$id}`);
