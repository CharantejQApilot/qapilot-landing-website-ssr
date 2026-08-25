import type { Metadata } from "next";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import FAQsList from "./FAQsList";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { buildStaticPageMetadata } from "@/lib/seo";
import { resolveFaqsForPage, type CmsFAQ } from "@/lib/faqs-resolve";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { logMetadataFallback } from "@/lib/server-telemetry";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "FAQs. Mobile Testing Answers",
  description:
    "Answers about QApilot’s AI-native mobile testing: platforms, autonomous coverage, self-healing, integrations, and getting started.",
  path: PATHS.FAQS,
  ogDescription:
    "FAQs on QApilot AI-native mobile testing, features, integrations, and support.",
});

export const revalidate = 120;

export default async function FAQsPage() {
  const supabase = tryCreateServerSupabaseClient();
  let cmsFaqs: CmsFAQ[] | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error) {
      logMetadataFallback({
        route: PATHS.FAQS,
        contentType: "faqs",
        reason: "query-error",
        details: { message: error.message, code: error.code },
      });
    } else {
      cmsFaqs = (data as CmsFAQ[] | null) ?? null;
    }
  }

  const faqs = resolveFaqsForPage(cmsFaqs);

  const faqStructuredData = buildFaqPageJsonLd(
    faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answerText,
    })),
  );

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
            <header className="mb-12 text-left md:mb-14">
              <h1
                className={cn(
                  marketingHeroH1Class,
                  "max-w-4xl leading-[1.08]",
                )}
              >
                <span className="block">Frequently Asked</span>
                <span className="block text-primary">Questions</span>
              </h1>
            </header>

            <FAQsList faqs={faqs} />
          </div>
        </main>
      </MarketingPageShell>
    </>
  );
}
