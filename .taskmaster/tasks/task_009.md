# Task ID: 9

**Title:** Add copy buttons for all paste-in blocks

**Status:** pending

**Dependencies:** 8

**Priority:** medium

**Description:** Implement JS copy-to-clipboard buttons for Claude and AGENTS.md blocks.

**Details:**

Vanilla JS: Add <button onclick='copyToClipboard("claude-block")'>Copy</button>. Function: navigator.clipboard.writeText(document.getElementById(id).textContent). Fallback for old browsers: select/execCommand. Style buttons: prominent, green on success.

**Test Strategy:**

Browser test: click copy, paste into notepad verifies content; test in Chrome/Firefox/Safari.
