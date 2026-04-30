import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const DYNAMIC_PREFIXES = ["/blogs", "/news", "/case-studies", "/careers"] as const;
const EXACT_PATHS = new Set([
  "/",
  "/faqs",
  "/terms",
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/robots.txt",
]);

type DbWebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<string, unknown> | null;
  old_record?: Record<string, unknown> | null;
};

function isAllowedPath(path: string): boolean {
  if (typeof path !== "string" || !path.startsWith("/")) return false;
  if (path.includes("..") || path.includes("//")) return false;
  if (EXACT_PATHS.has(path)) return true;
  return DYNAMIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function jobPath(record: Record<string, unknown> | null | undefined): string | null {
  if (!record) return null;
  const slug = asNonEmptyString(record.slug);
  const id = asNonEmptyString(record.id);
  const key = slug ?? id;
  return key ? `/careers/${key}` : null;
}

function derivePaths(payload: DbWebhookPayload): string[] {
  const record = payload.record ?? null;
  const oldRecord = payload.old_record ?? null;
  const table = asNonEmptyString(payload.table);
  if (!table) return [];

  const paths = new Set<string>(["/sitemap.xml", "/sitemap-index.xml", "/robots.txt"]);

  switch (table) {
    case "blogs": {
      paths.add("/");
      paths.add("/blogs");
      const currentSlug = asNonEmptyString(record?.slug);
      const previousSlug = asNonEmptyString(oldRecord?.slug);
      if (currentSlug) paths.add(`/blogs/${currentSlug}`);
      if (previousSlug) paths.add(`/blogs/${previousSlug}`);
      break;
    }
    case "news_updates": {
      paths.add("/");
      paths.add("/news");
      const currentSlug = asNonEmptyString(record?.slug);
      const previousSlug = asNonEmptyString(oldRecord?.slug);
      if (currentSlug) paths.add(`/news/${currentSlug}`);
      if (previousSlug) paths.add(`/news/${previousSlug}`);
      break;
    }
    case "case_studies": {
      paths.add("/");
      paths.add("/case-studies");
      const currentSlug = asNonEmptyString(record?.slug);
      const previousSlug = asNonEmptyString(oldRecord?.slug);
      if (currentSlug) paths.add(`/case-studies/${currentSlug}`);
      if (previousSlug) paths.add(`/case-studies/${previousSlug}`);
      break;
    }
    case "job_openings": {
      paths.add("/careers");
      const current = jobPath(record);
      const previous = jobPath(oldRecord);
      if (current) paths.add(current);
      if (previous) paths.add(previous);
      break;
    }
    case "job_organizations": {
      paths.add("/careers");
      break;
    }
    case "faqs": {
      paths.add("/faqs");
      break;
    }
    case "terms_content": {
      paths.add("/terms");
      break;
    }
    default:
      break;
  }

  return Array.from(paths).filter(isAllowedPath);
}

function hasValidWebhookSecret(request: NextRequest): boolean {
  const expected = process.env.CMS_REVALIDATE_WEBHOOK_SECRET?.trim();
  if (!expected) return false;
  const provided =
    request.headers.get("x-cms-webhook-secret")?.trim() ??
    (() => {
      const auth = request.headers.get("authorization");
      if (!auth?.startsWith("Bearer ")) return "";
      return auth.slice("Bearer ".length).trim();
    })();
  return Boolean(provided) && provided === expected;
}

export async function POST(request: NextRequest) {
  if (!hasValidWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: DbWebhookPayload;
  try {
    payload = (await request.json()) as DbWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const paths = derivePaths(payload);
  if (paths.length === 0) {
    return NextResponse.json({
      ok: true,
      reason: "No revalidate paths derived for payload",
    });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
