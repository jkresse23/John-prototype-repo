---
title: "PRD: Zip Cash Advance (MVP)"
description: "Fast, low-lift cash advance offering leveraging existing Pay in Z infrastructure to validate customer demand"
date: "2024-12-19"
---

# Zip Cash Advance (MVP)

A fast, low-lift cash advance offering that leverages existing Pay in Z (PiZ) infrastructure to validate customer demand and refine risk levers.

---

## PART 1: PROBLEM DEFINITION

### 🤔 Problem

Customers need access to small amounts of cash quickly between paychecks, but existing solutions are either too slow, too expensive, or require extensive new infrastructure.

**Target users:**
- Primary: Existing Pay in Z customers who need cash flexibility
- Secondary: New customers seeking fast cash advance options

### Context

Zip's Pay in Z (PiZ) product provides installment payment options for purchases, but customers sometimes need cash directly rather than purchase financing. The cash advance market is competitive, with players like Earnin, Dave, and Chime offering instant advances, but these typically require:
- Separate underwriting processes
- New bank account connections
- Standalone infrastructure

Zip has an opportunity to leverage existing PiZ infrastructure (underwriting, debit card verification, spending power calculations) to offer cash advances with minimal net-new build. This creates a natural extension of the PiZ value proposition while validating demand for cash-based lending products.

**Current state:**
- PiZ has established underwriting and spending power calculations
- Users have verified debit cards on file
- Platform supports installment repayment schedules
- No cash disbursement capability exists today
- No Pay-in-1 schedule type exists (only installment plans)

### 📊 Problem Validation

- **Market opportunity:** Cash advance market is large and growing, with millions of Americans using payday alternatives
- **Customer demand:** Users frequently request cash options in support channels
- **Competitive pressure:** Competitors offer instant cash advances; Zip risks losing customers to these solutions
- **Platform leverage:** Existing PiZ infrastructure (underwriting, card verification, repayment rails) can be reused, reducing time-to-market
- **Strategic alignment:** Cash advances validate demand and risk models for Zip's broader lending roadmap

**Key questions this MVP will answer:**
- What is the actual demand for cash advances among PiZ users?
- How does cash advance usage interact with PiZ purchase behavior?
- What risk levers are most effective for cash advances?
- Can we achieve acceptable unit economics with tiered fees?

### 🎯 Goals

| Goal | Metric | Target |
|------|--------|--------|
| Validate customer demand | % of eligible users who take a cash advance within 30 days | TBD (baseline to be established) |
| Ship quickly | Time from start to launch | < 8 weeks |
| Minimize net-new build | % of code that is reusable for core lending roadmap | > 80% |
| Understand usage patterns | Interaction between PiZ purchases and cash advances | Qualitative analysis |
| Refine risk models | Default/delinquency rates vs. PiZ baseline | Within acceptable risk parameters |
| Platform foundation | No-downpayment flow and Pay-in-1 schedule type completed | 100% reusable for future products |

---

## PART 2: SOLUTION

### 🎨 UX Flows or Wireframes

**Core User Flow (MVP):**

1. **Eligibility Check**
   - User opens PiZ app
   - System automatically checks eligibility based on existing PiZ spending power
   - If eligible, cash advance option appears in app (new section or banner)

2. **Request Cash Advance**
   - User taps "Get Cash Advance"
   - App displays available amount (¾ of PiZ spending power, capped at $300)
   - User selects desired amount (up to available limit)
   - App shows fee structure and repayment date (next payday, up to 15 days)

3. **Disbursement**
   - User confirms request
   - Funds are instantly pushed to verified debit card
   - User receives confirmation notification

4. **Repayment**
   - System detects pay cycle via bank account connection
   - On next payday (up to 15 days), repayment is automatically collected via debit card
   - User receives reminder notifications before due date

**Key Screens:**
1. **Cash Advance Home** — Available amount, fee calculator, request button
2. **Request Flow** — Amount selector, fee display, repayment date, confirmation
3. **Repayment Status** — Current balance, due date, payment method

**Design Principles:**
- Leverage existing PiZ design system
- Clear fee disclosure upfront
- Transparent repayment terms
- Minimal friction (reuse existing card verification)

### 🎯 Solution Options / Summary / MVP

**MVP Solution:**

