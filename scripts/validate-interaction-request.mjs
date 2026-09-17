import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schema = JSON.parse(fs.readFileSync(path.join(root, 'schemas/omnii-interaction-request.schema.json'), 'utf8'));
const contract = fs.readFileSync(path.join(root, 'docs/architecture/OMNII_INTERNET_INTERACTION_REQUEST_LIFECYCLE.md'), 'utf8');

const classes = ['enquiry','contact','request','report','suggestion','feedback','review','complaint','grievance','dispute','appeal','escalation','support','information_request','access_request','correction_request','deletion_request','revocation_request','portability_request','transfer_request','recovery_request','safety_report','abuse_report','security_report','procurement_request','partnership_request','cancellation_request'];
const states = ['draft','submitted','received','identified','classified','routed','acknowledged','triaged','assigned','in_progress','waiting','blocked','escalated','responded','resolved','partially_resolved','rejected','withdrawn','appealed','reopened','closed','retained','archived','recoverable','purgeable','purged','unknown'];
if (schema.$id !== 'omnii://schemas/interaction-request/v1') throw new Error('wrong interaction schema id');
if (schema.additionalProperties !== true) throw new Error('provider extension fields must remain preservable');
for (const value of classes) if (!schema.properties.class.enum.includes(value)) throw new Error(`missing interaction class: ${value}`);
for (const value of states) if (!schema.properties.state.enum.includes(value)) throw new Error(`missing interaction state: ${value}`);
for (const invariant of ['Receipt is not resolution.','Submission is not approval.','Report is not proof.','Suggestion is not instruction.','Enquiry is not authorization.','Escalation is not authority creation.']) if (!contract.includes(invariant)) throw new Error(`missing interaction invariant: ${invariant}`);
console.log('internet interaction/request conformance: PASS');
