import { NextRequest, NextResponse } from "next/server";

export function verifyGenerationSecret(request: NextRequest): NextResponse | null {
  const expected = process.env.QA_GUIDE_GENERATION_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { error: "QA_GUIDE_GENERATION_SECRET not configured" },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const headerSecret = request.headers.get("x-generation-secret")?.trim() ?? "";

  if (token !== expected && headerSecret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
