import assert from "node:assert/strict";
import test from "node:test";

import {
  DnsResolverAdapter,
  DidResolverAdapter,
  EnsResolverAdapter,
  HnsResolverAdapter,
  selectResolverAdapter,
  McpProtocolAdapter,
  A2aProtocolAdapter,
  LocalProtocolAdapter,
  selectProtocolAdapter,
} from "../../src/integration/adapters/index.js";

const proof = [{ kind: "resolver", source: "fixture", proofRef: "proof:1" }];

test("DID uses method drivers and does not hard-code a DID method", async () => {
  const adapter = new DidResolverAdapter("did:mesh", [{
    method: "example",
    resolve: async () => ({ records: { id: "did:example:1" }, evidence: proof, verified: true }),
  }]);
  const result = await adapter.resolve({ scheme: "did", method: "example", value: "did:example:1" });
  assert.equal(result.status, "resolved");
  assert.equal(result.verified, true);
});

test("ENS, HNS, and DNS use the same adapter-neutral resolution shape", async () => {
  const resolver = async (reference: { scheme: string; value?: string; name?: string }) => ({
    records: { reference },
    evidence: proof,
    verified: false,
  });
  const ens = new EnsResolverAdapter("ens:test", resolver);
  const hns = new HnsResolverAdapter("hns:test", resolver);
  const dns = new DnsResolverAdapter("dns:test", resolver);
  assert.equal((await ens.resolve({ scheme: "ens", name: "alice.eth" })).status, "resolved");
  assert.equal((await hns.resolve({ scheme: "hns", name: "alice/" })).status, "resolved");
  assert.equal((await dns.resolve({ scheme: "dns", name: "example.test" })).status, "resolved");
  assert.equal(selectResolverAdapter({ scheme: "ens", name: "alice.eth" }, [dns, ens])?.adapterId, "ens:test");
});

test("protocol adapters normalize every transport into one execution result", async () => {
  const executor = async () => ({ status: "success" as const, completed: true, evidenceRefs: ["evidence:1"], proofRefs: ["proof:1"], output: { ok: true } });
  const mcp = new McpProtocolAdapter("mcp:test", executor);
  const a2a = new A2aProtocolAdapter("a2a:test", executor);
  const local = new LocalProtocolAdapter("local:test", executor);
  assert.equal((await mcp.execute({ capabilityId: "cap:1", input: {} })).protocol, "MCP");
  assert.equal((await a2a.execute({ capabilityId: "cap:1", input: {} })).protocol, "A2A");
  assert.equal((await selectProtocolAdapter("LOCAL", [mcp, local])?.execute({ capabilityId: "cap:1", input: {} }))?.protocol, "LOCAL");
});
