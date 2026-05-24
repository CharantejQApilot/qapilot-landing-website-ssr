/** Defaults so text-only generated guides can publish without manual SEO entry. */

export type QaGuidePublishFields = {
  seo_title: string;
  seo_description: string;
};

export function excerptFromContent(content: string, maxLen = 160): string {
  const plain = content
    .replace(/^#+\s+/gm, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return "";
  return plain.length <= maxLen ? plain : `${plain.slice(0, maxLen - 1).trim()}…`;
}

export function prefillQaGuidePublishFields(row: {
  title: string;
  excerpt?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  content?: string | null;
}): QaGuidePublishFields {
  const title = row.title.trim();
  const seo_title = row.seo_title?.trim() || title;
  const seo_description =
    row.seo_description?.trim() ||
    row.excerpt?.trim() ||
    excerptFromContent(row.content ?? "") ||
    title;

  return { seo_title, seo_description };
}
