export function contextRecord(scope, data = {}) {
  if (!scope) throw new Error('context scope is required');
  return { scope, data };
}

export function availabilityRecord(subject, from, to = null) {
  if (!subject || !from) throw new Error('availability requires subject and start');
  return { subject, from, to };
}
