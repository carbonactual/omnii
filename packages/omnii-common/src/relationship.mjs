export function relationshipRef(source, type, target) {
  if (![source, type, target].every((v) => typeof v === 'string' && v.trim())) {
    throw new Error('relationship requires source, type and target');
  }
  return { source: source.trim(), type: type.trim(), target: target.trim() };
}
