import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { formatPublishedDate } from "@/lib/format-published";
import { publishedUrlPath } from "@/lib/qa-guide/urls";
import { resolveParam } from "@/lib/app-router-params";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: { cluster: string } | Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const cluster = await resolveParam(params, "cluster");
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return { title: "QA Guide" };
  const { data } = await supabase
    .from("qa_guide_topic_clusters")
    .select("title, description")
    .eq("slug", cluster)
    .maybeSingle();
  if (!data) return { title: "Topic not found" };
  const url = `${SITE_BASE_URL}${PATHS.QA_GUIDE}/${cluster}`;
  return {
    title: `${data.title} — QA Guide`,
    description: data.description ?? undefined,
    alternates: { canonical: url },
  };
}

export default async function QaGuideClusterPage({
  params,
}: {
  params: { cluster: string } | Promise<{ cluster: string }>;
}) {
  const cluster = await resolveParam(params, "cluster");
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) notFound();

  const { data: clusterRow } = await supabase
    .from("qa_guide_topic_clusters")
    .select("slug, title, description")
    .eq("slug", cluster)
    .maybeSingle();

  if (!clusterRow) notFound();

  const { data: guides } = await supabase
    .from("qa_guides")
    .select("id, slug, title, excerpt, featured_image, published_date")
    .eq("topic_cluster", cluster)
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .order("published_date", { ascending: false });

  const list = guides ?? [];

  return (
    <MarketingPageShell background="soft">
      <main className="w-full px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href={PATHS.QA_GUIDE}
            className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            ← All QA Guides
          </Link>
          <h1 className={marketingHeroH1Class}>
            <span className="text-gradient">{clusterRow.title}</span>
          </h1>
          {clusterRow.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {clusterRow.description}
            </p>
          ) : null}

          {list.length === 0 ? (
            <p className="mt-12 text-muted-foreground">No published guides in this topic yet.</p>
          ) : (
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {list.map((g) => (
                <li key={g.id}>
                  <Link
                    href={publishedUrlPath(cluster, g.slug)}
                    className="block rounded-xl border border-border bg-card p-6 hover:shadow-md"
                  >
                    <h2 className="font-heading text-xl font-semibold">{g.title}</h2>
                    {g.excerpt ? (
                      <p className="mt-2 text-muted-foreground line-clamp-2">{g.excerpt}</p>
                    ) : null}
                    {g.published_date ? (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {formatPublishedDate(g.published_date)}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
