const MODES = new Set([
  'learn',
  'explain',
  'how_to',
  'practice',
  'simulate',
  'test',
  'prepare',
  'qualify',
  'continue_learning',
]);

const NORMALIZE = new Map([
  ['learn', 'learn'],
  ['explain', 'explain'],
  ['how to', 'how_to'],
  ['how_to', 'how_to'],
  ['practice', 'practice'],
  ['simulate', 'simulate'],
  ['test', 'test'],
  ['prepare', 'prepare'],
  ['qualify', 'qualify'],
  ['continue learning', 'continue_learning'],
  ['continue_learning', 'continue_learning'],
]);

function nonEmpty(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${field} must be a non-empty string`);
  }
  return value.trim();
}

export function shouldRouteToInstituteGPT({ mode, learning = false }) {
  if (learning) return true;
  if (typeof mode !== 'string') return false;
  return MODES.has(NORMALIZE.get(mode.trim().toLowerCase()) ?? mode.trim().toLowerCase());
}

export function normalizeLearningIntent({ subjectRef, mode, sourceProduct = null, sourceRef = null, context = {} }) {
  const subject = nonEmpty(subjectRef, 'subjectRef');
  const rawMode = nonEmpty(mode, 'mode').toLowerCase();
  const normalizedMode = NORMALIZE.get(rawMode) ?? rawMode;
  if (!MODES.has(normalizedMode)) {
    throw new TypeError(`Unsupported learning mode: ${mode}`);
  }
  if (context === null || typeof context !== 'object' || Array.isArray(context)) {
    throw new TypeError('context must be an object');
  }

  return {
    type: 'learning_intent',
    owner: 'institutegpt',
    subjectRef: subject,
    mode: normalizedMode,
    sourceProduct: sourceProduct === null ? null : nonEmpty(sourceProduct, 'sourceProduct'),
    sourceRef: sourceRef === null ? null : nonEmpty(sourceRef, 'sourceRef'),
    context: { ...context },
    createdAt: new Date().toISOString(),
  };
}
