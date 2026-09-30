import { caseStudyPath, getCaseStudy } from "@/lib/case-studies-data";
import { getBookDemoWioHighlights } from "@/lib/book-demo-wio";
import {
  BOOK_DEMO_DIFFERENTIATOR_LINE,
  BOOK_DEMO_DIFFERENTIATORS,
  BOOK_DEMO_EXPECT_DESCRIPTION,
  BOOK_DEMO_EXPECT_TITLE,
  BOOK_DEMO_FAQS,
  BOOK_DEMO_HERO,
  bookDemoFaqAnchor,
  bookDemoHeroLead,
} from "@/lib/book-demo-what-to-expect";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";

function url(path: string): string {
  return `${SITE_BASE_URL}${path}`;
}

/** Markdown representation of /book-demo for `Accept: text/markdown`. Copy matches the visible page. */
export function getBookDemoMarkdown(): string {
  const pageUrl = url(PATHS.BOOK_DEMO);
  const study = getCaseStudy("wio");
  const highlights = getBookDemoWioHighlights();
  const differentiators = BOOK_DEMO_DIFFERENTIATORS.map(
    (item) => `### ${item.title}\n\n${item.body}`,
  ).join("\n\n");
  const questions = BOOK_DEMO_FAQS.map(
    (item) =>
      `### ${item.question}\n\n${item.answer}\n\n${pageUrl}#${bookDemoFaqAnchor(item.question)}`,
  ).join("\n\n");

  const story = study
    ? `## Customer story: ${study.clientName}

${study.headline}

${study.tags.join(" · ")}

${highlights.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

> ${study.quote?.text ?? ""}

${study.quote ? `— ${study.quote.name}, ${study.quote.org}` : ""}

[Read the Wio story](${url(caseStudyPath(study.slug))})`
    : "";

  return `# ${BOOK_DEMO_HERO.titleLead} ${BOOK_DEMO_HERO.titleAccent}

${BOOK_DEMO_HERO.eyebrow}

${bookDemoHeroLead()}

${pageUrl}

## Request a demo

${BOOK_DEMO_HERO.formTitle}

${BOOK_DEMO_HERO.formIntro}

The form asks for full name, email, phone, company, and designation. A request is recorded only after the form is accepted.

${story}

## ${BOOK_DEMO_EXPECT_TITLE}

${BOOK_DEMO_EXPECT_DESCRIPTION}

${differentiators}

> ${BOOK_DEMO_DIFFERENTIATOR_LINE}

## Frequently Asked Questions

${questions}
`;
}
