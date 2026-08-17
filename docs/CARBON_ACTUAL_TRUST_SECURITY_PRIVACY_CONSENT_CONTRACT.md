# Carbon Actual Trust, Security, Privacy, Consent & Verification Contract

**Status:** Canonical kernel contract

Carbon Actual treats trust and security as properties of interactions and evidence, not permanent labels attached to people or systems.

## 1. Trust

Trust is contextual confidence that a participant, claim, capability, relationship or action satisfies defined conditions.

Trust must be:

- scoped
- evidence-backed
- time-aware
- revocable
- explainable where appropriate

No universal trust score is constitutionally authoritative.

## 2. Verification

Verification establishes whether a claim satisfies a defined verification method.

Verification answers a specific question. It does not prove everything about the subject.

Examples:

- identity verification
- credential verification
- capability verification
- ownership verification
- provenance verification
- Providence verification
- authorization verification
- transaction verification

## 3. Attestation

An attestation is a signed or otherwise attributable assertion by a participant or trusted mechanism.

Attestation is evidence, not automatic truth.

## 4. Reputation

Reputation is an accumulated view of historical behavior under defined contexts.

Reputation must not silently become identity, authority or permanent exclusion.

## 5. Risk

Risk represents uncertainty and potential adverse consequence under a defined scenario.

Risk analysis may include:

- likelihood
- impact
- exposure
- uncertainty
- reversibility
- detectability
- dependencies
- threat conditions

## 6. Security

Security protects:

- identity
- authority
- data
- resources
- capabilities
- communications
- workflows
- infrastructure
- value
- continuity

Security is not merely perimeter defense.

## 7. Privacy

Privacy is a first-class property of data and interactions.

Carbon Actual should implement:

- data minimization
- purpose limitation
- least privilege
- selective disclosure
- compartmentalization
- encryption where appropriate
- local processing where appropriate
- revocation
- retention limits
- auditable access
- user/authorized-subject control

The ecosystem should not expose a participant's underlying information merely because a third party needs to verify a claim.

## 8. Consent

Consent is an explicit, scoped authorization where consent is the appropriate legal and governance basis.

Consent must specify, where applicable:

- subject
- purpose
- action
- recipient
- scope
- duration
- conditions
- revocation

Consent is not the only source of legitimate authority. Law, contract, emergency authority, institutional role and other recognized bases may apply.

## 9. Delegation

Delegation grants scoped authority to another participant without transferring the delegator's identity.

Delegation must be:

- explicit or otherwise validly established
- scoped
- time/context bound where appropriate
- auditable
- revocable where appropriate

## 10. Authentication vs authorization

Authentication establishes who or what is presenting an identity.

Authorization establishes what that participant is permitted to do.

```text
AUTHENTICATION ≠ AUTHORIZATION
```

## 11. Selective disclosure

A verifier should receive the minimum information required to establish the requested claim.

Example:

Instead of exposing a full identity record, the system may expose a proof that:

`required qualification = satisfied`

without disclosing unrelated personal information.

## 12. Identity and HASH

HASH represents the ecosystem identity relationship between a human and associated intelligence under the Carbon Actual identity model.

HASH does not mean that every connected application receives the person's underlying identity data.

External systems should receive the minimum authorized representation necessary for the requested interaction.

## 13. SEAL

SEAL represents human/authorized approval and authority boundaries.

A SEAL may approve an action, delegation, credential, contract or transition according to its scope.

A valid SEAL does not grant unlimited authority.

## 14. Ash

Ash represents residual, stripped or non-value information/value after an ecosystem event is processed, subject to the Ash policy.

Ash may preserve enough security/contextual information to detect misuse without unnecessarily exposing the underlying private data.

Ash is not a universal deletion mechanism and is not automatically public.

## 15. Phoenix

Phoenix is the ecosystem security response/recovery mechanism activated by defined threat conditions.

Possible responses include:

- containment
- isolation
- revocation
- quarantine
- credential invalidation
- blocking
- recovery
- forensic preservation
- escalation
- remediation

Phoenix actions must be governed, scoped and proportionate. "Obliteration" is not an unconstrained destructive instruction.

## 16. Threat model

Security architecture must account for:

- compromised credentials
- malicious participants
- compromised integrations
- malicious or defective software
- compromised hardware
- data exfiltration
- supply-chain attacks
- social engineering
- model manipulation
- prompt/tool injection
- insider misuse
- unauthorized delegation
- replay
- fraud
- denial of service
- privacy leakage
- future attack classes

## 17. Zero-trust principle

No participant, network, integration or device is trusted merely because it is inside the ecosystem boundary.

Every sensitive request should be evaluated according to identity, authority, context, policy and risk.

## 18. External integration

Third-party integrations receive scoped interfaces and minimum necessary information.

The external party should not need direct access to Carbon Actual's internal registries merely to perform a contracted function.

## 19. Security event chain

```text
SIGNAL
 ↓
VERIFY
 ↓
ASSESS CONTEXT + RISK
 ↓
AUTHORIZE / DENY
 ↓
EXECUTE
 ↓
MONITOR
 ↓
DETECT
 ↓
ASH / CONTAINMENT
 ↓
PHOENIX RESPONSE
 ↓
RECOVER
 ↓
LEARN
```

## 20. No absolute security claim

Carbon Actual must not claim that any architecture is literally impossible to break. The objective is resilient, continuously hardened, cryptographically protected and economically/governance-aware security with explicit threat assumptions and recovery paths.

## 21. Universal rule

Every product branch, integration, contract, agent, human workflow and hardware/software capability must inherit these security, privacy, authority and verification primitives rather than implementing independent security models.
