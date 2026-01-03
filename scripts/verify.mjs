import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "AGENTS.md",
];

const requiredPhrases = [
  "If it doesn't run, it doesn't exist.",
  "Oracles, not org charts",
  "Propose -> Patch -> Prove -> Pack",
];

const missing = requiredFiles.filter((file) => !existsSync(resolve(file)));
if (missing.length) {
  console.error("Missing required files:", missing.join(", "));
  process.exit(1);
}

const indexContent = readFileSync(resolve("index.html"), "utf8");
const agentsContent = readFileSync(resolve("AGENTS.md"), "utf8");

const missingPhrases = requiredPhrases.filter((phrase) =>
  !indexContent.includes(phrase) && !agentsContent.includes(phrase)
);

if (missingPhrases.length) {
  console.error("Missing required phrases:", missingPhrases.join(" | "));
  process.exit(1);
}

console.log("verify: OK");
