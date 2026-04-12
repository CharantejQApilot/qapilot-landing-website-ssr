import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.ABOUT}`;

export const metadata: Metadata = {
  title: "About QApilot - AI-Native Mobile App Testing Company",
  description:
    "QApilot exists to make mobile testing effortless, scalable, and future-ready for every team, from startups to global enterprises. Learn about our mission and vision.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "About QApilot - AI-Native Mobile App Testing Company",
    description:
      "QApilot exists to make mobile testing effortless, scalable, and future-ready for every team, from startups to global enterprises.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About QApilot - AI-Native Mobile App Testing Company",
    description:
      "Learn about our mission to make mobile testing effortless and future-ready.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

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
      <Footer />
    </div>
  );
}
