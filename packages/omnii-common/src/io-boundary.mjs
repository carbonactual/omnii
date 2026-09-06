import { ioRecord } from './io.mjs';

export function toIoOccurrence(input) {
  return ioRecord(input);
}

export async function withIoOccurrence(action, input = {}) {
  if (typeof action !== 'function') throw new TypeError('action must be a function');
  const base = { ...input, occurred_at: input.occurred_at ?? new Date().toISOString() };

  try {
    const result = await action();
    return {
      result,
      io: ioRecord({ ...base, status: input.status ?? 'completed' })
    };
  } catch (error) {
    const io = ioRecord({
      ...base,
      status: 'failed',
      metadata: {
        ...(input.metadata ?? {}),
        error: error instanceof Error ? error.message : String(error)
      }
    });
    if (error && typeof error === 'object') error.io = io;
    throw error;
  }
}
