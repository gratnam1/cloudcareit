#!/usr/bin/env bash
set -euo pipefail

# Scan only newly added staged content to avoid false positives from old files.
added_lines="$(git diff --cached --no-color --unified=0 | sed -n 's/^+//p' | sed '/^+++/d')"
if [ -z "${added_lines}" ]; then
  exit 0
fi

google_key_hits="$(printf '%s\n' "${added_lines}" | rg -n -P 'AIza[0-9A-Za-z_-]{20,}' || true)"
if [ -n "${google_key_hits}" ]; then
  echo "Blocked commit: detected a Google API key pattern in staged changes."
  echo "Remove the key and keep it in Cloudflare secrets/.env.local only."
  echo
  echo "${google_key_hits}"
  exit 1
fi

explicit_env_key_hits="$(printf '%s\n' "${added_lines}" | rg -n -P 'GOOGLE_(PLACES|MAPS)_API_KEY[[:space:]]*=[[:space:]]*(?!YOUR_)[^[:space:]#]+' || true)"
if [ -n "${explicit_env_key_hits}" ]; then
  echo "Blocked commit: detected GOOGLE_*_API_KEY assignment with a non-placeholder value."
  echo "Use GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY in example files."
  echo
  echo "${explicit_env_key_hits}"
  exit 1
fi

private_key_hits="$(printf '%s\n' "${added_lines}" | rg -n '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----' || true)"
if [ -n "${private_key_hits}" ]; then
  echo "Blocked commit: detected a private key block in staged changes."
  echo
  echo "${private_key_hits}"
  exit 1
fi

exit 0
