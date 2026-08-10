import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import QaGuideArticle from "@/components/qa-guide/QaGuideArticle";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { MarketingPageShell } from "@/components/marketing";
import { resolveSlugParam } from "@/lib/app-router-params";
import { publishedUrlPath } from "@/lib/qa-guide/urls";
import { loadQaGuideWriter } from "@/lib/qa-guide/load-writer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = await resolveSlugParam(params);
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    return { title: "Draft preview", robots: { index: false, follow: false } };
  }
  const { data } = await supabase
    .from("qa_guides")
    .select("title, meta_robots")
    .eq("slug", slug)
    .eq("tier", "draft")
    .maybeSingle();

  if (!data) {
    return {
      title: "Draft not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `[Draft] ${data.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function SeoDraftPreviewPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const slug = await resolveSlugParam(params);
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) notFound();

  const { data: guide } = await supabase
    .from("qa_guides")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!guide) notFound();

  if (guide.tier === "index_worthy" && guide.status === "published") {
    permanentRedirect(publishedUrlPath(guide.slug));
  }

  if (guide.tier !== "draft") notFound();

  const writer = await loadQaGuideWriter(supabase, guide.writer_id);

  return (
    <MarketingPageShell background="soft">
      <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-sm text-amber-900 dark:text-amber-100">
        Draft preview. Not indexed. Publish from admin when ready.
      </div>
      <QaGuideArticle
        guide={guide}
        writer={writer}
        backHref={PATHS.QA_GUIDE}
        backLabel={`Back to ${QE_GUIDE_DISPLAY_NAME}`}
        pageUrl={`${SITE_BASE_URL}${publishedUrlPath(guide.slug)}`}
      />
    </MarketingPageShell>
  );
}
