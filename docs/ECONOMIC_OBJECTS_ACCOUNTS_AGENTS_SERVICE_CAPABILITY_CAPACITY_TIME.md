# OMNII Economic Object, Account, Agent, Service, Capability, Capacity & Time Economy

**Status:** Draft Canonical / Extension to the Global Value, Finance & Payment Network
**Parent:** `docs/FINANCIAL_VALUE_NETWORK.md`

## Purpose

The OMNII economy must represent not only money and assets, but the entities and structures through which value is created, held, controlled, offered, consumed, transformed and recovered.

This extension establishes first-class economic domains for:

- Accounts Economy
- Agent Economy
- Service Ecosystem
- Asset Economy
- Time Economy
- Capability Economy
- Capacity Economy
- Object Economy

These domains interoperate through the universal Value Object / Value Event model and remain extensible.

## 1. Economic Object Principle

An **Economic Object** is any identifiable object, relationship, capability, capacity, entitlement, account, service, resource, asset, obligation or other unit that can participate in an economic process.

Economic objects do not need to be money, transferable or tradable to have economic relevance.

Examples include:

- a bank account
- a wallet
- a machine
- a spare part
- a service slot
- a human skill
- an agent's authorized task capacity
- one hour of availability
- an airline seat
- a subscription entitlement
- a repository
- a prompt
- a game item
- an inventory item
- an LPO
- a contract
- a piece of land
- a livestock record
- a reward balance

Every object may have:

`identity + classification + state + rights + obligations + owner/custodian + location + availability + value + dependencies + restrictions + lifecycle`

## 2. Accounts Economy

An account is an economic container, relationship, or stateful position—not merely a bank account.

### Account classes

- Bank accounts
- Savings accounts
- Current/transaction accounts
- Domiciliary/multi-currency accounts
- Mobile-money accounts
- Wallets
- E-money accounts
- Virtual accounts
- Escrow accounts
- Settlement accounts
- Collection accounts
- Merchant accounts
- Investment accounts
- Custody accounts
- Credit accounts
- Loan accounts
- Collateral accounts
- Points/rewards accounts
- Airline/hotel loyalty accounts
- Gaming accounts
- Subscription accounts
- Entitlement accounts
- Project accounts
- Family accounts
- Cooperative/community accounts
- Institutional/government accounts
- Agent settlement accounts

### Account state

An account can track:

`available + reserved + pending + escrowed + pledged + disputed + frozen + accrued + expiring + convertible`

An account may also reference multiple underlying value classes without asserting that all balances are equivalent.

### Account lifecycle

```text
OPEN
 -> VERIFY
 -> FUND / RECEIVE
 -> HOLD
 -> ALLOCATE
 -> TRANSFER / SPEND / EXCHANGE
 -> RECONCILE
 -> SETTLE
 -> CLOSE / ROLLOVER / TRANSFORM
```

## 3. Agent Economy

Agents are economic actors when they are authorized to perform useful work or interact with value systems.

Agent classes may include:

- Human agents
- AI agents
- software agents
- merchant agents
- sales agents
- collection agents
- logistics agents
- procurement agents
- financial agents
- trading agents
- service agents
- institutional agents
- autonomous machines
- robots
- IoT/device agents

### Agent economic profile

```text
AGENT
├── identity
├── principal / owner
├── authority / delegation
├── capabilities
├── limits
├── jurisdictions
├── credentials
├── accounts / settlement channels
├── tasks
├── performance
├── reputation / trust
├── costs
├── rewards / compensation
├── liabilities / obligations
└── audit trail
```

Agents can discover opportunities, negotiate within rules, perform tasks, request/receive payment, create records, and coordinate services. Consequential actions remain subject to the applicable human/institutional authority, legal permissions and financial controls.

### Agent economy lifecycle

```text
IDENTITY -> AUTHORITY -> DISCOVER -> ACCEPT TASK
-> EXECUTE -> VERIFY -> COMPENSATE -> RATE/PULSE -> LEARN
```

