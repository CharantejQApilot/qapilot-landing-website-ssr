# QApilot SEO Implementation Report
> **For Cursor** — Paste this file into your Cursor project and ask: *"Implement all the changes in this SEO report"*
> **Site:** qapilot.io | **Date:** May 2026 | **Goal:** Rank for QA/mobile testing keywords

---

## 1. Critical Meta & Title Tag Fixes

### 1.1 Homepage (`/`)

**Current title:**
```
QApilot — AI Mobile App Testing & QA Automation
```

**Recommended title:**
```
QApilot — AI-Powered Mobile App Testing & QA Automation Platform
```
> Add "Platform" — it matches how buyers search and differentiates from generic tool lists.

**Current meta description:**
```
Automate mobile app testing with QApilot. AI-powered iOS and Android coverage in minutes. Start your free trial today.
```

**Recommended meta description:**
```
QApilot is the AI-native mobile app testing platform that autonomously explores your app, generates test coverage, and self-heals broken tests. iOS, Android & Flutter. Book a demo.
```
> Adds "autonomously", "self-heals", "Flutter" — high-intent keywords missing from current description.

---

### 1.2 Autonomous Testing Page (`/product/autonomous-testing`)

**Current title:**
```
Autonomous Testing for Mobile Applications | QApilot
```

**Recommended title:**
```
Autonomous Mobile App Testing — No Scripts, No Maintenance | QApilot
```
> "No scripts, no maintenance" directly speaks to the searcher's pain point and maps to long-tail queries like *"mobile testing without writing test scripts"*.

**Current meta description:**
```
Define autonomous testing for mobile: system-discovered journeys, adaptive coverage, and release readiness.
```

**Recommended meta description:**
```
QApilot's autonomous testing engine crawls your app like a real user, builds a knowledge graph, and generates test coverage automatically — zero scripting required. iOS & Android.
```

---

### 1.3 Blog Index (`/blogs`)

**Current keywords meta tag:**
```
mobile testing blog,QA best practices,test automation tips,mobile app testing guides,iOS testing,Android testing
```

**Recommended keywords meta tag:**
```
mobile app testing blog,QA automation,AI testing tools,Flutter testing,autonomous test generation,mobile QA automation,release readiness,CI/CD mobile testing
```

---

## 2. Structured Data (JSON-LD)

Add the following `<script type="application/ld+json">` blocks to the `<head>` of the respective pages.

### 2.1 Homepage — SoftwareApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QApilot",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "AI-native autonomous mobile app testing platform. Crawls apps, builds knowledge graphs, generates test cases, and self-heals broken tests.",
  "url": "https://qapilot.io",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free trial available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  },
  "featureList": [
    "Autonomous mobile app crawling",
    "AI test case generation",
    "Self-healing test automation",
    "Flutter & React Native support",
    "CI/CD integration",
    "iOS and Android device testing",
    "Intelligent bug detection",
    "Security reports"
  ]
}
```

### 2.2 Homepage — Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QApilot",
  "url": "https://qapilot.io",
  "logo": "https://qapilot.io/_next/static/media/qapilot-logo-main.85282065.png",
  "sameAs": [
    "https://www.linkedin.com/company/qapilot/",
    "https://x.com/QApilot",
    "https://github.com/qapilothq",
    "https://www.youtube.com/@QApilot"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://qapilot.io/#book-demo"
  }
}
```

