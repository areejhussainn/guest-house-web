// Generate base64 blur placeholders for all gallery images
// Run: node scripts/generate-blur.mjs

import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const GALLERY_DIR = "public/gallery";

async function generateBlurData() {
  const files = await readdir(GALLERY_DIR);
  const imageFiles = files.filter(
    (f) =>
      (f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png")) &&
      !f.startsWith("."),
  );

  const blurMap = {};

  for (const file of imageFiles) {
    const filePath = path.join(GALLERY_DIR, file);
    try {
      const buffer = await sharp(filePath)
        .resize(10, 10, { fit: "inside" })
        .jpeg({ quality: 30 })
        .toBuffer();

      const base64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;
      blurMap[`/gallery/${file}`] = base64;
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  // Output as a TypeScript file
  const entries = Object.entries(blurMap)
    .map(([key, val]) => `  "${key}": "${val}",`)
    .join("\n");

  const tsContent = `// Auto-generated blur placeholders — do not edit manually
// Regenerate with: node scripts/generate-blur.mjs

export const blurDataMap: Record<string, string> = {
${entries}
};

export function getBlurData(src: string): string | undefined {
  return blurDataMap[src];
}
`;

  const { writeFile } = await import("fs/promises");
  await writeFile("lib/blur-data.ts", tsContent);
  console.log(
    `Generated blur data for ${Object.keys(blurMap).length} images → lib/blur-data.ts`,
  );
}

generateBlurData();
