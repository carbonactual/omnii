export function match(intent, capability, context = {}) {
  return {
    intent,
    capability,
    context,
    matched: Boolean(intent && capability),
    authorized: false
  };
}