### 2.3 Blog Posts — Article Schema (add to each blog post `<head>`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{POST_TITLE}}",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_NAME}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "QApilot",
    "logo": {
      "@type": "ImageObject",
      "url": "https://qapilot.io/_next/static/media/qapilot-logo-main.85282065.png"
    }
  },
  "datePublished": "{{PUBLISH_DATE}}",
  "dateModified": "{{MODIFIED_DATE}}",
  "image": "{{OG_IMAGE_URL}}",
  "url": "{{CANONICAL_URL}}"
}
```

---

## 3. On-Page Heading Structure Fixes

### 3.1 Homepage H1

**Current H1:**
```
When Your App Is Mobile-first, Your Testing Should Be Too.
```

**Issue:** Clever but keyword-sparse. Search engines need the core topic in the H1.

**Recommended H1:**
```
AI-Powered Mobile App Testing — Autonomous, Self-Healing, Zero Scripts
```

**Keep the current line as H2 or subheading:**
```
When your app is mobile-first, your testing should be too.
```

---

### 3.2 Missing H2s on Homepage

Add the following H2 tags to anchor key keyword clusters on the homepage. These should wrap existing section headings:

| Current text | Change to H2 with text |
|---|---|
| "Engineering Velocity Without The QE Overhead" | `<h2>Mobile QA Automation Without the Engineering Overhead</h2>` |
| "Deliver Reliable Mobile App Testing" | `<h2>AI-Powered Mobile App Testing Platform</h2>` |
| "Built for Modern Mobile Frameworks" | `<h2>Mobile Testing for Flutter, React Native, iOS & Android</h2>` |

---

## 4. Internal Linking Additions

Add the following internal links to the homepage body copy. These create topical depth signals.

| Anchor Text | Link To | Where to add |
|---|---|---|
| "autonomous mobile app crawler" | `/product/autonomous-testing` | First mention in Platform section |
| "AI self-healing tests" | `/ai-self-healing` | Velocity section ("AI-native self-healing") |
| "Flutter testing" | `/for-flutter` | Compatibility section |
| "intelligent bug detection" | `/product/intelligent-bug-detection` | Platform section |
| "CI/CD integration" | `/blogs/enhance-mobile-apps-end-to-end-lifecycle-with-ci-cd-integrations` | Parallel execution section |
| "mobile security reports" | `/security-reports` | Platform section |

---

## 5. New Pages to Create (Keyword Gap Opportunities)

These are high-intent keyword clusters with clear search demand where qapilot.io currently has no dedicated page:

### 5.1 `/appium-alternative`
**Target keyword:** *"appium alternative"*, *"replace appium"*, *"appium alternative no code"*
**Suggested H1:** `The Appium Alternative That Doesn't Need a Test Engineer`
**Content brief:** Compare Appium (scripting, brittle, high maintenance) vs QApilot (autonomous, self-healing). Include a feature comparison table. CTA: Book a Demo.

### 5.2 `/browserstack-alternative`
**Target keyword:** *"browserstack alternative"*, *"browserstack vs qapilot"*
**Suggested H1:** `QApilot vs BrowserStack: AI-Native Testing vs Device Cloud`
**Content brief:** BrowserStack = device cloud, QApilot = autonomous testing layer. Position as complementary AND competing. Show integration logos.

### 5.3 `/mobile-test-automation`
**Target keyword:** *"mobile test automation"*, *"mobile test automation tools"*, *"mobile automation testing"*
**Suggested H1:** `Mobile Test Automation Without the Script Debt`
**Content brief:** Category page explaining mobile test automation, common pain points, and how autonomous testing (QApilot) solves them. Link to all product pages.

### 5.4 `/ai-testing-tool`
**Target keyword:** *"AI testing tool"*, *"AI QA tool"*, *"AI test automation"*
**Suggested H1:** `The AI Testing Tool Built Specifically for Mobile Apps`
**Content brief:** Explain what makes QApilot AI-native vs AI-assisted. Crawler → Knowledge Graph → autonomous agents. 

### 5.5 `/flutter-testing-tool`
**Target keyword:** *"flutter testing tool"*, *"flutter app testing"*, *"how to test flutter app"*
**Suggested H1:** `Flutter App Testing That Works Post-Build, No Source Required`
**Content brief:** Specific page expanding `/for-flutter`. Explain post-build validation, cross-platform execution, QApilot's Flutter support depth.

---

## 6. Canonical & Redirect Issue

**Problem:** `qapilot.com` redirects to `qapilot.io` but the canonical tag on `qapilot.io` correctly points to `qapilot.io`. This is fine, but verify that:

```
qapilot.com → 301 redirect → qapilot.io
```

Not a soft 302. Check with:
```bash
curl -I https://qapilot.com
```
Confirm `HTTP/2 301` in the response. If it's a 302, change it to 301 in your DNS/hosting config.

---

## 7. Open Graph Improvements

### 7.1 Homepage OG Image

**Current:** `default-share.png` used on every page.

**Recommended:** Create page-specific OG images for at least the homepage and product pages.

