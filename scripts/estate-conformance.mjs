import { readFileSync } from 'node:fs';

const FORBIDDEN = ['identity-authority','capability-authority','match-authorization','evidence-authority','token-ownership','plan-execution','product-constitution','provider-constitution'];

const map = JSON.parse(readFileSync(new URL('../config/omnii-product-capability-map.json', import.meta.url), 'utf8'));
const sharedCapabilities = new Set(Object.values(map.products).flat());

export function validateEstateProduct(product) {
  const errors = [];
  if (!product?.product) errors.push('product is required');
  if (!Array.isArray(product?.capabilities)) errors.push('capabilities must be an array');
  if (product?.defines_constitution === true) errors.push('product cannot define constitution');
  if (product?.issues_authority === true) errors.push('product cannot issue authority');
  for (const capability of product?.capabilities ?? []) {
    if (!sharedCapabilities.has(capability)) errors.push(`unknown capability: ${capability}`);
  }
  return { valid: errors.length === 0, errors, forbiddenSemantics: [...FORBIDDEN] };
}

export function validateEstateMap() {
  const errors = [];
  for (const [product, capabilities] of Object.entries(map.products)) {
    if (!Array.isArray(capabilities)) errors.push(`${product}: capabilities must be an array`);
    for (const capability of capabilities ?? []) {
      if (!sharedCapabilities.has(capability)) errors.push(`${product}: unknown capability ${capability}`);
    }
  }
  return { valid: errors.length === 0, errors, productCount: Object.keys(map.products).length, sharedCapabilityCount: sharedCapabilities.size };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateEstateMap();
  if (!result.valid) { console.error(JSON.stringify(result, null, 2)); process.exit(1); }
  console.log(JSON.stringify({ status: 'valid', ...result }, null, 2));
}
