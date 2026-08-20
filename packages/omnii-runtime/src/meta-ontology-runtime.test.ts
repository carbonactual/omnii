import { describe, expect, it } from 'vitest';
import { registerExtension, transitionExtension, canRepresentUnknown, aggregateSchema } from './meta-ontology-runtime';

describe('meta ontology open-world runtime', () => {
  const base = {
    id: 'ext-1',
    object_type: 'ontology_extension',
    created_at: '2026-08-20T00:00:00Z',
    kind: 'phenomenon' as const,
    label: 'Unknown observed phenomenon'
  };

  it('represents unknown things without forced classification', () => {
    const extension = registerExtension(base);
    expect(extension.status).toBe('unknown');
    expect(canRepresentUnknown('phenomenon')).toBe(true);
  });

  it('promotes by lifecycle without changing identity', () => {
    const extension = registerExtension(base);
    const promoted = transitionExtension(extension, {
      extension_id: extension.id,
      from: 'unknown',
      to: 'provisional',
      reason: 'new evidence',
      occurred_at: '2026-08-20T01:00:00Z'
    });
    expect(promoted.id).toBe(extension.id);
    expect(promoted.status).toBe('provisional');
  });

  it('supports additive schema evolution', () => {
    expect(aggregateSchema({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });
});
