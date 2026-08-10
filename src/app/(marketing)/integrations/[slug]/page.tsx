import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationLandingPage } from "@/components/integrations/IntegrationLandingPage";
import {
  getIntegrationBySlug,
  INTEGRATION_SLUGS,
  integrationPath,
} from "@/lib/integrations";
import { buildStaticPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return INTEGRATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getIntegrationBySlug(slug);
  if (!tool) return {};
  return buildStaticPageMetadata({
    title: tool.metaTitle,
    description: tool.metaDescription,
    path: integrationPath(tool.slug),
  });
}

export const revalidate = 300;

export default async function IntegrationToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getIntegrationBySlug(slug);
  if (!tool) notFound();
  return <IntegrationLandingPage tool={tool} />;
}