## 4. Service Ecosystem

Services are executable economic capabilities rather than abstract listings.

A service object contains:

`provider + capability + scope + unit + price/value + availability + quality + prerequisites + SLA + location + delivery mode + evidence + settlement terms`

### Service lifecycle

```text
CAPABILITY
 -> SERVICE OFFER
 -> DISCOVERY
 -> QUOTE / PRICE
 -> BOOK / CONTRACT
 -> DELIVER
 -> VERIFY
 -> ACCEPT / DISPUTE
 -> SETTLE
 -> PULSE / REPUTATION
 -> REPEAT / IMPROVE
```

Services may be:

- On-demand
- Scheduled
- recurring
- subscription-based
- milestone-based
- usage-metered
- capacity-constrained
- conditional
- bundled
- barter-enabled
- credit-financed
- agent-delivered
- human-delivered
- machine-delivered
- hybrid

## 5. Asset Economy

The Asset Economy represents things that store, produce, support, enable, secure or represent value.

### Asset families

- Cash and monetary assets
- Financial assets
- Digital assets
- Cryptoassets
- Tokenized assets
- NFTs
- Property
- Land
- Vehicles
- Aircraft
- Ships
- Machinery
- Equipment
- Tools
- Inventory
- Warehouses
- Infrastructure
- Energy systems
- Natural resources
- Precious metals
- Jewelry
- Art
- Collectibles
- Rare books/manuscripts
- Biological assets
- Livestock
- Agricultural assets
- Data assets
- Intellectual property
- Software
- Repositories
- Prompts
- Domains
- Capacity assets

Asset state must be lifecycle-aware:

`new -> active -> used -> maintained -> repaired -> upgraded -> idle -> transferred -> repurposed -> dismantled -> recovered`

## 6. Time Economy

Time is a measurable economic dimension, but human beings are never reduced to a commodity.

The Time Economy represents legitimate availability, scheduling, service duration, deadlines, waiting time, machine time, delivery windows and other time-linked obligations.

Examples:

- 30-minute consultation
- 8-hour workday
- machine-hours
- aircraft flight time
- room nights
- storage duration
- compute time
- charging time
- delivery window
- appointment slot
- subscription period
- lease term
- contract milestone

### Time object

```text
TIME SLOT
├── start
├── end
├── duration
├── actor/resource
├── timezone
├── availability
├── reservation
├── price/value
├── dependency
├── expiry
├── utilization
└── outcome
```

Time can therefore be:

`scheduled + reserved + consumed + released + wasted + recovered/repurposed`

The system should actively detect avoidable idle time and unused booking capacity where doing so creates legitimate value.

## 7. Capability Economy

A **Capability** is what a person, organization, machine, agent or system is able to do.

Examples:

- coding
- teaching
- farming
- repairing engines
- flying
- transporting goods
- translating
- diagnosing
- manufacturing
- designing
- computing
- analyzing data
- generating media
- negotiating
- auditing
- providing financial services

Capability is distinct from capacity:

**Capability = ability to perform.**

**Capacity = amount/availability of that ability or resource at a given time.**

Capabilities may have:

`skill level + credential + evidence + quality + specialization + permissions + equipment dependencies + location + availability`

## 8. Capacity Economy

Capacity is unused or available potential that can become productive output.

Examples:

- Idle factory hours
- spare truck capacity
- empty airline seats
- vacant hotel rooms
- unused warehouse space
- unused classroom seats
- available hospital capacity
- spare machine time
- available farm land
- unused solar generation
- battery capacity
- unused data bandwidth
- compute/GPU capacity
- human availability
- agent task capacity

### Capacity lifecycle

```text
TOTAL CAPACITY
 -> RESERVED
 -> AVAILABLE
 -> BOOKED
 -> UTILIZED
 -> VERIFIED
 -> SETTLED
 -> RELEASED
 -> REAVAILABLE
```

