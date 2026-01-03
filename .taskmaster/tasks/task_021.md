# Task ID: 21

**Title:** Enhance npm verify for all proof plans and success criteria

**Status:** pending

**Dependencies:** 12, 19

**Priority:** high

**Description:** Extend verify script to cover all sections, phrases, files; fails on removal.

**Details:**

Cheerio parse index.html, assert selectors/text for each req (hero phrase, diff h2s, etc.). Check AGENTS.md exists/phrases. Console.log pass/fail.

**Test Strategy:**

Remove required phrases/files one-by-one, confirm verify fails; full run passes.
