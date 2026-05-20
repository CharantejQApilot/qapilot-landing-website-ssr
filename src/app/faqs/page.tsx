import type { Metadata } from "next";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import FAQsList from "./FAQsList";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { defaultOpenGraphImage } from "@/lib/seo";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import { asString } from "@/lib/cms-values";
import { FALLBACK_FAQS } from "@/lib/faqs-fallback";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FAQS}`;

export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about QApilot's AI-powered testing platform, features, pricing, and support.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FAQs - Frequently Asked Questions | QApilot",
    description:
      "Answers about QApilot’s AI-powered mobile testing platform, features, and support.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | QApilot",
    description: "Frequently asked questions about QApilot mobile testing.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 120;

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

export default async function FAQsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data } = supabase
    ? await supabase
        .from("faqs")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
    : { data: null as null };

  const cmsFaqs = (data as FAQ[] | null) ?? [];
  const sourceFaqs = cmsFaqs.length > 0 ? cmsFaqs : FALLBACK_FAQS;

  const faqs = sourceFaqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    category: faq.category,
    answerHtml: sanitizeRichText(asString(faq.answer), "html"),
  }));

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sourceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: asString(faq.answer).replace(/<[^>]*>/g, ""),
      },
    })),
  };

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "FAQs", path: PATHS.FAQS },
  ]);

  const structuredData = [breadcrumbData, faqStructuredData];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MarketingPageShell background="soft">
        <main className="section-edge w-full py-16 md:py-24">
          <div className="section-full w-full">
            <header className="mb-12 text-center md:mb-14">
              <h1 className={cn(marketingHeroH1Class, "mx-auto max-w-4xl leading-[1.08]")}>
                <span className="block">Frequently Asked</span>
                <span className="block text-primary">Questions</span>
              </h1>
            </header>

            <FAQsList faqs={faqs} />
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
