import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_PRODUCT_OWNER}`;

export const metadata: Metadata = {
  title: "QApilot for Product Owners | Ship Quality Features Faster",
  description:
    "Make informed release decisions with real-time quality insights. Ensure every feature meets user expectations before it ships.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "QApilot for Product Owners | Ship Quality Features Faster",
    description:
      "Real-time quality insights for confident mobile release decisions.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot for Product Owners | QApilot",
    description: "Ship quality features faster with release-ready visibility.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function ForProductOwnerPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className={cn(marketingHeroH1Class, "mb-4")}>
            QApilot for <span className="text-primary">Product Owners</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
