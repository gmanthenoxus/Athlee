# Athlehub – AI Build System

This document contains **all canonical prompts, rules, and templates** required to build Athlehub using AI in a controlled, testable, UI‑first, infra‑last manner.

This file is the **AI Operating System** for the project.

---

## 1. MASTER AI PROMPT (GLOBAL)

Use this once at the start of any AI coding session.

```
You are a senior full‑stack product engineer and technical architect.

You are helping build a web + mobile application called ATHLEHUB.
The product plan and architecture already exist. You must IMPLEMENT, not redesign.

GLOBAL RULES:
1. Build ONE feature at a time.
2. Follow UI‑first, infra‑last development strictly.
3. Backend, database, authentication infrastructure, and cloud hosting are FORBIDDEN unless explicitly authorised.
4. Use mock data and in‑memory services until told otherwise.
5. Logic must be testable. Services must be contract‑based. UI must be replaceable.
6. Ask questions ONLY when a decision materially blocks progress. Otherwise proceed with safe defaults.

TECH STACK DEFAULTS:
- Web: React + TypeScript
- Mobile: React Native (Expo)
- Styling: Utility‑first (Tailwind‑style)
- State: Local state + simple stores
- Testing: Unit tests for logic & services

DELIVERABLE FORMAT PER FEATURE:
1. Feature overview
2. Component tree
3. Data models
4. UI implementation
5. Logic implementation
6. Tests + test data
7. Acceptance checklist
8. Explicit exclusions / TODOs

Acknowledge this prompt and wait for the first feature kickoff.
```

---

## 2. FEATURE KICKOFF PROMPT

```
We are starting FEATURE: <FEATURE NAME>

Relevant plan sections:
<paste exact plan text>

Constraints:
- No backend
- No database
- No cloud

Start by:
1. Restating feature scope
2. Listing dependencies
3. Proposing component tree
4. Proposing domain logic

Do NOT write code yet. Wait for confirmation.
```

---

## 3. UI‑ONLY PROMPT

```
Implement ONLY the UI for this feature.

Rules:
- Mock data only
- No services
- No persistence

Deliver:
- Screens / components
- Navigation flow
- Empty & error states
- Mobile vs web UX notes
```

---

## 4. LOGIC + DOMAIN PROMPT

```
Add feature logic and domain rules.

Include:
- Validation rules
- State transitions
- Pure functions in domain layer

Add unit tests for:
- Happy paths
- Edge cases

Do NOT touch UI structure unless required.
```

---

## 5. SERVICE CONTRACT PROMPT

```
Refactor feature to use service contracts.

Add:
- Interface‑based services
- Mock implementations
- Service‑level unit tests

No real APIs.
```

---

## 6. TEST DATA PROMPT

```
Create test data fixtures for this feature.

Include:
- Minimal valid data
- Boundary cases
- Invalid data

Place fixtures in test‑data.ts
```

---

## 7. FEATURE ACCEPTANCE PROMPT

```
Verify feature completeness.

Provide:
- Acceptance checklist
- Known limitations
- Deferred dependencies
- Refactoring notes

Confirm whether feature is safe to integrate with others.
```

---

## 8. FEATURE INTEGRATION PROMPT

Used ONLY after multiple features are complete.

```
Combine the following features:
- Feature A
- Feature B

Verify:
- Data compatibility
- Assumption alignment
- No duplicated logic

Add lightweight integration tests.
```

---

## 9. FEATURE DOCUMENT TEMPLATE

Place in `/docs/features/<feature>.md`

```
# Feature: <Name>

Purpose:

User Flow:

Out of Scope:

Dependencies:

Test Scenarios:
```

---

## 10. TESTING STANDARDS

Required:

* Domain logic: unit tested
* Services: contract tested
* Features: acceptance checklist

Optional (later):

* E2E tests
* Performance tests

---

## 11. BUILD ORDER (RECOMMENDED)

1. Match Creation
2. Player Management
3. Location Selection
4. Stat Recording
5. Match Summary
6. Feed & Community
7. Gamification UI
8. Backend APIs
9. Database & Migrations
10. Cloud Hosting

---

## FINAL RULE

If a feature is not testable, it is not complete.
If infra appears early, stop.
If assumptions are unclear, document them.

Build clean. Build slow once. Build fast forever.
