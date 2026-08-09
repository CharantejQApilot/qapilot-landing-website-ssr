import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "About — AI-Native Mobile App Testing Company",
  description:
    "QApilot makes mobile testing effortless, scalable, and future-ready for startups to enterprises. Learn about our mission and vision.",
  path: PATHS.ABOUT,
  ogDescription:
    "Mobile testing that is effortless, scalable, and future-ready—from startups to global enterprises.",
  twitterDescription: "Our mission to make mobile testing effortless and future-ready.",
});

export default function AboutPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "About", path: PATHS.ABOUT },
            ]),
          ),
        }}
      />
      <main>
        <AboutClient />
      </main>
    </div>
  );
}
