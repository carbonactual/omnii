export function identityRef(subject) {
  if (typeof subject !== 'string' || subject.trim().length === 0) throw new Error('identity subject is required');
  return subject.trim();
}
