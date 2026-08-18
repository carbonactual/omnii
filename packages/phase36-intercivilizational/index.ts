export interface CivilizationProfile { id: string; protocolVersion: string; identityModel: string; trustModel: string; valueModel: string; governanceModel: string; }
export interface InterCivilizationAgreement { id: string; parties: string[]; scopes: string[]; conditions: string[]; expiresAt?: string; }
export class InterCivilizationalProtocol {
  readonly profiles = new Map<string, CivilizationProfile>();
  readonly agreements = new Map<string, InterCivilizationAgreement>();
  register(profile: CivilizationProfile): void { this.profiles.set(profile.id, profile); }
  establish(agreement: InterCivilizationAgreement): void {
    if (agreement.parties.length < 2) throw new Error('agreement requires at least two parties');
    for (const party of agreement.parties) if (!this.profiles.has(party)) throw new Error(`unknown civilization: ${party}`);
    this.agreements.set(agreement.id, agreement);
  }
  canExchange(source: string, target: string, scope: string): boolean {
    return [...this.agreements.values()].some(a => a.parties.includes(source) && a.parties.includes(target) && a.scopes.includes(scope) && (!a.expiresAt || new Date(a.expiresAt) > new Date()));
  }
}
