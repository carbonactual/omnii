# OMNII Global Value, Finance & Payment Network — 2026 Gap Audit Expansion

**Status:** Draft Canonical / Architecture Extension  
**Parent:** `docs/FINANCIAL_VALUE_NETWORK.md`  
**Related:** Alternative Assets, Creator/Prompt/Repository Economies, Economic Object Model, Value Recovery & Conversion

## Purpose

This document expands the OMNII global value architecture after a current 2026 landscape review of payments, financial-market infrastructure, cross-border finance, open finance, tokenized finance, global value chains, virtual assets and AI-agent financial activity.

The architecture must cover today's conventional financial system, informal and alternative exchange, digital economies, programmable finance and future economic systems without making any one rail, asset class, currency, issuer or jurisdiction the universal default.

Recent global infrastructure work reinforces several design requirements: harmonised ISO 20022 data for cross-border payments; interoperable fast-payment systems and APIs; open-finance interoperability; tokenised deposits and reserves with programmable/atomic settlement; granular global-value-chain data; agent-based analysis of AI participation in financial markets; and resilient legal/governance controls around tokenized finance. citehttps://www.bis.org/publications/harmonised-iso-20022-data-requirements-enhancing-cross-border-payments-updated-report citehttps://www.bis.org/about/bisih/topics/open_finance/aperta.htm citehttps://www.bis.org/project/agora citehttps://www.bis.org/project/insight citehttps://www.bis.org/project/logos

## 1. Newly Identified First-Class Domains

The following domains should be explicitly represented in the ecosystem in addition to the previously committed scope.

### A. Financial-market infrastructure

- Clearing
- Central counterparties / CCP relationships
- Securities settlement systems
- Central securities depository / CSD relationships
- Securities custody and sub-custody
- Transfer agency / registrar functions
- Corporate actions
- Redemption and maturity processing
- Asset servicing
- Margin and collateral management
- Netting
- Settlement finality
- Delivery-versus-payment
- Payment-versus-payment
- Default management
- Settlement fails
- Reconciliation
- Trade repositories
- Reference data
- Instrument master data

These are required because finance is not complete at “trade” or “payment”; ownership, clearing, collateral, custody, settlement and post-trade servicing are part of the value lifecycle.

### B. Securities financing and liquidity markets

- Repo
- Reverse repo
- Securities lending
- Borrowing/lending of eligible assets
- Margin lending
- Prime brokerage relationships
- Collateral transformation
- Collateral pools
- Haircuts
- Liquidity facilities
- Money-market instruments
- Commercial paper
- Certificates of deposit
- Short-term funding
- Liquidity buffers
- Treasury liquidity forecasting

Repo and securities financing are important global funding/collateral mechanisms and create interconnected risks that must be explicitly modeled. citehttps://www.fsb.org/2026/02/vulnerabilities-in-government-bond-backed-repo-markets/

### C. Asset-management economy

- Mutual funds
- ETFs
- Money-market funds
- Pension funds
- Sovereign wealth funds
- Endowments
- Family offices
- Private equity
- Venture capital
- Private credit
- Hedge funds
- Fund-of-funds
- Managed portfolios
- Mandates
- Model portfolios
- Separately managed accounts
- Net asset value / NAV
- Subscription/redemption flows
- Performance fees
- Management fees
- Fund accounting
- Beneficial ownership

Non-bank financial intermediation is a major part of global finance, including investment funds, insurers and other non-bank institutions, so the architecture cannot be bank-centric. citehttps://www.fsb.org/2025/12/global-monitoring-report-on-nonbank-financial-intermediation-2025/

### D. Retirement, pensions and lifetime finance

- Pension contributions
- Pension accounts
- Defined contribution
- Defined benefit
- Retirement products
- Annuities
- Decumulation
- Beneficiary pensions
- Survivor benefits
- Long-term savings
- Lifetime financial planning

### E. Mortgage, housing and property finance

- Mortgages
- Home-equity relationships
- Property leasing
- Rent-to-own
- Housing cooperatives
- Property escrow
- Property liens
- Land-title relationships
- Development finance
- Construction finance
- Property funds
- REITs
- Fractional property interests where lawful
- Rental receivables
- Property insurance
- Property maintenance reserves

### F. Embedded and contextual finance

Finance should be embeddable wherever an economic event occurs:

- Commerce
- Education
- Healthcare
- Transport
- Agriculture
- Property
- Employment
- Creator platforms
- Gaming
- SaaS
- Logistics
- Government services
- Travel
- Hospitality
- Industrial procurement

