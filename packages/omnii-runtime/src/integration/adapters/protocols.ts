import type { ProtocolKind } from "../protocols.js";

export type AdapterExecutionStatus =
  | "success"
  | "partial-success"
  | "timeout"
  | "authentication-failure"
  | "authorization-failure"
  | "incompatible"
  | "security-rejection"
  | "failed";

export interface AdapterExecutionRequest {
  readonly capabilityId: string;
  readonly input: Readonly<Record<string, unknown>>;
  readonly authorityContext?: Readonly<Record<string, unknown>>;
  readonly timeoutMs?: number;
}

export interface AdapterExecutionResult {
  readonly adapterId: string;
  readonly protocol: ProtocolKind;
  readonly status: AdapterExecutionStatus;
  readonly completed: boolean;
  readonly output?: unknown;
  readonly evidenceRefs: readonly string[];
  readonly proofRefs: readonly string[];
  readonly errorCode?: string;
  readonly errorMessage?: string;
}

export interface ProtocolAdapter {
  readonly adapterId: string;
  readonly protocol: ProtocolKind;
  execute(request: AdapterExecutionRequest): Promise<AdapterExecutionResult>;
}

export type ProtocolExecutor = (
  request: AdapterExecutionRequest,
) => Promise<Omit<AdapterExecutionResult, "adapterId" | "protocol">>;

class FunctionProtocolAdapter implements ProtocolAdapter {
  constructor(
    public readonly adapterId: string,
    public readonly protocol: ProtocolKind,
    private readonly executor: ProtocolExecutor,
  ) {}

  async execute(request: AdapterExecutionRequest): Promise<AdapterExecutionResult> {
    try {
      return {
        adapterId: this.adapterId,
        protocol: this.protocol,
        ...(await this.executor(request)),
      };
    } catch (error) {
      return {
        adapterId: this.adapterId,
        protocol: this.protocol,
        status: "failed",
        completed: false,
        evidenceRefs: [],
        proofRefs: [],
        errorCode: "ADAPTER_EXCEPTION",
        errorMessage: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export class McpProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "MCP", executor); } }
export class A2aProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "A2A", executor); } }
export class ApiProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "API", executor); } }
export class SdkProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "SDK", executor); } }
export class CliProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "CLI", executor); } }
export class WebProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "WEB", executor); } }
export class LocalProtocolAdapter extends FunctionProtocolAdapter { constructor(id: string, executor: ProtocolExecutor) { super(id, "LOCAL", executor); } }

export function selectProtocolAdapter(
  protocol: ProtocolKind,
  adapters: readonly ProtocolAdapter[],
): ProtocolAdapter | undefined {
  return adapters.find((adapter) => adapter.protocol === protocol);
}
