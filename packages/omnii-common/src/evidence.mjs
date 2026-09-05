export function evidenceRecord(source, claim, status = 'unverified', metadata = {}) {
  if (!source || !claim) throw new Error('evidence requires source and claim');
  return { source, claim, status, metadata };
}

export function assertEvidenceIsNotAuthority(value) {
  if (!value || value.kind === 'authority') throw new Error('evidence cannot issue authority');
  return value;
}
