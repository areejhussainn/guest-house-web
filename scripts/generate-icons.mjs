// Generates favicon / app icons / OG image from public/logo.svg.
// Run with: node scripts/generate-icons.mjs
// Run from the project root: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFileSync } from "fs";

const logo = readFileSync("public/logo.svg", "utf8");
// Drop the "RASGRAND" wordmark — keep only the wave mark.
const markOnly = logo.replace(/<text[\s\S]*?<\/text>/g, "");
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

// 1. Browser favicon — turquoise wave mark, transparent, centered with padding.
await sharp(Buffer.from(markOnly))
  .resize({ width: 1024 })
  .trim()
  .resize(440, 440, { fit: "contain", background: transparent })
  .extend({ top: 36, bottom: 36, left: 36, right: 36, background: transparent })
  .png()
  .toFile("app/icon.png");

// 2. Apple touch icon — white mark on solid ocean-deep (transparent renders black on iOS).
const whiteMark = markOnly.replace(/#1fb3c7/g, "#ffffff");
const markBuf = await sharp(Buffer.from(whiteMark))
  .resize({ width: 1024 })
  .trim()
  .resize(300, 300, { fit: "contain", background: transparent })
  .png()
  .toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0a4d68" } })
  .composite([{ input: markBuf, gravity: "center" }])
  .png()
  .toFile("app/apple-icon.png");

// 3. Open Graph image (1200x630) — full white logo on ocean gradient + tagline.
const whiteFull = logo.replace(/#1fb3c7/g, "#ffffff");
const fullBuf = await sharp(Buffer.from(whiteFull))
  .resize({ width: 620 })
  .png()
  .toBuffer();
const ogBg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0a4d68"/><stop offset="1" stop-color="#088395"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="445" text-anchor="middle" fill="#bfe6ee" font-family="Helvetica, Arial, sans-serif" font-size="32" letter-spacing="6">RASDHOO &#183; MALDIVES</text>
</svg>`;
await sharp(Buffer.from(ogBg))
  .composite([{ input: fullBuf, left: 290, top: 235 }])
  .png()
  .toFile("app/opengraph-image.png");

console.log("Generated: app/icon.png, app/apple-icon.png, app/opengraph-image.png");
