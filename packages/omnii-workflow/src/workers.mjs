export function completeTask(task, { evidenceRefs = [], outcome = null } = {}) {
  if (!task) throw new Error('task is required');
  if (task.status !== 'claimed') throw new Error('claimed task required');
  return { ...task, status: 'completed', evidenceRefs: [...evidenceRefs], outcome };
}

export function escalateTask(task, reason, authorityRef = null) {
  if (!task) throw new Error('task is required');
  return { ...task, status: 'escalated', escalationReason: reason ?? 'unspecified', authorityRef };
}
