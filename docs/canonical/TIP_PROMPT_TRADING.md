# TIP Prompt Trading Specification

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Natural-language intent to validated trading/investment/market actions without bypassing TIP's risk, compliance, authority or execution controls.

---

## 1. Constitutional Definition

**Prompt Trading** is the TIP capability through which an authorized participant expresses a market intent in natural language and TIP converts that intent into a structured, testable, reviewable and executable strategy or transaction plan.

Prompt Trading is not a free-form command channel. A prompt is treated as **intent**, not authority to bypass controls.

The canonical flow is:

```text
HUMAN / AUTHORIZED AGENT INTENT
        ↓
PROMPT PARSE
        ↓
STRUCTURE / NORMALIZE
        ↓
AMBIGUITY DETECTION
        ↓
MARKET + DATA CONTEXT
        ↓
STRATEGY / ORDER PLAN
        ↓
SIMULATION / BACKTEST WHERE APPLICABLE
        ↓
RISK + COMPLIANCE + AUTHORITY CHECKS
        ↓
PRE-TRADE VALIDATION
        ↓
USER / POLICY CONFIRMATION AS REQUIRED
        ↓
EXECUTION
        ↓
MONITORING
        ↓
POST-TRADE ANALYSIS
        ↓
PULSE / LEARNING
```

---

## 2. Prompt as Intent

A prompt may express:

- an immediate order
- a conditional order
- a trading strategy
- a portfolio objective
- a hedging objective
- an investment thesis
- a financing objective
- a screening request
- a research question
- a rebalancing policy
- a risk policy
- a recurring automation

Examples:

```text
"Buy BTC only if the 20-day trend is positive and risk remains below my limit."

"Find Nigerian agricultural export opportunities with positive expected value after FX, freight,
customs and financing costs. Do not execute; show me the top opportunities."

"Build and backtest a momentum strategy for this universe over the last five years, include fees
and slippage, and only propose it for paper trading if it survives out-of-sample testing."

"Invest 5% of available capital across eligible low-risk opportunities, keeping the required reserve."
```

Prompt Trading must understand the difference between **analysis**, **proposal**, **paper execution**, **approval request** and **live execution**.

---

## 3. Prompt-to-Policy Compiler

TIP should compile natural language into an explicit machine-readable strategy specification.

Minimum normalized fields:

```text
intent_id
principal
authority_scope
market_domain
instrument / market_object
universe
side
entry_conditions
exit_conditions
position_size
capital_source
risk_budget
max_loss
profit_target
stop_loss
leverage_policy
timeframe
order_type
execution_constraints
liquidity_constraints
fees_assumptions
slippage_assumptions
currency
hedging_rules
rebalance_rules
schedule
expiry
approval_mode
compliance_constraints
data_sources
model_version
strategy_version
backtest_policy
paper/live_mode
```

The compiler must flag missing, contradictory or ambiguous parameters rather than silently inventing assumptions when doing so could materially affect risk.

---

## 4. Ambiguity Handling

Prompts such as:

```text
"Buy the dip."
"Trade aggressively."
"Make as much money as possible."
```

are not directly executable.

TIP must translate them into explicit questions or a non-executing proposal containing assumptions.

A user may select from safe defaults where appropriate, but the system must expose material assumptions before execution.

---

## 5. Evidence Before Execution

Prompt-generated strategies must not be treated as valid merely because an AI model sounds confident.

Where the requested action is systematic, TIP should support:

- historical backtesting
- transaction-cost modelling
- slippage modelling
- out-of-sample testing
- walk-forward testing
- stress testing
- sensitivity analysis
- regime analysis
- liquidity testing
- drawdown analysis
- benchmark comparison
- paper trading / forward testing

Historical evidence does not guarantee future results.

---

## 6. Prompt Trading Modes

### Read-only

Research, valuation, screening and explanation. No orders.

### Simulate

Build the proposed action and simulate outcomes.

### Backtest

Evaluate a systematic strategy against historical data.

### Paper Trade

Run against live market data using simulated capital.

### Approval Required

Prepare an order/strategy and wait for explicit authorization.

### Policy Controlled

A previously approved strategy may execute automatically within predefined limits.

### Live

Place eligible live orders through connected execution infrastructure after all required controls pass.

The system must make the current mode visible at all times.

---

## 7. Universal Risk Gate

Every prompt-generated trade must pass the same risk engine as API, algorithmic and manual orders.

Prompt Trading can never bypass:

- maximum exposure
- maximum loss
- portfolio concentration limits
- leverage limits
- liquidity limits
- market-status checks
- compliance restrictions
- account permissions
- jurisdiction restrictions
- kill switches
- daily/weekly drawdown controls
- capital-reserve requirements

