export function discover(candidates, predicate = () => true) {
  if (!Array.isArray(candidates)) throw new Error('candidates must be an array');
  return candidates.filter(predicate);
}
