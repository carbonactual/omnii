import { readFileSync } from 'node:fs';
import { isConsequentialCapability } from '../packages/omnii-common/src/authority.mjs';

const FORBIDDEN = ['identity-authority','capability-authority','match-authorization','evidence-authority','token-ownership','plan-execution','product-constitution','provider-constitution'];

const map = JSON.parse(readFileSync(new URL('../config/omnii-product-capability-map.json', import.meta.url), 'utf8'));
const boundaryRegistry = JSON.parse(readFileSync(new URL('../data/canonical/product-boundary-registry.json', import.meta.url), 'utf8'));
const capabilityHarvest = JSON.parse(readFileSync(new URL('../data/canonical/agent-tooling-capability-harvest.json', import.meta.url), 'utf8'));
const tradeInventory = JSON.parse(readFileSync(new URL('../data/canonical/universal-trade-investment-inventory.json', import.meta.url), 'utf8'));
const bindingRegistry = JSON.parse(readFileSync(new URL('../data/canonical/product-runtime-binding-registry.json', import.meta.url), 'utf8'));
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

  const boundaryProducts = boundaryRegistry.products ?? {};
  for (const [product, boundary] of Object.entries(boundaryProducts)) {
    if (!boundary.class) errors.push(`${product}: boundary class is required`);
    if (!boundary.runtime) errors.push(`${product}: boundary runtime is required`);
    if (!boundary.consequential_gate) errors.push(`${product}: consequential_gate is required`);
  }

  const requiredRules = [
    'products_cannot_define_constitution',
    'products_cannot_issue_authority',
    'capability_does_not_imply_authority',
    'evidence_does_not_imply_authority',
    'match_does_not_imply_authorization',
    'plan_does_not_imply_execution',
    'tokenization_does_not_imply_ownership',
    'atlas_is_not_operational_truth'
  ];
  for (const rule of requiredRules) {
    if (boundaryRegistry.rules?.[rule] !== true) errors.push(`boundary rule disabled: ${rule}`);
  }

  const consequentialCapabilities = boundaryRegistry.consequential_capabilities ?? [];
  if (!Array.isArray(consequentialCapabilities) || consequentialCapabilities.length === 0) {
    errors.push('consequential capability vocabulary is empty');
  } else {
    for (const capability of consequentialCapabilities) {
      if (!isConsequentialCapability(capability)) errors.push(`runtime gate missing capability: ${capability}`);
    }
  }

  for (const [name, item] of Object.entries(capabilityHarvest.capabilities ?? {})) {
    if (!item.target) errors.push(`${name}: target is required`);
    if (!item.disposition) errors.push(`${name}: disposition is required`);
  }
  if (capabilityHarvest.provenance_required !== true) errors.push('agent capability harvest provenance requirement is disabled');
  if (!/No harvested agent capability may create or expand authority/i.test(capabilityHarvest.authority_rule || '')) {
    errors.push('agent capability harvest authority rule is missing');
  }

  if (!Array.isArray(tradeInventory.trade) || tradeInventory.trade.length === 0) errors.push('trade inventory is empty');
  if (!Array.isArray(tradeInventory.investment) || tradeInventory.investment.length === 0) errors.push('investment inventory is empty');
  if (!Array.isArray(tradeInventory.eligibility_boundary) || tradeInventory.eligibility_boundary.length === 0) errors.push('eligibility boundary inventory is empty');

  const boundaryProductNames = new Set(Object.keys(boundaryProducts));
  const boundProductNames = new Set(Object.keys(bindingRegistry.bindings ?? {}));
  for (const product of boundaryProductNames) {
    if (!boundProductNames.has(product)) errors.push(`${product}: missing runtime binding`);
  }
  for (const product of boundProductNames) {
    const binding = bindingRegistry.bindings[product];
    if (!binding.repository) errors.push(`${product}: runtime binding repository is required`);
    if (!binding.binding) errors.push(`${product}: runtime binding description is required`);
    if (!binding.authority_gate) errors.push(`${product}: runtime authority gate is required`);
    if (!Array.isArray(binding.lineage) || binding.lineage.length === 0) errors.push(`${product}: runtime lineage is required`);
  }

  return {
    valid: errors.length === 0,
    errors,
    productCount: Object.keys(map.products).length,
    boundaryCount: boundaryProductNames.size,
    bindingCount: boundProductNames.size,
    sharedCapabilityCount: sharedCapabilities.size,
    capabilityHarvestCount: Object.keys(capabilityHarvest.capabilities ?? {}).length,
    consequentialCapabilityCount: consequentialCapabilities.length,
    tradeClassCount: tradeInventory.trade?.length ?? 0,
    investmentClassCount: tradeInventory.investment?.length ?? 0,
    eligibilityBoundaryCount: tradeInventory.eligibility_boundary?.length ?? 0,
    forbiddenSemantics: [...FORBIDDEN]
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateEstateMap();
  if (!result.valid) { console.error(JSON.stringify(result, null, 2)); process.exit(1); }
  console.log(JSON.stringify({ status: 'valid', ...result }, null, 2));
}
