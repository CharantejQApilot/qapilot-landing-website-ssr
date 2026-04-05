import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_QA_LEADER}`;

export const metadata: Metadata = {
  title: "QApilot for QA Leaders | Scale Testing Strategy",
  description:
    "Lead your QA org with confidence. Get visibility into test coverage, team productivity, and quality metrics across mobile releases.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "QApilot for QA Leaders | Scale Testing Strategy",
    description:
      "Visibility into coverage, productivity, and quality metrics across mobile releases.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot for QA Leaders | QApilot",
    description: "Scale testing strategy with unified mobile quality visibility.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function ForQALeaderPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className={cn(marketingHeroH1Class, "mb-4")}>
            QApilot for <span className="text-primary">QA Leaders</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
