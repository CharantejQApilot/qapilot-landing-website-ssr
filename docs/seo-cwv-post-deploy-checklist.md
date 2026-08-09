# SEO + Core Web Vitals — post-deploy measurement checklist

Run after deploying the CWV/SEO waves. Protect Domain Rating by confirming indexable URLs return 200 and no accidental noindex.

## 1. Sanity / crawl hygiene

```bash
npm run build && npm run start &
npm run sanity-check -- --base-url http://localhost:3000
# After production deploy:
npm run sanity-check -- --production
```

Confirm live:

- `/for-flutter` → 200
- `/alternatives/appium` → 308 → `/compare/qapilot-vs-appium`
- `/integrations/jira` (and siblings) → 200
- `/book-demo` CTAs from homepage/footer → same-origin

## 2. Core Web Vitals (lab)

PageSpeed Insights / Lighthouse (mobile + desktop) on:

- `/`
- `/product`
- `/for-flutter`
- `/book-demo`
- `/product/autonomous-testing`

Targets:

- CLS &lt; 0.1 (no promo-banner collapse on empty promo)
- LCP not waiting on Product Hunt / third-party badge origin
- INP no regression vs pre-deploy baseline

Visual QA: heroes, marquees, Ken Burns, and responsive layouts still present.

## 3. Field / product analytics

- Vercel Analytics / Speed Insights: LCP, INP, CLS trends for 7–14 days
- Chrome UX Report (CrUX) in PSI “Discover what your real users are experiencing”
- Google Search Console → Core Web Vitals + Coverage (watch new `/for-*` URLs)

## 4. On-page SEO spot checks

Fetch HTML for a sample of hubs and blogs:

- Single `| QApilot` in `<title>` (no double brand)
- Meta description ≤ ~160 chars
- `og:type`, canonical, `og:image` present
- FAQPage JSON-LD present tense on `/faqs`

## 5. Rich results

- [Google Rich Results Test](https://search.google.com/test/rich-results) on `/faqs` (FAQPage) and homepage (Organization / SoftwareApplication)

## 6. Off-page / DR

- Ahrefs / Semrush: referring domains; investigate 404s on previously linked URLs
- Follow [`seo-offpage-dr-attribution.md`](./seo-offpage-dr-attribution.md) for the DR jump playbook

## 7. CMS migration

Apply if not already on the project:

`supabase/migrations/20260808120000_fix_faq_tense_and_blog_meta_descriptions.sql`