The MVP leverages existing PiZ infrastructure with two strategic platform enhancements:

1. **Reuse Existing Capabilities:**
   - PiZ underwriting (no new decisioning logic)
   - Debit card verification and push-to-debit disbursement
   - Bank account connection for pay cycle detection
   - Existing repayment rails (debit card collection)

2. **New Platform Capabilities (Built Once, Reused Everywhere):**
   - **No-downpayment flow** — Enables advances and future loan experiences without upfront payment
   - **Pay-in-1 schedule type** — Establishes repayment schedule essential for cash advance, reusable for short-term loans

**MVP Scope (P0):**
- Eligibility: Both new and existing customers, mirrors PiZ app underwriting
- Advance amount: ¾ of PiZ spending power, capped at $300
- Disbursement: Instant push-to-debit via verified debit card
- Repayment: Pay-in-1 on next payday (up to 15 days), collected via debit card
- Monetization: Tiered fees based on advance amount
- Bank account connection: Enables pay cycle detection and accurate repayment scheduling

**Alternative Solutions Considered:**
- **Standalone cash advance product** — Rejected: Too much net-new build, slower time-to-market
- **ACH-only disbursement** — Rejected: Not instant, poor user experience for cash advance use case
- **Installment repayment for MVP** — Rejected: Cash advances are meant to be short-term; Pay-in-1 aligns with user expectations and reduces risk exposure

**Why This Approach:**
- **Speed:** Minimal net-new build, leverages proven infrastructure
- **Risk:** Low-risk validation of demand before larger investment
- **Strategic:** Platform enhancements unlock future lending products
- **Optionality:** Fast learning enables rapid iteration or pivot

### 🏆 Additional Phases / Breakdown

| Phase | Focus | Features | Rationale |
|-------|-------|----------|-----------|
| **Phase 1 - MVP** | Validate demand, ship fast | Eligibility, instant disbursement, Pay-in-1 repayment, tiered fees | Establish baseline, learn quickly |
| **Phase 2 - Repayment Flexibility** | Increase value, reduce defaults | Repayment extension (convert to PiZ installment plan for a fee) | Address user cash flow issues, improve retention |
| **Phase 3 - Cost Optimization** | Improve margins | Alternative repayment rails (ACH option with fee discounts) | Reduce cost-to-serve, improve unit economics |
| **Phase 4 - Risk Refinement** | Optimize risk models | Advanced risk levers based on MVP data, dynamic limits | Improve approval rates while maintaining acceptable risk |
| **Future - Core Lending** | Platform expansion | Reuse no-downpayment and Pay-in-1 for broader loan products | Strategic platform investment pays off |

### 👕 T-Shirt Estimate

**Medium** (1-2 weeks for MVP)

**Breakdown:**
- **Platform enhancements (no-downpayment flow, Pay-in-1 schedule):** ~1 week
  - These are foundational primitives that need to be built well for reuse
- **Cash advance feature work:** ~3-5 days
  - Mostly integration work leveraging existing systems
- **Design & UX:** ~2-3 days
  - Leverages existing PiZ design system
- **Testing & risk review:** ~2-3 days
  - Integration testing, risk model validation

**Note:** This estimate assumes existing PiZ infrastructure is stable and well-documented. Complexity may increase if integration points require refactoring.

---

## PART 3: REQUIREMENTS

### 📋 Functional Requirements

#### Eligibility & Underwriting

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 1.1 | System automatically determines cash advance eligibility based on existing PiZ spending power | P0 | No new underwriting logic |
| 1.2 | Both new and existing PiZ customers are eligible for cash advances | P0 | Broaden addressable market |
| 1.3 | If user is approved for PiZ app spending power, they are automatically approved for cash advance | P0 | Core eligibility rule |
| 1.4 | Cash advance amount equals ¾ of user's PiZ spending power | P0 | Risk mitigation |
| 1.5 | Cash advance amount is capped at $300 maximum | P0 | Limit exposure for MVP |
| 1.6 | System displays available cash advance amount to eligible users in app | P0 | User visibility |

#### Loan Disbursement

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 2.1 | User can request a cash advance up to their available amount | P0 | Core feature |
| 2.2 | Funds are disbursed instantly via push-to-debit to user's verified debit card | P0 | Instant = competitive advantage |
| 2.3 | System uses existing debit card verification from PiZ | P0 | Reuse infrastructure |
| 2.4 | User receives confirmation notification upon successful disbursement | P0 | User feedback |
| 2.5 | System handles disbursement failures gracefully with clear error messages | P0 | Error handling |

