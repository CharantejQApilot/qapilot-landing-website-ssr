#!/usr/bin/env node
/**
 * One-off: create Auth user + admin row in public.user_roles.
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Pass credentials only via env for this run (do not commit):
 *
 *   ADMIN_EMAIL=you@company.com ADMIN_PASSWORD='your-secure-password' node scripts/create-admin-user.mjs
 *
 * If the email already exists, updates password to ADMIN_PASSWORD and ensures admin role.
 */

import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) {
    console.error("Missing .env.local at project root.");
    process.exit(1);
  }
  const raw = fs.readFileSync(p, "utf8");
  const get = (name) => {
    const m = raw.match(new RegExp(`^${name}=(.+)$`, "m"));
    return m?.[1]?.trim()?.replace(/^["']|["']$/g, "") ?? "";
  };
  return {
    url: get("NEXT_PUBLIC_SUPABASE_URL"),
    serviceKey: get("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

async function findUserIdByEmail(admin, email) {
  const normalized = email.trim().toLowerCase();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.listUsers({ page, perPage });
    if (error) throw error;
    const users = data?.users ?? [];
    const hit = users.find((u) => u.email?.toLowerCase() === normalized);
    if (hit) return hit.id;
    if (users.length < perPage) return null;
    page += 1;
  }
}

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD for this command only, e.g.\n" +
        "  ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='…' node scripts/create-admin-user.mjs"
    );
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("ADMIN_PASSWORD must be at least 6 characters (matches /auth validation).");
    process.exit(1);
  }

  const { url, serviceKey } = loadEnvLocal();
  if (!url || !serviceKey) {
    console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let userId;

  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createErr) {
    const msg = createErr.message?.toLowerCase() ?? "";
    const duplicate =
      msg.includes("already been registered") ||
      msg.includes("already registered") ||
      msg.includes("duplicate") ||
      msg.includes("unique");

    if (!duplicate) {
      console.error("createUser failed:", createErr.message);
      process.exit(1);
    }

    userId = await findUserIdByEmail(supabase.auth.admin, email);
    if (!userId) {
      console.error("User exists but could not be found by email via listUsers.");
      process.exit(1);
    }

    const { error: updErr } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (updErr) {
      console.error("updateUserById failed:", updErr.message);
      process.exit(1);
    }
    console.log("Existing user updated (password + confirmed email):", email);
  } else {
    userId = created.user?.id;
    if (!userId) {
      console.error("createUser returned no user id");
      process.exit(1);
    }
    console.log("Created Auth user:", email);
  }

  const { data: existingRole, error: selErr } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (selErr) {
    console.error("user_roles select failed:", selErr.message);
    process.exit(1);
  }

  if (!existingRole) {
    const { error: insErr } = await supabase.from("user_roles").insert({
      id: randomUUID(),
      user_id: userId,
      role: "admin",
    });
    if (insErr) {
      console.error("user_roles insert failed:", insErr.message);
      console.error(
        "Fix in SQL Editor (if id has no DB default), e.g.\n" +
          `  INSERT INTO public.user_roles (id, user_id, role) VALUES (gen_random_uuid(), '${userId}', 'admin');`
      );
      process.exit(1);
    }
    console.log("Inserted admin row in user_roles.");
  } else {
    console.log("Admin role already present in user_roles.");
  }

  console.log("Admin role linked. user_id:", userId);
  console.log("Sign in at /auth with this email and password.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
