import type { IdentityRef, NameRef, CorrelationEvidence } from "../identity.js";
import type { ResolutionResult } from "../resolution.js";

export type ResolverReference = IdentityRef | NameRef;

export interface ResolverAdapter {
  readonly adapterId: string;
  readonly schemes: readonly string[];
  supports(reference: ResolverReference): boolean;
  resolve(reference: ResolverReference): Promise<ResolutionResult>;
}

export interface DidMethodDriver {
  readonly method: string;
  resolve(reference: IdentityRef): Promise<{
    records: Readonly<Record<string, unknown>>;
    evidence: readonly CorrelationEvidence[];
    verified?: boolean;
  }>;
}

export class DidResolverAdapter implements ResolverAdapter {
  readonly adapterId: string;
  readonly schemes = ["did"] as const;
  private readonly drivers: ReadonlyMap<string, DidMethodDriver>;

  constructor(adapterId: string, drivers: readonly DidMethodDriver[]) {
    this.adapterId = adapterId;
    this.drivers = new Map(drivers.map((driver) => [driver.method, driver]));
  }

  supports(reference: ResolverReference): boolean {
    return reference.scheme === "did";
  }

  async resolve(reference: ResolverReference): Promise<ResolutionResult> {
    if (reference.scheme !== "did") throw new Error("DID adapter received non-DID reference");
    const method = reference.method ?? reference.value.split(":")[1];
    const driver = this.drivers.get(method);
    if (!driver) {
      return { reference, adapterId: this.adapterId, status: "unresolved", records: {}, evidence: [] };
    }
    const resolved = await driver.resolve(reference);
    return { reference, adapterId: this.adapterId, status: "resolved", ...resolved };
  }
}

interface RecordResolver {
  (reference: ResolverReference): Promise<{
    records: Readonly<Record<string, unknown>>;
    evidence: readonly CorrelationEvidence[];
    verified?: boolean;
    metadata?: Readonly<Record<string, unknown>>;
  }>;
}

class FunctionResolverAdapter implements ResolverAdapter {
  constructor(
    public readonly adapterId: string,
    public readonly schemes: readonly string[],
    private readonly resolver: RecordResolver,
  ) {}

  supports(reference: ResolverReference): boolean {
    return this.schemes.includes(reference.scheme);
  }

  async resolve(reference: ResolverReference): Promise<ResolutionResult> {
    if (!this.supports(reference)) throw new Error(`unsupported scheme: ${reference.scheme}`);
    try {
      const result = await this.resolver(reference);
      return { reference, adapterId: this.adapterId, status: "resolved", ...result };
    } catch (error) {
      return {
        reference,
        adapterId: this.adapterId,
        status: "error",
        records: {},
        evidence: [],
        metadata: { error: error instanceof Error ? error.message : String(error) },
      };
    }
  }
}

export class EnsResolverAdapter extends FunctionResolverAdapter {
  constructor(adapterId: string, resolver: RecordResolver) {
    super(adapterId, ["ens"], resolver);
  }
}

export class HnsResolverAdapter extends FunctionResolverAdapter {
  constructor(adapterId: string, resolver: RecordResolver) {
    super(adapterId, ["hns"], resolver);
  }
}

export class DnsResolverAdapter extends FunctionResolverAdapter {
  constructor(adapterId: string, resolver: RecordResolver) {
    super(adapterId, ["dns"], resolver);
  }
}

export function selectResolverAdapter(
  reference: ResolverReference,
  adapters: readonly ResolverAdapter[],
): ResolverAdapter | undefined {
  return adapters.find((adapter) => adapter.supports(reference));
}
