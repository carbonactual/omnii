export type RelationshipStatus = 'provisional' | 'active' | 'disputed' | 'superseded' | 'retired';

export interface RelationshipType { id: string; label: string; definition?: string; open_world: true; }
export interface RelationshipInstance {
  id: string; type_id: string; subject_id: string; object_id: string;
  status: RelationshipStatus; valid_from?: string; valid_to?: string;
  confidence?: number; evidence_refs?: string[]; reversible?: boolean;
}
export interface EmergenceRecord { id: string; discovered_at: string; source_refs?: string[]; provisional_type?: string; related_ids: string[]; }

export function createRelationship(input: Omit<RelationshipInstance,'status'> & { status?: RelationshipStatus }): RelationshipInstance {
  return { ...input, status: input.status ?? 'provisional' };
}

export function createEmergence(input: EmergenceRecord): EmergenceRecord { return input; }
