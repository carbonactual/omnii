import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INSTITUTEGPT_PRODUCTS,
  OPEN_ED_DEPLOYMENT_PROFILES,
  getInstituteGPTProduct,
  getOpenEdDeployment,
  resolveOpenEdDeployment,
} from './open-ed-products.mjs';

test('OpenEd Bot is a composition under InstituteGPT', () => {
  assert.equal(INSTITUTEGPT_PRODUCTS.OPEN_ED_BOT.parent, 'INSTITUTEGPT');
  assert.equal(INSTITUTEGPT_PRODUCTS.OPEN_ED_BOT.role, 'global_open_education_composition');
});

test('Notebook is a first-class InstituteGPT product', () => {
  const notebook = getInstituteGPTProduct('NOTEBOOK');
  assert.equal(notebook.parent, 'INSTITUTEGPT');
  assert.ok(notebook.capabilities.includes('research_notebook'));
  assert.ok(notebook.capabilities.includes('portfolio_evidence'));
});

test('OpenEd deployment is configurable rather than a new architecture', () => {
  const noun = getOpenEdDeployment('NOUN_BOT');
  assert.equal(noun.parentProduct, 'OPEN_ED_BOT');
  assert.equal(noun.deploymentType, 'institution_profile');
  assert.ok(noun.inheritance.includes('INSTITUTEGPT'));
});

test('deployment resolution composes canonical product and Notebook', () => {
  const resolved = resolveOpenEdDeployment('NOUN_BOT');
  assert.equal(resolved.canonicalProduct.productKey, 'OPEN_ED_BOT');
  assert.equal(resolved.notebook.productKey, 'NOTEBOOK');
});

test('unknown deployment does not invent an institution', () => {
  assert.equal(getOpenEdDeployment('UNKNOWN'), null);
});

console.log(`OpenEd product tests: ${Object.keys(OPEN_ED_DEPLOYMENT_PROFILES).length} deployment profile(s), ${Object.keys(INSTITUTEGPT_PRODUCTS).length} product entries`);
