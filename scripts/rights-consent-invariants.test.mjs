import assert from 'node:assert/strict';
import fs from 'node:fs';

const schema = JSON.parse(fs.readFileSync(new URL('../schemas/omnii-rights-consent.schema.json', import.meta.url), 'utf8'));

const classes = new Set(schema.properties.class.enum);
for (const value of ['copyright','patent','ownership','license','consent','approval','partnership','transfer','assignment']) assert.equal(classes.has(value), true, `missing class ${value}`);

const states = new Set(schema.properties.status.enum);
for (const value of ['active','verified','disputed','revoked','expired','terminated','transferred','assigned','preserved','recoverable','purged']) assert.equal(states.has(value), true, `missing state ${value}`);

for (const field of ['rights','actions','territory','context']) assert.equal(schema.properties.scope.properties[field].type, 'array');
assert.equal(schema.additionalProperties, true);

const contract = fs.readFileSync(new URL('../docs/architecture/OMNII_INTERNET_RIGHTS_CONSENT_RELATIONSHIP_LIFECYCLE.md', import.meta.url), 'utf8');
for (const invariant of [
  'OWNERSHIP != ACCESS',
  'OWNERSHIP != LICENSE',
  'LICENSE != ASSIGNMENT',
  'CONSENT != APPROVAL',
  'APPROVAL != AUTHORITY',
  'PARTNERSHIP != OWNERSHIP',
  'TRANSFER != COPY'
]) assert.equal(contract.includes(invariant), true, `missing invariant ${invariant}`);

console.log('rights/consent/relationship invariants: PASS');
