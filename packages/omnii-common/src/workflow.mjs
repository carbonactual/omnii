export function workflowRecord(id, steps = [], metadata = {}) {
  if (!id) throw new Error('workflow id is required');
  return { id, steps: Array.isArray(steps) ? steps : [], metadata };
}

export function executionRecord(workflowId, taskId, state = 'planned') {
  if (!workflowId || !taskId) throw new Error('execution requires workflow and task');
  return { workflowId, taskId, state };
}
