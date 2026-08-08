import type { Metadata } from "next";
import { PlatformTestingPage } from "@/components/platform-testing";
import { PLATFORM_TESTING } from "@/lib/platform-testing";
import { buildStaticPageMetadata } from "@/lib/seo";

const content = PLATFORM_TESTING.ios;

export const metadata: Metadata = buildStaticPageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: content.path,
  ogDescription: content.ogDescription,
  twitterDescription: content.twitterDescription,
});

export const revalidate = 300;

export default function ForIosPage() {
  return <PlatformTestingPage content={content} />;
}
