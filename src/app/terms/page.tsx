import type { Metadata } from "next";
import Link from "next/link";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read QApilot's Terms of Service. Learn about the terms and conditions governing the use of our AI-powered testing platform.",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.TERMS}` },
};

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: termsContent } = supabase
    ? await supabase
        .from("terms_content")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
    : { data: null as null };

  return (
    <>
      <div className="min-h-screen bg-background animate-fade-in">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </div>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {termsContent?.title || "Terms of Service"}
            </h1>
          </div>

          <div className="max-w-none">
            <SafeHtmlContent
              html={termsContent?.content || ""}
              className="bg-card rounded-lg border border-border p-6 sm:p-8 lg:p-12 shadow-sm prose prose-slate dark:prose-invert max-w-none"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