- Homepage OG title: `"QApilot — AI Mobile App Testing Platform"`
- Autonomous Testing OG title: `"Autonomous Testing for iOS & Android | QApilot"`
- Flutter Testing OG title: `"Flutter App Testing — Post-Build, No Source | QApilot"`

**Implementation:** Use a dynamic OG image generator (e.g., `@vercel/og` if Next.js) with the page title and QApilot branding.

### 7.2 Twitter Card Fix

**Current Twitter title (homepage):**
```
QApilot — AI Mobile App Testing
```
**Missing:** "& QA Automation" which is in the main title. Keep consistent:
```
QApilot — AI Mobile App Testing & QA Automation
```

---

## 8. Page Speed / Core Web Vitals

**Observed:** Partner logos in the footer use `/partner-logos-noindex/` path with `.png` and `.webp` formats. The marquee/scroll animation loads all images twice (duplicated in DOM).

**Fixes:**
1. Add `loading="lazy"` to all partner logo `<img>` tags in the scrolling marquee.
2. Convert `.png` partner logos to `.webp` where not already done.
3. For the duplicated marquee images (needed for CSS animation loop), add `aria-hidden="true"` to the second set so screen readers skip them.

```html
<!-- Second set of marquee logos — add aria-hidden -->
<div aria-hidden="true">
  <img src="..." loading="lazy" alt="" />
  <!-- etc -->
</div>
```

---

## 9. Blog SEO Improvements

### 9.1 Missing from blog posts — add to each:
- `datePublished` and `dateModified` in JSON-LD (see section 2.3)
- Author `<link rel="author">` pointing to an `/about` or `/team` page
- Reading time estimate in the `<head>` or visible in the article header

### 9.2 High-priority blog posts to update with better SEO titles:

| Current Title | SEO-Optimized Title |
|---|---|
| "QA Automation for Mobile Apps: From Scripts to Autonomous Agents" | "Mobile QA Automation in 2026: From Manual Scripts to Autonomous Testing Agents" |
| "Flutter App Testing: The Complete QA Guide..." | "Flutter App Testing Guide 2026: Widget, Integration & Post-Build Testing" |
| "How AI Self-Healing Tests Eliminate the Mobile Test Maintenance Crisis" | "AI Self-Healing Test Automation: End the Mobile Test Maintenance Cycle" |
| "Sanity Testing for Mobile Apps: Zero-Touch Checks..." | "Mobile App Sanity Testing: Automate Your Pre-Release Checks with Zero Scripts" |

---

## 10. SearchFit-SEO Plugin — QApilot-Specific Configuration

When running SearchFit-SEO skills for qapilot.io, use these inputs:

**Site:** `https://qapilot.io`
**Company type:** B2B SaaS, mobile app testing
**Primary audience:** QE Leads, Engineering Managers, CTOs at mobile-first companies
**Competitors:** BrowserStack, Appium, Mabl, Testsigma, Quash, Katalon, LambdaTest
**Primary keyword clusters:**
- `mobile app testing automation`
- `AI mobile testing tool`
- `autonomous test generation`
- `Flutter app testing`
- `Appium alternative`
- `mobile QA platform`
- `self-healing test automation`
- `CI/CD mobile testing`

**Brand differentiators to always highlight:**
- Post-build validation (no source code access needed)
- Knowledge Graph-based exploration
- Autonomous (not just AI-assisted)
- Flutter + React Native + native support in one platform
- Real client logos: WIO Bank, Orange Group, Royal Enfield

---

## Summary — Priority Order for Cursor Implementation

| Priority | Change | Impact |
|---|---|---|
| 🔴 High | Add JSON-LD schema to homepage & blog posts | Rich snippets in SERP |
| 🔴 High | Fix H1 on homepage to include target keywords | Core ranking signal |
| 🔴 High | Update homepage & product page meta descriptions | Click-through rate |
| 🟡 Medium | Create `/appium-alternative` and `/mobile-test-automation` pages | New keyword rankings |
| 🟡 Medium | Add internal links throughout homepage | Topical authority |
| 🟡 Medium | Create page-specific OG images | Social sharing CTR |
| 🟢 Low | Fix partner logo lazy loading & aria-hidden | Core Web Vitals |
| 🟢 Low | Update blog post titles for SEO | Long-tail traffic |