Existing TIP policy remains authoritative, including the configured **maximum 10% per trade** rule and the **100% daily profit stop** where that policy is enabled for the relevant strategy/account.

---

## 8. Progression and Regression

Prompt Trading participates in the TIP progression/regression engine.

### Progression

Validated performance can permit:

- broader opportunity access
- higher permitted deployment within constitutional limits
- additional strategy automation
- expanded market coverage

### Regression

Losses, unstable performance, regime change, abnormal volatility, poor execution or control violations can trigger:

- smaller position sizes
- higher evidence thresholds
- restricted instruments
- paper-only mode
- manual approval
- strategy suspension
- account or agent quarantine

The AI can optimize within the policy boundary. It cannot rewrite the boundary.

---

## 9. Prompt Trading Beyond Financial Markets

Prompt Trading belongs to TIP's universal market ontology and therefore can operate conceptually across:

- securities
- FX
- commodities
- crypto-assets
- tokenized assets
- carbon/environmental instruments where eligible
- trade finance
- receivables
- inventory
- marketplace opportunities
- services
- supply-chain opportunities
- nano-financing
- project/investment opportunities

The same prompt-to-plan framework applies, but execution and legal controls vary by domain.

---

## 10. Multi-Agent Prompt Execution

The prompt interface may invoke specialist agents including:

```text
INTENT AGENT
MARKET INTELLIGENCE AGENT
RESEARCH AGENT
VALUATION AGENT
TRADE STRATEGY AGENT
RISK AGENT
COMPLIANCE AGENT
FRAUD / SURVEILLANCE AGENT
EXECUTION AGENT
SETTLEMENT AGENT
PORTFOLIO AGENT
PULSE / LEARNING AGENT
```

ABBA orchestrates the workflow subject to authority, policy and audit requirements.

No single language model should be treated as the sole source of truth for execution-critical facts.

---

## 11. Prompt Marketplace / Strategy Exchange

TIP may support a marketplace for lawful strategy templates and prompt-defined strategies.

A strategy can have:

- author
- version
- provenance
- description
- supported markets
- assumptions
- historical evidence
- risk profile
- fees
- licensing terms
- performance history
- usage permissions
- reputation/evidence history

A prompt/strategy can be a **digital economic object**, but its commercial rights and any resulting financial product remain distinct legal questions.

---

## 12. Prompt Security

Natural-language interfaces create prompt-injection and authority-confusion risks.

Prompt Trading therefore requires:

- strict tool permissions
- explicit principal identity
- action scopes
- policy evaluation
- untrusted-content isolation
- confirmation gates for sensitive actions
- full audit logs
- immutable order/intent IDs
- replayable decision records
- emergency kill switch
- separation of research context from execution authority

Market data, news, social content, documents and external messages must never be able to silently redefine an execution policy.

---

## 13. Auditability

For each prompt-derived action TIP should preserve:

```text
original_prompt
normalized_intent
assumptions
market_context
data_sources
data_timestamps
strategy_version
model_version
risk_results
compliance_results
authorization evidence
order_plan
execution_details
fills
fees
slippage
settlement
final outcome
Pulse
```

This creates a complete chain from **human intent to economic outcome**.

---

## 14. Natural-Language Portfolio Management

Prompt Trading includes portfolio-level commands such as:

```text
"Reduce my technology exposure to 15%."
"Keep at least 40% in reserve."
"Hedge my USD exposure."
"Find better opportunities than my current lowest-performing positions."
"Stop all automated trading until tomorrow."
"Move all strategies to paper mode if daily drawdown exceeds the policy threshold."
```

These become portfolio policies rather than ad-hoc orders and must remain subordinate to TIP's risk constitution.

---

## 15. Human-Agent Symmetry

The same market controls should apply whether an action originated from:

```text
human click
natural-language prompt
scheduled strategy
API
algorithm
AI agent
AI-agent collaboration
```

The interface changes; the constitutional controls do not.

---

## 16. Commercial Service

Prompt Trading may eventually be exposed as a TIP service offering:

- AI trading copilot
- prompt-to-strategy builder
- prompt-to-backtest
- prompt-to-paper-trade
- prompt-controlled execution
- portfolio prompting
- institutional strategy authoring
- strategy marketplace
- enterprise agent APIs

Performance claims must be evidence-based and must not present speculative returns as guaranteed outcomes.

---

## 17. Canonical Rule

> **A prompt expresses intent. TIP determines whether the intent is understood, authorized, legal, eligible, measurable, executable and sufficiently controlled to act.**

A natural-language interface therefore becomes an additional front door to the same TIP market infrastructure, never a privileged path around it.
