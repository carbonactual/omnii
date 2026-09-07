import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set(['.git', 'node_modules', '.next', 'dist', 'build', '.vercel']);
const ignoredFiles = new Set(['scripts/validate-security-posture.mjs']);
const scannedExtensions = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.json', '.yml', '.yaml', '.toml', '.ini', '.env']);
const legacyKeyNames = ['SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'anon_key', 'service_role_key'];
const secretPatterns = [
  /sb_secret_[A-Za-z0-9_-]{10,}/,
  /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    const file = path.join(dir, entry.name);
    if (!scannedExtensions.has(path.extname(entry.name)) && entry.name !== 'Dockerfile') continue;
    inspect(file);
  }
}

function inspect(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (ignoredFiles.has(relative)) return;
  const text = fs.readFileSync(file, 'utf8');
  const lower = relative.toLowerCase();
  const documentation = lower.endsWith('.md') || lower.includes('/docs/');

  if (!documentation) {
    for (const key of legacyKeyNames) {
      if (text.includes(key)) findings.push(`${relative}: legacy Supabase key reference: ${key}`);
    }
    for (const pattern of secretPatterns) {
      if (pattern.test(text)) findings.push(`${relative}: possible secret material detected by repository scanner`);
    }
  }
}

walk(root);

if (findings.length) {
  console.error('SECURITY_POSTURE_VALIDATION_FAILED');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log('SECURITY_POSTURE_VALIDATION_PASSED');
console.log('No legacy Supabase key references or obvious secret material found in scanned source/config files.');
