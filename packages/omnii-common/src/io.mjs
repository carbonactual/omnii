const IO_KINDS = new Set([
  'interaction', 'communication', 'request', 'offer', 'match', 'decision',
  'authorization', 'execution', 'movement', 'service', 'exchange', 'transaction',
  'settlement', 'registration', 'observation', 'evidence', 'lifecycle', 'system',
  'incident'
]);

const IO_STATUSES = new Set([
  'intent', 'proposed', 'authorized', 'accepted', 'executing',
  'completed', 'failed', 'cancelled', 'reversed'
]);

function requiredText(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${name} is required`);
  }
  return value.trim();
}

function optionalText(value, name) {
  if (value == null) return null;
  return requiredText(value, name);
}

function plainObject(value, name) {
  if (value == null) return {};
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
  return { ...value };
}

function refObject(value, name, required = false) {
  if (value == null) {
    if (required) throw new TypeError(`${name} is required`);
    return null;
  }
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object reference`);
  }
  const id = requiredText(value.id, `${name}.id`);
  const kind = optionalText(value.kind, `${name}.kind`);
  return Object.freeze(kind ? { id, kind } : { id });
}

function cloneList(value, name) {
  if (value == null) return Object.freeze([]);
  if (!Array.isArray(value)) throw new TypeError(`${name} must be an array`);
  return Object.freeze(value.map((item, index) => {
    if (typeof item !== 'object' || item == null || Array.isArray(item)) {
      throw new TypeError(`${name}[${index}] must be an object`);
    }
    return Object.freeze({ ...item });
  }));
}

function normalizeId() {
  return globalThis.crypto?.randomUUID?.() ?? `io_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

export function ioRecord(input = {}) {
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('IO input must be an object');
  }

  const kind = requiredText(input.kind, 'kind');
  const action = requiredText(input.action, 'action');
  const status = requiredText(input.status ?? 'completed', 'status');
  if (!IO_KINDS.has(kind)) {
    throw new TypeError(`unsupported IO kind: ${kind}`);
  }
  if (!IO_STATUSES.has(status)) {
    throw new TypeError(`unsupported IO status: ${status}`);
  }

  const occurredAt = new Date(input.occurred_at ?? Date.now());
  if (Number.isNaN(occurredAt.getTime())) throw new TypeError('occurred_at must be a valid date');

  const id = requiredText(input.id ?? normalizeId(), 'id');
  const actor = refObject(input.actor, 'actor', true);
  const subject = refObject(input.subject, 'subject');
  const source = requiredText(input.source ?? 'omnii', 'source');
  const idempotencyKey = optionalText(input.idempotency_key, 'idempotency_key');

  const record = {
    id,
    schema_version: 1,
    occurred_at: occurredAt.toISOString(),
    completed_at: input.completed_at == null ? null : new Date(input.completed_at).toISOString(),
    kind,
    action,
    status,
    actor,
    subject,
    source,
    product: refObject(input.product, 'product'),
    capability: refObject(input.capability, 'capability'),
    correlation_id: optionalText(input.correlation_id, 'correlation_id'),
    causation: plainObject(input.causation, 'causation'),
    idempotency_key: idempotencyKey,
    intent: refObject(input.intent, 'intent'),
    context: refObject(input.context, 'context'),
    authority: refObject(input.authority, 'authority'),
    authorization: refObject(input.authorization, 'authorization'),
    inputs: cloneList(input.inputs, 'inputs'),
    outputs: cloneList(input.outputs, 'outputs'),
    value: plainObject(input.value, 'value'),
    state: plainObject(input.state, 'state'),
    evidence: cloneList(input.evidence, 'evidence'),
    provenance: plainObject(input.provenance, 'provenance'),
    metadata: plainObject(input.metadata, 'metadata')
  };

  if (record.completed_at && Number.isNaN(new Date(record.completed_at).getTime())) {
    throw new TypeError('completed_at must be a valid date');
  }

  return Object.freeze(record);
}

export function isIoRecord(value) {
  return Boolean(
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.schema_version === 1 &&
    typeof value.occurred_at === 'string' &&
    IO_KINDS.has(value.kind) &&
    IO_STATUSES.has(value.status) &&
    typeof value.action === 'string' &&
    value.actor && typeof value.actor.id === 'string' &&
    typeof value.source === 'string'
  );
}

export { IO_KINDS, IO_STATUSES };
