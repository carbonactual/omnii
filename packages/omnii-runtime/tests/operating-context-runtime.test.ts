import { describe, expect, it } from "vitest";
import { OperatingContextRuntime } from "../src/operating-context-runtime";

describe("OperatingContextRuntime", () => {
  it("requires fleet, mode, capacity, service, authority and time context", async () => {
    const runtime = new OperatingContextRuntime();
    const context = await runtime.create({
      subjectId: "vehicle-1",
      fleetId: "fleet-1",
      mode: "commercial-passenger-road",
      capacity: "commercial_driver",
      serviceId: "service-1",
      journeyId: "journey-1",
      jurisdiction: "NG",
      authorityRef: "permit-1",
      validFrom: "2026-09-01T08:00:00.000Z",
    });

    expect(context).toMatchObject({
      subjectId: "vehicle-1",
      fleetId: "fleet-1",
      mode: "commercial-passenger-road",
      capacity: "commercial_driver",
      serviceId: "service-1",
      journeyId: "journey-1",
      jurisdiction: "NG",
      authorityRef: "permit-1",
    });
  });

  it("resolves the context active at a given time", async () => {
    const runtime = new OperatingContextRuntime();
    await runtime.create({
      subjectId: "vehicle-1",
      fleetId: "fleet-1",
      mode: "rental",
      capacity: "rental_user",
      validFrom: "2026-09-01T08:00:00.000Z",
      validUntil: "2026-09-01T12:00:00.000Z",
    });

    const active = await runtime.resolve("vehicle-1", "2026-09-01T10:00:00.000Z");
    expect(active).toHaveLength(1);
    expect(active[0].capacity).toBe("rental_user");
  });
});
