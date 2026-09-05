export function createValueVector({ sent = 0, dimensions = {}, unit = 'value' } = {}) {
  if (!Number.isFinite(Number(sent)) || Number(sent) < 0) throw new Error('sent must be a non-negative number');
  return { kind: 'value', unit, sent: Number(sent), dimensions: { ...dimensions } };
}
