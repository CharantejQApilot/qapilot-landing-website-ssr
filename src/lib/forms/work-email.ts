/** Common consumer / free mailbox providers blocked for work-email fields. */
export const FREE_EMAIL_DOMAINS = [
  "aol.com",
  "gmx.com",
  "gmx.net",
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "icloud.com",
  "live.com",
  "mac.com",
  "mail.com",
  "me.com",
  "msn.com",
  "outlook.com",
  "proton.me",
  "protonmail.com",
  "qq.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
] as const;

const FREE_EMAIL_DOMAIN_SET = new Set(
  FREE_EMAIL_DOMAINS.map((d) => d.toLowerCase()),
);

/** Extract the domain from an email (lowercased). Returns null if malformed. */
export function emailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at <= 0 || at === email.length - 1) return null;
  return email.slice(at + 1).trim().toLowerCase();
}

/** True when the address uses a company / non-free domain. */
export function isWorkEmail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return false;
  return !FREE_EMAIL_DOMAIN_SET.has(domain);
}

export const WORK_EMAIL_ERROR =
  "Please use your work email (personal providers like Gmail aren't accepted)";
