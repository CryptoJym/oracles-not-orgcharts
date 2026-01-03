# Task ID: 12

**Title:** Set up project structure and npm verify script

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Initialize static HTML/CSS/JS project with npm package.json and implement core verify script for proof plans.

**Details:**

Create package.json with scripts: 'verify' using Node.js to read index.html and required files, check for exact phrases using cheerio or simple fs.readFileSync + regex/string includes. Ensure deterministic output. Structure: /index.html, /css/style.css, /js/script.js, /AGENTS.md. No frameworks. npm init -y; npm i cheerio.

**Test Strategy:**

Run 'npm run verify' twice, confirm identical output; manually remove phrase, verify it fails.
