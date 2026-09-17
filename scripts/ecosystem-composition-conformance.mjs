import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_ROOT = process.cwd();
const VALID_MATURITY = new Set(['local-use','reusable-candidate','shared','canonical','deprecated','experimental']);
const FORBIDDEN_DOMAIN_CLAIMS = [
  'constitutional ownership',
  'duplicate identity system',
  'duplicate authority system',
  'duplicate universal registry',
  'replacement ledger',
  'new universal ontology',
];

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const listJson = (dir) => fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => path.join(dir, f)) : [];

export function validateEcosystem(root = DEFAULT_ROOT) {
  const errors = [];
  const capabilityDir = path.join(root, 'config', 'ecosystem-capabilities');
  const productDir = path.join(root, 'docs', 'ecosystem-manifests');
  const registrySeed = path.join(root, 'supabase', 'migrations', '20260905075310_common_layer_canonical_fabric_20260905.sql');

  if (!fs.existsSync(registrySeed)) errors.push(`missing canonical registry seed: ${path.relative(root, registrySeed)}`);

  const registryKeys = new Set();
  if (fs.existsSync(registrySeed)) {
    const sql = fs.readFileSync(registrySeed, 'utf8');
    for (const match of sql.matchAll(/\('([a-z0-9_]+)'\s*,/g)) registryKeys.add(match[1]);
  }

  const capabilities = new Map();
  for (const file of listJson(capabilityDir)) {
    let item;
    try { item = readJson(file); } catch (err) { errors.push(`${path.relative(root, file)} invalid JSON: ${err.message}`); continue; }
    const rel = path.relative(root, file);
    for (const field of ['schema_version','capability_id','version','maturity','canonical_registry_key','family','purpose','authority','provenance','health','replacement']) {
      if (item[field] === undefined || item[field] === null || item[field] === '') errors.push(`${rel} missing ${field}`);
    }
    if (item.schema_version !== '1.0.0') errors.push(`${rel} unsupported schema_version ${item.schema_version}`);
    if (!/^cap\.[a-z0-9][a-z0-9._-]*$/.test(item.capability_id ?? '')) errors.push(`${rel} invalid capability_id`);
    if (!/^\d+\.\d+\.\d+$/.test(item.version ?? '')) errors.push(`${rel} invalid version`);
    if (!VALID_MATURITY.has(item.maturity)) errors.push(`${rel} invalid maturity ${item.maturity}`);
    if (!registryKeys.has(item.canonical_registry_key)) errors.push(`${rel} registry key not found in canonical seed: ${item.canonical_registry_key}`);
    if (item.parent !== null && typeof item.parent !== 'string') errors.push(`${rel} parent must be null or a capability id`);
    if (item.parent && !capabilities.has(item.parent)) errors.push(`${rel} parent capability must resolve: ${item.parent}`);
    if (!Array.isArray(item.providers_adapters) || item.providers_adapters.length === 0) errors.push(`${rel} must declare a provider/adapter boundary`);
    capabilities.set(item.capability_id, { ...item, rel });
  }

  for (const [id, item] of capabilities) {
    if (item.parent && !capabilities.has(item.parent)) errors.push(`${item.rel} unresolved parent: ${item.parent}`);
    const text = JSON.stringify(item).toLowerCase();
    for (const marker of FORBIDDEN_DOMAIN_CLAIMS) if (text.includes(marker)) errors.push(`${item.rel} contains forbidden competing-primitive claim: ${marker}`);
  }

  const products = [];
  const productIds = new Set();
  for (const file of listJson(productDir)) {
    let item;
    try { item = readJson(file); } catch (err) { errors.push(`${path.relative(root, file)} invalid JSON: ${err.message}`); continue; }
    const rel = path.relative(root, file);
    const required = ['schema_version','product_id','name','status','purpose','entities','domain_capabilities','consumed_capabilities','provided_capabilities','workflows','interfaces','providers_adapters','authority_model','data_model','evidence_model','economic_model','pulse_model','continuity_model','exit_handoff','compatibility_identifiers'];
    for (const field of required) if (item[field] === undefined || item[field] === null) errors.push(`${rel} missing ${field}`);
    if (item.schema_version !== '1.0.0') errors.push(`${rel} unsupported schema_version ${item.schema_version}`);
    if (!/^[a-z0-9][a-z0-9._-]*$/.test(item.product_id ?? '')) errors.push(`${rel} invalid product_id`);
    if (productIds.has(item.product_id)) errors.push(`duplicate product_id: ${item.product_id}`);
    productIds.add(item.product_id);
    for (const field of ['entities','domain_capabilities','consumed_capabilities','provided_capabilities','workflows','interfaces','providers_adapters','compatibility_identifiers']) {
      if (!Array.isArray(item[field])) errors.push(`${rel} ${field} must be an array`);
    }
    if (!item.exit_handoff || typeof item.exit_handoff !== 'string') errors.push(`${rel} missing recoverable exit handoff`);
    if (!item.authority_model || !item.evidence_model || !item.continuity_model) errors.push(`${rel} missing authority/evidence/continuity path`);
    for (const capabilityId of [...(item.consumed_capabilities ?? []), ...(item.provided_capabilities ?? [])]) {
      if (typeof capabilityId === 'string' && capabilityId.startsWith('cap.') && !capabilities.has(capabilityId)) errors.push(`${rel} unresolved capability reference: ${capabilityId}`);
    }
    const text = JSON.stringify(item).toLowerCase();
    for (const marker of FORBIDDEN_DOMAIN_CLAIMS) if (text.includes(marker)) errors.push(`${rel} contains forbidden competing-primitive claim: ${marker}`);
    products.push(item);
  }

  const productById = new Map(products.map((p) => [p.product_id, p]));
  if (productById.has('omni-economic') && productById.has('omni-operating-surface')) {
    const econ = productById.get('omni-economic');
    const surface = productById.get('omni-operating-surface');
    const both = new Set([...econ.domain_capabilities, ...surface.domain_capabilities]);
    if (both.has('new universal ontology') || both.has('new universal registry')) errors.push('OMNI semantic collision: incompatible universal claims');
  }

  return { ok: errors.length === 0, errors, products: products.map((p) => p.product_id), capabilities: [...capabilities.keys()] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rootArg = process.argv.find((arg) => arg.startsWith('--root='));
  const root = rootArg ? path.resolve(rootArg.slice('--root='.length)) : DEFAULT_ROOT;
  const result = validateEcosystem(root);
  console.log(JSON.stringify({ ...result, root }, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}
