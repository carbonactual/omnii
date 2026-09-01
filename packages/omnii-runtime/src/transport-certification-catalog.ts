import { PersistencePort } from "./persistence";
import { TransportCertificationRuntime, TransportSurfaceInput } from "./transport-certification-runtime";

export const CANONICAL_TRANSPORT_SURFACES: readonly TransportSurfaceInput[] = [
  {
    id: "charter",
    name: "CHARTER",
    role: "universal movement layer",
    architecture: "present",
    runtime: "present",
    product: "present",
    integration: "live location, mobility-provider and production dispatch adapters required",
    sourceRefs: [
      "docs/architecture/CHARTER_TRANSPORT_BUILD_CLOSURE.md",
      "packages/omnii-runtime/src/charter-runtime.ts",
    ],
  },
  {
    id: "nab",
    name: "NAB",
    role: "automobile biography and registry composition",
    architecture: "present",
    runtime: "present",
    product: "present",
    integration: "government registry and institutional adapters required",
    sourceRefs: ["docs/architecture/NAB_CONSTITUTION.md", "packages/omnii-runtime/src/nab-runtime.ts"],
  },
  {
    id: "fleet",
    name: "Fleet",
    role: "organizational asset operations",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "live telemetry, dispatch and maintenance integrations required",
    sourceRefs: [
      "docs/architecture/CHARTER_LOGISTICO_FLEET_BOUNDARY.md",
      "docs/architecture/CHARTER_LOGISTICO_FLEET_INTEGRATION_MAP.md",
    ],
  },
  {
    id: "logistico",
    name: "Logistico",
    role: "goods and cargo movement workflow",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "operator, custody, customs and live cargo integrations required",
    sourceRefs: [
      "docs/architecture/CHARTER_LOGISTICO_FLEET_BOUNDARY.md",
      "UNIVERSAL_MOVEMENT.md",
    ],
  },
  {
    id: "hitch",
    name: "Hitch",
    role: "conditional and shared movement experience",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "availability, matching, identity and safety integrations required",
    sourceRefs: ["docs/architecture/CHARTER_TRANSPORT_PRODUCT_HANDOFFS.md"],
  },
  {
    id: "pilgrim",
    name: "Pilgrim",
    role: "pilgrimage journey composition",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "routes, stops, accommodation, service and safety integrations required",
    sourceRefs: ["docs/architecture/UNIVERSAL_MOVEMENT_CONSTITUTION.md"],
  },
  {
    id: "along",
    name: "Along",
    role: "shared corridor participation",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "corridor, availability and live movement data required",
    sourceRefs: ["UNIVERSAL_MOVEMENT.md"],
  },
  {
    id: "green-mobility-energy-bridge",
    name: "Green Mobility / Energy Bridge",
    role: "energy-aware mobility connectivity",
    architecture: "present",
    runtime: "planned",
    product: "present",
    integration: "charging, CNG, fuel, station and energy-data providers required",
    sourceRefs: [
      "docs/architecture/CARBON_ACTUAL_ARCHITECTURE_TRACEABILITY.md",
      "docs/architecture/CHARTER_TRANSPORT_BUILD_CLOSURE.md",
    ],
  },
  {
    id: "cngneers",
    name: "CNGNEERS",
    role: "technical engineering and mobility workforce capability",
    architecture: "present",
    runtime: "planned",
    product: "present",
    integration: "credentialing, workforce availability, booking and service-execution integrations required",
    sourceRefs: ["canon/PRODUCTS.md", "foundation-ai/pillar-ai-12.md"],
  },
  {
    id: "spare",
    name: "SPARE",
    role: "parts, repair and replacement-resource ecosystem",
    architecture: "present",
    runtime: "partial",
    product: "present",
    integration: "parts, vendor, workshop and service-network integrations required",
    sourceRefs: ["spare/product-scope.md", "spare/implementation-roadmap.md"],
  },
];

export async function registerCanonicalTransportSurfaces(
  persistence: PersistencePort,
): Promise<TransportCertificationRuntime> {
  const runtime = new TransportCertificationRuntime(persistence);
  for (const surface of CANONICAL_TRANSPORT_SURFACES) {
    if (!(await runtime.getSurface(surface.id))) {
      await runtime.registerSurface(surface);
    }
  }
  return runtime;
}
