/**
 * Pre-build checks for marketing lead forms and HubSpot API wiring.
 * Ensures PhoneInput output formats pass server validation and routes/constants exist.
 *
 * Usage: node scripts/validate-marketing-forms.mjs
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const HUBSPOT_API_ROUTES = [
  "src/app/api/hubspot/get-access/route.ts",
  "src/app/api/hubspot/flutter-hero/route.ts",
  "src/app/api/hubspot/partners/route.ts",
  "src/app/api/hubspot/lead-magnet/route.ts",
  "src/app/api/hubspot/mcp-waitlist/route.ts",
];

const HUBSPOT_CONSTANTS = [
  "HUBSPOT_NA1_PORTAL_ID",
  "HUBSPOT_MAIN_GET_ACCESS_FORM_ID",
  "HUBSPOT_FLUTTER_HERO_FORM_ID",
  "HUBSPOT_PARTNERS_FORM_ID",
  "HUBSPOT_LEAD_MAGNET_FORM_ID",
  "HUBSPOT_MCP_WAITLIST_FORM_ID",
];

/** Mirrors formatMarketingPhoneValue + marketingLeadSchema phone refine. */
function phoneHasValidLength(raw) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

const PHONE_SAMPLES = ["+1 5551234567", "+91 9876543210", "+44 7911123456", "+49 15123456789"];

const REQUIRED_HUBSPOT_FIELDS = ["firstname", "email", "phone", "company", "designation"];

function fail(message) {
  console.error(`  ✗ ${message}`);
  return false;
}

function pass(message) {
  console.log(`  ✓ ${message}`);
  return true;
}

function checkPhoneSamples() {
  let ok = true;
  for (const sample of PHONE_SAMPLES) {
    if (!phoneHasValidLength(sample)) {
      ok = fail(`Phone sample rejected by length rule: ${sample}`) && ok;
    }
  }
  if (ok) pass("PhoneInput sample values pass marketing lead phone rules");
  return ok;
}

function checkConstantsFile() {
  const path = join(root, "src/lib/constants.ts");
  if (!existsSync(path)) return fail("src/lib/constants.ts missing");

  const source = readFileSync(path, "utf8");
  let ok = true;
  for (const name of HUBSPOT_CONSTANTS) {
    // Allow same-line or multiline: export const NAME =\n  "value"
    const match = source.match(
      new RegExp(`export const ${name}\\s*=\\s*"([^"]+)"`),
    );
    if (!match?.[1]?.trim()) {
      ok = fail(`Missing or empty constant: ${name}`) && ok;
    }
  }
  if (ok) pass("HubSpot portal/form constants are defined");
  return ok;
}

const REQUIRED_MCP_HUBSPOT_FIELDS = [
  "email",
  "phone",
  "company",
  "framework",
  "span_style__background_color__rgba_249__249__251__0_7___font_weight__500__color___151923__font_size",
];

function checkMcpWaitlistSubmitHelper() {
  const fieldsPath = join(root, "src/lib/hubspot/mcp-waitlist-fields.ts");
  const submitPath = join(root, "src/lib/hubspot/mcp-waitlist-submit.ts");
  if (!existsSync(fieldsPath)) return fail("mcp-waitlist-fields.ts missing");
  if (!existsSync(submitPath)) return fail("mcp-waitlist-submit.ts missing");

  const fieldsSource = readFileSync(fieldsPath, "utf8");
  const submitSource = readFileSync(submitPath, "utf8");
  let ok = true;
  for (const field of REQUIRED_MCP_HUBSPOT_FIELDS) {
    if (!fieldsSource.includes(`"${field}"`)) {
      ok = fail(`MCP HubSpot field map missing: ${field}`) && ok;
    }
  }
  if (!submitSource.includes("MCP_WAITLIST_HUBSPOT_FIELDS")) {
    ok = fail("mcpWaitlistHubSpotPayload does not use MCP_WAITLIST_HUBSPOT_FIELDS") && ok;
  }
  if (!submitSource.includes("api.hsforms.com/submissions/v3/integration/submit")) {
    ok = fail("MCP HubSpot submit URL pattern missing") && ok;
  }
  if (ok) pass("mcpWaitlistHubSpotPayload maps required HubSpot fields");
  return ok;
}

function checkHubSpotSubmitHelper() {
  const path = join(root, "src/lib/hubspot/marketing-lead-submit.ts");
  if (!existsSync(path)) return fail("marketing-lead-submit.ts missing");

  const source = readFileSync(path, "utf8");
  let ok = true;
  for (const field of REQUIRED_HUBSPOT_FIELDS) {
    if (!source.includes(`name: "${field}"`)) {
      ok = fail(`marketingLeadHubSpotPayload missing field: ${field}`) && ok;
    }
  }
  if (!source.includes("api.hsforms.com/submissions/v3/integration/submit")) {
    ok = fail("HubSpot submit URL pattern missing") && ok;
  }
  if (ok) pass("marketingLeadHubSpotPayload maps required HubSpot fields");
  return ok;
}

function checkApiRoutes() {
  let ok = true;
  for (const rel of HUBSPOT_API_ROUTES) {
    const path = join(root, rel);
    if (!existsSync(path)) {
      ok = fail(`Missing API route: ${rel}`) && ok;
      continue;
    }
    const source = readFileSync(path, "utf8");
    if (
      !source.includes("submitMarketingLeadToHubSpot") &&
      !source.includes("submitLeadMagnetEmailToHubSpot") &&
      !source.includes("submitMcpWaitlistToHubSpot")
    ) {
      ok = fail(`${rel} does not call a HubSpot submit helper`) && ok;
      continue;
    }
    if (!source.includes("safeParse")) {
      ok = fail(`${rel} does not validate request body with safeParse`) && ok;
    }
  }
  if (ok) pass("All HubSpot form API routes exist and validate input");
  return ok;
}

function checkPhoneInputUsesSyncPattern() {
  const path = join(root, "src/components/PhoneInput.tsx");
  if (!existsSync(path)) return fail("PhoneInput.tsx missing");

  const source = readFileSync(path, "utf8");
  let ok = true;
  if (!source.includes("formatMarketingPhoneValue")) {
    ok = fail("PhoneInput should call formatMarketingPhoneValue on user input") && ok;
  }
  if (source.includes("useEffect(() => {\n    const fullNumber = phoneNumber")) {
    ok = fail("PhoneInput still defers parent onChange to useEffect (submit race)") && ok;
  }
  if (ok) pass("PhoneInput notifies parent synchronously on change");
  return ok;
}

function main() {
  console.log("\nMarketing forms / HubSpot pre-build validation\n");

  const results = [
    checkPhoneSamples(),
    checkConstantsFile(),
    checkHubSpotSubmitHelper(),
    checkMcpWaitlistSubmitHelper(),
    checkApiRoutes(),
    checkPhoneInputUsesSyncPattern(),
  ];

  const failed = results.filter((r) => !r).length;
  console.log(
    failed === 0
      ? "\nAll marketing form checks passed.\n"
      : `\n${failed} marketing form check(s) failed.\n`,
  );
  process.exit(failed > 0 ? 1 : 0);
}

main();
