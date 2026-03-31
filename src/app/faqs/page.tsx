import type { Metadata } from "next";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import FAQsClient from "./FAQsClient";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about QApilot's AI-powered testing platform, features, pricing, and support.",
  keywords:
    "QApilot FAQ, automated testing questions, AI testing FAQ, QA automation help",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.FAQS}` },
};

export const dynamic = "force-dynamic";

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

  const faqs = (data as FAQ[] | null) ?? [];

  const faqStructuredData =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "FAQs", path: PATHS.FAQS },
  ]);

  const structuredData = [
    breadcrumbData,
    ...(faqStructuredData ? [faqStructuredData] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MarketingPageShell background="soft">
        <main className="section-edge w-full py-16 md:py-24">
          <div className="section-full mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className={cn(marketingHeroH1Class, "mb-4")}>
                Frequently Asked{" "}
                <span className="text-primary">Questions</span>
              </h1>
            </div>

            <FAQsClient faqs={faqs} />
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
