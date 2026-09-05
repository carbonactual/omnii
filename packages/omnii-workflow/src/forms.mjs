export function createFormIntent({ formId, subjectRef = null, requesterRef = null, payload = {} } = {}) {
  if (!formId) throw new Error('formId is required');
  return { type: 'intent', formId, subjectRef, requesterRef, payload, status: 'submitted' };
}
