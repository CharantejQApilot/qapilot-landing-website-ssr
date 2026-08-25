import type { Metadata } from "next";
import { ReleaseReadinessSuiteHero } from "@/components/release-readiness-suite/ReleaseReadinessSuiteHero";
import { ReleaseReadinessSuitePillars } from "@/components/release-readiness-suite/ReleaseReadinessSuitePillars";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";

const path = PATHS.RELEASE_READINESS_SUITE;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

export const metadata: Metadata = {
 title: "Release Readiness Suite. Bugs, Security, Self-Healing & Device Metrics",
 description:
 "Release Readiness Suite: intelligent bug detection, security reports, AI self-healing, and device metrics so mobile teams ship with clearer confidence.",
 alternates: {
 canonical: canonicalUrl,
 },
 openGraph: {
 type: "website",
 title: "Release Readiness Suite | QApilot",
 description:
 "Bug signals, security insight, and self-healing tests in one suite for mobile release readiness.",
 url: canonicalUrl,
 siteName: "QApilot",
 locale: "en_US",
 images: [defaultOpenGraphImage],
 },
 twitter: {
 card: "summary_large_image",
 title: "Release Readiness Suite | QApilot",
 description:
 "Intelligent bug detection, security reports, and AI self-healing. One suite for mobile release readiness.",
 images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
 },
};

export const revalidate = 300;

export default function ReleaseReadinessSuitePage() {
 return (
 <div className="relative z-0 min-h-screen w-full section-edge bg-background">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify(
 buildBreadcrumbList([
 { name: "Home", path: PATHS.HOME },
 { name: "Platform overview", path: PATHS.PRODUCT },
 { name: "Release Readiness Suite", path },
 ]),
 ),
 }}
 />
 <main>
 <ReleaseReadinessSuiteHero />
 <ProductSummariseBand pageUrl={canonicalUrl} />
 <ReleaseReadinessSuitePillars />
 </main>
 </div>
 );
}
