import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateEcosystem } from './ecosystem-composition-conformance.mjs';

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'omnii-conformance-'));
const capDir = path.join(temp, 'config', 'ecosystem-capabilities');
const productDir = path.join(temp, 'docs', 'ecosystem-manifests');
const migrationDir = path.join(temp, 'supabase', 'migrations');
fs.mkdirSync(capDir, { recursive: true });
fs.mkdirSync(productDir, { recursive: true });
fs.mkdirSync(migrationDir, { recursive: true });

fs.writeFileSync(path.join(migrationDir, '20260905075310_common_layer_canonical_fabric_20260905.sql'), "insert into x values\n ('identity','IDENTITY'),\n ('discovery','DISCOVERY'),\n ('workflow','WORKFLOW');\n");

fs.writeFileSync(path.join(capDir, 'identity.json'), JSON.stringify({
  schema_version:'1.0.0', capability_id:'cap.identity', version:'1.0.0', maturity:'canonical', canonical_registry_key:'identity', family:'identity', purpose:'identity', parent:null,
  inputs:[], outputs:[], authority:'canonical', data_classes:[], events:[], dependencies:[], providers_adapters:['adapter'], provenance:'seed', health:'observable', replacement:'replaceable'
}));

fs.writeFileSync(path.join(productDir, 'sample.json'), JSON.stringify({
  schema_version:'1.0.0', product_id:'sample', name:'Sample', status:'active', purpose:'test', entities:['human'], domain_capabilities:['test'],
  consumed_capabilities:['cap.identity'], provided_capabilities:[], workflows:['w'], interfaces:['api'], providers_adapters:['adapter'], authority_model:'scoped', data_model:'canonical', evidence_model:'retained', economic_model:'delegated', pulse_model:'canonical', continuity_model:'recoverable', exit_handoff:'handoff', compatibility_identifiers:['sample']
}));

const passing = validateEcosystem(temp);
assert.equal(passing.ok, true, passing.errors.join('\n'));

fs.writeFileSync(path.join(productDir, 'broken.json'), JSON.stringify({
  ...JSON.parse(fs.readFileSync(path.join(productDir, 'sample.json'), 'utf8')),
  product_id:'broken', consumed_capabilities:['cap.missing']
}));
const failing = validateEcosystem(temp);
assert.equal(failing.ok, false);
assert.match(failing.errors.join('\n'), /unresolved capability reference: cap\.missing/);

fs.rmSync(temp, { recursive: true, force: true });
console.log('ecosystem composition conformance tests: PASS');
