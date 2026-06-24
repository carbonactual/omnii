export function buildContext(input: { id: string; grants: string[]; ref: string; expires: string }) {
  return {
    id: input.id,
    grants: input.grants,
    ref: input.ref,
    expires: input.expires
  };
}
