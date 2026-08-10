import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import { formatPublishedDate } from "@/lib/format-published";
import { estimateReadingTimeMinutes, formatReadingTimeLabel } from "@/lib/reading-time";
import { QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { commaSeparatedList, firstNonEmptyString } from "@/lib/cms-values";
import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";
import WriterCard from "@/components/WriterCard";

const ARTICLE_GUTTER =
  "w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14";
const ARTICLE_MAX_WIDTH = "mx-auto w-full max-w-7xl";

export type QaGuideArticleData = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  content_format: string | null;
  featured_image: string | null;
  author_name: string | null;
  published_date: string | null;
  tags: string | null;
  intent: string | null;
};

export type QaGuideWriter = {
  name: string;
  designation?: string | null;
  description?: string | null;
  linkedin_url?: string | null;
  profile_image?: string | null;
};

type QaGuideArticleProps = {
  guide: QaGuideArticleData;
  writer?: QaGuideWriter | null;
  backHref: string;
  backLabel: string;
  pageUrl: string;
};

export default function QaGuideArticle({
  guide,
  writer,
  backHref,
  backLabel,
  pageUrl,
}: QaGuideArticleProps) {
  const descriptionText = firstNonEmptyString(guide.excerpt, guide.intent);
  const tags = commaSeparatedList(guide.tags);
  const contentFormat =
    (guide.content_format ?? "").toLowerCase() === "markdown" ? "markdown" : "html";
  const content = guide.content ?? "";
  const publishedLabel = formatPublishedDate(guide.published_date);
  const readingTimeMinutes = estimateReadingTimeMinutes(content);
  const bylineName = writer?.name ?? guide.author_name;

  return (
    <main className="section-edge w-full py-16 md:py-20 lg:py-24">
      <div className={`${ARTICLE_GUTTER} ${ARTICLE_MAX_WIDTH}`}>
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        {guide.featured_image ? (
          <div className="mb-8 w-full overflow-hidden rounded-lg">
            <img
              src={guide.featured_image}
              alt={`${guide.title} — QApilot ${QE_GUIDE_DISPLAY_NAME}`}
              className="h-auto w-full object-contain"
              width={1200}
              height={630}
              loading="eager"
              style={{ aspectRatio: "1200/630" }}
            />
          </div>
        ) : null}

        <h1 className={cn(marketingHeroH1Class, "mb-4 text-gradient")}>{guide.title}</h1>

        <ArticleSummariseWithAI pageUrl={pageUrl} />

        {descriptionText ? (
          <p className="mb-8 text-xl text-muted-foreground">{descriptionText}</p>
        ) : null}

        {tags.length > 0 ? (
          <div className="mb-6 flex flex-wrap gap-2 text-sm">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mb-8 flex items-center gap-4 border-b border-border pb-8">
          {bylineName ? (
            <div>
              <p className="font-semibold text-foreground">{bylineName}</p>
              {writer?.designation ? (
                <p className="text-sm text-muted-foreground">{writer.designation}</p>
              ) : null}
            </div>
          ) : null}
          <div className="ml-auto flex flex-col items-end gap-1 text-sm text-muted-foreground">
            {readingTimeMinutes ? (
              <span>{formatReadingTimeLabel(readingTimeMinutes)}</span>
            ) : null}
            {publishedLabel ? (
              <time dateTime={guide.published_date ?? undefined}>{publishedLabel}</time>
            ) : null}
          </div>
        </div>

        <div
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{
            __html: sanitizeRichText(content, contentFormat),
          }}
        />

        {writer ? (
          <WriterCard
            name={writer.name}
            designation={writer.designation}
            description={writer.description}
            linkedinUrl={writer.linkedin_url}
            profileImage={writer.profile_image}
          />
        ) : null}
      </div>
    </main>
  );
}
