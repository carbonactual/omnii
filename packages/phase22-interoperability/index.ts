export type EcosystemId = string;

export type InteropKind =
  | 'identity-reference'
  | 'trust-reference'
  | 'value-reference'
  | 'resource-reference'
  | 'relationship-reference'
  | 'agent-reference'
  | 'service-reference'
  | 'knowledge-reference'
  | 'capability-reference';

export interface InteroperabilityAgreement {
  id: string;
  sourceEcosystem: EcosystemId;
  targetEcosystem: EcosystemId;
  kinds: InteropKind[];
  allowedActions: string[];
  expiresAt?: string;
  revokedAt?: string;
  provenance: string;
}

export interface InteropRequest {
  sourceEcosystem: EcosystemId;
  targetEcosystem: EcosystemId;
  kind: InteropKind;
  action: string;
  subject: string;
}

export interface InteropDecision {
  allowed: boolean;
  reason: string;
  agreementId?: string;
}

export class InteroperabilityRegistry {
  private agreements = new Map<string, InteroperabilityAgreement>();

  register(agreement: InteroperabilityAgreement): void {
    if (agreement.sourceEcosystem === agreement.targetEcosystem) {
      throw new Error('interoperability agreement requires distinct ecosystems');
    }
    this.agreements.set(agreement.id, agreement);
  }

  revoke(id: string, at = new Date().toISOString()): void {
    const agreement = this.agreements.get(id);
    if (!agreement) throw new Error(`unknown agreement: ${id}`);
    agreement.revokedAt = at;
  }

  authorize(request: InteropRequest, now = new Date()): InteropDecision {
    for (const agreement of this.agreements.values()) {
      if (
        agreement.sourceEcosystem === request.sourceEcosystem &&
        agreement.targetEcosystem === request.targetEcosystem &&
        agreement.kinds.includes(request.kind) &&
        agreement.allowedActions.includes(request.action) &&
        !agreement.revokedAt &&
        (!agreement.expiresAt || new Date(agreement.expiresAt) > now)
      ) {
        return { allowed: true, reason: 'explicit interoperability agreement', agreementId: agreement.id };
      }
    }
    return { allowed: false, reason: 'no active agreement authorizes this cross-ecosystem operation' };
  }
}