The system should calculate utilization and identify safe, lawful and economically sensible ways to match idle capacity with demand.

## 9. Object Economy

The Object Economy extends the ontology below the conventional definition of an asset.

An ordinary object can acquire economic relevance through:

- use
- scarcity
- ownership
- rental
- repair
- resale
- spare-part function
- component value
- material value
- collectible value
- data association
- service enablement
- recycling
- transformation

Examples:

- A spare screw
- A replacement battery
- A used phone
- Packaging
- A shipping container
- A broken machine part
- A returned product
- A tool
- A chair
- A cable
- A component harvested from obsolete equipment

### Object lifecycle

```text
CREATE / ACQUIRE
 -> OWN / CUSTODY
 -> USE
 -> MAINTAIN
 -> REPAIR
 -> UPGRADE
 -> REUSE
 -> RESALE / RENT / REPURPOSE
 -> DISASSEMBLE
 -> COMPONENT RECOVERY
 -> MATERIAL RECOVERY
 -> NEW OBJECT / NEW VALUE
```

## 10. Spare-Part Economy

Spare parts become searchable economic objects with:

- part identity
- manufacturer
- compatibility
- condition
- quantity
- location
- lead time
- substitute parts
- repair history
- inventory state
- warranty
- price/value

This enables:

`need -> compatibility match -> existing inventory -> recovered part -> new part -> fabrication -> delivery -> settlement`

The system should prefer viable reuse/recovery before unnecessary disposal or new procurement, subject to safety, quality and regulatory requirements.

## 11. Capability-to-Service-to-Payment Chain

```text
PERSON / MACHINE / AGENT
        ↓
CAPABILITY
        ↓
CAPACITY
        ↓
SERVICE OFFER
        ↓
DEMAND MATCH
        ↓
BOOKING / AGREEMENT
        ↓
DELIVERY
        ↓
VERIFICATION
        ↓
PAYMENT / BARTER / CREDIT
        ↓
SETTLEMENT
        ↓
PULSE / REPUTATION
```

## 12. Account-to-Object Chain

```text
ACCOUNT
  ↓
VALUE HELD
  ↓
ASSET / RIGHT / ENTITLEMENT
  ↓
USE / TRANSFER / PLEDGE / EXCHANGE
  ↓
EVENT
  ↓
LEDGER
  ↓
ACTUAL
```

## 13. Agent-to-Agent Economy

Agents may transact with other agents under explicit authority:

```text
AGENT A
 -> DISCOVERS
 -> NEGOTIATES
 -> CONTRACTS
 -> AGENT B
 -> EXECUTES
 -> VERIFIES
 -> SETTLES
```

Examples include procurement agents, logistics agents, AI software agents, autonomous machines, marketplace agents and financial reconciliation agents.

## 14. Composition Economy

Economic objects may be composed into larger value structures.

Examples:

```text
CAPABILITY + TIME + EQUIPMENT = SERVICE
```

```text
ASSET + OPERATOR + ENERGY + TIME = PRODUCTION
```

```text
LPO + SUPPLIER + FINANCE + INVENTORY = FULFILLMENT
```

```text
PROMPT + MODEL + DATA + COMPUTE = AI SERVICE
```

```text
REPOSITORY + CONTRIBUTORS + LICENSE + USERS = SOFTWARE ECONOMY
```

A composition can create a new Value Object without destroying the identity of its components.

## 15. Dependency Economy

Value often depends on other objects.

Examples:

- Machine depends on spare parts and energy.
- Service depends on skilled people and equipment.
- AI service depends on prompts, models, data and compute.
- Repository depends on maintainers, dependencies and infrastructure.
- Airline ticket depends on aircraft/route/seat capacity.
- Subscription depends on platform access and infrastructure.

The dependency graph should support:

`criticality + substitution + availability + cost + risk + lead time + failure impact`

## 16. Utilization and Idle-Value Engine

For any object, account, service, capability or capacity, the network may calculate:

