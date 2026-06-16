import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.PARTNERS}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Partners Program — Grow Mobile QA",
  description:
    "Partner with QApilot: join consulting and technology firms helping customers ship mobile quality with AI-native testing, joint delivery, and outcomes-led QE.",
  path: PATHS.PARTNERS,
  ogDescription:
    "Join a growing ecosystem of partners helping teams put AI-native mobile testing and release readiness into practice—together with QApilot.",
  twitterDescription:
    "Consulting and technology partners delivering AI-native mobile testing and release readiness with QApilot.",
});

export default function PartnersPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Partners", path: PATHS.PARTNERS },
            ]),
          ),
        }}
      />
      <main>
        <PartnersClient />
      </main>
    </div>
  );
}
