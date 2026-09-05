const DISPOSITIONS = new Set(['ABSORB', 'COMPOSE', 'ADAPT', 'REFERENCE', 'REJECT_SUPERSEDE']);

export function sourceDisposition(value) {
  if (!DISPOSITIONS.has(value)) throw new Error(`invalid source disposition: ${value}`);
  return value;
}

export function normalizeSourceArtifact(input) {
  if (!input?.repository || !input?.path || !input?.revision) {
    throw new Error('source artifact requires repository, path and revision');
  }
  return {
    repository: input.repository,
    path: input.path,
    revision: input.revision,
    artifact_type: input.artifact_type ?? 'unknown',
    semantic_area: input.semantic_area ?? null,
    disposition: sourceDisposition(input.disposition ?? 'REFERENCE'),
    target: input.target ?? null,
    provenance: input.provenance ?? { status: 'source-derived' }
  };
}