Examples:

`purchase -> financing -> insurance -> payment -> settlement`

`booking -> deposit -> escrow -> cancellation -> refund`

`LPO -> finance -> production -> delivery -> invoice -> settlement`

### G. Open banking / open finance / data portability

- Account information services
- Payment initiation
- Consent management
- Data portability
- Financial data aggregation
- Open-finance APIs
- Multi-bank views
- Multi-provider product comparison
- Permissioned data sharing
- Revocation
- Data provenance
- Data minimization
- Privacy-preserving analytics
- Cross-border financial-data interoperability

BIS Project Aperta highlights that domestic open-finance systems have advanced widely while cross-border interoperability remains fragmented by standards, data formats and trust frameworks. OMNII should therefore make cross-border financial data portability a native architectural objective. citehttps://www.bis.org/about/bisih/topics/open_finance/aperta.htm

### H. Identity, trust and authorization infrastructure

Financial activity depends on more than KYC.

Support:

- Identity proofing
- Legal identity
- Organizational identity
- Beneficial ownership
- Credentials
- Delegated authority
- Power of attorney
- Mandates
- Signatories
- Device identity
- Wallet identity
- Account ownership
- Consent
- Revocation
- Age/eligibility
- Jurisdiction
- Risk identity
- Reputation/trust signals

The identity layer remains linked to the canonical OMNII identity/governance model rather than becoming a duplicate identity universe.

### I. Financial crime, fraud and cyber-resilience

Expand beyond transaction monitoring:

- Account takeover
- Social engineering
- Synthetic identity
- Mule networks
- Merchant fraud
- Payment fraud
- Refund abuse
- Friendly fraud
- Chargeback abuse
- Collusion
- Market manipulation
- Insider risks
- Sanctions
- AML/CFT/CPF
- Source-of-funds
- Source-of-wealth
- On-chain analytics
- Wallet screening
- Travel Rule workflows
- Fraud graph
- Case management
- Investigations
- Evidence management
- Cyber incident response
- Recovery and business continuity

FATF's 2026 targeted update confirms continuing implementation gaps in virtual-asset AML/CFT controls, reinforcing the need for compliance and transaction monitoring to be instrument- and jurisdiction-aware. citehttps://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-updated-virtualassets-vasps-2026.html

### J. Trade-finance infrastructure

Expand the existing LPO/invoice chain to:

- Letters of credit
- Standby letters of credit
- Bank guarantees
- Performance guarantees
- Advance-payment guarantees
- Documentary collections
- Open-account trade
- Trade credit
- Supplier finance
- Distributor finance
- Dynamic discounting
- Reverse factoring
- Factoring
- Forfaiting
- Receivables purchase
- Receivables insurance
- Export credit
- Import finance
- Pre-shipment finance
- Post-shipment finance
- Inventory finance
- Warehouse receipts
- Electronic bills of lading
- Electronic transferable records
- Digital trade documents
- Customs-related value events
- Trade-document verification

ICC's 2026 digital-trade work emphasizes electronic transferable records and MLETR-style legal foundations for paperless trade and trade finance. citehttps://iccwbo.org/news-publications/guide/enabling-digital-trade-through-legal-reform-a-guide-for-policymakers-and-practitioners/

### K. Global supply-chain finance and value-chain finance

Model the complete chain:

`RAW MATERIAL -> SUPPLIER -> MANUFACTURER -> DISTRIBUTOR -> LOGISTICS -> WHOLESALER -> RETAILER -> CUSTOMER -> AFTERMARKET -> RECOVERY`

Track:

- Counterparties
- Dependencies
- Supplier concentration
- Purchase orders
- Inventory
- Transit
- Working capital
- Payment terms
- Receivables
- Payables
- Trade credit
- Financing
- Insurance
- Bottlenecks
- Shock propagation
- Substitution
- Recovery

BIS Project Insight demonstrates the importance of granular firm-to-firm, shipment, ownership and macroeconomic data for understanding global value-chain dependencies, vulnerabilities and opportunities. citehttps://www.bis.org/project/insight

### L. Payroll and earned-income infrastructure

- Payroll
- Salary payments
- Contractor payments
- Gig-worker settlement
- Earned-wage access
- Commissions
- Tips
- Bonuses
- Royalties
- Expense reimbursement
- Benefits
- Allowances
- Severance
- Pension contributions
- Payroll taxes
- Multi-country payroll
- Split payroll

### M. Government, development and social finance

