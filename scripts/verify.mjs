import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// PRD: Truth command checks required files + phrases
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "AGENTS.md",
];

// Core phrases that define the doctrine
const requiredPhrases = [
  "If it doesn't run, it doesn't exist.",
  "Oracles, not org charts",
  "Propose -> Patch -> Prove -> Pack",
];

// PRD section checks (per proof plans in prd.txt)
const sectionChecks = {
  "1) Hero phrase": {
    selector: "If it doesn't run, it doesn't exist",
    description: "Prime directive visible"
  },
  "2) Mindset Diff headings": {
    selector: "Before",
    altSelector: "After",
    description: "Before/After contrast present"
  },
  "3) One-minute Example": {
    selector: "one-minute example",
    altSelector: "Proof-driven",
    description: "Example section with proof-driven approach"
  },
  "4) Funnel illustration": {
    selector: "LLM proposes",
    altSelector: "Oracles judge",
    description: "ASCII funnel visualization"
  },
  "5) Roles -> Constraints mapping": {
    selector: "constraints",
    altSelector: "oracles",
    description: "Role decomposition present"
  },
  "6) Control Theory lens": {
    selector: "Sensors",
    altSelector: "Actuators",
    description: "Control theory terms defined"
  },
  "7) Paste-ins": {
    selector: "Claude",
    altSelector: "AGENTS.md",
    description: "Copy-paste blocks for adoption"
  }
};

let hasErrors = false;

// Check required files exist
const missing = requiredFiles.filter((file) => !existsSync(resolve(file)));
if (missing.length) {
  console.error("❌ Missing required files:", missing.join(", "));
  hasErrors = true;
} else {
  console.log("✓ All required files present");
}

const indexContent = readFileSync(resolve("index.html"), "utf8");
const agentsContent = readFileSync(resolve("AGENTS.md"), "utf8");
const combined = indexContent + agentsContent;

// Check required phrases
const missingPhrases = requiredPhrases.filter((phrase) =>
  !indexContent.includes(phrase) && !agentsContent.includes(phrase)
);

if (missingPhrases.length) {
  console.error("❌ Missing required phrases:", missingPhrases.join(" | "));
  hasErrors = true;
} else {
  console.log("✓ All required phrases present");
}

// Check each PRD section
console.log("\n-- Section checks (per PRD proof plans) --");
for (const [section, check] of Object.entries(sectionChecks)) {
  const found = combined.toLowerCase().includes(check.selector.toLowerCase()) ||
    (check.altSelector && combined.toLowerCase().includes(check.altSelector.toLowerCase()));

  if (!found) {
    console.error(`❌ ${section}: ${check.description} - NOT FOUND`);
    hasErrors = true;
  } else {
    console.log(`✓ ${section}: ${check.description}`);
  }
}

// Final result
console.log("");
if (hasErrors) {
  console.error("verify: FAILED");
  process.exit(1);
} else {
  console.log("verify: OK (all proof plans pass)");
}
