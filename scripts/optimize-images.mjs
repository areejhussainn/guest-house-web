// Script to optimize images in public/gallery
// Run: node scripts/optimize-images.mjs

import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import path from "path";

const GALLERY_DIR = "public/gallery";
const BACKUP_DIR = "public/gallery/_originals";
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImages() {
  // Create backup directory
  try {
    await mkdir(BACKUP_DIR, { recursive: true });
  } catch {}

  const files = await readdir(GALLERY_DIR);
  const jpgFiles = files.filter(
    (f) =>
      (f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png")) &&
      !f.startsWith(".")
  );

  console.log(`Found ${jpgFiles.length} images to optimize\n`);

  let totalSaved = 0;

  for (const file of jpgFiles) {
    const filePath = path.join(GALLERY_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const fileStat = await stat(filePath);
    const originalSize = fileStat.size;

    // Skip small files (already optimized)
    if (originalSize < 200 * 1024) {
      console.log(`⏭  ${file} — already small (${(originalSize / 1024).toFixed(0)}KB), skipping`);
      continue;
    }

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Backup original
      await sharp(filePath).toFile(backupPath);

      // Resize if wider than MAX_WIDTH, and compress
      let pipeline = sharp(filePath);

      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      const outputBuffer = await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();

      // Only save if smaller
      if (outputBuffer.length < originalSize) {
        const { writeFile } = await import("fs/promises");
        await writeFile(filePath, outputBuffer);
        const saved = originalSize - outputBuffer.length;
        totalSaved += saved;
        console.log(
          `✅ ${file} — ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(outputBuffer.length / 1024 / 1024).toFixed(1)}MB (saved ${(saved / 1024 / 1024).toFixed(1)}MB)`
        );
      } else {
        console.log(`⏭  ${file} — already optimal`);
      }
    } catch (err) {
      console.error(`❌ ${file} — ${err.message}`);
    }
  }

  console.log(
    `\n🎉 Done! Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`
  );
}

optimizeImages();
