import { describe, expect, it } from "vitest";
import { reconcileExpectedObserved } from "./reconciliation-runtime";

describe("reconciliation runtime", () => {
  it("matches equivalent expected and observed state", () => {
    const result = reconcileExpectedObserved({ correlationId: "corr-1", kind: "scheduled_completion", expected: { status: "completed", count: 1 }, observed: { status: "completed", count: 1 } });
    expect(result.matched).toBe(true);
    expect(result.discrepancy).toBeUndefined();
  });
  it("records structured discrepancies", () => {
    const result = reconcileExpectedObserved({ correlationId: "corr-2", kind: "payment", expected: { amount: 100 }, observed: { amount: 80 } });
    expect(result.matched).toBe(false);
    expect(result.discrepancy?.fields.amount).toEqual({ expected: 100, observed: 80 });
  });
});
