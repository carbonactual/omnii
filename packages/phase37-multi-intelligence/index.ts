export type IntelligenceKind = 'human' | 'ai-agent' | 'autonomous-system' | 'other';

export interface IntelligenceParticipant {
  id: string;
  kind: IntelligenceKind;
  authorityDomain: string[];
  capabilities: string[];
}

export interface IntelligenceAgreement {
  id: string;
  parties: string[];
  scopes: string[];
  governanceAuthority: string;
  constraints: string[];
}

export interface IntelligenceAction {
  actor: string;
  scope: string;
  capability: string;
}

export class MultiIntelligenceConstitution {
  readonly participants = new Map<string, IntelligenceParticipant>();
  readonly agreements = new Map<string, IntelligenceAgreement>();

  register(participant: IntelligenceParticipant): void {
    this.participants.set(participant.id, participant);
  }

  establish(agreement: IntelligenceAgreement): void {
    if (agreement.parties.length < 2) {
      throw new Error('multi-intelligence agreement requires at least two parties');
    }
    for (const party of agreement.parties) {
      if (!this.participants.has(party)) throw new Error(`unknown participant: ${party}`);
    }
    if (!agreement.governanceAuthority) throw new Error('governance authority is required');
    this.agreements.set(agreement.id, agreement);
  }

  authorize(action: IntelligenceAction): boolean {
    const actor = this.participants.get(action.actor);
    if (!actor || !actor.authorityDomain.includes(action.scope) || !actor.capabilities.includes(action.capability)) {
      return false;
    }
    return [...this.agreements.values()].some(
      agreement => agreement.parties.includes(action.actor) && agreement.scopes.includes(action.scope),
    );
  }
}
