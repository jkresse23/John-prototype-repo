---
title: "Sign up social proof test 5"
description: "Sign-up social proof test leveraging trust pilot and google store reviews on the phone number entry screen of checkout"
date: "2025-12-09"
---

# PRD: CKO and CKOA Welcome Authentication Screen Tracking and Optimizations

## Initiative

| Status | Product Owner | Design Owner | Engineering Owner | Epic Link | Date Raised | Date Last Updated | Quarter Targeted for Launch |
|--------|----------------|--------------|---------------------|-----------|--------------|-------------------|-----------------------------|
| Ideation | @Alex Mersereau | @Wendell Fernandes | @Trisha Grohowski | — | Oct 3, 2025 | 10/3/2025 | FY26Q2 |

---

# PART 1: PROBLEM DEFINITION

## Problem
With the migration of CKO and CKOA to the shared webflow sign-up, several critical tracking events were lost. The migration and the release of the phone number reset link and step-up authentication were launched to 100% of users without measuring impact on conversion. We cannot track positive or negative effects on the business.

## Context
New Zip users are immediately asked for their phone number, with only minimal bulleted information and no trust-building or benefit-oriented copy.

During Summer 2025, “Have you recently changed your phone number…” text was added with no tracking or A/B testing. No tracking exists on link clicks or conversion impact.

## Problem Validation
In 2025, conversion from **Checkout Started → Phone Verification Sent** dropped from **90.9% to 70.5%**.  
In September 2025, 88% of checkout starts resulted in authentication, down from 93% pre-changes in January. This 5% drop indicates potential lost TTV and transaction volume (5.6%).

## Goals
- Assess whether the “Have you recently changed your phone number…” text should remain.
- Measure conversion impact of this copy/link.
- Track usage of “Update your information” link.
- Improve OTP screen conversion for all users.
- Improve sign-up conversion for new users.

---

# PART 2: SOLUTION

## UX Flows / Wireframes
A/B test for the presence of the phone-number-change copy/link.

## Solution Options / Summary / MVP

### Decision 1: Event Types
**Option 1:** Add granular events following current constructs (link clicks, page views, etc.)  
**Option 2:** Add events using consolidated proposed event structure  
**Recommendation:** Option 2

### Decision 2: Testing Order
**Option 1:** Run all 8 tests and control simultaneously  
**Option 2:** Test design changes first, then content variations  
**Recommendation:** Option 1

### Decision 3: Update All Events?
Coordination with Data required to avoid deprecating critical Tableau-dependent events.

---

### Additional Phases

**Phase 1 – Done:**  
- Add events for all authentication flows (including Remember Me + Step-Up)  
- Track phone-number update link clicks  
- Track number changes when possible  

**Phase 2 – In Progress:**  
- A/B test presence/absence of copy/link  

**Phase 3:**  
- A/B/C/D test social-proof messaging for improved conversion  

**Phase 4:**  
- Roll out highest-converting OTP treatment to 100% of users  

### T-Shirt Estimate
Small

---

# PART 3: REQUIREMENTS

## Functional Requirements

| Status | Requirement | Priority | Comments |
|--------|------------|----------|----------|
| Done | Create Optimizely A/B test for self-service copy | — | Reuse existing flag |
| — | Create Optimizely content-variation tests | — | — |
| — | Implement content variations | — | — |
| — | Make winning variant universal and remove test | — | — |

## Non-Functional Requirements
(None listed)

## UI / UX Design
Figma link:  
http://figma.com/design/LG7gJowbdVnCQqt3UxaMWu/CKO---COA-Social-Proof?t=jQ2WNtwoFmzEBu8B-0

## QA Test Cases
(Referenced but link not included)

## WebBank CRF Link
(Not provided)

## Dependencies

| Team | Impact | How Impacted |
|------|--------|---------------|
| CRM | N | — |
| Shopping Squad | N | — |
| CX | N | — |
| Finance | N | — |
| Purchasing | N | — |
| Payments | N | — |
| Internal Tools | N | — |
| CPS | N | — |
| Customer Squad | Y | May do the work |
| Risk | N | — |
| Compliance | N | — |
| Platform | N | — |
| Data Analytics | Y | Confirm test results |
| Merchant Experience | N | — |
| Checkout FE | Y | Doing the work |
| Checkout BE | N | — |
| Integrations | N | — |
| Infrastructure | N | — |
| Data Engineering | N | — |
| Platform Engineering | N | — |
| IT & Security | N | — |
| People Team | N | — |

---

# PART 4: GO-TO-MARKET

## GTM Plan
- No customer or merchant communication required  
- Requires WebBank approval for test plan  
- Requires Compliance approval for content  
- No marketing or contract implications  

### Key Milestones
1. WB + Compliance approval  
2. Development + testing complete  
3. Test initialization  
4. Test conclusion  
5. Removal of test logic + rollout of winner  
6. Possible documentation update  

---

# Launch Plan (Experiment Plan)

### Hypothesis
Social proof about Zip’s scale and customer sentiment increases likelihood users will provide their phone number.

### Primary Metrics
**Primary:**  
- Conversion from OTP page viewed → Phone number submitted  

**Secondary (not optimized for):**  
- OTP viewed → OTP completed  
- New Customer Received → Risk Check Started  
- OTP viewed → Checkout Completed  

### Variants
- Control: Existing OTP screen (no social proof)  
- 9 treatment variants (see Figma)

### Estimated Duration
~10k users per treatment per day

### Results
(Not included)

---

# MISCELLANEOUS

## Out of Scope
- Items not within the project scope  
- Stakeholder hot topics not addressed here  

## Open Questions
| Question | Answer |
|----------|--------|
| — | — |

## Decision Log
| Date | Decision | Responsible Party | Comments |
|-------|----------|-------------------|----------|
| — | — | — | — |
