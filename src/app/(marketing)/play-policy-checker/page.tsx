import type { Metadata } from "next";
import {
  PlayPolicyEvidence,
  PlayPolicyFaqSection,
  PlayPolicyHero,
  PlayPolicyPipeline,
  PlayPolicyVerdict,
} from "@/components/play-policy";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PLAY_POLICY_FAQS } from "@/lib/play-policy-checker";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Play Policy Checker. Know Before You Submit",
  description:
    "Upload an APK or pick your Play listing. QApilot crawls the app, scans the build, and emails every Play policy blocker before you submit. Android only.",
  path: PATHS.PLAY_POLICY_CHECKER,
});

export const revalidate = 300;

export default function PlayPolicyCheckerPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Play Policy Checker", path: PATHS.PLAY_POLICY_CHECKER },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(PLAY_POLICY_FAQS)),
        }}
      />
      <main>
        <PlayPolicyHero />
        <PlayPolicyPipeline />
        <PlayPolicyVerdict />
        <PlayPolicyEvidence />
        <PlayPolicyFaqSection />
      </main>
    </div>
  );
}
