import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

// Client khusus untuk server-side upload (pakai service role key agar bisa upload tanpa auth)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const STORAGE_BUCKET = "thumbnails";

/**
 * Generate nama file berupa SHA-256 hash dari konten file + timestamp.
 * Tidak ada jejak nama asli dari komputer pengguna.
 */
function generateHashedFilename(buffer: Buffer, originalName: string): string {
  const extension = originalName.split(".").pop()?.toLowerCase() ?? "bin";
  const hash = createHash("sha256")
    .update(buffer)
    .update(Date.now().toString())
    .digest("hex");
  return `${hash}.${extension}`;
}

/**
 * Upload file ke Supabase Storage bucket "thumbnails"
 * Mengembalikan public URL dari file yang diupload
 */
export async function uploadToStorage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Nama file = SHA-256 hash, ekstensi asli dipertahankan
  const filename = generateHashedFilename(buffer, file.name);

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Dapatkan public URL
  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filename);

  return data.publicUrl;
}

/**
 * Hapus file dari Supabase Storage berdasarkan public URL
 */
export async function deleteFromStorage(publicUrl: string): Promise<void> {
  try {
    // Ekstrak filename dari URL
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split("/");
    const filename = pathParts[pathParts.length - 1];

    if (!filename) return;

    await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([filename]);
  } catch {
    // Tidak perlu throw — jika gagal hapus, lanjutkan saja
    console.warn("Failed to delete file from storage:", publicUrl);
  }
}
