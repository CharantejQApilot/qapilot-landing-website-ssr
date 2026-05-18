import { NextRequest, NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";
import { isSitemapEligible } from "@/lib/qa-guide/urls";
import type { QaGuideTier } from "@/lib/qa-guide/urls";

export function verifyCmsApiToken(request: NextRequest): boolean {
  const expected = process.env.CMS_API_TOKEN?.trim();
  if (!expected) return false;
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  return auth.slice("Bearer ".length).trim() === expected;
}

export function cmsUnauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function editUrlForGuide(id: string): string {
  return `${SITE_BASE_URL}/admin/qa-guide/${id}`;
}

export function previewUrlForDraft(slug: string): string {
  return `${SITE_BASE_URL}/seo-drafts/${slug}`;
}

export function postApiResponse(row: {
  id: string;
  tier: string;
  slug: string;
  url_path: string;
  status: string;
  meta_robots: string;
}): Record<string, unknown> {
  const tier = row.tier as QaGuideTier;
  return {
    id: row.id,
    tier,
    slug: row.slug,
    url_path: row.url_path,
    status: row.status,
    in_sitemap: isSitemapEligible(tier, row.status),
    meta_robots: row.meta_robots,
    edit_url: editUrlForGuide(row.id),
    preview_url: previewUrlForDraft(row.slug),
  };
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function tagsFromPayload(tags: unknown, seo?: { secondary_keywords?: unknown }): string | null {
  if (Array.isArray(tags)) {
    return tags.map(String).filter(Boolean).join(", ") || null;
  }
  if (typeof tags === "string" && tags.trim()) return tags.trim();
  const sec = seo?.secondary_keywords;
  if (Array.isArray(sec)) {
    return sec.map(String).filter(Boolean).join(", ") || null;
  }
  return null;
}

export function seoKeywordsFromPayload(
  primary?: string,
  secondary?: unknown,
): string | null {
  const parts: string[] = [];
  if (primary?.trim()) parts.push(primary.trim());
  if (Array.isArray(secondary)) {
    for (const k of secondary) {
      const s = String(k).trim();
      if (s) parts.push(s);
    }
  }
  return parts.length ? parts.join(", ") : null;
}
