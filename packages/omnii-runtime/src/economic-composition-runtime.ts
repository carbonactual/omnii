export type EconomicDimension =
  | "time" | "energy" | "material" | "human_effort" | "attention" | "knowledge"
  | "data" | "connectivity" | "capacity" | "wear" | "depreciation" | "risk"
  | "opportunity" | "environmental" | "infrastructure" | "capital";

export type EconomicClassification = "asset" | "liability" | "balanced";
export type SettlementRail = "off_chain" | "ledger" | "blockchain" | "hybrid";

export interface ValueVectorEntry {
  dimension: EconomicDimension | string;
  quantity: number;
  unit: string;
  valuation: number;
  method: string;
  provenance: Record<string, unknown>;
}

export interface ValueVector {
  entries: ValueVectorEntry[];
  total: number;
  currency?: string;
  context?: Record<string, unknown>;
}

export interface Fraction {
  numerator: number;
  denominator: number;
  scope: string;
  validFrom?: string;
  validTo?: string;
  semantics: "use" | "access" | "ownership" | "revenue" | "voting" | "allocation" | "other";
}

export interface Resolution {
  value: number;
  unit: string;
  level?: string;
  precision?: number;
  scale?: string;
}

export interface EconomicComposition {
  id: string;
  underlyingObject: string;
  fraction?: Fraction;
  resolution?: Resolution;
  democratization?: {
    eligibleSubjects: string[];
    floorProtected: boolean;
    safeHavenProtected: boolean;
    accessRule: string;
  };
  given: ValueVector;
  pulse: ValueVector;
  classification: EconomicClassification;
  delta: number;
}

export interface TokenRepresentation {
  id: string;
  underlyingObject: string;
  fraction?: Fraction;
  rights: string[];
  obligations: string[];
  issuer: string;
  custodian?: string;
  ownership?: string;
  authority: Record<string, unknown>;
  supply: number;
  lifecycle: "draft" | "active" | "frozen" | "revoked" | "retired";
  settlementRail: SettlementRail;
  provenance: Record<string, unknown>;
}

export interface MintInstruction {
  idempotencyKey: string;
  issuer: string;
  authority: string;
  underlyingObject: string;
  quantity: number;
  tokenType: string;
  settlementRail: SettlementRail;
}

export interface EcosystemEconomicProfile {
  vector: ValueVector;
  average: number;
  floor: number;
  safeHaven: number;
}

export function sumValueVector(vector: ValueVector): number {
  return vector.entries.reduce((sum, entry) => sum + entry.valuation, 0);
}

export function normalizeValueVector(vector: ValueVector): ValueVector {
  const total = sumValueVector(vector);
  return { ...vector, entries: vector.entries.map((entry) => ({ ...entry })), total };
}

export function classifyAssetLiability(given: ValueVector, pulse: ValueVector): EconomicClassification {
  const g = sumValueVector(given);
  const p = sumValueVector(pulse);
  if (p > g) return "liability";
  if (p < g) return "asset";
  return "balanced";
}

export function calculateEconomicComposition(input: Omit<EconomicComposition, "classification" | "delta">): EconomicComposition {
  const given = normalizeValueVector(input.given);
  const pulse = normalizeValueVector(input.pulse);
  return {
    ...input,
    given,
    pulse,
    classification: classifyAssetLiability(given, pulse),
    delta: pulse.total - given.total,
  };
}

export function validateFraction(fraction: Fraction): void {
  if (!Number.isFinite(fraction.numerator) || !Number.isFinite(fraction.denominator)) throw new Error("fraction must be numeric");
  if (fraction.denominator <= 0) throw new Error("fraction denominator must be positive");
  if (fraction.numerator < 0 || fraction.numerator > fraction.denominator) throw new Error("fraction numerator must be within denominator");
}

export function validateResolution(resolution: Resolution): void {
  if (!Number.isFinite(resolution.value)) throw new Error("resolution value must be numeric");
  if (resolution.precision !== undefined && (!Number.isInteger(resolution.precision) || resolution.precision < 0)) throw new Error("precision must be a non-negative integer");
}

export function validateMintInstruction(input: MintInstruction): void {
  if (!input.issuer || !input.authority) throw new Error("minting requires issuer and authority");
  if (!input.idempotencyKey) throw new Error("minting requires idempotencyKey");
  if (input.quantity <= 0) throw new Error("mint quantity must be positive");
  if (!input.underlyingObject) throw new Error("minting requires an underlying object");
}

export function aggregateEcosystemVectors(vectors: ValueVector[]): ValueVector {
  const byDimension = new Map<string, ValueVectorEntry>();
  for (const vector of vectors) {
    for (const entry of vector.entries) {
      const existing = byDimension.get(`${entry.dimension}:${entry.unit}`);
      if (existing) {
        existing.quantity += entry.quantity;
        existing.valuation += entry.valuation;
      } else {
        byDimension.set(`${entry.dimension}:${entry.unit}`, { ...entry });
      }
    }
  }
  const entries = [...byDimension.values()];
  return { entries, total: entries.reduce((sum, entry) => sum + entry.valuation, 0) };
}

export function deriveEcosystemProfile(vectors: ValueVector[], floor: number, safeHaven: number): EcosystemEconomicProfile {
  const vector = aggregateEcosystemVectors(vectors);
  const average = vectors.length ? vector.total / vectors.length : 0;
  return { vector, average, floor, safeHaven };
}
