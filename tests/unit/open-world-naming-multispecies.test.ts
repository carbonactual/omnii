import { describe, expect, it } from "vitest";
import { normalizeResolution, isResolutionUsable, preserveUnknownParticipant, validateInterparticipantProtocol } from "../../packages/omnii-runtime/src";

describe("OMNII naming and multi-species open world", () => {
  it("treats naming resolution separately from identity and preserves provenance", () => {
    const resolution = normalizeResolution({
      namespaceId: "ens", name: "Alice.ETH", subjectId: "did:example:alice",
      status: "verified", confidence: 1, provenance: { resolver: "test" }
    });
    expect(resolution.name).toBe("Alice.ETH");
    expect(isResolutionUsable(resolution)).toBe(true);
  });

  it("can represent an unclassified participant without inventing a species", () => {
    const participant = preserveUnknownParticipant({
      id: "unknown-1", embodiment: "unknown", provenance: { observation: "sensor" }, confidence: 0.2
    });
    expect(participant.classification).toBe("unknown");
  });

  it("requires explicit authority for interparticipant protocols", () => {
    expect(() => validateInterparticipantProtocol({
      id: "p1", participantA: "a", participantB: "b", protocolType: "translation",
      communicationMethod: {}, rightsObligations: {}, risks: {}, authority: {}
    })).toThrow(/authority/);

    expect(() => validateInterparticipantProtocol({
      id: "p2", participantA: "a", participantB: "b", protocolType: "translation",
      communicationMethod: { modality: "radio" }, rightsObligations: {}, risks: {}, authority: { issuer: "governance-1" }
    })).not.toThrow();
  });
});
