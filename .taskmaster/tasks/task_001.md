# Task ID: 1

**Title:** Initialize project structure and verification script

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Set up static HTML/CSS/JS project with npm package.json and implement deterministic verify command to check required files and phrases.

**Details:**

Create package.json with scripts: { 'verify': 'node verify.js' }. Implement verify.js using Node.js fs module to check existence of index.html, presence of key phrases like 'If it doesn\'t run, it doesn\'t exist.', proof loop terms, and required sections. Use exact string matching for determinism. Run `npm install` for no dependencies needed. Best practice: Use synchronous fs.existsSync and fs.readFileSync for simple checks.

**Test Strategy:**

Run `npm run verify` manually; ensure it passes with all required files/phrases and fails when removing them. Manual check: delete phrase from hero, verify fails.
