import type { ReactNode } from "react";
import { ArticleDemoForm } from "@/components/article/ArticleDemoForm";

type ArticleReadingLayoutProps = {
  media: ReactNode;
  header: ReactNode;
  children: ReactNode;
  pageName: string;
  fieldIdPrefix: string;
};

/**
 * Full-width hero and header, then the body. On large screens the demo form
 * floats at half width beside the opening of the article; once the form ends,
 * the article continues at full width. Narrow screens keep the form after the
 * article.
 */
export function ArticleReadingLayout({
  media,
  header,
  children,
  pageName,
  fieldIdPrefix,
}: ArticleReadingLayoutProps) {
  return (
    <>
      {media}
      {header}
      <div className="max-lg:flex max-lg:flex-col lg:flow-root">
        <aside
          className="mt-12 box-border max-lg:order-2 lg:float-right lg:mb-8 lg:mt-0 lg:w-1/2 lg:pl-10"
          aria-label="Book a demo"
        >
          <ArticleDemoForm pageName={pageName} fieldIdPrefix={fieldIdPrefix} />
        </aside>
        <div className="min-w-0 max-lg:order-1">{children}</div>
      </div>
    </>
  );
}
