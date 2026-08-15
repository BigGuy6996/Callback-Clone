#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Callback Clone — build the Android APK on EAS cloud
#
# This machine cannot run Gradle/Android Studio, so builds run
# in Expo's cloud (EAS Build). Output: installable APK for
# internal distribution (eas.json > build.preview).
#
# Prereqs:
#   - EXPO_TOKEN set in the environment. Create an Expo access
#     token at https://expo.dev/settings/access-tokens — eas-cli
#     authenticates with this single env var (verified in the CLI
#     source: SessionManager.js reads EXPO_TOKEN; there is no
#     EXPO_CLI_PASSWORD in eas-cli >= 22).
#
# One-time setup: links the repo to an EAS project (writes
# extra.eas.projectId into app.json). The script does this
# automatically if it isn't there yet; pass --account <name> via
# EAS_ACCOUNT if the Expo user has multiple accounts.
# ============================================================

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -z "${EXPO_TOKEN:-}" ]]; then
  echo "ERROR: EXPO_TOKEN is not set." >&2
  echo "Create a token at https://expo.dev/settings/access-tokens, then run:" >&2
  echo "  export EXPO_TOKEN=<token>" >&2
  echo "  ./scripts/eas-build.sh" >&2
  exit 1
fi

if ! grep -q '"projectId"' app.json 2>/dev/null; then
  echo ">> [0/2] Linking EAS project (one-time, non-interactive)..."
  if [[ -n "${EAS_ACCOUNT:-}" ]]; then
    bunx eas-cli init --non-interactive --account "$EAS_ACCOUNT"
  else
    bunx eas-cli init --non-interactive
  fi
fi

echo ">> [1/2] Starting Android preview build (APK) on EAS cloud..."
bunx eas-cli build -p android --profile preview --non-interactive

echo ">> [2/2] Build finished — find the APK download URL in the build output above"
echo "   or run: bunx eas-cli build:list -p android --limit 1"