- Sovereign debt
- Municipal finance
- Development finance
- Infrastructure finance
- Grants
- Subsidies
- Social transfers
- Benefits
- Aid
- Humanitarian funds
- Escrowed public funds
- Public procurement
- Participatory/community budgets
- Tax collection
- Royalty collection
- Resource revenue
- Public investment
- Public-private finance
- Impact finance

### N. Philanthropy, social finance and community capital

- Donations
- Zakat
- Sadaqah
- Waqf/endowment structures
- Charitable funds
- Grants
- Scholarships
- Crowdfunding
- Community savings
- Community lending
- Cooperative capital
- Mutual aid
- CSR
- Social-impact finance
- Outcome-based funding
- Matching funds

### O. Insurance and risk-transfer market infrastructure

- Insurance distribution
- Brokers
- Underwriting
- Reinsurance
- Retrocession
- Captive insurance
- Parametric insurance
- Microinsurance
- Nano-insurance
- Embedded insurance
- Insurance-linked securities
- Catastrophe bonds
- Claims administration
- Loss adjustment
- Premium finance
- Policy loans where applicable
- Reserves
- Claims escrow
- Takaful

### P. Environmental and natural-capital finance

Expand carbon into:

- Carbon allowances
- Carbon credits
- Removals
- Renewable-energy certificates
- Energy attributes
- Biodiversity credits
- Nature credits
- Water-related rights/credits where lawful
- Conservation finance
- Sustainable agriculture finance
- Forestry finance
- Restoration finance
- Climate adaptation finance
- Resilience finance
- Environmental impact claims

The World Bank's 2026 carbon-pricing report shows the growing economic scale of carbon pricing and crediting markets; nature-market and biodiversity-finance activity is also expanding. citehttps://www.worldbank.org/en/publication/state-and-trends-of-carbon-pricing citehttps://www.worldbank.org/en/events/2026/06/09/global-policy-forum-on-natural-capital-2026

### Q. Data, information and knowledge economy

- Data licences
- Data access
- Data subscriptions
- Data royalties
- Dataset marketplaces
- Research outputs
- Educational content
- Knowledge licences
- API access
- API metering
- Usage rights
- Digital archives
- Scientific datasets
- Proprietary information rights

### R. AI and machine economy

Extend the previously committed Agent Economy with:

- Machine-to-machine payments
- Agent-to-agent payments
- Agent wallets
- Delegated spending limits
- Machine purchasing
- Autonomous procurement
- Autonomous logistics
- Compute markets
- GPU markets
- Model access
- Inference credits
- Tool-use credits
- Prompt/API royalties
- Agent service fees
- Agent escrow
- Agent reputation
- Machine identity
- Agent liability
- Human override
- Agent transaction simulation
- Agent market-risk monitoring

BIS Project Logos is examining LLM-based agents behaving as portfolio managers in simulated financial markets, underscoring the need for explicit agent governance and market-risk models. citehttps://www.bis.org/project/logos

### S. Programmable finance and smart settlement

Support programmable rules for:

- Conditional payments
- Escrow
- Milestone payments
- Atomic settlement
- Delivery-versus-payment
- Payment-versus-payment
- Automated tax allocation
- Automated royalties
- Subscription billing
- Usage billing
- Revenue splits
- Reserve requirements
- Spending policies
- Collateral release
- Smart-contract settlement
- Compliance triggers
- Event-triggered finance
- Always-on settlement where supported

Project Agorá demonstrates current experimentation with tokenised commercial-bank deposits and central-bank reserves, multi-currency atomic settlement and workflow/compliance triggers. citehttps://www.bis.org/project/agora

### T. Money creation, issuance and redemption hierarchy

Model distinct issuer classes:

- Central bank / sovereign
- Commercial bank
- Licensed e-money issuer
- Payment institution
- Stablecoin issuer
- Securities/asset issuer
- Corporate issuer
- Platform issuer
- Community issuer
- Loyalty/reward issuer

For every instrument:

`issuer + authority + backing + supply + redemption + settlement + restrictions + jurisdiction + audit`

No platform token, reward point or voucher is automatically legal tender.

### U. Liquidity, reserves and treasury

- Cash management
- Reserve requirements
- Liquidity buffers
- Intraday liquidity
- Funding curves
- Liquidity forecasts
- FX exposure
- Currency matching
- Maturity matching
- Stress testing
- Contingency funding
- Treasury limits
- Intercompany funding
- Cash pooling
- Sweeps
- Netting
- Settlement windows

### V. Pricing and market infrastructure

The system needs more than “price.”

