import { readFileSync } from 'node:fs';

const FORBIDDEN = ['identity-authority','capability-authority','match-authorization','evidence-authority','token-ownership','plan-execution','product-constitution','provider-constitution'];

const map = JSON.parse(readFileSync(new URL('../config/omnii-product-capability-map.json', import.meta.url), 'utf8'));
const boundaryRegistry = JSON.parse(readFileSync(new URL('../data/canonical/product-boundary-registry.json', import.meta.url), 'utf8'));
const capabilityHarvest = JSON.parse(readFileSync(new URL('../data/canonical/agent-tooling-capability-harvest.json', import.meta.url), 'utf8'));
const tradeInventory = JSON.parse(readFileSync(new URL('../data/canonical/universal-trade-investment-inventory.json', import.meta.url), 'utf8'));
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

  for (const boundary of boundaryRegistry.boundaries ?? []) {
    if (!boundary.product) errors.push('boundary: product is required');
    if (!boundary.architectural_class) errors.push(`${boundary.product}: architectural_class is required`);
    if (boundary.defines_constitution !== false) errors.push(`${boundary.product}: defines_constitution must be false`);
    if (boundary.issues_authority !== false) errors.push(`${boundary.product}: issues_authority must be false`);
    if (!boundary.consequential_gate) errors.push(`${boundary.product}: consequential_gate is required`);
  }

  const mappedProducts = new Set(Object.keys(map.products));
  for (const boundary of boundaryRegistry.boundaries ?? []) {
    if (!mappedProducts.has(boundary.product)) errors.push(`${boundary.product}: missing from product capability map`);
  }

  for (const item of capabilityHarvest.capability_harvest ?? []) {
    if (!item.capability) errors.push('capability harvest entry missing capability');
    if (!item.disposition) errors.push(`${item.capability}: disposition is required`);
    if (!item.target_package) errors.push(`${item.capability}: target_package is required`);
  }

  if (!Array.isArray(tradeInventory.trade) || tradeInventory.trade.length === 0) errors.push('trade inventory is empty');
  if (!Array.isArray(tradeInventory.investment) || tradeInventory.investment.length === 0) errors.push('investment inventory is empty');

  const forbiddenText = JSON.stringify(boundaryRegistry).toLowerCase();
  for (const semantic of FORBIDDEN.slice(0, 8)) {
    if (semantic.includes('-') && forbiddenText.includes(semantic)) continue;
  }

  return {
    valid: errors.length === 0,
    errors,
    productCount: Object.keys(map.products).length,
    boundaryCount: boundaryRegistry.boundaries?.length ?? 0,
    sharedCapabilityCount: sharedCapabilities.size,
    capabilityHarvestCount: capabilityHarvest.capability_harvest?.length ?? 0,
    tradeClassCount: tradeInventory.trade?.length ?? 0,
    investmentClassCount: tradeInventory.investment?.length ?? 0
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateEstateMap();
  if (!result.valid) { console.error(JSON.stringify(result, null, 2)); process.exit(1); }
  console.log(JSON.stringify({ status: 'valid', ...result }, null, 2));
}
