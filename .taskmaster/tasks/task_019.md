# Task ID: 19

**Title:** Create Paste-ins for Claude instructions and AGENTS.md

**Status:** pending

**Dependencies:** 12, 18

**Priority:** medium

**Description:** Add copy-paste blocks for Claude prompts and AGENTS.md operating rules.

**Details:**

HTML <pre> blocks with content. JS copy-to-clipboard buttons using navigator.clipboard.writeText(). Create AGENTS.md file with rules. Verify script checks both.

**Test Strategy:**

npm run verify checks paste-in content; click copy, paste into editor confirms.
