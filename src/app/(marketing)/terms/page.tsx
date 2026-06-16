import type { Metadata } from "next";
import Link from "next/link";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import { ArrowLeft } from "lucide-react";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { defaultOpenGraphImage } from "@/lib/seo";
import { asString, firstNonEmptyString } from "@/lib/cms-values";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.TERMS}`;

export const metadata: Metadata = {
  title: "Terms of Service — QApilot Platform Use Agreement",
  description:
    "Read QApilot's Terms of Service. Learn about the terms and conditions governing the use of our AI-powered testing platform.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Terms of Service | QApilot",
    description:
      "Terms and conditions governing the use of the QApilot AI-powered testing platform.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | QApilot",
    description: "QApilot Terms of Service and platform use conditions.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 120;

export default async function TermsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: termsContent } = supabase
    ? await supabase
        .from("terms_content")
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle()
    : { data: null as null };

  const title = firstNonEmptyString(termsContent?.title) ?? "Terms of Service";
  const content = asString(termsContent?.content);

  return (
    <>
      <MarketingPageShell background="soft" contentClassName="animate-fade-in">
        <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="section-full mx-auto max-w-4xl py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </div>
        <div className="section-edge w-full py-12">
          <div className="section-full mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className={cn(marketingHeroH1Class, "mb-4")}>
              {title}
            </h1>
          </div>

          <div className="max-w-none">
            <div
              className="prose prose-slate max-w-none rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-12"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(content, "html"),
              }}
            />
          </div>
          </div>
        </div>
      </MarketingPageShell>
    </>
  );
}
