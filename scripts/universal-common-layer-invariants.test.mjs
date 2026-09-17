import { execFileSync } from 'node:child_process';

const output = execFileSync(process.execPath, ['scripts/validate-universal-common-layer.mjs'], {
  cwd: process.cwd(),
  encoding: 'utf8'
});

if (!output.includes('Universal Digital Common Layer conformance: PASS')) {
  throw new Error(`Unexpected conformance output: ${output}`);
}

console.log('Universal common layer invariants: PASS');
