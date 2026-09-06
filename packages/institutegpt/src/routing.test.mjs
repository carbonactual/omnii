import assert from 'node:assert/strict';
import { normalizeLearningIntent, shouldRouteToInstituteGPT } from './routing.mjs';

assert.equal(shouldRouteToInstituteGPT({ mode: 'how_to', sourceProduct: 'charter' }), true);
assert.equal(shouldRouteToInstituteGPT({ mode: 'continue_learning', sourceProduct: 'bunk' }), true);
assert.equal(shouldRouteToInstituteGPT({ mode: 'trade', sourceProduct: 'marketplace' }), false);

const normalized = normalizeLearningIntent({
  subjectRef: '#human-1',
  mode: 'How To',
  sourceProduct: 'charter',
  context: { task: 'commercial driving' },
});
assert.equal(normalized.mode, 'how_to');
assert.equal(normalized.sourceProduct, 'charter');
assert.equal(normalized.owner, 'institutegpt');
assert.equal(normalized.context.task, 'commercial driving');

assert.throws(
  () => normalizeLearningIntent({ subjectRef: '#human-1', mode: 'unknown', sourceProduct: 'bunk' }),
  /Unsupported learning mode/
);

console.log('InstituteGPT routing tests: 7 assertions passed');
