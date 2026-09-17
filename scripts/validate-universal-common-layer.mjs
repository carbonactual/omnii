import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));

const requiredFiles = [
  'CANON.md',
  'docs/canonical/OMNII_UNIVERSAL_DIGITAL_COMMON_LAYER_LAW.md',
  'docs/architecture/OMNII_CONTINUITY_FABRIC_BINDING.md',
  'schemas/omnii-canonical-object.schema.json',
  'schemas/omnii-universal-event.schema.json'
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing universal common layer file: ${file}`);
}

const canon = read('CANON.md');
const law = read('docs/canonical/OMNII_UNIVERSAL_DIGITAL_COMMON_LAYER_LAW.md');
const continuity = read('docs/architecture/OMNII_CONTINUITY_FABRIC_BINDING.md');
const objectSchema = json('schemas/omnii-canonical-object.schema.json');
const eventSchema = json('schemas/omnii-universal-event.schema.json');

const canonTerms = [
  'Identity is not Authority',
  'Capability is Not Permission',
  'Continuity Is a Cross-Cutting Property, Not a New Primitive',
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

const continuityTerms = [
  '# / HASH',
  'SEAL',
  'ROOT',
  'EVENT / TRACEABILITY',
  'VAULT',
  'ASH',
  'PHOENIX',
  'ACTUAL / ATLAS',
  'I/O',
  'Continuity is not a new root object'
];
for (const term of continuityTerms) {
  if (!continuity.includes(term)) throw new Error(`Continuity binding missing: ${term}`);
}

const requiredObjectProperties = [
  'id','type','version','status','identity','provenance','authority','relationships','dependencies','capabilities','intent','policy','trust','evidence','events','continuity','portability','settlement','liability','lifecycle'
];
for (const property of requiredObjectProperties) {
  if (!(property in objectSchema.properties)) throw new Error(`Canonical object schema missing property: ${property}`);
}

for (const property of ['canonical_object_id','last_verified_state','protected_evidence_refs','critical_dependency_refs','vault_refs','event_refs','recovery_path','exit_handoff']) {
  if (!(property in objectSchema.$defs.continuity.properties)) throw new Error(`Continuity schema missing property: ${property}`);
}

for (const property of ['semantic_contract','identity_refs','relationship_refs','authority_refs','dependency_refs','evidence_refs','handoff']) {
  if (!(property in objectSchema.$defs.portability.properties)) throw new Error(`Portability schema missing property: ${property}`);
}

const requiredEventProperties = ['id','type','subject','actor','action','occurred_at','provenance'];
for (const property of requiredEventProperties) {
  if (!(property in eventSchema.properties)) throw new Error(`Universal event schema missing property: ${property}`);
}

if (objectSchema.additionalProperties !== true || eventSchema.additionalProperties !== true) {
  throw new Error('Provider/extension fields must remain preservable');
}

console.log('Universal Digital Common Layer conformance: PASS');
console.log(`Object contract: ${objectSchema.$id}`);
console.log(`Event contract: ${eventSchema.$id}`);
console.log('Continuity binding: #/HASH + SEAL + ROOT + EVENT/TRACEABILITY + VAULT + ASH + PHOENIX + ACTUAL/ATLAS + I/O');
