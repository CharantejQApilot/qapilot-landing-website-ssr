import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccessToken } from "@/lib/admin/verify-admin-access-token";

/**
 * On-demand ISR purge after CMS publishes so `/blogs`, `/news`, etc. do not stay stale
 * until `revalidate` TTL (see segment `export const revalidate`).
 *
 * Auth: same Supabase admin JWT as `/admin` (Bearer token).
 */

const ALLOWED_PREFIXES = [
  "/blogs",
  "/news",
  "/case-studies",
  "/careers",
] as const;
const ALLOWED_EXACT_PATHS = new Set([
  "/",
  "/faqs",
  "/terms",
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/robots.txt",
]);

function isAllowedMarketingPath(path: string): boolean {
  if (typeof path !== "string" || !path.startsWith("/")) return false;
  if (path.includes("..") || path.includes("//")) return false;
  if (ALLOWED_EXACT_PATHS.has(path)) return true;
  return ALLOWED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminStatus = await verifyAdminAccessToken(token);
  if (adminStatus === "unauthenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (adminStatus === "forbidden") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const paths = (body as { paths?: unknown }).paths;
  if (!Array.isArray(paths) || paths.length === 0) {
    return NextResponse.json(
      { error: "Expected non-empty \"paths\" string array" },
      { status: 400 },
    );
  }
  if (paths.length > 40) {
    return NextResponse.json({ error: "Too many paths" }, { status: 400 });
  }

  const normalized: string[] = [];
  for (const p of paths) {
    if (typeof p !== "string") {
      return NextResponse.json(
        { error: "Each path must be a string" },
        { status: 400 },
      );
    }
    if (!isAllowedMarketingPath(p)) {
      return NextResponse.json(
        { error: `Path not allowed: ${p}` },
        { status: 400 },
      );
    }
    normalized.push(p);
  }

  for (const p of normalized) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, revalidated: normalized });
}
