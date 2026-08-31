import type { Metadata } from "next";
import {
  BookDemoHero,
  BookDemoWhatToExpectSection,
} from "@/components/book-demo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.BOOK_DEMO}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Book a Demo. See QApilot on Your Mobile App",
  description:
    "Schedule a tailored QApilot demo: autonomous mobile testing, self-healing coverage, and release-ready reporting for iOS, Android, and Flutter teams.",
  path: PATHS.BOOK_DEMO,
  ogDescription:
    "See autonomous mobile app testing in action. Coverage generation, self-healing, and release-ready signals on your stack.",
  twitterDescription:
    "Book a 30-minute QApilot walkthrough for iOS, Android, and Flutter release teams.",
});

export default function BookDemoPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Book a Demo", path: PATHS.BOOK_DEMO },
            ]),
          ),
        }}
      />
      <main>
        <BookDemoHero />
        <BookDemoWhatToExpectSection />
      </main>
    </div>
  );
}
