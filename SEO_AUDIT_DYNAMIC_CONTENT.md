# Dynamic Content SEO + CWV Audit

## Scope

- Routes audited: `/news`, `/news/[slug]`, `/blogs/[slug]`, `/case-studies/[slug]`, `/careers/[slug]`.
- Indexing surfaces audited: `sitemap.xml`, `sitemap-index.xml`, `robots.txt`, Supabase sitemap functions.
- Admin publishing surfaces audited: news/blog/case-study editors and careers jobs CMS.

## Critical Issues (fixed)

1. **Publish-time metadata gaps could produce weak or incorrect social previews**
   - **Fix:** Added shared publish validation requiring `seo_title`, `seo_description`, and either `og_image_url` or `featured_image` before publish in admin editors.
   - **Files:** `src/lib/admin/publish-validation.ts`, `src/app/admin/AdminClient.tsx`, `src/app/admin/editor/BlogEditorClient.tsx`, `src/app/admin/case-studies-editor/CaseStudyEditorClient.tsx`.

2. **Non-UI write paths could bypass publish validation**
   - **Fix:** Added DB check constraints for publish-time SEO requirements on `blogs`, `case_studies`, and `news_updates`; core publish checks for `job_openings`.
   - **Files:** `supabase/migrations/20260425193000_publish_seo_guardrails.sql`.

3. **Dynamic sitemap coverage incomplete and stale windows too long**
   - **Fix:** Added case-study sitemap function and wired it into sitemap index + robots; reduced sitemap cache TTLs.
   - **Files:** `supabase/functions/sitemap-case-studies/index.ts`, `src/app/sitemap-index.xml/route.ts`, `src/app/robots.txt/route.ts`, `supabase/functions/sitemap-posts/index.ts`, `supabase/functions/sitemap-news/index.ts`, `supabase/functions/sitemap-jobs/index.ts`.

## High Issues (fixed)

1. **Jobs publish flow did not ping sitemap updates**
   - **Fix:** Added sitemap ping on published job save.
   - **File:** `src/components/admin/CareersCMS.tsx`.

2. **Structured data inconsistency across dynamic detail pages**
   - **Fix:** Added Article JSON-LD graph to blogs and case studies (matching news quality baseline) and semantic `<time>` stamps.
   - **Files:** `src/app/blogs/[slug]/page.tsx`, `src/app/case-studies/[slug]/page.tsx`.

3. **Careers detail social metadata under-specified**
   - **Fix:** Added Open Graph + Twitter metadata block for job detail pages.
   - **File:** `src/app/careers/[slug]/page.tsx`.

## Medium Issues (fixed)

1. **Date parsing edge cases causing unstable listing/detail rendering**
   - **Fix:** Replaced unsafe `date-fns` formatting in news listing with guarded formatter; hardened job JSON-LD date fields.
   - **Files:** `src/app/news/page.tsx`, `src/app/careers/[slug]/page.tsx`.

2. **Case studies listing URL missing from static sitemap**
   - **Fix:** Added `/case-studies` listing URL to `sitemap.ts`.
   - **File:** `src/app/sitemap.ts`.

## Authentication / Access Control Findings

- **Implemented:** editor routes now enforce admin-role checks on the client (same as dashboard path), and auth redirect behavior routes non-admin users away from admin.
- **Defense-in-depth:** Supabase RLS continues to gate writes/reads for admin tables.
- **Remaining architecture note:** true server-side role checks for `/admin` would require cookie-based server-session wiring (current auth flow is browser-session-centric).

## CWV / Performance Review (route-template level)

### LCP
- Hero/cover images remain explicitly sized on dynamic detail pages (good baseline).
- Recommended next step: move large above-the-fold detail images to optimized image pipeline (or pre-sized CDN variants) to reduce largest-contentful paint variance.

### CLS
- Existing templates use fixed aspect ratio wrappers for prominent cards and hero media (good).
- Recommended next step: standardize image aspect ratio metadata in CMS guidelines to avoid odd source dimensions.

### TTFB / Freshness
- Dynamic metadata and content now better guarded against runtime exceptions.
- Sitemap freshness improved via reduced cache TTLs and publish pings.

## Verification Checklist

- Publish a new **blog/case-study/news** entry with missing SEO title/description and confirm publish is blocked.
- Publish with valid SEO + OG/cover image and confirm:
  - Page metadata contains route-specific OG/Twitter fields.
  - URL appears in corresponding sitemap function payload.
- Publish a new **job** and confirm sitemap ping runs and job URL appears in jobs sitemap.
- Validate structured data on dynamic detail pages using rich result tooling.
- Confirm non-admin user can sign in but is redirected away from `/admin` and editor routes.
