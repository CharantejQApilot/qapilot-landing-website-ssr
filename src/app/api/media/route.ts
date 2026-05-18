import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import { cmsUnauthorized, verifyCmsApiToken } from "@/lib/qa-guide/cms-api";

export async function POST(request: NextRequest) {
  if (!verifyCmsApiToken(request)) return cmsUnauthorized();

  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role not configured" },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const id = crypto.randomUUID();
  const path = `qa-guides/${id}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(path, bytes, {
      contentType: file.type || "image/png",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicData } = supabase.storage.from("blog-images").getPublicUrl(path);

  return NextResponse.json(
    {
      id,
      url: publicData.publicUrl,
      alt: alt || file.name,
    },
    { status: 201 },
  );
}
