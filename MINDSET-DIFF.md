# The Mindset Diff

A side-by-side comparison showing how the same task gets handled with old vs new thinking.

---

## Task: "Fix the email duplicate bug"

### BEFORE: Open-Loop (Story-Driven)

```
I've fixed the email duplicate bug by:

1. Adding email normalization in the signup handler
2. Adding email normalization in the login handler
3. Both now call toLowerCase() and trim()

This should prevent duplicate accounts from being created
with different email capitalizations.

The change looks correct and follows our patterns.
Let me know if you'd like any adjustments!
```

**What's wrong:**
- "should prevent" = unverified claim
- "looks correct" = vibes, not proof
- No test, no verification command, no evidence
- If it breaks, we won't know until production

---

### AFTER: Closed-Loop (Proof-Driven)

```
## Plan
**Goal:** Prevent duplicate accounts from email case variations
**Non-goals:** Not changing auth flow, not migrating existing data
**Approach:** Single normalizeEmail() at ingress boundary
**Proof plan:** npm run verify + new regression test

## Changes
- src/utils/email.ts: Added normalizeEmail(email: string)
- src/handlers/auth.ts: Call normalizeEmail at signup/login ingress
- tests/email.test.ts: Added case-sensitivity regression test

## Proof
$ npm run verify
✓ format (0.2s)
✓ lint (1.1s)
✓ typecheck (2.3s)
✓ unit tests (4.7s)
  ✓ email.test.ts
    ✓ normalizeEmail trims whitespace
    ✓ normalizeEmail lowercases
    ✓ Foo@Bar.com then foo@bar.com returns same user (REGRESSION)

## Risks & Mitigations
- Existing duplicate accounts: Not addressed (out of scope, needs data migration)
- Performance: normalizeEmail is O(n) on string length, negligible
```

**What's different:**
- Every claim has executable evidence
- Regression test proves the specific bug class is caught
- `npm run verify` output is pasted, not described
- Risks are explicit, not hidden

---

## The Transformation Visualized

```
┌─────────────────────────────────────────────────────────────┐
│                    OPEN-LOOP (STORY)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Human describes    →    AI generates    →    Human trusts │
│   what they want          narrative            the story    │
│                                                             │
│   "Fix the bug"      →    "I fixed it"    →    "Great!"    │
│                                                             │
│   No verification. No proof. Just vibes.                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

                           ↓ PHASE SHIFT ↓

┌─────────────────────────────────────────────────────────────┐
│                   CLOSED-LOOP (PROOF)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Human defines      →    AI generates    →    Oracle       │
│   constraints             patch                judges       │
│        ↑                                          │         │
│        └──────────── feedback ←───────────────────┘         │
│                                                             │
│   "Fix the bug"      →    patch + test    →    verify: OK  │
│                                                             │
│   Every claim terminates in executable evidence.            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## The 9 Shifts as Diffs

### 1. Division of Labor → Division of Verification

```diff
- Team structure: 2 frontend, 3 backend, 1 QA
- Quality comes from: multiple reviewers checking each other
- AI role: "assistant" that generates code for humans to validate

+ Constraint structure: UI constraints, data constraints, reliability constraints
+ Quality comes from: oracles (tests, types, linters) judging every change
+ AI role: "agent" that generates AND proves, validated by machines
```

**Remember:** Oracles, not org charts.

---

### 2. Documentation → Verification

```diff
- Success metric: "Is the code well-documented?"
- Trust source: "The comments explain what it does"
- Done when: "I described what I changed"

+ Success metric: "Does npm run verify pass?"
+ Trust source: "The test proves it works"
+ Done when: "Here's the command output showing it passes"
```

**Remember:** Proof over prose.

---

### 3. Planning → Control Theory

```diff
- Approach: "Let's plan this carefully upfront"
- Risk management: "We thought through the edge cases"
- Adaptation: "We'll adjust the plan if things change"

+ Approach: "What sensors tell us if we're wrong?"
+ Risk management: "What's the fastest way to falsify this?"
+ Adaptation: "The feedback loop auto-corrects; we just tune it"
```

**Remember:** Sensors before actuators.

---

### 4. One-Shot Fixes → Loop Discipline

```diff
- Fix: "I changed the code"
- Verify: "It looks right"
- Done: "Moving on"

+ Propose: "Goal, non-goals, approach, proof plan"
+ Patch: "Small diff, focused change"
+ Prove: "format → lint → typecheck → test"
+ Pack: "Regression test + docs + changelog"
```

**Remember:** Propose → Patch → Prove → Pack.

---

### 5. Bugs → Interface Gaps

```diff
- Diagnosis: "There's a bug in the email handler"
- Fix: "I corrected the logic"
- Prevention: "I'll be more careful next time"

+ Diagnosis: "The contract allows invalid state"
+ Fix: "I tightened the boundary constraint"
+ Prevention: "The type system now rejects this class of bug"
```

**Remember:** Interfaces are physics.

---

### 6. Implied Confidence → Explicit Uncertainty

```diff
- Response: "I've implemented the feature."
- Ambiguity: Hidden in the confident tone
- Risk: Discovered in production

+ Response: "I've implemented the feature. Uncertainty: auth edge case untested because X. Falsifier: added TODO test."
+ Ambiguity: Explicit, with mitigation
+ Risk: Visible before merge
```

**Remember:** Certainty from tests, not vibes.

---

### 7. Human QA → Oracle Specialists

```diff
- Quality gate: "QA team reviews the PR"
- Feedback time: Days
- Coverage: Whatever humans notice

+ Quality gate: "Type oracle + Style oracle + Security oracle + Test oracle"
+ Feedback time: Seconds
+ Coverage: Mechanized, consistent, exhaustive
```

**Remember:** Specialists as tools, not people.

---

### 8. Pre-Deploy Testing → Pre-Generation Truth

```diff
- When tests run: "Before we deploy"
- Iteration speed: Slow (write → commit → CI → wait → fix)
- Feedback distance: Large (bug created ↔ bug found)

+ When tests run: "Before we commit, ideally before we save"
+ Iteration speed: Fast (write → verify → fix → verify)
+ Feedback distance: Minimal (bug created = bug found)
```

**Remember:** Verify at the speed of thought.

---

### 9. Team Practices → Portable Invariants

```diff
- Knowledge location: "Our team does it this way"
- Transferability: Low (tribal, context-dependent)
- Drift: High (practices evolve silently)

+ Knowledge location: "The tests enforce it"
+ Transferability: High (clone repo, run verify, know truth)
+ Drift: Low (invariants are checked, not remembered)
```

**Remember:** Tests, not tribal knowledge.

---

## The Ultimate Test

**Ask yourself:** If a new AI agent (or human) cloned this repo tomorrow with zero context, could they:

1. Run one command and know if the codebase is healthy?
2. Make a change and know immediately if they broke something?
3. Trust the system without trusting any individual's narrative?

If yes → you have proof-driven development.
If no → you have story-driven development with automation sprinkled on top.

---

## One Sentence

> **The shift:** Stop asking "Does this look right?" Start asking "What command proves this works?"
