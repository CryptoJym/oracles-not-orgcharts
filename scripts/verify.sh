#!/usr/bin/env bash
set -euo pipefail

echo "== verify (proof-driven) =="
echo "format: (static site)"
echo "lint: (static site)"
node scripts/verify.mjs
