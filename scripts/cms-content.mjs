#!/usr/bin/env node
/**
 * Read and update CMS rows in Supabase from this repo.
 *
 * Uses NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
 * Writes require --apply. Without it, the command prints the change and does not write.
 *
 *   node scripts/cms-content.mjs list blogs --q flutter
 *   node scripts/cms-content.mjs get blogs --slug my-post --full
 *   node scripts/cms-content.mjs update blogs --slug my-post --set seo_title="New title"
 *   node scripts/cms-content.mjs update blogs --slug my-post --patch ./patch.json --apply
 *
 * Live case study pages are not in Supabase. Edit src/lib/case-studies-data.ts for those.
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ARTICLE_COLUMNS = [
  "author_designation",
  "author_name",
  "banner_text",
  "category",
  "content",
  "content_format",
  "description",
  "excerpt",
  "featured_image",
  "is_banner",
  "is_featured",
  "og_image_url",
  "published",
  "published_date",
  "seo_description",
  "seo_keywords",
  "seo_title",
  "slug",
  "tags",
  "title",
  "writer_id",
  "youtube_url",
];

const ARTICLE_BOOLEANS = ["is_banner", "is_featured", "published"];

const TABLES = {
  blogs: {
    match: ["slug", "id"],
    search: ["title", "slug"],
    list: "id,slug,title,published,updated_at",
    columns: [...ARTICLE_COLUMNS, "is_labs_featured"],
    booleans: [...ARTICLE_BOOLEANS, "is_labs_featured"],
    requiredCreate: ["title", "slug"],
  },
  news_updates: {
    match: ["slug", "id"],
    search: ["title", "slug"],
    list: "id,slug,title,published,updated_at",
    columns: [
      ...ARTICLE_COLUMNS,
      "social_embed_description",
      "social_embed_image",
      "social_embed_url",
    ],
    booleans: ARTICLE_BOOLEANS,
    requiredCreate: ["title", "slug", "content"],
  },
  faqs: {
    match: ["id"],
    search: ["question"],
    list: "id,question,category,is_published,display_order,updated_at",
    columns: ["answer", "category", "display_order", "is_published", "question"],
    booleans: ["is_published"],
    numbers: ["display_order"],
    requiredCreate: ["question", "answer"],
  },
  case_studies: {
    match: ["slug", "id"],
    search: ["title", "slug"],
    list: "id,slug,title,published,updated_at",
    columns: [...ARTICLE_COLUMNS, "is_labs_featured"],
    booleans: [...ARTICLE_BOOLEANS, "is_labs_featured"],
    requiredCreate: ["title", "slug"],
    note: "Public /case-studies pages render src/lib/case-studies-data.ts, not this table.",
  },
  qa_guides: {
    match: ["slug", "id"],
    search: ["title", "slug"],
    list: "id,slug,title,tier,status,url_path,updated_at",
    columns: [
      "author_name",
      "content",
      "content_format",
      "excerpt",
      "featured_image",
      "intent",
      "og_image_url",
      "published_date",
      "seo_description",
      "seo_keywords",
      "seo_title",
      "slug",
      "tags",
      "title",
      "topic_cluster",
      "writer_id",
    ],
    booleans: [],
    create: false,
    note: "Publish tier, robots, and URL moves stay on PATCH /api/posts/:id.",
  },
  terms_content: {
    match: ["id"],
    search: ["title"],
    list: "id,title,updated_at",
    columns: ["content", "title"],
    booleans: [],
    requiredCreate: ["content"],
  },
  job_openings: {
    match: ["slug", "id"],
    search: ["role", "slug"],
    list: "id,slug,role,department,location,published,updated_at",
    columns: [
      "department",
      "description",
      "employment_type",
      "location",
      "organization_id",
      "published",
      "role",
      "slug",
    ],
    booleans: ["published"],
    requiredCreate: ["department", "description", "location", "role"],
  },
  job_organizations: {
    match: ["id"],
    search: ["name"],
    list: "id,name,website_url,updated_at",
    columns: ["description", "logo_url", "name", "website_url"],
    booleans: [],
    requiredCreate: ["name"],
  },
  writers: {
    match: ["id"],
    search: ["name"],
    list: "id,name,designation,updated_at",
    columns: ["description", "designation", "linkedin_url", "name", "profile_image"],
    booleans: [],
    requiredCreate: ["name"],
  },
};

function usage() {
  return `Usage:
  node scripts/cms-content.mjs list <table> [--q text] [--limit 20]
  node scripts/cms-content.mjs get <table> (--slug <slug> | --id <uuid>) [--full]
  node scripts/cms-content.mjs update <table> (--slug <slug> | --id <uuid>) (--set col=value | --patch file.json) [--apply]
  node scripts/cms-content.mjs create <table> (--set col=value | --patch file.json) [--apply]

Tables: ${Object.keys(TABLES).join(", ")}

--set content=@./body.md reads the file. Repeat --set for more columns.
Omit --apply to preview. Add --apply to write.
`;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  const flags = { set: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") flags.help = true;
    else if (arg === "--apply") flags.apply = true;
    else if (arg === "--full") flags.full = true;
    else if (arg === "--slug" || arg === "--id" || arg === "--patch" || arg === "--q" || arg === "--limit") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) fail(`Missing value for ${arg}`);
      flags[arg.slice(2)] = value;
      i += 1;
    } else if (arg === "--set") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) fail("Missing value for --set");
      flags.set.push(value);
      i += 1;
    } else if (arg.startsWith("--")) {
      fail(`Unknown flag ${arg}\n\n${usage()}`);
    } else {
      positional.push(arg);
    }
  }
  return { command: positional[0], table: positional[1], extra: positional.slice(2), flags };
}

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    fail("Missing .env.local. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  const raw = fs.readFileSync(envPath, "utf8");
  const get = (name) => {
    const match = raw.match(new RegExp(`^${name}=(.*)$`, "m"));
    return match?.[1]?.trim()?.replace(/^["']|["']$/g, "") ?? "";
  };
  const url = get("NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    fail("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
  }
  return { url, serviceKey };
}

function readPatchValue(raw) {
  if (raw === "null") return null;
  if (raw.startsWith("@")) {
    const filePath = path.resolve(raw.slice(1));
    if (!fs.existsSync(filePath)) fail(`Patch file not found: ${filePath}`);
    return fs.readFileSync(filePath, "utf8");
  }
  return raw;
}

function loadPatch(spec, flags) {
  const patch = {};
  if (flags.patch) {
    const filePath = path.resolve(flags.patch);
    if (!fs.existsSync(filePath)) fail(`Patch file not found: ${filePath}`);
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
      fail(`Patch file is not JSON: ${filePath}`);
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      fail("Patch file must be a JSON object of column names to values.");
    }
    Object.assign(patch, parsed);
  }
  for (const entry of flags.set) {
    const eq = entry.indexOf("=");
    if (eq <= 0) fail(`--set must look like column=value, got: ${entry}`);
    patch[entry.slice(0, eq)] = readPatchValue(entry.slice(eq + 1));
  }
  return coercePatch(spec, patch);
}

function coercePatch(spec, patch) {
  const booleans = new Set(spec.booleans);
  const numbers = new Set(spec.numbers ?? []);
  const allowed = new Set(spec.columns);
  const out = {};
  for (const [key, value] of Object.entries(patch)) {
    if (!allowed.has(key)) {
      fail(`Column "${key}" cannot be edited on ${spec.name}. Allowed: ${spec.columns.join(", ")}`);
    }
    if (booleans.has(key)) {
      if (typeof value === "boolean") out[key] = value;
      else if (value === "true" || value === "false") out[key] = value === "true";
      else fail(`Column "${key}" must be true or false.`);
    } else if (numbers.has(key)) {
      const n = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(n)) fail(`Column "${key}" must be a number.`);
      out[key] = n;
    } else if (value !== null && typeof value !== "string") {
      fail(`Column "${key}" must be a string or null.`);
    } else {
      out[key] = value;
    }
  }
  if (Object.keys(out).length === 0) fail("No fields to write. Pass --set or --patch.");
  return out;
}

function previewPatch(patch) {
  const preview = {};
  for (const [key, value] of Object.entries(patch)) {
    if (typeof value === "string" && value.length > 180) {
      preview[key] = { chars: value.length, preview: value.slice(0, 180) };
    } else {
      preview[key] = value;
    }
  }
  return preview;
}

function assertMatch(spec, flags, { requireMatch }) {
  const hasSlug = Boolean(flags.slug);
  const hasId = Boolean(flags.id);
  if (hasSlug && hasId) fail("Pass only one of --slug or --id.");
  if (requireMatch && !hasSlug && !hasId) fail(`Pass --slug or --id. ${spec.name} accepts: ${spec.match.join(", ")}.`);
  if (hasSlug && !spec.match.includes("slug")) fail(`${spec.name} has no slug. Pass --id.`);
  if (hasId && !spec.match.includes("id")) fail(`${spec.name} cannot be matched by id.`);
}

function escapeSearch(value) {
  return value.replace(/[%_,*()]/g, "").trim();
}

function printResult(payload) {
  console.log(JSON.stringify(payload, null, 2));
}

async function main() {
  const { command, table, extra, flags } = parseArgs(process.argv.slice(2));
  if (flags.help || !command) {
    console.log(usage());
    process.exit(flags.help ? 0 : 1);
  }
  if (extra.length) fail(`Unexpected arguments: ${extra.join(" ")}\n\n${usage()}`);
  if (!TABLES[table]) fail(`Unknown table "${table}".\n\n${usage()}`);
  if (!["list", "get", "update", "create"].includes(command)) {
    fail(`Unknown command "${command}".\n\n${usage()}`);
  }

  const spec = { name: table, ...TABLES[table] };
  if (command === "get" || command === "update") assertMatch(spec, flags, { requireMatch: true });
  if (command === "create" && spec.create === false) {
    fail(`${table} cannot be created with this script. ${spec.note ?? ""}`.trim());
  }

  let patch = null;
  if (command === "update" || command === "create") patch = loadPatch(spec, flags);
  if (command === "create") {
    for (const key of spec.requiredCreate) {
      if (patch[key] == null || patch[key] === "") fail(`create ${table} requires ${key}.`);
    }
  }

  const { url, serviceKey } = loadEnvLocal();
  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const note = spec.note ? { note: spec.note } : {};

  if (command === "list") {
    const limit = Math.min(Math.max(Number(flags.limit ?? 20) || 20, 1), 50);
    let query = supabase.from(table).select(spec.list).limit(limit);
    if (flags.q) {
      const q = escapeSearch(flags.q);
      if (!q) fail("Search text is empty after removing filter characters.");
      query = query.or(spec.search.map((column) => `${column}.ilike.%${q}%`).join(","));
    }
    const orderColumn = spec.list.includes("updated_at") ? "updated_at" : spec.search[0];
    const { data, error } = await query.order(orderColumn, { ascending: false });
    if (error) fail(error.message);
    printResult({ table, count: data?.length ?? 0, rows: data ?? [], ...note });
    return;
  }

  if (command === "get") {
    const column = flags.id ? "id" : "slug";
    const { data, error } = await supabase
      .from(table)
      .select(flags.full ? "*" : spec.list)
      .eq(column, flags.id ?? flags.slug)
      .maybeSingle();
    if (error) fail(error.message);
    if (!data) fail(`No ${table} row where ${column}=${flags.id ?? flags.slug}`);
    printResult({ table, row: data, ...note });
    return;
  }

  if (!flags.apply) {
    let match = null;
    if (command === "update") {
      const column = flags.id ? "id" : "slug";
      const { data, error } = await supabase
        .from(table)
        .select(spec.list)
        .eq(column, flags.id ?? flags.slug)
        .maybeSingle();
      if (error) fail(error.message);
      if (!data) fail(`No ${table} row where ${column}=${flags.id ?? flags.slug}`);
      match = data;
    }
    printResult({
      dryRun: true,
      table,
      command,
      match,
      set: previewPatch(patch),
      hint: "Re-run with --apply to write this change.",
      ...note,
    });
    return;
  }

  if (command === "update") {
    const column = flags.id ? "id" : "slug";
    const { data, error } = await supabase
      .from(table)
      .update(patch)
      .eq(column, flags.id ?? flags.slug)
      .select(spec.list)
      .maybeSingle();
    if (error) fail(error.message);
    if (!data) fail(`No ${table} row where ${column}=${flags.id ?? flags.slug}`);
    printResult({ applied: true, table, row: data, updated: Object.keys(patch), ...note });
    return;
  }

  const { data, error } = await supabase.from(table).insert(patch).select(spec.list).single();
  if (error) fail(error.message);
  printResult({ applied: true, table, row: data, ...note });
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
