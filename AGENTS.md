# AGENTS.md -- Proof-Driven Agent Operating Rules

Phrase: If it doesn't run, it doesn't exist.

This repo uses closed-loop development. Agents may propose and implement changes,
but correctness is determined by oracles: compilers, linters, tests, benchmarks--not prose.

---

## Non-Negotiables

1) No proof, no claim
Do not say "done/fixed/works" without evidence:
- verify passes
- tests pass
- typecheck/build passes
- reproducible run output

2) Regression test mandate
Any bug fix must add a test that fails before the fix and passes after.

3) Don't disable truth gates
No "fixes" that globally loosen types, disable rules, skip tests, or hide errors.

4) Interfaces are physics
Respect contracts: schemas, types, API boundaries, idempotency, determinism.
Prefer adapters over breaking changes.

5) Externalize uncertainty
If unsure, list assumptions and create a falsifier (test/check), or reduce scope.

---

## Universal Loop (Use at every scale)

### Propose -> Patch -> Prove -> Pack

### Propose
Include:
- Goal
- Non-goals
- Approach (smallest change)
- Proof plan (exact commands)

### Patch
- Small diffs; avoid "while I'm here" refactors.
- If behavior changes, update/add tests.

### Prove (fast falsification ladder)
Run in order; stop at first failure:
1) format check
2) lint
3) typecheck/build
4) unit tests
5) integration/e2e/perf only if relevant

### Pack
- Add/adjust docs for changed behavior/contracts.
- Summarize change + how to verify.

---

## Repo Truth Command: verify

This repo SHOULD have one command that runs the core truth gates:
- make verify OR ./scripts/verify.sh OR npm run verify

Definition: format -> lint -> typecheck/build -> unit tests
It must be deterministic and fast enough for tight iteration.

If verify does not exist, add it as a first-class improvement.

---

## Diff Discipline (anti-overfitting)
- Prefer < ~200 LOC changes when possible.
- For large changes: split into
  1) mechanical refactor (no behavior change) + proofs
  2) behavior change + tests + proofs

---

## Required Response Format

### Plan
- Goal
- Non-goals
- Approach
- Proof plan

### Changes
- Files changed + why

### Proof
- Commands run + results

### Risks & Mitigations
- What could break + how contained
