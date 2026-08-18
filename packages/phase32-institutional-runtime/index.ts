export type InstitutionKind = 'school'|'hospital'|'business'|'government'|'court'|'association'|'community'|'financial-institution';
export interface Institution { id: string; kind: InstitutionKind; jurisdiction: string; authorities: string[]; capabilities: string[]; }
export interface InstitutionalAction { institutionId: string; actor: string; action: string; authority: string; }

export class InstitutionalRuntime {
  authorize(institution: Institution, action: InstitutionalAction): boolean {
    return institution.id === action.institutionId && institution.authorities.includes(action.authority) && Boolean(action.actor && action.action);
  }
}
