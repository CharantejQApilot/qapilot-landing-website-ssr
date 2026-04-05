import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_QA_ENGINEER}`;

export const metadata: Metadata = {
  title: "QApilot for QA Engineers | Smarter Mobile Testing",
  description:
    "Empower your QA workflow with AI-driven mobile app testing. Write fewer scripts, find more bugs, and ship quality apps faster.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "QApilot for QA Engineers | Smarter Mobile Testing",
    description:
      "AI-driven mobile testing: fewer scripts, broader coverage, faster releases.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot for QA Engineers | QApilot",
    description: "Smarter mobile testing for QA engineers with AI-driven coverage.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function ForQAEngineerPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className={cn(marketingHeroH1Class, "mb-4")}>
            QApilot for <span className="text-primary">QA Engineers</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
