import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_SRE}`;

export const metadata: Metadata = {
  title: "QApilot for Site Reliability Engineers | Mobile App Reliability",
  description:
    "Ensure mobile app reliability at scale. Detect regressions early, monitor quality signals, and maintain uptime with AI-powered testing.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "QApilot for Site Reliability Engineers | Mobile App Reliability",
    description:
      "Detect regressions early and maintain uptime with AI-powered mobile testing.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot for Site Reliability Engineers | QApilot",
    description:
      "Mobile app reliability at scale with AI-powered quality signals.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function ForSREPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className={cn(marketingHeroH1Class, "mb-4")}>
            QApilot for{" "}
            <span className="text-primary">Site Reliability Engineers</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
