import { SITE_BASE_URL } from "@/lib/constants";
import { ORG_LOGO_HEIGHT, ORG_LOGO_URL, ORG_LOGO_WIDTH } from "@/lib/seo";
import { QA_PILOT_PUBLIC_TESTIMONIALS } from "@/lib/qapilot-testimonials";

const organization = {
  "@type": "Organization",
  name: "QApilot",
  alternateName: "QApilot",
  legalName: "Digitral Private Limited",
  url: SITE_BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: ORG_LOGO_URL,
    width: ORG_LOGO_WIDTH,
    height: ORG_LOGO_HEIGHT,
  },
  foundingDate: "2024",
  founders: [
    { "@type": "Person", name: "Aditya Challa" },
    { "@type": "Person", name: "Chaitanya Devalapally" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "2nd Floor, Skyview 10, The Skyview, Sy No. 83/1, Raidurgam, Hitech City Main Road",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "support@qapilot.com",
  },
  description:
    "QApilot is an AI-native autonomous testing platform for mobile applications. It provides zero-touch sanity testing, script-free automation, and comprehensive test coverage for mobile apps with seamless CI/CD integration.",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "11-50" },
  sameAs: [
    "https://github.com/qapilothq",
    "https://www.linkedin.com/company/qapilot",
    "https://x.com/QApilot",
    "https://www.youtube.com/@QApilot",
  ],
  keywords: [
    "Mobile App Testing",
    "AI Test Automation",
    "No-Code Testing",
    "Autonomous Testing",
    "QA Automation",
    "Flutter Testing",
    "Mobile Testing Platform",
    "CI/CD Integration",
    "iOS Testing",
    "Android Testing",
  ],
  areaServed: "Worldwide",
};

const softwareApplication = {
  "@type": "SoftwareApplication",
  name: "QApilot",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web, iOS, Android",
  url: SITE_BASE_URL,
  description:
    "AI-powered autonomous mobile app testing platform with zero-touch sanity testing, intelligent crawlers, and knowledge graph technology.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available",
  },
  featureList: [
    "Zero-touch sanity testing",
    "AI-powered test generation",
    "Cross-platform iOS and Android support",
    "Knowledge graph technology",
    "CI/CD integration",
    "Visual regression testing",
    "Real device testing",
  ],
  review: QA_PILOT_PUBLIC_TESTIMONIALS.map((t) => ({
    "@type": "Review",
    reviewBody: t.text,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: t.label },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: String(QA_PILOT_PUBLIC_TESTIMONIALS.length),
    bestRating: "5",
  },
};

const webSite = {
  "@type": "WebSite",
  name: "QApilot",
  url: SITE_BASE_URL,
};

/** Single graph: Organization + WebSite + SoftwareApplication (with reviews). */
export const rootSchemaGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, webSite, softwareApplication],
};
