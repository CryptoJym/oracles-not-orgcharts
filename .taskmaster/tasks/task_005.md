# Task ID: 5

**Title:** Add funnel illustration and proof loop visualization

**Status:** pending

**Dependencies:** 1, 2, 3, 4

**Priority:** medium

**Description:** Implement visual funnel and Propose -> Patch -> Prove -> Pack loop diagram.

**Details:**

Use text-based SVG or CSS-drawn funnel: wide top (Propose), narrowing to Pack. HTML <svg> with paths/arrows labeled exactly 'Propose -> Patch -> Prove -> Pack'. Responsive CSS scaling.

**Test Strategy:**

`npm run verify` checks loop phrases; browser zoom/resize test for clarity.
