import sharp from 'sharp';

/**
 * One-off script: build the Open Graph image (1200x630) from the marketing
 * hero screenshot. Run from the repo root:  bun scripts/og-image.ts
 * (kept for reproducibility — output is committed to public/).
 */

const src = process.argv[2] ?? '/tmp/readme-landing.png';
const out = process.argv[3] ?? 'public/og-image.png';

await sharp(src)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`wrote ${out}`);
