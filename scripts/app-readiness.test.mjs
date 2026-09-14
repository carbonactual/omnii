import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = process.cwd();

const requiredPaths = [
  'package.json',
  'package-lock.json',
  'apps/web/package.json',
  'scripts/validate-canonical-authority.mjs',
  'scripts/validate-canonical-runtime-v2.mjs',
  'scripts/validate-product-branch-registry.mjs',
  '.github/workflows/canonical-architecture-conformance.yml',
  '.github/workflows/canonical-runtime-conformance.yml',
];

test('app-readiness requires the shared substrate and app shell', () => {
  const missing = requiredPaths.filter((file) => !fs.existsSync(path.join(root, file)));
  assert.deepEqual(missing, []);
});

test('app-readiness validator passes on the repository baseline', () => {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/validate-app-readiness.mjs')], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /app-readiness: PASS/);
});
