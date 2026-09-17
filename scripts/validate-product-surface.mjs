#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schemaPath = path.join(root, 'schemas', 'omnii-product-surface.schema.json');
const manifestPath = process.env.OMNII_PRODUCT_MANIFEST
  ? path.resolve(root, process.env.OMNII_PRODUCT_MANIFEST)
  : null;

const REQUIRED_SCHEMA_KEYS = [
  'product_id', 'canonical_url', 'version', 'launch_url', 'scope',
  'display_mode', 'installability', 'supported_surfaces', 'deep_links',
  'permissions', 'update_policy', 'continuity_policy', 'exit_policy'
];

const REQUIRED_LAW_TERMS = [
  'Product ≠ Constitution',
  'Authentication is not authorization.',
  'Authorization is not approval.',
  'Approval is not execution.',
  'Offline cache cannot silently create fresh authority or settlement state.',
  'residual-state'
];

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Missing file: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const schema = readJson(schemaPath);
for (const key of REQUIRED_SCHEMA_KEYS) {
  assert(schema.properties?.[key], `Schema missing required property definition: ${key}`);
  assert(schema.required?.includes(key), `Schema does not require property: ${key}`);
}
assert(schema.additionalProperties === true, 'Schema must preserve provider/extension fields');

const lawPath = path.join(root, 'docs', 'canonical', 'OMNII_INSTALLABLE_PRODUCT_SURFACE_LAW.md');
assert(fs.existsSync(lawPath), 'Installable product surface law is missing');
const law = fs.readFileSync(lawPath, 'utf8');
for (const term of REQUIRED_LAW_TERMS) {
  assert(law.includes(term), `Canonical law missing coverage term: ${term}`);
}

if (manifestPath) {
  const manifest = readJson(manifestPath);
  for (const key of REQUIRED_SCHEMA_KEYS) {
    assert(Object.prototype.hasOwnProperty.call(manifest, key), `Manifest missing required field: ${key}`);
  }
  assert(manifest.permissions?.least_privilege === true, 'Product manifest must declare least-privilege permissions');
  assert(manifest.permissions?.user_mediation === true, 'Product manifest must declare user mediation for permissions');
  assert(manifest.update_policy?.revalidate_authority === true, 'Product updates must revalidate authority');
  assert(manifest.continuity_policy?.preserve_identity === true, 'Product must preserve identity continuity');
  assert(manifest.continuity_policy?.preserve_state === true, 'Product must preserve state continuity');
  assert(manifest.continuity_policy?.preserve_evidence === true, 'Product must preserve evidence continuity');
}

console.log(`Product surface conformance OK${manifestPath ? `: ${path.relative(root, manifestPath)}` : ''}`);
