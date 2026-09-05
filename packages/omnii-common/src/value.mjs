export function valueReference(id, dimensions = {}) {
  if (!id) throw new Error('value reference id is required');
  return { id, dimensions };
}

export function pulseObservation(given = {}, returned = {}, metadata = {}) {
  return { given, returned, metadata };
}
