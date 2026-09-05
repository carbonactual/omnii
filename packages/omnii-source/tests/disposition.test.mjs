import test from 'node:test';
import assert from 'node:assert/strict';
import { sourceDisposition, normalizeSourceArtifact } from '../src/index.mjs';

test('sourceDisposition only accepts canonical harvest dispositions', () => {
  assert.equal(sourceDisposition('ABSORB'), 'ABSORB');
  assert.equal(sourceDisposition('REFERENCE'), 'REFERENCE');
  assert.throws(() => sourceDisposition('KEEP_EVERYTHING'));
});

test('normalizeSourceArtifact preserves source lineage and target placement', () => {
  const artifact = normalizeSourceArtifact({
    repository: 'carbonactual/abba',
    path: 'api/hapi.js',
    revision: 'abc123',
    disposition: 'ADAPT',
    target: 'hapi-world-gateway'
  });
  assert.equal(artifact.repository, 'carbonactual/abba');
  assert.equal(artifact.path, 'api/hapi.js');
  assert.equal(artifact.revision, 'abc123');
  assert.equal(artifact.disposition, 'ADAPT');
  assert.equal(artifact.target, 'hapi-world-gateway');
});
