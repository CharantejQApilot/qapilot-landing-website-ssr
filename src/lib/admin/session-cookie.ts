import { ADMIN_ACCESS_COOKIE } from "@/lib/admin/constants";

export function setAdminAccessCookie(accessToken: string): void {
  if (!accessToken) return;
  const encoded = encodeURIComponent(accessToken);
  document.cookie = `${ADMIN_ACCESS_COOKIE}=${encoded}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`;
}

export function clearAdminAccessCookie(): void {
  document.cookie = `${ADMIN_ACCESS_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}
