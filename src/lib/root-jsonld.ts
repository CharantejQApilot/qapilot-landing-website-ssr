import { SITE_BASE_URL } from "@/lib/constants";
import { ORG_LOGO_HEIGHT, ORG_LOGO_URL, ORG_LOGO_WIDTH } from "@/lib/seo";

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
    "Dual Device Testing",
    "Flutter Testing",
    "Mobile Testing Platform",
    "CI/CD Integration",
    "iOS Testing",
    "Android Testing",
  ],
  areaServed: "Worldwide",
};

const webSite = {
  "@type": "WebSite",
  name: "QApilot",
  url: SITE_BASE_URL,
};

/**
 * Product schema — homepage + /product only.
 * Do not inject site-wide: crawlers flag SoftwareApplication on guides/blogs.
 */
export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QApilot",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web, iOS, Android, Flutter, React Native",
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
    "Autonomous mobile app crawler",
    "Knowledge graph of app screens and journeys",
    "QApilot MCP for coding agents",
    "Cross-platform iOS, Android, Flutter, and React Native support",
    "Post-build validation on application binaries",
    "Framework-agnostic mobile testing",
    "CI/CD integration",
    "Visual regression testing",
    "Real device testing",
  ],
};

/** Site-wide graph: Organization + WebSite only. */
export const rootSchemaGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, webSite],
};
