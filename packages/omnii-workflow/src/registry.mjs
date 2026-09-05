export function registerRecord({ id, kind, name, capabilities = [], metadata = {} } = {}) {
  if (!id) throw new Error('id is required');
  if (!kind) throw new Error('kind is required');
  return { id, kind, name: name ?? id, capabilities: [...capabilities], metadata };
}

export function discoverByCapability(records = [], capabilityRef) {
  return records.filter((record) => record.capabilities?.includes(capabilityRef));
}
