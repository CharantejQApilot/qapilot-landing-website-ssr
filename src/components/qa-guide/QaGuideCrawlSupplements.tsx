import Link from "next/link";
import { TestingApproachTable } from "@/components/seo/TestingApproachTable";
import { PATHS } from "@/lib/routes";

const GUIDE_SLUGS = new Set([
  "regression-testing",
  "testing-types-in-mobile-app-development",
  "behaviour-driven-development",
]);

const RELATED_GUIDE: Record<string, { href: string; text: string }> = {
  "automated-mobile-testing-troubleshooting-solutions": {
    href: `${PATHS.QA_GUIDE}/mobile-testing-troubleshooting-challenges-solutions`,
    text: "This guide is the automated path. For the broader list of mobile testing challenges, read the troubleshooting challenges guide.",
  },
  "mobile-testing-troubleshooting-challenges-solutions": {
    href: `${PATHS.QA_GUIDE}/automated-mobile-testing-troubleshooting-solutions`,
    text: "This guide covers testing challenges in general. For failures inside an automated suite, read the automated troubleshooting guide.",
  },
};

const FURTHER_READING: Record<string, { href: string; label: string }> = {
  "regression-testing": {
    href: "https://developer.android.com/training/testing/fundamentals",
    label: "Android Developers: testing fundamentals",
  },
  "testing-types-in-mobile-app-development": {
    href: "https://developer.android.com/training/testing/fundamentals",
    label: "Android Developers: testing fundamentals",
  },
  "behaviour-driven-development": {
    href: "https://cucumber.io/docs/bdd/",
    label: "Cucumber: behaviour-driven development",
  },
};

/** Table, published figures, and one authority link for guides the crawl flagged. */
export function QaGuideCrawlSupplements({ slug }: { slug: string }) {
  const related = RELATED_GUIDE[slug];
  const further = FURTHER_READING[slug];
  if (!GUIDE_SLUGS.has(slug) && !related) return null;

  return (
    <div className="mt-10 border-t border-border pt-8">
      {related ? (
        <p className="mb-6 text-base leading-relaxed text-foreground/90 md:text-lg">
          {related.text}{" "}
          <Link href={related.href} className="font-semibold text-primary hover:underline">
            Open that guide
          </Link>
          .
        </p>
      ) : null}
      {GUIDE_SLUGS.has(slug) ? (
        <>
          <TestingApproachTable />
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
            On the published Wio engagement, QApilot recorded an 89.3% step
            success rate on executed steps, and 97% of runs executed outside
            working hours.
          </p>
        </>
      ) : null}
      {further ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Further reading:{" "}
          <a
            href={further.href}
            className="font-semibold text-primary hover:underline"
            rel="noopener noreferrer"
          >
            {further.label}
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
