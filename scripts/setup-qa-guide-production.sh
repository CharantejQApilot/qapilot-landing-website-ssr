#!/usr/bin/env bash
# Path A: QA Guide on production Supabase (jvxdyfgjudycpopepgku = Vercel NEXT_PUBLIC_SUPABASE_URL)
set -euo pipefail

PROJECT_REF="jvxdyfgjudycpopepgku"
BASE_URL="https://${PROJECT_REF}.supabase.co"

echo "=== QA Guide Path A. Production project ${PROJECT_REF} ==="
echo ""

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo "STEP 1. Database (manual)"
  echo "  Open Supabase SQL Editor for project ${PROJECT_REF}"
  echo "  (Lovable → project → Supabase, or dashboard if you have access)"
  echo "  Run: supabase/sql/jvxdyfg_qa_guides_setup.sql"
  echo ""
  echo "STEP 2. Edge function deploy (needs access token)"
  echo "  Create token: https://supabase.com/dashboard/account/tokens"
  echo "  Token must belong to an account with access to project ${PROJECT_REF}"
  echo "  Then re-run:"
  echo "    export SUPABASE_ACCESS_TOKEN='sbp_...'"
  echo "    ./scripts/setup-qa-guide-production.sh"
  echo ""
  exit 1
fi

export SUPABASE_ACCESS_TOKEN

echo "Deploying sitemap-qa-guides to ${BASE_URL} ..."
npx supabase functions deploy sitemap-qa-guides --project-ref "${PROJECT_REF}"

echo "Setting SITE_BASE_URL secret ..."
npx supabase secrets set SITE_BASE_URL=https://qapilot.io --project-ref "${PROJECT_REF}"

echo ""
echo "Verify:"
echo "  curl -s '${BASE_URL}/functions/v1/sitemap-qa-guides' | head -5"
echo ""
echo "Vercel env (confirm unchanged):"
echo "  NEXT_PUBLIC_SUPABASE_URL=${BASE_URL}"
echo "  SUPABASE_SERVICE_ROLE_KEY = service_role from THIS project's API settings"
echo "  CMS_API_TOKEN = same value as .env.local / contentpipeline/.env"
