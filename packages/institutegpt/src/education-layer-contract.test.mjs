import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EDUCATION_LAYER,
  classifyEducationComponent,
} from './education-layer-contract.mjs';

test('Education Layer identifies InstituteGPT as canonical product', () => {
  assert.equal(EDUCATION_LAYER.id, 'EDUCATION_LAYER');
  assert.equal(EDUCATION_LAYER.canonicalProduct, 'INSTITUTEGPT');
  assert.deepEqual(EDUCATION_LAYER.products, [
    'INSTITUTEGPT',
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS',
  ]);
  assert.deepEqual(EDUCATION_LAYER.siblingProducts, [
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS',
  ]);
  assert.deepEqual(EDUCATION_LAYER.deployments, ['NOUN_BOT']);
  assert.deepEqual(EDUCATION_LAYER.removedProductKeys, ['INSTITUTEGPT_ADVANCE']);
  assert.equal(EDUCATION_LAYER.hasAdvanceProduct, false);
});

test('shared OMNII foundations remain outside InstituteGPT ownership', () => {
  for (const key of [
    'HAPI',
    'ROOT',
    'INDEX',
    'VAULT',
    'TERMINAL',
    'ACTUAL',
    'EVIDENCE',
    'PULSE',
    'ATLAS',
    'IO',
    'OPPORTUNITIES',
  ]) {
    assert.equal(EDUCATION_LAYER.sharedFoundations[key], 'SHARED', key);
  }
});

test('InstituteGPT native capabilities are capabilities, not products', () => {
  for (const capability of [
    'learning',
    'skills',
    'competencies',
    'labs',
    'practice',
    'projects',
    'assessment',
    'badges',
    'certificates',
    'credential_pathways',
    'cpd',
    'learning_wallet',
    'skills_passport',
    'pathway_builder',
    'provider_integrations',
  ]) {
    assert.ok(EDUCATION_LAYER.nativeInstituteGPTCapabilities.includes(capability));
    assert.ok(!EDUCATION_LAYER.products.includes(capability));
  }
});

test('education component classifications preserve boundaries', () => {
  assert.deepEqual(classifyEducationComponent({ kind: 'learning_capability' }), {
    kind: 'learning_capability',
    layer: 'INSTITUTEGPT_CAPABILITY',
  });
  assert.deepEqual(classifyEducationComponent({ kind: 'provider_adapter' }), {
    kind: 'provider_adapter',
    layer: 'PROVIDER_ADAPTER',
  });
  assert.deepEqual(classifyEducationComponent({ kind: 'institution_deployment' }), {
    kind: 'institution_deployment',
    layer: 'DEPLOYMENT',
  });
  assert.deepEqual(classifyEducationComponent({ kind: 'sibling_product' }), {
    kind: 'sibling_product',
    layer: 'EDUCATION_PRODUCT',
  });
  assert.deepEqual(classifyEducationComponent({ kind: 'constitutional_foundation' }), {
    kind: 'constitutional_foundation',
    layer: 'UNCLASSIFIED',
  });
});

console.log('Education Layer contract tests passed');
