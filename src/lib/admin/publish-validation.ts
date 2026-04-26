type PublishValidationInput = {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImageUrl?: string | null;
  featuredImageUrl?: string | null;
};

type JobPublishValidationInput = {
  role: string;
  slug: string;
  department: string;
  location: string;
  description: string;
};

function hasText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidAbsoluteHttpUrl(value: string | null | undefined): boolean {
  if (!hasText(value)) return false;
  try {
    const parsed = new URL((value as string).trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function validatePublishedContent(input: PublishValidationInput): string[] {
  const errors: string[] = [];

  if (!hasText(input.title)) errors.push("Title is required before publishing.");
  if (!hasText(input.slug)) errors.push("Slug is required before publishing.");
  if (!hasText(input.content)) errors.push("Content is required before publishing.");

  if (!hasText(input.seoTitle)) {
    errors.push("SEO title is required before publishing.");
  }
  if (!hasText(input.seoDescription)) {
    errors.push("SEO description is required before publishing.");
  }

  if (!hasText(input.ogImageUrl) && !hasText(input.featuredImageUrl)) {
    errors.push("Provide either an OG image URL or a cover image before publishing.");
  }

  if (hasText(input.ogImageUrl) && !isValidAbsoluteHttpUrl(input.ogImageUrl)) {
    errors.push("OG image URL must be a valid absolute http(s) URL.");
  }
  if (
    hasText(input.featuredImageUrl) &&
    !isValidAbsoluteHttpUrl(input.featuredImageUrl)
  ) {
    errors.push("Cover image URL must be a valid absolute http(s) URL.");
  }

  return errors;
}

export function validatePublishedJob(input: JobPublishValidationInput): string[] {
  const errors: string[] = [];
  if (!hasText(input.role)) errors.push("Role is required before publishing.");
  if (!hasText(input.slug)) errors.push("Slug is required before publishing.");
  if (!hasText(input.department)) {
    errors.push("Department is required before publishing.");
  }
  if (!hasText(input.location)) errors.push("Location is required before publishing.");
  if (!hasText(input.description)) {
    errors.push("Job description is required before publishing.");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug.trim())) {
    errors.push("Slug must use lowercase letters, numbers, and hyphens only.");
  }
  return errors;
}
