import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import { formatPublishedDate } from "@/lib/format-published";
import {
  estimateReadingTimeMinutes,
  formatReadingTimeLabel,
} from "@/lib/reading-time";
import { QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { commaSeparatedList, firstNonEmptyString } from "@/lib/cms-values";
import { ArticleHeroMedia } from "@/components/article/ArticleHeroMedia";
import { ArticleReadingLayout } from "@/components/article/ArticleReadingLayout";
import { QaGuideCrawlSupplements } from "@/components/qa-guide/QaGuideCrawlSupplements";
import "@/styles/article-content.css";
import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";
import { ArticleKeyTakeaways } from "@/components/ArticleKeyTakeaways";
import WriterCard from "@/components/WriterCard";
import {
  guideTitleDirectAnswer,
  promoteDirectAnswers,
} from "@/lib/qa-guide/direct-answers";

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
  youtube_url?: string | null;
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
    (guide.content_format ?? "").toLowerCase() === "markdown"
      ? "markdown"
      : "html";
  const content = guide.content ?? "";
  const publishedLabel = formatPublishedDate(guide.published_date);
  const readingTimeMinutes = estimateReadingTimeMinutes(content);
  const bylineName = writer?.name ?? guide.author_name;
  const titleAnswer = guideTitleDirectAnswer(guide.slug, guide.title);
  const articleHtml = promoteDirectAnswers(
    sanitizeRichText(content, contentFormat),
  );

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

        <ArticleReadingLayout
          media={
            <ArticleHeroMedia
              youtubeUrl={guide.youtube_url}
              imageUrl={guide.featured_image}
              imageAlt={`${guide.title}. QApilot ${QE_GUIDE_DISPLAY_NAME}`}
            />
          }
          pageName={`${QE_GUIDE_DISPLAY_NAME}: ${guide.title}`}
          fieldIdPrefix={`qa-guide-${guide.slug}`}
          header={
            <>
              <h1 className={cn(marketingHeroH1Class, "mb-4 text-gradient")}>
                {guide.title}
              </h1>

              {titleAnswer ? (
                <p className="mb-6 max-w-3xl text-base leading-relaxed text-foreground/90 md:text-lg md:leading-relaxed">
                  {titleAnswer}
                </p>
              ) : null}

              <ArticleSummariseWithAI pageUrl={pageUrl} />

              {descriptionText ? (
                <ArticleKeyTakeaways summary={descriptionText} />
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
                      <p className="text-sm text-muted-foreground">
                        {writer.designation}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div className="ml-auto flex flex-col items-end gap-1 text-sm text-muted-foreground">
                  {readingTimeMinutes ? (
                    <span>{formatReadingTimeLabel(readingTimeMinutes)}</span>
                  ) : null}
                  {publishedLabel ? (
                    <time dateTime={guide.published_date ?? undefined}>
                      {publishedLabel}
                    </time>
                  ) : null}
                </div>
              </div>
            </>
          }
        >
          <div
            className="blog-content max-w-none"
            dangerouslySetInnerHTML={{
              __html: articleHtml,
            }}
          />

          <QaGuideCrawlSupplements slug={guide.slug} />

          {writer ? (
            <WriterCard
              name={writer.name}
              designation={writer.designation}
              description={writer.description}
              linkedinUrl={writer.linkedin_url}
              profileImage={writer.profile_image}
            />
          ) : null}
        </ArticleReadingLayout>
      </div>
    </main>
  );
}
