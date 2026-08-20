import type { CanonicalEnvelope, Id, Timestamp } from './types';

export type MetaKind =
  | 'entity' | 'species' | 'intelligence' | 'identity' | 'relationship'
  | 'resource' | 'capability' | 'event' | 'value_dimension' | 'economic_instrument'
  | 'namespace' | 'protocol' | 'environment' | 'technology' | 'phenomenon' | 'other';

export type OntologyStatus = 'unknown' | 'observed' | 'provisional' | 'candidate' | 'emerging' | 'canonical' | 'disputed' | 'superseded' | 'retired';

export interface OntologyExtension extends CanonicalEnvelope {
  kind: MetaKind;
  label: string;
  definition?: string;
  status: OntologyStatus;
  parent_type?: string;
  schema?: Record<string, unknown>;
  capabilities?: string[];
  evidence_refs?: string[];
  supersedes?: string[];
  introduced_at?: Timestamp;
  effective_at?: Timestamp;
}

export interface OntologyTransition {
  extension_id: Id;
  from: OntologyStatus;
  to: OntologyStatus;
  reason: string;
  evidence_refs?: string[];
  occurred_at: Timestamp;
}

/** Open-world registration: represent before classification; promote without rewriting history. */
export function registerExtension(input: Omit<OntologyExtension, 'status'> & { status?: OntologyStatus }): OntologyExtension {
  return { ...input, status: input.status ?? 'unknown' };
}

export function transitionExtension(extension: OntologyExtension, transition: OntologyTransition): OntologyExtension {
  if (transition.extension_id !== extension.id) throw new Error('extension_id mismatch');
  return { ...extension, status: transition.to, effective_at: transition.occurred_at };
}

export function canRepresentUnknown(kind: MetaKind): boolean {
  return kind.length > 0;
}

export function aggregateSchema(existing: Record<string, unknown>, extension: Record<string, unknown>): Record<string, unknown> {
  return { ...existing, ...extension };
}