- Price discovery
- Quotes
- Bids
- Offers
- Order books
- Auctions
- Sealed bids
- Dynamic pricing
- Surge pricing
- Yield curves
- FX rates
- Reference prices
- Appraisals
- NAV
- Market comparables
- Valuation confidence
- Liquidity discounts
- Haircuts
- Risk-adjusted value
- Utility/Pulse value

### W. Dispute, claims and recovery

Every value flow should have a dispute lifecycle:

`claim -> evidence -> review -> negotiation -> arbitration/mediation -> decision -> settlement -> appeal/closure`

Also support:

- Refunds
- Chargebacks
- Reversals
- Reclaims
- Failed deliveries
- Counterfeit claims
- Warranty claims
- Insurance claims
- Contract claims
- Securities settlement fails
- Unauthorized transaction claims

### X. Value inheritance and continuity

Value can outlive the original holder.

Support:

- Beneficiaries
- Estates
- Succession
- inheritance
- Trusts
- custodial arrangements
- nominee arrangements
- transfer-on-death structures where lawful
- business succession
- continuity plans
- dormant assets
- abandoned property handling
- unclaimed balances

### Y. Time-to-value and expiry economy

Every expiring value object should expose:

- expiry date
- usable window
- extension rights
- conversion options
- transferability
- redemption options
- salvage value
- residual value
- notice periods

This covers subscriptions, points, vouchers, coupons, tickets, reservations, licenses, warranties, prepaid balances, data bundles, contracts and time-limited access.

## 2. Universal Financial Market Lifecycle

```text
CREATE / ISSUE
 -> REGISTER
 -> VERIFY
 -> PRICE
 -> DISTRIBUTE
 -> HOLD / CUSTODY
 -> USE / TRADE
 -> FINANCE
 -> CLEAR
 -> NET
 -> SETTLE
 -> SERVICE
 -> REPRICE
 -> TRANSFER / REDEEM
 -> EXPIRE / MATURE
 -> RECOVER / TRANSFORM
```

## 3. Universal Value Conversion Lifecycle

```text
DETECT
 -> CLASSIFY
 -> VERIFY RIGHTS
 -> MEASURE
 -> VALUE
 -> CHECK RESTRICTIONS
 -> FIND DEMAND
 -> FIND SUBSTITUTE USES
 -> FIND FINANCING
 -> FIND EXCHANGE PATHS
 -> RANK OPTIONS
 -> AUTHORIZE
 -> CONVERT
 -> SETTLE
 -> RECORD ACTUAL
 -> MEASURE RECOVERED VALUE
```

The optimizer must maximize **useful value**, not merely monetary price. A conversion can be better because it creates utility, saves resources, reduces waste, unlocks capacity or satisfies another obligation.

## 4. Universal Economic Graph

The master graph becomes:

```text
HUMAN
ORGANIZATION
GOVERNMENT
COMMUNITY
AGENT
MACHINE
OBJECT
ASSET
ACCOUNT
SERVICE
CAPABILITY
CAPACITY
TIME
RIGHT
OBLIGATION
AGREEMENT
RESOURCE
DATA
PROMPT
REPOSITORY
TOKEN
POINT
ENTITLEMENT
VALUE EVENT
```

Relations include:

`owns, controls, custodies, uses, needs, provides, produces, consumes, depends_on, substitutes_for, finances, insures, licenses, rents, leases, pledges, collateralizes, exchanges, transfers, transforms, repairs, recycles, redeems, expires, settles`

## 5. New Principle: No Stranded Value

A value object enters a **Stranded Value State** when it remains unused, inaccessible, expired, fragmented, redundant or disconnected from potential demand despite having permissible residual utility.

The system should actively search for:

- direct use
- alternate use
- transfer
- aggregation
- bundling
- exchange
- resale
- financing
- donation
- conversion
- repair
- refurbishment
- component harvesting
- material recovery
- energy recovery
- data/licence recovery
- recycling

The system must not force conversion. It should present economically, legally, safely and ethically viable options.

## 6. New Principle: Value Can Be Nested

Value objects can contain, reference or depend on other value objects.

Examples:

```text
AIRLINE TICKET
 -> seat capacity
 -> route capacity
 -> airline service
 -> payment right
 -> cancellation/refund rights
```

```text
REPOSITORY
 -> code
 -> contributors
 -> licence
 -> dependencies
 -> issues
 -> users
 -> deployment capacity
 -> IP rights
```

```text
PROMPT SERVICE
 -> prompt
 -> model access
 -> data
 -> tools
 -> compute
 -> output rights
 -> usage limits
```

