/**
 * Renders SVG brand assets in public/ → optimized PNGs alongside them.
 *
 * Usage:
 *   node scripts/build-images.mjs
 *
 * Add to the `targets` array to wire up additional brand assets.
 * SVGs serve as the editable source of truth; PNGs are the committed
 * output that GitHub Pages / Cloudflare Pages serves directly to browsers
 * and social platforms.
 */

import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const targets = [
  {
    src: "og-image.svg",
    out: "og-image.png",
    width: 1200,
    height: 630,
    note: "Open Graph / Twitter Card sharing image",
  },
  {
    src: "wordmark-square.svg",
    out: "wordmark-square.png",
    width: 1024,
    height: 1024,
    note: "Square profile picture for FB / IG / LinkedIn / X",
  },
  {
    src: "wordmark-wide.svg",
    out: "wordmark-wide.png",
    width: 1500,
    height: 500,
    note: "Wide wordmark for cover images / signatures / slides",
  },
  {
    src: "facebook-cover.svg",
    out: "facebook-cover.png",
    width: 1640,
    height: 624,
    note: "Facebook page cover (2× retina; displays at 820×312 desktop / 640×360 mobile)",
  },
];

for (const t of targets) {
  const svgPath = join(root, "public", t.src);
  const pngPath = join(root, "public", t.out);
  const svg = readFileSync(svgPath);
  await sharp(svg, { density: 96 })
    .resize(t.width, t.height, { fit: "fill" })
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(pngPath);
  console.log(`✓ ${t.out.padEnd(28)} ${t.width}×${t.height}  ${t.note}`);
}
