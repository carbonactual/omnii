export function createAssertion({ claim, confidence = 0, evidenceRefs = [], sourceRefs = [] } = {}) {
  if (!claim) throw new Error('claim is required');
  const score = Number(confidence);
  if (!Number.isFinite(score) || score < 0 || score > 1) throw new Error('confidence must be between 0 and 1');
  return {
    id: `assertion:${crypto.randomUUID()}`,
    kind: 'assertion',
    claim,
    confidence: score,
    status: score >= 0.8 ? 'supported' : 'provisional',
    evidenceRefs: [...evidenceRefs],
    sourceRefs: [...sourceRefs],
    authorityRef: null,
  };
}
