# AGENTS.md — Proof-Driven Agent Operating System

> **Prime Directive:** If it doesn't run, it doesn't exist.

This repo uses closed-loop development. Correctness is determined by oracles—compilers, linters, tests, benchmarks—not prose.

---

## Part 1: The Mental Model

### The Premise to Delete
~~Division of labor is required for quality.~~

**Division of verification is required for quality.**

Front-end / back-end / QA aren't truths. They're human throughput partitions. AI collapses roles because it can do everything if you give it:
- Crisp interfaces
- Executable checks
- A loop that punishes hallucination and rewards proof

### The Core Insight
Any claim not backed by an executable check is just narrative.

Every agent output should terminate in one of:
- A test passing
- A typecheck passing
- A lint run clean
- A build succeeding
- A benchmark improving
- A reproducible artifact

Everything else is vibes.

---

## Part 2: The Phase Shifts

### 1. Roles → Constraints
**Phrase:** Oracles, not org charts.

Old: "I'm the frontend dev, they're backend."
New: "What constraints must hold? What oracles verify them?"

The AI-native decomposition:
- **Spec** → what must be true (invariants, acceptance tests, non-goals)
- **Interfaces** → contracts between parts (types, schemas, API boundaries)
- **Transformations** → code changes as diffs with traceability
- **Verification** → executable checks
- **Observability** → telemetry that proves it works in production

### 2. Planning → Control Theory
**Phrase:** Sensors before actuators.

Replace "planning" with feedback loops. The control knobs:

| Component | What It Does | Examples |
|-----------|--------------|----------|
| **Sensors** (truth) | Tell you reality | CI results, tests, static analysis, telemetry |
| **Controller** (harness) | Decides what to do | When to branch, revert, bisect, reduce scope |
| **Actuators** (change) | Modify the system | Code edits, config, infra, deps |

Most agent systems fail because they have actuators but weak sensors/controller.

### 3. Bugs → Interface Errors
**Phrase:** Interfaces are physics.

At scale, most failures are:
- Ambiguous contracts
- Hidden state
- Implicit coupling
- Environment drift
- Missing invariants

Treat interfaces as physics:
- Types = boundary conditions
- Schemas = conservation laws
- Idempotency = reversibility
- Determinism = stability

AI becomes powerful when the world is well-typed and well-tested.

### 4. Confidence → Externalized Uncertainty
**Phrase:** Certainty from tests, not vibes.

Models overcommit. Your harness should make uncertainty explicit:
- **Confidence tags:** "I'm unsure because X; I will test by Y"
- **Forking policy:** If uncertain, branch; don't contaminate mainline
- **Fast falsification:** Write the test first when risk is high
- **Fallback ladders:** If tool A fails, use B; if B fails, reduce scope

### 5. QA → Specialist Oracles
**Phrase:** Specialists as tools, not people.

Instead of humans reviewing, you have oracles:
- **Type oracle:** tsc, mypy, rustc
- **Style oracle:** eslint, prettier, ruff
- **Security oracle:** semgrep, trivy, osv-scanner
- **Runtime oracle:** playwright, k6, artillery
- **Correctness oracle:** property tests, fuzzing
- **Regression oracle:** golden tests, snapshots
- **Diff oracle:** policy checks, danger rules

AI writes code; oracles decide truth.

---

## Part 3: The Operating Rules

### Non-Negotiables

1. **No proof, no claim**
   Never say "done/fixed/works" without: verify passes, tests pass, build succeeds.

2. **Regression test mandate**
   Any bug fix adds a test that fails before and passes after.

3. **Don't disable truth gates**
   No "fixes" that loosen types, disable rules, skip tests, or hide errors.

4. **Interfaces are physics**
   Respect contracts. Prefer adapters over breaking changes.

5. **Externalize uncertainty**
   If unsure: list assumptions, create a falsifier, or reduce scope.

---

## Part 4: The Universal Loop

### Propose → Patch → Prove → Pack

Use at every scale: function, module, service, repo, system-of-systems.

#### Propose
- **Goal:** What we're achieving
- **Non-goals:** What we're explicitly NOT touching
- **Approach:** Smallest change that works
- **Proof plan:** Exact commands that will prove success

#### Patch
- Small diffs only (target <200 LOC)
- No "while I'm here" refactors
- If behavior changes, update/add tests

#### Prove (fast falsification ladder)
Run in order; stop at first failure:
1. format check
2. lint
3. typecheck / build
4. unit tests
5. integration / e2e (if relevant)

#### Pack
- Add regression test for bug class
- Update docs for changed behavior
- Summarize change + how to verify

---

## Part 5: Truth Infrastructure

### The verify Command
Every repo MUST have one command that runs core truth gates:
```bash
npm run verify   # or: make verify / ./scripts/verify.sh
```

Definition: `format → lint → typecheck/build → unit tests`

Must be deterministic and fast enough for tight iteration.

### Truth Placement (closest to generation wins)

**At repo root (always on):**
- Pre-commit: format/lint/typecheck
- CI: full verify + integration tests
- Single command: `verify`

**At boundary layers:**
- Schema validation (zod, io-ts)
- Runtime assertions
- Contract tests
- Generated API clients from OpenAPI/GraphQL

**At integration edges:**
- Deterministic fixtures
- Replayable HTTP mocks
- Hermetic containers

**In the harness:**
- Auto "write regression test for any fixed bug"
- Auto "minimize diff size"
- Auto "reduce scope when proof fails"

---

## Part 6: Anti-Overfitting

Overfitting = optimizing for one environment, one repo, one team's assumptions.

Antidotes:
- **Portable invariants:** Tests + contracts (not "how we do things" docs)
- **Loose coupling:** Boundaries + adapters
- **Local reasoning:** Each module validates independently
- **Mechanized verification:** Same truth checks everywhere
- **Small diffs:** Prevents catastrophic rewrites

The more you rely on human narrative, the more overfit you become.

---

## Part 7: Required Response Format

### Plan
- Goal
- Non-goals
- Approach
- Proof plan (exact commands)

### Changes
- Files changed + why

### Proof
- Commands run + results (paste actual output)

### Risks & Mitigations
- What could break + how contained

---

## Summary: The 9 Shifts

| Old Thinking | New Thinking | Remember |
|--------------|--------------|----------|
| Roles divide work | Constraints define truth | Oracles, not org charts |
| Document it well | Prove it runs | Proof over prose |
| Plan carefully | Control feedback loops | Sensors before actuators |
| Fix the bug | Close the loop | Propose → Patch → Prove → Pack |
| Code has bugs | Interface has gaps | Interfaces are physics |
| I think this works | Here's the proof | Certainty from tests |
| QA reviews code | Oracles judge diffs | Specialists as tools |
| Test before deploy | Truth at generation | Verify at speed of thought |
| Follow practices | Verify invariants | Tests, not tribal knowledge |
