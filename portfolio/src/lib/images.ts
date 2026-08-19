import { getSupabaseClient } from "./supabase";

const BUCKET = "portfolio-images";
/** Public app route that streams an object out of the (private) bucket. */
const PUBLIC_PREFIX = "/api/public/img/";

/**
 * Uploads an image file to the `portfolio-images` storage bucket and returns
 * its public URL. `folder` is just a path prefix used to keep uploads
 * organised (e.g. "hero", "projects/01", "gallery").
 */
export async function uploadPortfolioImage(file: File, folder: string): Promise<string> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Image uploads aren't available yet — connect Supabase first.");
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "png";
  const path = `${folder}/${cryptoRandomId()}.${extension}`;

  const { error: uploadError } = await client.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: true,
  });
  if (uploadError) throw uploadError;

  const { data } = client.storage.from(BUCKET).getPublicUrl(path);
  void data;
  // The bucket is private, so images are served through our own public route.
  return `${PUBLIC_PREFIX}${path}`;
}

/** Best-effort delete of a previously uploaded image. Never throws. */
export async function deletePortfolioImage(url: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  let path: string | null = null;
  if (url.startsWith(PUBLIC_PREFIX)) {
    path = url.slice(PUBLIC_PREFIX.length);
  } else {
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const index = url.indexOf(marker);
    if (index !== -1) path = url.slice(index + marker.length);
  }
  if (!path) return; // not one of our uploaded images (e.g. a seed /assets path)

  try {
    await client.storage.from(BUCKET).remove([path]);
  } catch {
    /* ignore — stale storage objects aren't harmful */
  }
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
