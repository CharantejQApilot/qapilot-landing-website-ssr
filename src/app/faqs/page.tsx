import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import FAQsClient from "./FAQsClient";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about QApilot's AI-powered testing platform, features, pricing, and support.",
  keywords:
    "QApilot FAQ, automated testing questions, AI testing FAQ, QA automation help",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.FAQS}` },
};

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

export default async function FAQsPage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

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

      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked{" "}
                <span className="text-primary">Questions</span>
              </h1>
            </div>

            <FAQsClient faqs={faqs} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
