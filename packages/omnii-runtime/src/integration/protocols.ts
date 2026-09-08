export type ProtocolKind = "MCP" | "A2A" | "API" | "SDK" | "CLI" | "WEB" | "LOCAL";

export type ProtocolIntent =
  | "deterministic"
  | "structured-tool-data"
  | "agent-delegation"
  | "direct-service"
  | "embedded-performance"
  | "browser-external-world"
  | "private-edge";

export interface ProtocolProfile {
  readonly kind: ProtocolKind;
  readonly supports: readonly ProtocolIntent[];
  readonly stateless?: boolean;
  readonly streaming?: boolean;
  readonly bidirectional?: boolean;
}

export const DEFAULT_PROTOCOL_PROFILES: readonly ProtocolProfile[] = [
  { kind: "CLI", supports: ["deterministic"] },
  { kind: "MCP", supports: ["structured-tool-data"], stateless: true, streaming: true },
  { kind: "A2A", supports: ["agent-delegation"], bidirectional: true, streaming: true },
  { kind: "API", supports: ["direct-service"], stateless: true, streaming: true },
  { kind: "SDK", supports: ["embedded-performance"] },
  { kind: "WEB", supports: ["browser-external-world"], streaming: true },
  { kind: "LOCAL", supports: ["private-edge"], stateless: true, streaming: true },
];
