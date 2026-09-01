# Transport Certification, Verification & Tokenization Framework

**Status:** Operational architecture extension
**Domain:** Universal transport / mobility

## Purpose

The transport network needs to distinguish a product being designed, an implementation being present, an asset being verified, an authority issuing a credential, and a legally effective tokenized instrument. This document defines the shared language without making OMNII the legal issuer or regulator.

## 1. Verification layers

### Identity verification
Use authoritative identifiers and, where suitable, decentralized identifiers (DIDs) and mobile credentials. W3C DID v1.1 is a Candidate Recommendation Snapshot as of 5 March 2026; W3C VC 2.0 is a Recommendation and supports cryptographically secure, privacy-respecting, machine-verifiable claims.

### Credential verification
Represent licences, qualifications, permits, inspections, ownership/role attestations and other claims as verifiable credentials where the issuer, holder and verifier model is appropriate. ISO/IEC 18013-5 defines interfaces for mobile driving licences, including machine-readable acquisition, origin authentication and integrity verification.

### Asset provenance
NAB records the lifecycle evidence of an asset from manufacture/origin through shipment, import, registration, ownership/custody, maintenance, conversion, inspection, incidents, operation and retirement. Evidence is referenced rather than duplicated.

### Digital product / battery passport readiness
The asset model supports passport-style identity and lifecycle data. The EU Battery Passport demonstrates the emerging pattern: a QR-linked digital identity with technical, performance, repair, reuse, recycling and sustainability information. The OMNII model is intentionally transport-wide and is not an assertion of EU compliance by itself.

### Telemetry and sensor evidence
Telemetry, sensor observations, charging/fuelling readings, location signals and automated tests can be recorded as evidence with source, timestamp, integrity and confidence. These are observations and do not become legal authority merely because they are machine-generated.

### Inspection and safety evidence
Human inspections, automated tests and safety cases may be attached to an asset, journey, infrastructure node or service capability. Authority and jurisdiction remain explicit.

### Cybersecurity and software state
For connected/software-defined road vehicles, certification evidence can reference cybersecurity and software-update controls. UNECE UN Regulation No. 155 covers cybersecurity and UN Regulation No. 156 covers software updates/software-update management systems. ISO 24089:2023 provides software-update engineering requirements/recommendations across vehicles, ECUs, infrastructure and deployment packages.

### Autonomous-system verification
Future/autonomous transport records must include autonomy level, operational design domain, human oversight, safety case, cybersecurity state and software-update state. For maritime autonomy, the IMO adopted the non-mandatory MASS Code in May 2026; it took effect 1 July 2026 and introduces safety, security, environmental and human-responsibility expectations for autonomous/remote cargo ships.

## 2. Tokenization layers

Tokenization is modeled as a lifecycle independent from ordinary certification:

`research → designed → token-ready → issuer-pending → issued → suspended/revoked`

A token-ready record means that identity, rights, authority, risk, provenance, transfer conditions and technical representation can be defined. It does **not** mean that a token has been legally issued or that a holder has a legally enforceable ownership/security interest.

### Tokenization metadata

Every tokenization record may carry:

- asset/right reference;
- instrument type;
- issuer;
- jurisdiction;
- regulated-activity flag;
- custody arrangement;
- settlement route;
- token standard/contract reference;
- fractionalization status;
- legal-effect statement;
- provenance/evidence references.

### Nigeria regulatory boundary

The SEC Nigeria proposed digital/virtual asset rules published 20 August 2026 expressly cover issuance/offering, tokenisation and lifecycle management, trading, custody, transfer and settlement, plus related investment/advisory activity. Therefore transport tokenization in Nigeria must be treated as a regulated path where applicable, with authorized issuers, custodians and service providers. OMNII can model readiness, provenance, rights and references; it does not self-appoint as a regulated market operator or custodian.

## 3. Future certification states

Use a separate maturity state for emerging technology:

- `operational`
- `pilot`
- `ready`
- `emerging`
- `research`
- `vision`

This prevents future autonomy, drones, eVTOL, autonomous vessels, hydrogen, battery swap or other emerging systems from being presented as presently deployed merely because the architecture can represent them.

## 4. Standard evidence envelope

```text
Evidence
├── evidence_id
├── subject_id
├── claim
├── issuer/source
├── method
├── standard references
├── jurisdiction
├── observed/issued time
├── expiry/revocation state
├── proof/integrity reference
├── confidence
└── authority relationship
```

## 5. Transport certification principle

> Certification is a claim about an object, service, person, capability or event backed by an identified issuer/source and evidence. Verification is the process used to test that claim. Tokenization is a separate legal/technical representation lifecycle.

The transport network therefore becomes capable of interoperating with government registries, inspection bodies, credential systems, manufacturers, operators, energy providers, logistics systems, regulated digital-asset infrastructure and future autonomous-system certification without making competing claims of authority.

## References

- W3C Verifiable Credentials 2.0: https://www.w3.org/news/2025/the-verifiable-credentials-2-0-family-of-specifications-is-now-a-w3c-recommendation/
- W3C DID Core v1.1: https://www.w3.org/TR/did-core/
- ISO/IEC 18013-5 mobile driving licence: https://www.iso.org/standard/69084.html
- EU Digital Product Passport / Battery Passport: https://single-market-economy.ec.europa.eu/single-market-economy/digital-product-passport/batteries_en
- UNECE reference documents for cybersecurity/software updates: https://unece.org/transport/road-transport/reference-documents
- ISO 24089 software update engineering: https://www.iso.org/standard/77796.html
- IMO Maritime Autonomous Surface Ships Code: https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-adopts-mass-code.aspx
- Nigeria SEC proposed Digital and Virtual Assets Rules (20 August 2026): https://sec.gov.ng/for-investors/proposed-rules-digital-and-virtual-assets-operations-custody-and-markets/