- available quantity
- utilization
- idle time
- unused balance
- expiry risk
- maintenance state
- conversion opportunities
- demand matches
- recovery value

The objective is not forced monetization. The objective is **useful utilization**.

## 17. Universal Conversion Graph

All economic-object domains connect to the Value Recovery & Conversion Engine:

```text
OBJECT
 ↓
CURRENT STATE
 ↓
RIGHTS / RESTRICTIONS
 ↓
POSSIBLE USES
 ↓
POSSIBLE CONVERSIONS
 ↓
DEMAND MATCHES
 ↓
VALUE / COST / RISK
 ↓
RANKED OPTIONS
 ↓
AUTHORIZED ACTION
 ↓
TRANSFORM
 ↓
SETTLE
 ↓
MEASURE RECOVERED VALUE
```

## 18. Economic Object Graph

The complete network is modeled as a graph:

```text
PARTY
 ├── ACCOUNTS
 ├── AGENTS
 ├── CAPABILITIES
 ├── TIME
 ├── CAPACITY
 ├── SERVICES
 ├── ASSETS
 ├── OBJECTS
 ├── RIGHTS
 ├── OBLIGATIONS
 ├── CONTRACTS
 └── VALUE EVENTS
```

Objects can be related to:

`owns | controls | custodies | uses | produces | consumes | depends_on | finances | insures | services | leases | licenses | pledges | transfers | transforms | repairs | recycles`

## 19. Economic Performance

Each economic object can be evaluated across multiple dimensions:

- Utility
- Productivity
- Cost
- Revenue
- Risk
- Reliability
- Utilization
- Durability
- Scarcity
- Liquidity
- Circularity
- Environmental impact
- Social impact
- Time efficiency
- Pulse / outcome

No single number is required to represent every dimension.

## 20. Interoperability with Existing OMNII Domains

```text
ACCOUNTS        = containers / positions
AGENTS          = actors / executors
SERVICES        = capabilities delivered
ASSETS          = stores / producers / representations of value
TIME            = temporal availability and obligation
CAPABILITY      = what can be done
CAPACITY        = how much can be done / used
OBJECTS         = physical/digital economic units
TRADE           = exchange
FINANCE         = time/risk/capital structures
PAYMENT         = settlement movement
ESCROW          = conditional control
VALUE CONVERSION= transformation / recovery
PULSE           = feedback / outcome
ACTUAL          = operational truth
ATLAS           = curated presentation
ABBA            = orchestration within authority
```

## 21. Constitutional Principles

1. No economic object is assumed to be money merely because it has value.
2. No account balance is assumed to have the same rights or liquidity as another balance.
3. Capability is not capacity; capacity is not output.
4. Time is measurable economic context, not a reduction of people to commodities.
5. Agents operate under explicit authority and accountability.
6. Services require verifiable delivery and outcome states.
7. Assets retain identity, rights, custody and encumbrance information.
8. Ordinary objects can acquire, retain or recover value through use and transformation.
9. Conversion is subject to rights, safety, law, economics and consent.
10. Unused value should be discoverable and reusable where legitimately possible.
11. Components can participate in compositions without losing traceability.
12. The ontology remains open to future economic objects and forms.

## 22. Universal Economic Object Lifecycle

```text
IDENTIFY
 ↓
CLASSIFY
 ↓
ESTABLISH RIGHTS
 ↓
MEASURE
 ↓
VALUE
 ↓
DISCOVER / MATCH
 ↓
ALLOCATE
 ↓
USE / DELIVER / EXCHANGE
 ↓
VERIFY
 ↓
SETTLE
 ↓
PULSE
 ↓
MAINTAIN / REPAIR / REUSE / REPURPOSE
 ↓
RECOVER / TRANSFORM
 ↓
NEW VALUE
```

This extension is intentionally modular. Products may use only the domains they require, while sharing the same universal value, identity, rights, event, settlement, recovery and governance primitives.