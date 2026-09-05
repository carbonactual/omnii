export function createAutomation({ id, trigger, intentType, capabilityRef, enabled = true } = {}) {
  if (!id) throw new Error('id is required');
  if (!trigger) throw new Error('trigger is required');
  if (!intentType) throw new Error('intentType is required');
  return { id, trigger, intentType, capabilityRef: capabilityRef ?? null, enabled, authorityRef: null };
}

export function shouldTrigger(automation, event) {
  return Boolean(automation?.enabled && event && event.type === automation.trigger);
}
