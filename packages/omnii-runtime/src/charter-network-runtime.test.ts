import assert from "node:assert/strict";
import test from "node:test";
import { CharterNetworkRuntime } from "./charter-network-runtime";

test("CharterNetworkRuntime finds a feasible multimodal path", () => {
  const runtime = new CharterNetworkRuntime();
  const graph = {
    journeyId: "j",
    nodes: [{ id: "A", kind: "origin" as const }, { id: "B", kind: "handoff" as const }, { id: "C", kind: "destination" as const }, { id: "D", kind: "station" as const }],
    edges: [
      { from: "A", to: "B", mode: "road", sequence: 1, status: "ready" as const },
      { from: "B", to: "C", mode: "rail", sequence: 2, status: "ready" as const },
      { from: "A", to: "D", mode: "road", sequence: 3, status: "ready" as const },
      { from: "D", to: "C", mode: "road", sequence: 4, status: "ready" as const },
    ],
  };
  const result = runtime.route(graph, "A", "C");
  assert.equal(result.feasible, true);
  assert.deepEqual(result.nodes, ["A", "B", "C"]);
});

test("CharterNetworkRuntime finds a fallback when an edge is blocked", () => {
  const runtime = new CharterNetworkRuntime();
  const graph = {
    journeyId: "j",
    nodes: [{ id: "A", kind: "origin" as const }, { id: "B", kind: "handoff" as const }, { id: "C", kind: "destination" as const }, { id: "D", kind: "station" as const }],
    edges: [
      { from: "A", to: "B", mode: "road", sequence: 1, status: "ready" as const },
      { from: "B", to: "C", mode: "rail", sequence: 2, status: "ready" as const },
      { from: "A", to: "D", mode: "road", sequence: 3, status: "ready" as const },
      { from: "D", to: "C", mode: "road", sequence: 4, status: "ready" as const },
    ],
  };
  const result = runtime.fallback(graph, "A", "C", graph.edges[0]);
  assert.equal(result.feasible, true);
  assert.deepEqual(result.nodes, ["A", "D", "C"]);
});
