# PRD Transformation Analysis (Before -> After)

## Purpose
Show how proof-driven thinking changes the PRD from narrative to executable truth.

## Before (summary)
- Requirements described as features.
- No explicit proof plan.
- No falsifiers for assumptions.

## After (summary)
- Proof plan required for every PRD.
- Truth command defined: `npm run verify`.
- Assumptions paired with falsifiers.
- Risks listed with mitigation intent.

## Change-by-Change Analysis
1) Added Proof Plan
   - Old: "Build the section."
   - New: "Build the section, then prove with `npm run verify`."
   - Mindset shift: success is observable, not assumed.

2) Added Assumptions + Falsifiers
   - Old: "Users can copy."
   - New: "Assume copy works; falsifier = manual copy test."
   - Mindset shift: uncertainty is explicit and testable.

3) Added Truth Command
   - Old: multiple ad-hoc checks.
   - New: one shared oracle for green/red.
   - Mindset shift: team converges around a single proof source.

## Illustration: What changes upfront
- You write proof first (commands), then build.
- You document what would disprove your claim.
- You avoid role-based handoffs; you define constraints + oracles.

## Files
- Before: `.taskmaster/docs/prd_before.txt`
- After: `.taskmaster/docs/prd_after.txt`
