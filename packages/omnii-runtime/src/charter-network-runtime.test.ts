import { describe, expect, it } from "vitest";
import { CharterNetworkRuntime } from "./charter-network-runtime";

describe("CharterNetworkRuntime", () => {
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

  it("finds a feasible multimodal path", () => {
    const result = runtime.route(graph, "A", "C");
    expect(result.feasible).toBe(true);
    expect(result.nodes).toEqual(["A", "B", "C"]);
  });

  it("finds a fallback when an edge is blocked", () => {
    const result = runtime.fallback(graph, "A", "C", graph.edges[0]);
    expect(result.feasible).toBe(true);
    expect(result.nodes).toEqual(["A", "D", "C"]);
  });
});
