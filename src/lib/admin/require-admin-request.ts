import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccessToken } from "@/lib/admin/verify-admin-access-token";

export function getBearerToken(request: NextRequest): string {
  const auth = request.headers.get("authorization");
  return auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
}

export async function requireAdminRequest(
  request: NextRequest,
): Promise<NextResponse | null> {
  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = await verifyAdminAccessToken(token);
  if (status === "unauthenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (status === "forbidden") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
