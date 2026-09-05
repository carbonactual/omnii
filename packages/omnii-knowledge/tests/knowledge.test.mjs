import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryRecord } from '../src/memory.mjs';
import { createAssertion } from '../src/assertion.mjs';
import { createEvidenceRecord } from '../src/evidence.mjs';
import { createAtlasEntry } from '../src/atlas.mjs';
import { createDesignGenealogy } from '../src/design-genealogy.mjs';

test('memory carries provenance and visibility without becoming authority', () => {
  const memory = createMemoryRecord({ subjectRef: 'agent:a', content: 'remembered fact', visibility: 'relationship' });
  assert.equal(memory.authorityRef, null);
  assert.equal(memory.provenanceRequired, true);
});

test('assertions preserve uncertainty and evidence', () => {
  const assertion = createAssertion({ claim: 'example', confidence: 0.4, evidenceRefs: ['e:1'] });
  assert.equal(assertion.status, 'provisional');
  assert.deepEqual(assertion.evidenceRefs, ['e:1']);
});

test('evidence does not become authority', () => {
  const evidence = createEvidenceRecord({ sourceRef: 'source:1', summary: 'source' });
  assert.equal(evidence.authorityRef, null);
});

test('Atlas entries remain governed representations', () => {
  const entry = createAtlasEntry({ objectRef: 'culture:1', status: 'demonstration' });
  assert.equal(entry.operationalTruth, false);
  assert.equal(entry.status, 'demonstration');
});

test('design genealogy records habitat lineage', () => {
  const genealogy = createDesignGenealogy({ habitat: 'wetland', character: 'waterbird', plate: 'field-study' });
  assert.equal(genealogy.habitat, 'wetland');
  assert.equal(genealogy.kind, 'design-genealogy');
});