#### Repayment

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 3.1 | System connects to user's bank account to detect pay cycles | P0 | Accurate repayment scheduling |
| 3.2 | Repayment is Pay-in-1: customer repays in full on their next payday | P0 | Core repayment model |
| 3.3 | Repayment must occur within 15 days of advance (even if payday is later) | P0 | Risk mitigation |
| 3.4 | Repayment is automatically collected via user's debit card | P0 | Automated collection |
| 3.5 | User receives repayment reminder notifications before due date | P0 | Reduce defaults |
| 3.6 | System handles repayment failures (insufficient funds) with retry logic | P0 | Error handling |
| 3.7 | User can view current cash advance balance and repayment date in app | P0 | Transparency |

#### Monetization

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 4.1 | System charges tiered fees based on advance amount | P0 | Revenue model |
| 4.2 | Fee structure is clearly displayed to user before they request advance | P0 | Transparency, compliance |
| 4.3 | Fees are disclosed in confirmation and repayment communications | P0 | Compliance |

#### Platform Enhancements

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 5.1 | No-downpayment flow is implemented as reusable platform capability | P0 | Foundation for future products |
| 5.2 | Pay-in-1 schedule type is implemented as reusable platform capability | P0 | Foundation for future products |
| 5.3 | Both platform enhancements are designed to be fully reusable for core installment loan roadmap | P0 | Strategic platform investment |

#### Post-MVP / P1 Enhancements

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 6.1 | User can extend repayment by converting cash advance to PiZ installment plan (for a fee) | P1 | Phase 2: Repayment flexibility |
| 6.2 | System supports repayment via ACH in addition to debit card | P1 | Phase 3: Cost optimization |
| 6.3 | ACH repayment offers fee discounts to incentivize usage | P1 | Phase 3: Improve margins |
| 6.4 | System allows user to choose repayment method (debit card or ACH) | P1 | Phase 3: User choice |

#### Analytics & Learning

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 7.1 | System tracks cash advance request rate among eligible users | P0 | Validate demand |
| 7.2 | System tracks interaction between PiZ purchase behavior and cash advance usage | P0 | Understand user patterns |
| 7.3 | System tracks default/delinquency rates for cash advances | P0 | Refine risk models |
| 7.4 | System tracks unit economics (fees vs. cost-to-serve) | P0 | Business viability |

---

## Out of Scope (for MVP)

- Repayment extension (Phase 2)
- ACH repayment rails (Phase 3)
- Dynamic risk-based advance limits (beyond ¾ of spending power)
- Multiple concurrent cash advances
- Cash advance for users without PiZ spending power
- Integration with external cash advance providers
- Social features or sharing

---

## Open Questions

1. **Fee structure:** What are the specific tiered fee amounts? (Need pricing analysis)
2. **Risk parameters:** What are acceptable default/delinquency rate thresholds?
3. **Pay cycle detection:** How accurate is bank account pay cycle detection? What's the fallback if detection fails?
4. **Spending power interaction:** How does taking a cash advance affect available PiZ spending power? (Temporary reduction? Separate pools?)
5. **User communication:** What's the cadence and channel for repayment reminders?
6. **Compliance:** What regulatory requirements apply to cash advances in target markets?
7. **Success metrics:** What are the specific targets for demand validation, usage patterns, and risk metrics?

---

## Dependencies

- Existing PiZ underwriting system
- Debit card verification and push-to-debit infrastructure
- Bank account connection and pay cycle detection capabilities
- Existing PiZ design system and UI components
- Risk and compliance review processes

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Default rates higher than PiZ baseline | High | Start with conservative limits (¾ of spending power, $300 cap), monitor closely |
| Platform enhancements take longer than estimated | Medium | Prioritize platform work early, design for reuse from day one |
| Low customer demand | Medium | MVP is low-lift; if demand is low, we've validated this quickly and cheaply |
| Integration complexity with existing systems | Medium | Leverage existing PiZ infrastructure, minimize new integration points |
| Regulatory compliance issues | High | Engage compliance early, review fee structure and terms |





