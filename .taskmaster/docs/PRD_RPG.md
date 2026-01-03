# RPG PRD — Oracles, Not Org Charts

## Overview
Single-page educational website that teaches proof-driven development for AI agents.
The page must be a fast, high-signal onboarding that encodes the proof loop.

## Roles (Who)
- Builders learning AI-native engineering
- Team leads enforcing proof-driven workflows
- Educators training teams on falsification loops

## Problems (Why)
- Agents over-commit to narrative without proof.
- Teams lack a shared truth command.
- Role-based handoffs hide constraints and interfaces.

## Goals (Outcomes)
- Install the prime directive: "If it doesn't run, it doesn't exist."
- Replace role-based framing with constraints + interfaces + oracles.
- Make the Propose -> Patch -> Prove -> Pack loop explicit and memorable.
- Provide copy-paste instructions for immediate adoption.

## Non-Goals
- No backend or auth.
- No CMS.
- No framework dependency.

## Proof Plan (Required)
Truth command: `npm run verify`.
- verify must check required files and phrases.
- if verify fails, task is not done.

## Assumptions + Falsifiers
- Assumption: phrase is visible above the fold.
  - Falsifier: open at 1366x768 and confirm visibility.
- Assumption: copy buttons work.
  - Falsifier: click copy and paste into a text editor.

## Functional Requirements
1) Phrase + intuition hero.
2) Mindset diff.
3) One-minute example.
4) Funnel illustration.
5) Roles -> constraints mapping.
6) Control theory lens.
7) Paste-ins for Claude + AGENTS.
8) Truth command section.

## QA Strategy
- Lint/build/test not required (static site).
- `npm run verify` must pass.
- Manual checks for copy buttons + mobile layout.
