const OPERATING_CHAIN = Object.freeze([
  'identity',
  'relationship',
  'intent',
  'capability',
  'discovery',
  'match',
  'context',
  'availability',
  'authority',
  'workflow',
  'execution',
  'evidence',
  'outcome',
  'settlement',
  'pulse'
]);

export function operatingChain() {
  return OPERATING_CHAIN;
}

export function assertCapabilityNotAuthority(value) {
  if (!value || value.kind === 'authority') {
    throw new Error('capability cannot be authority');
  }
  return value;
}

export function assertEvidenceNotAuthority(value) {
  if (!value || value.kind === 'authority') {
    throw new Error('evidence cannot be authority');
  }
  return value;
}

export function assertMatchNotAuthorization(value) {
  if (!value) throw new Error('match is required');
  if (value.matched === true && value.authorized === true) {
    throw new Error('match cannot imply authorization');
  }
  return value;
}

export const OMNII_COMMON_VERSION = '1.0.0';
