export function createTask({ id, processRef, capabilityRef, title, requiresAuthority = false } = {}) {
  if (!id) throw new Error('id is required');
  if (!processRef) throw new Error('processRef is required');
  if (!capabilityRef) throw new Error('capabilityRef is required');
  return { id, processRef, capabilityRef, title: title ?? '', requiresAuthority, status: 'todo', authorityRef: null, evidenceRefs: [] };
}

export function claimTask(task, workerRef) {
  if (!task) throw new Error('task is required');
  if (!workerRef) throw new Error('workerRef is required');
  if (task.status !== 'todo') throw new Error('task is not claimable');
  return { ...task, workerRef, status: 'claimed' };
}
