import { caseStudyPath, getCaseStudy } from "@/lib/case-studies-data";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import {
  BOOK_DEMO_DIFFERENTIATOR_LINE,
  BOOK_DEMO_DIFFERENTIATORS,
  BOOK_DEMO_EXPECT_DESCRIPTION,
  BOOK_DEMO_EXPECT_TITLE,
  BOOK_DEMO_FAQS,
  bookDemoFaqAnchor,
  bookDemoHeroLead,
} from "@/lib/book-demo-what-to-expect";
import { getBookDemoWioHighlights } from "@/lib/book-demo-wio";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.BOOK_DEMO}`;

export function buildBookDemoWebPageJsonLd() {
  const study = getCaseStudy("wio");
  const highlights = getBookDemoWioHighlights();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl,
    name: "Book a Demo. See QApilot on Your Mobile App",
    url: canonicalUrl,
    description: bookDemoHeroLead(),
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "QApilot",
      url: SITE_BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: BOOK_DEMO_EXPECT_TITLE,
      description: BOOK_DEMO_EXPECT_DESCRIPTION,
      itemListElement: BOOK_DEMO_DIFFERENTIATORS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.body,
      })),
    },
    abstract: BOOK_DEMO_DIFFERENTIATOR_LINE,
    ...(highlights.length > 0
      ? {
          additionalProperty: highlights.map((item) => ({
            "@type": "PropertyValue",
            name: item.label,
            value: item.value,
          })),
        }
      : {}),
    ...(study?.quote
      ? {
          citation: {
            "@type": "Quotation",
            text: study.quote.text,
            url: `${SITE_BASE_URL}${caseStudyPath(study.slug)}`,
            creator: {
              "@type": "Person",
              name: study.quote.name,
              worksFor: {
                "@type": "Organization",
                name: study.quote.org,
              },
            },
          },
        }
      : {}),
  };
}

export function buildBookDemoFaqJsonLd() {
  const page = buildFaqPageJsonLd(BOOK_DEMO_FAQS);
  return {
    ...page,
    mainEntity: page.mainEntity.map((entity, index) => ({
      ...entity,
      url: `${canonicalUrl}#${bookDemoFaqAnchor(BOOK_DEMO_FAQS[index].question)}`,
    })),
  };
}
