import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

const SITE_ROW_ID = "main";

function passcodeMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await (supabaseAdmin as any)
    .from("site_data")
    .select("data")
    .eq("id", SITE_ROW_ID)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return { data: (data as any)?.data ?? null };
});

export const verifyPasscode = createServerFn({ method: "POST" })
  .inputValidator((input: { passcode: string }) => input)
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSCODE;
    if (!expected) throw new Error("SITE_PASSCODE not configured");
    return { ok: passcodeMatches(data.passcode ?? "", expected) };
  });

export const saveSiteData = createServerFn({ method: "POST" })
  .inputValidator((input: { passcode: string; data: unknown }) => input)
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSCODE;
    if (!expected) throw new Error("SITE_PASSCODE not configured");
    if (!passcodeMatches(data.passcode ?? "", expected)) {
      throw new Error("Invalid passcode");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await (supabaseAdmin as any)
      .from("site_data")
      .upsert(
        { id: SITE_ROW_ID, data: data.data, updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
