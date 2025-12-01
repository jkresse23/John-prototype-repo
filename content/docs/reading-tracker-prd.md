---
title: "PRD: Kids Reading Tracker"
description: "A simple app to track daily reading time and books for a 6-year-old"
date: "2024-11-28"
---

# Kids Reading Tracker

A delightfully simple reading tracker for young readers and their parents.

---

## PART 1: PROBLEM DEFINITION

### 🤔 Problem

Parents of early readers want to encourage daily reading habits but have no easy way to track how much time their child reads each day or which books they've completed.

**Target users:**
- Primary: Parent (manages the app)
- Secondary: 6-year-old child (interacts with fun elements, sees progress)

### Context

Building reading habits at age 6 is critical—this is when children transition from learning to read to reading to learn. Many parents set daily reading goals (e.g., 20 minutes/day) but rely on memory or paper logs that get lost.

Current alternatives:
- **Paper reading logs** — Easy to lose, no visualizations, not engaging for kids
- **Generic habit trackers** — Not designed for kids, no book tracking
- **Library apps** — Focus on borrowing, not reading time

### 📊 Problem Validation

- Schools often require reading logs signed by parents
- "20 minutes a day" is a common homework requirement for K-1st grade
- Kids are motivated by visual progress (stickers, streaks, completion)
- Parents want to celebrate milestones and see patterns

### 🎯 Goals

| Goal | Metric |
|------|--------|
| Build consistent reading habit | 5+ days/week with logged reading |
| Make tracking effortless | < 30 seconds to log a session |
| Motivate the child | Child asks to log their reading |

---

## PART 2: SOLUTION

### 🎨 UX Flows or Wireframes

**Core Flow:**
1. Parent opens app → sees today's reading status
2. Taps "Log Reading" → enters minutes read
3. Optionally selects/adds book being read
4. Child sees fun animation/celebration
5. Weekly view shows reading streak

**Key Screens:**
1. **Home** — Today's reading (big, friendly display), streak counter, quick log button
2. **Log Reading** — Simple number input for minutes, book selector
3. **My Books** — List of books with status (reading/finished), cover images
4. **Progress** — Weekly calendar view, total time, books completed

### 🎯 Solution Options / Summary / MVP

**MVP (Phase 1):**
- Log daily reading time (just minutes)
- See today's progress and weekly streak
- Simple, kid-friendly UI with fun colors and celebrations

**Phase 2:**
- Add books with titles and covers
- Mark books as "finished"
- See reading history

**Phase 3:**
- Reading goals (custom minutes/day)
- Achievements/badges
- Multiple child profiles

**Why this approach:**
- Start with the core habit (logging time) before adding complexity
- Books are secondary to the daily reading behavior
- Keep it dead simple for a tired parent at bedtime

### 🏆 Additional Phases / Breakdown

| Phase | Focus | Features |
|-------|-------|----------|
| 1 - MVP | Daily habit | Time logging, streak, celebrations |
| 2 - Books | Track what | Book list, reading/finished status |
| 3 - Goals | Motivation | Custom goals, badges, achievements |
| 4 - Family | Scale | Multiple kids, shared progress |

### 👕 T-Shirt Estimate

**Medium** (1-2 weeks for MVP)

- Simple data model (sessions, books)
- No auth needed for MVP (single device)
- UI is straightforward but needs polish for kid-friendliness

---

## PART 3: REQUIREMENTS

### 📋 Functional Requirements

#### Logging Reading Time

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 1.1 | User can log reading minutes for today | P0 | Core feature |
| 1.2 | User can edit today's reading time | P0 | Fix mistakes |
| 1.3 | User can log reading for a past date | P1 | Catch up on missed days |
| 1.4 | App shows confirmation animation after logging | P0 | Kid engagement |

#### Viewing Progress

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 2.1 | Home screen shows today's total reading time | P0 | Primary display |
| 2.2 | Home screen shows current reading streak (days) | P0 | Motivation |
| 2.3 | User can view weekly calendar with daily totals | P1 | See patterns |
| 2.4 | App celebrates streaks (3, 7, 14, 30 days) | P1 | Milestones |

#### Book Tracking (Phase 2)

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 3.1 | User can add a book (title only minimum) | P1 | Simple entry |
| 3.2 | User can mark book as "currently reading" or "finished" | P1 | Track progress |
| 3.3 | User can associate a reading session with a book | P2 | Optional linking |
| 3.4 | User can see list of all books | P1 | Book library |
| 3.5 | User can add book cover image | P2 | Nice to have |

#### Design Requirements

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 4.1 | Large, touch-friendly buttons | P0 | 6-year-old usability |
| 4.2 | Bright, friendly color palette | P0 | Kid appeal |
| 4.3 | Fun animations for logging/streaks | P0 | Engagement |
| 4.4 | Works offline | P1 | Bedtime ≠ wifi |
| 4.5 | No login required for single user | P0 | MVP simplicity |

---

## Out of Scope (for now)

- Social features / sharing
- Reading comprehension tracking
- Integration with school systems
- Audiobook tracking
- Reading speed / pages tracking

---

## Open Questions

1. Should we track pages in addition to time?
2. What's the right default daily goal? (15 min? 20 min?)
3. Do we need parent vs. child modes?