```text
LOAN
 -> principal
 -> repayment obligation
 -> collateral
 -> insurance
 -> covenants
 -> payment schedule
```

## 7. New Principle: Value Can Be Layered

An object can simultaneously have:

- use value
- exchange value
- financial value
- collectible value
- cultural value
- scarcity value
- strategic value
- environmental value
- social value
- data value
- access value
- future value

The system retains these as separate dimensions rather than collapsing them into a single number.

## 8. New Principle: Every Conversion Must Preserve Meaning

Converting one representation to another must preserve the underlying semantics:

`asset != legal right != custody claim != token != account balance != entitlement`

The conversion engine must explicitly record what changed:

- ownership
- custody
- quantity
- denomination
- legal right
- economic exposure
- usage right
- settlement claim
- issuer
- jurisdiction

## 9. Global Interoperability Fabric

The network should support:

- ISO 20022
- APIs
- webhooks/events
- open-finance interfaces
- payment-rail adapters
- bank connectors
- card connectors
- mobile-money connectors
- blockchain connectors
- custody connectors
- securities-market connectors
- insurance connectors
- trade-document connectors
- identity/KYC connectors
- tax/reporting connectors
- external valuation feeds
- market-data feeds
- logistics/oracle feeds

Interoperability must be adapter-based so no provider becomes a constitutional dependency.

## 10. Final Scope

The complete OMNII financial/value system now spans:

```text
MONEY
BANKING
PAYMENTS
ACCOUNTS
WALLETS
FX
OPEN FINANCE
CAPITAL MARKETS
SECURITIES
CLEARING
SETTLEMENT
CUSTODY
ASSET SERVICING
TREASURY
LIQUIDITY
CREDIT
TRADE FINANCE
SUPPLY-CHAIN FINANCE
INSURANCE
TAKAFUL
PENSIONS
WEALTH
INVESTMENT
PROPERTY FINANCE
ISLAMIC FINANCE
NANO-BANKING
BARTER
COMMUNITY FINANCE
SOCIAL FINANCE
PUBLIC FINANCE
CRYPTO
ALTCOINS
STABLECOINS
TOKENIZATION
NFTs
POINTS
REWARDS
ACCESS
SUBSCRIPTIONS
TELECOM VALUE
GAMING
CREATOR ECONOMY
PROMPT ECONOMY
REPOSITORY ECONOMY
AGENT ECONOMY
SERVICE ECONOMY
ASSET ECONOMY
TIME ECONOMY
CAPABILITY ECONOMY
CAPACITY ECONOMY
OBJECT ECONOMY
NATURAL CAPITAL
ENERGY
CARBON
BIODIVERSITY
DATA
IP
COLLECTIBLES
ART
RARE BOOKS
JEWELRY
PRECIOUS METALS
LIVESTOCK
PROPERTY
INVENTORY
WASTE / RECOVERY
FUTURE VALUE
CONDITIONAL VALUE
ESCROW
AGREEMENTS
LPOs
RECEIVABLES
ROYALTIES
AND EMERGING VALUE CLASSES
```

## 11. Constitutional Rule

No product may create a narrower private definition of value that conflicts with the universal ontology.

Products may specialize the presentation, rules, instruments and interfaces, but the underlying Value Object / Value Event / Rights / Obligations / Settlement / Conversion model remains shared.

The architecture therefore supports both the conventional financial economy and the broader OMNII value economy without forcing all value into money.

## 12. Relationship to OMNII

```text
GOVERNANCE  = determines what is permitted
IDENTITY     = determines who/what participates
VALUE        = determines what economic significance exists
RIGHTS       = determines what may be done with it
AGREEMENTS   = create structured obligations and conditions
TRADE        = exchanges value
FINANCE      = allocates time, capital and risk
PAYMENT      = moves settlement consideration
CLEARING     = determines obligations between participants
SETTLEMENT   = finalizes obligations
CUSTODY      = safeguards/records controlled value
RISK         = measures and manages uncertainty
COMPLIANCE   = applies legal/regulatory constraints
CONVERSION   = transforms/rescues value
PULSE        = evaluates outcomes/value performance
ACTUAL       = records operational truth
ATLAS        = presents curated state
ABBA         = orchestrates within delegated authority
```

## 13. Design Direction

Build the network as **modular financial/value infrastructure**, not as a monolithic bank.

Each provider, rail, issuer, market, asset class, jurisdiction and future technology is an adapter or governed domain around the universal economic object model.

The architecture must remain capable of adding new value forms without redesigning its foundation.