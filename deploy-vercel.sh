#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Callback Clone — deploy the web preview to Vercel
#
# Builds the static web export (dist/) and deploys it to Vercel.
#
# Prereqs:
#   - VERCEL_TOKEN set in the environment (create one at
#     https://vercel.com/account/tokens) — the CLI reads this
#     env var directly, no other login needed.
#   - Node + bun/npx available (repo already has node_modules).
#
# First run: creates a new Vercel project (named after the repo)
# and prints the production URL. Re-runs: redeploy the same project.
#
# To target an existing Vercel project instead, set VERCEL_ORG_ID
# and VERCEL_PROJECT_ID (or run `npx vercel link` once to create
# .vercel/project.json).
# ============================================================

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "ERROR: VERCEL_TOKEN is not set." >&2
  echo "Create a token at https://vercel.com/account/tokens, then run:" >&2
  echo "  export VERCEL_TOKEN=<token>" >&2
  echo "  ./deploy-vercel.sh" >&2
  exit 1
fi

echo ">> [1/2] Exporting Expo web build (static) to dist/ ..."
NODE_OPTIONS=--max-old-space-size=2048 npx expo export --platform web --output-dir dist

echo ">> [2/2] Deploying dist/ to Vercel (production) ..."
exec npx vercel deploy dist --prod --token "$VERCEL_TOKEN" --yes
