export type TransportCertificationProfile = {
  id: string;
  subject: string;
  verificationMethods: readonly string[];
  standards: readonly string[];
  futureMaturity: "operational" | "pilot" | "ready" | "emerging" | "research" | "vision";
  legalAuthority: "external-authority-required" | "issuer-defined" | "not-applicable";
  tokenization: "not-applicable" | "possible-when-lawful" | "regulated-path";
};

export const TRANSPORT_CERTIFICATION_PROFILES: readonly TransportCertificationProfile[] = [
  {
    id: "person-digital-credential",
    subject: "driver, rider, passenger, operator, technician or crew identity/attribute",
    verificationMethods: ["verifiable-credential", "decentralized-identifier", "digital-signature", "registry-check"],
    standards: ["W3C VC 2.0", "W3C DID 1.1", "ISO/IEC 18013-5"],
    futureMaturity: "ready",
    legalAuthority: "external-authority-required",
    tokenization: "not-applicable",
  },
  {
    id: "vehicle-digital-product-passport",
    subject: "vehicle and major component lifecycle/provenance",
    verificationMethods: ["registry-check", "evidence-hash", "digital-signature", "inspection", "telemetry-attestation"],
    standards: ["EU Digital Product Passport", "EU Battery Passport", "GS1 EPCIS-compatible event model"],
    futureMaturity: "ready",
    legalAuthority: "external-authority-required",
    tokenization: "possible-when-lawful",
  },
  {
    id: "software-defined-vehicle",
    subject: "vehicle software, configuration and update lifecycle",
    verificationMethods: ["digital-signature", "automated-test", "evidence-hash", "cybersecurity-assessment"],
    standards: ["UNECE R155", "UNECE R156", "ISO 24089:2023"],
    futureMaturity: "operational",
    legalAuthority: "external-authority-required",
    tokenization: "not-applicable",
  },
  {
    id: "connected-v2x-mobility",
    subject: "vehicle/infrastructure/road-user connected movement evidence",
    verificationMethods: ["telemetry-attestation", "sensor-observation", "evidence-hash", "automated-test"],
    standards: ["W3C VC 2.0"],
    futureMaturity: "emerging",
    legalAuthority: "external-authority-required",
    tokenization: "not-applicable",
  },
  {
    id: "drone-rpas",
    subject: "remotely piloted aircraft and drone operations",
    verificationMethods: ["registry-check", "operator-credential", "digital-signature", "telemetry-attestation", "authority-attestation"],
    standards: ["ICAO UTM concepts", "W3C VC 2.0"],
    futureMaturity: "operational",
    legalAuthority: "external-authority-required",
    tokenization: "possible-when-lawful",
  },
  {
    id: "evtol-aam",
    subject: "electric vertical take-off and landing / advanced air mobility capability",
    verificationMethods: ["type-certification", "safety-case", "operator-credential", "digital-signature", "telemetry-attestation"],
    standards: ["W3C VC 2.0"],
    futureMaturity: "emerging",
    legalAuthority: "external-authority-required",
    tokenization: "regulated-path",
  },
  {
    id: "autonomous-road-system",
    subject: "automated/autonomous road vehicle capability",
    verificationMethods: ["automated-test", "safety-case", "cybersecurity-assessment", "software-update-verification", "telemetry-attestation"],
    standards: ["UNECE automated-driving-system guidance", "UNECE R155", "UNECE R156", "ISO 24089:2023"],
    futureMaturity: "emerging",
    legalAuthority: "external-authority-required",
    tokenization: "possible-when-lawful",
  },
  {
    id: "autonomous-maritime",
    subject: "remote or autonomous maritime surface ship capability",
    verificationMethods: ["safety-case", "cybersecurity-assessment", "authority-attestation", "telemetry-attestation", "automated-test"],
    standards: ["IMO MASS Code"],
    futureMaturity: "emerging",
    legalAuthority: "external-authority-required",
    tokenization: "regulated-path",
  },
  {
    id: "autonomous-underwater",
    subject: "autonomous or remotely operated underwater mobility systems",
    verificationMethods: ["safety-case", "telemetry-attestation", "automated-test", "human-review"],
    standards: ["W3C VC 2.0"],
    futureMaturity: "research",
    legalAuthority: "external-authority-required",
    tokenization: "possible-when-lawful",
  },
  {
    id: "off-world-mobility",
    subject: "orbital, lunar, planetary and future off-world movement systems",
    verificationMethods: ["mission-assurance", "safety-case", "digital-signature", "telemetry-attestation", "evidence-hash"],
    standards: ["W3C VC 2.0"],
    futureMaturity: "vision",
    legalAuthority: "external-authority-required",
    tokenization: "regulated-path",
  },
  {
    id: "tokenized-transport-right",
    subject: "lawful digital representation of a transport asset, capacity, receivable or other right",
    verificationMethods: ["issuer-attestation", "digital-signature", "registry-check", "evidence-hash", "legal-review"],
    standards: ["W3C VC 2.0"],
    futureMaturity: "ready",
    legalAuthority: "external-authority-required",
    tokenization: "regulated-path",
  },
];
