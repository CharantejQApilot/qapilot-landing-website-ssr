/**
 * Validates admin JSON uploads for blog drafts.
 *
 * Supports the editor’s flat keys (`author_name`, `featured_image`, `tags` string, `seo_title`, …)
 * and the labs-style export (`author`, `image`, `tags` string[], nested `seo` with `title` / `description` /
 * `ogImage` / `keywords`). Extra keys (e.g. `recommendations`, `status`) are ignored.
 */
export type BlogJsonImportResult =
  | { ok: true; row: BlogJsonInsertRow }
  | { ok: false; errors: string[] };

export type BlogJsonInsertRow = {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_name: string | null;
  author_designation: string | null;
  published: boolean;
  is_featured: boolean;
  is_labs_featured: boolean;
  published_date: string | null;
  writer_id: string | null;
  youtube_url: string | null;
  category: string | null;
  description: string | null;
  tags: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  seo_keywords: string | null;
  content_format: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function str(v: unknown, field: string, required: boolean): string | null | undefined {
  if (v === undefined || v === null) {
    if (required) return undefined;
    return null;
  }
  if (typeof v !== "string") {
    return undefined;
  }
  const t = v.trim();
  if (required && !t) return undefined;
  return t || null;
}

function bool(v: unknown, defaultVal: boolean): boolean {
  if (typeof v === "boolean") return v;
  return defaultVal;
}

/** Flat string, or first valid value from alias keys (e.g. `image` → featured_image). */
function strWithAlias(
  o: Record<string, unknown>,
  primary: string,
  aliases: string[],
): string | null | undefined {
  if (primary in o) {
    const p = str(o[primary], primary, false);
    if (p !== undefined) return p;
  }
  for (const key of aliases) {
    if (!(key in o)) continue;
    const a = str(o[key], key, false);
    if (a !== undefined) return a;
  }
  return null;
}

/** Comma-separated string (editor/DB) or string array (e.g. labs export). */
function parseTagsField(o: Record<string, unknown>): string | null | undefined {
  if (!("tags" in o)) return null;
  const v = o.tags;
  if (v === null || v === undefined) return null;
  if (typeof v === "string") return v.trim() || null;
  if (Array.isArray(v)) {
    if (!v.every((x) => typeof x === "string")) return undefined;
    const joined = v.map((x) => x.trim()).filter(Boolean).join(", ");
    return joined || null;
  }
  return undefined;
}

function parseNestedSeo(
  o: Record<string, unknown>,
): Record<string, unknown> | null {
  const seo = o.seo;
  if (seo === undefined || seo === null) return null;
  if (typeof seo !== "object" || Array.isArray(seo)) return null;
  return seo as Record<string, unknown>;
}

function seoString(
  o: Record<string, unknown>,
  flatKey: string,
  nested: Record<string, unknown> | null,
  nestedKey: string,
): string | null | undefined {
  if (flatKey in o) {
    const flat = str(o[flatKey], flatKey, false);
    if (flat !== undefined) return flat;
    return undefined;
  }
  if (!nested || !(nestedKey in nested)) return null;
  return str(nested[nestedKey], nestedKey, false);
}

function seoKeywords(
  o: Record<string, unknown>,
  nested: Record<string, unknown> | null,
): string | null | undefined {
  if ("seo_keywords" in o) {
    const v = o.seo_keywords;
    if (v === null || v === undefined) return null;
    if (typeof v === "string") return v.trim() || null;
    if (Array.isArray(v)) {
      if (!v.every((x) => typeof x === "string")) return undefined;
      const joined = v.map((x) => x.trim()).filter(Boolean).join(", ");
      return joined || null;
    }
    return undefined;
  }
  if (!nested || !("keywords" in nested)) return null;
  const k = nested.keywords;
  if (k === null || k === undefined) return null;
  if (typeof k === "string") return k.trim() || null;
  if (Array.isArray(k)) {
    if (!k.every((x) => typeof x === "string")) return undefined;
    const joined = k.map((x) => x.trim()).filter(Boolean).join(", ");
    return joined || null;
  }
  return undefined;
}

export function parseBlogImportJson(text: string): BlogJsonImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    return { ok: false, errors: ["Invalid JSON."] };
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, errors: ["Root value must be a JSON object."] };
  }

  const o = parsed as Record<string, unknown>;

  const title = str(o.title, "title", true);
  const slug = str(o.slug, "slug", true);

  const errors: string[] = [];
  if (title === undefined) errors.push('Field "title" is required and must be a non-empty string.');
  if (slug === undefined) errors.push('Field "slug" is required and must be a non-empty string.');
  if (!("content" in o)) {
    errors.push('Field "content" is required (string; may be empty).');
  } else if (typeof o.content !== "string") {
    errors.push('Field "content" must be a string.');
  }

  let writerId: string | null = null;
  if (o.writer_id !== undefined && o.writer_id !== null && o.writer_id !== "") {
    if (typeof o.writer_id !== "string" || !UUID_RE.test(o.writer_id.trim())) {
      errors.push('Field "writer_id" must be a valid UUID or omitted.');
    } else {
      writerId = o.writer_id.trim();
    }
  }

  let contentFormat = "markdown";
  if (o.content_format !== undefined && o.content_format !== null) {
    if (o.content_format !== "html" && o.content_format !== "markdown") {
      errors.push('Field "content_format" must be "markdown" or "html".');
    } else {
      contentFormat = o.content_format;
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  const contentRaw = o.content as string;

  const nestedSeo = parseNestedSeo(o);
  if (o.seo !== undefined && o.seo !== null && nestedSeo === null) {
    return { ok: false, errors: ['Field "seo" must be an object when provided.'] };
  }

  const excerpt = str(o.excerpt, "excerpt", false);
  const featured_image = strWithAlias(o, "featured_image", ["image"]);
  const author_name = strWithAlias(o, "author_name", ["author"]);
  const author_designation = str(o.author_designation, "author_designation", false);
  const published_date = str(o.published_date, "published_date", false);
  const youtube_url = str(o.youtube_url, "youtube_url", false);
  const category = str(o.category, "category", false);
  const description = str(o.description, "description", false);
  const tags = parseTagsField(o);
  const seo_title = seoString(o, "seo_title", nestedSeo, "title");
  const seo_description = seoString(o, "seo_description", nestedSeo, "description");
  const og_image_url = seoString(o, "og_image_url", nestedSeo, "ogImage");
  const seo_keywords = seoKeywords(o, nestedSeo);

  const optionalStringFields = [
    excerpt,
    featured_image,
    author_name,
    author_designation,
    published_date,
    youtube_url,
    category,
    description,
    tags,
    seo_title,
    seo_description,
    og_image_url,
    seo_keywords,
  ];
  if (optionalStringFields.some((f) => f === undefined)) {
    return {
      ok: false,
      errors: [
        "Optional fields must use supported types (strings, or tags/seo.keywords as string arrays).",
      ],
    };
  }

  return {
    ok: true,
    row: {
      title: title as string,
      slug: slug as string,
      content: contentRaw,
      excerpt,
      featured_image,
      author_name,
      author_designation,
      published: false,
      is_featured: bool(o.is_featured, false),
      is_labs_featured: bool(o.is_labs_featured, false),
      published_date,
      writer_id: writerId,
      youtube_url,
      category,
      description,
      tags,
      seo_title,
      seo_description,
      og_image_url,
      seo_keywords,
      content_format: contentFormat,
    },
  };
}
