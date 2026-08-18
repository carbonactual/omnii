export type ExchangeKind = 'identity' | 'knowledge' | 'value' | 'capability' | 'resource' | 'relationship';
export interface ExchangeAuthorization { id: string; source: string; target: string; kinds: ExchangeKind[]; conditions: string[]; expiresAt?: string; }
export interface ExchangeRequest { source: string; target: string; kind: ExchangeKind; payloadRef: string; }
export class CivilizationExchangeLayer {
  readonly authorizations = new Map<string, ExchangeAuthorization>();
  authorize(a: ExchangeAuthorization): void { this.authorizations.set(a.id, a); }
  canExchange(r: ExchangeRequest): boolean {
    return [...this.authorizations.values()].some(a => a.source === r.source && a.target === r.target && a.kinds.includes(r.kind) && (!a.expiresAt || new Date(a.expiresAt) > new Date()));
  }
}
