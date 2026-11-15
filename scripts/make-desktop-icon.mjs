/**
 * Iris desktop icon generator.
 *
 * Renders the Iris brand mark (three-petal flower on a dark rounded square)
 * into every format the desktop app needs:
 *
 *   desktop/build/icon.ico   — multi-size Windows icon (DIB entries + 256px PNG)
 *   desktop/build/icon.png   — 1024px master (electron-builder source of truth)
 *   desktop/build/icons/     — individual PNG sizes
 *
 * Run: bun run make:icon   (from the repo root — uses the root `sharp` install)
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('desktop/build');
const ICO_SIZES = [16, 24, 32, 48, 64, 128, 256];

/** The Iris mark, scaled to a 1024 canvas with a soft blue aura. */
function masterSvg() {
  const petals = [0, 120, 240]
    .map(
      (deg) =>
        `  <ellipse cx="512" cy="294" rx="172" ry="288" fill="url(#petal)" transform="rotate(${deg} 512 512)" />`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2B2B2B" />
      <stop offset="1" stop-color="#151515" />
    </linearGradient>
    <radialGradient id="aura" cx="0.5" cy="0.47" r="0.55">
      <stop offset="0" stop-color="#0D99FF" stop-opacity="0.32" />
      <stop offset="0.65" stop-color="#0D99FF" stop-opacity="0.10" />
      <stop offset="1" stop-color="#0D99FF" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="petal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3FB1FF" />
      <stop offset="1" stop-color="#0B7FD9" />
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="232" fill="url(#bg)" />
  <rect width="1024" height="1024" rx="232" fill="url(#aura)" />
  <g>
${petals}
  </g>
  <circle cx="512" cy="512" r="96" fill="#FFFFFF" />
</svg>`;
}

/* ------------------------------------------------------------------ */
/* .ico packing                                                        */
/* ------------------------------------------------------------------ */

/** Encode one size as a 32bpp bottom-up DIB (classic, universally supported). */
async function dibEntry(size) {
  const { data } = await sharp(Buffer.from(masterSvg()))
    .resize(size, size)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rowBytes = size * 4;
  const xor = Buffer.alloc(rowBytes * size);
  for (let y = 0; y < size; y++) {
    const srcRow = data.subarray(y * rowBytes, (y + 1) * rowBytes);
    const dstRow = (size - 1 - y) * rowBytes; // bottom-up
    for (let x = 0; x < rowBytes; x += 4) {
      xor[dstRow + x] = srcRow[x + 2]; // B
      xor[dstRow + x + 1] = srcRow[x + 1]; // G
      xor[dstRow + x + 2] = srcRow[x]; // R
      xor[dstRow + x + 3] = srcRow[x + 3]; // A
    }
  }

  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // biSize
  header.writeInt32LE(size, 4); // biWidth
  header.writeInt32LE(size * 2, 8); // biHeight (XOR + AND)
  header.writeUInt16LE(1, 12); // biPlanes
  header.writeUInt16LE(32, 14); // biBitCount
  header.writeUInt32LE(0, 16); // BI_RGB
  header.writeUInt32LE(rowBytes * size, 20); // biSizeImage

  // AND mask — fully opaque (alpha channel already carries transparency)
  const maskRow = Math.ceil(size / 32) * 4;
  const mask = Buffer.alloc(maskRow * size);

  return Buffer.concat([header, xor, mask]);
}

async function pngEntry(size) {
  return sharp(Buffer.from(masterSvg())).resize(size, size).png().toBuffer();
}

async function buildIco() {
  const entries = [];
  const buffers = [];

  for (const size of ICO_SIZES) {
    const data = size === 256 ? await pngEntry(size) : await dibEntry(size);
    entries.push({ size, data });
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dirLen = 16 * entries.length;
  let offset = 6 + dirLen;
  const dir = Buffer.alloc(dirLen);
  entries.forEach((e, i) => {
    const base = i * 16;
    dir.writeUInt8(e.size === 256 ? 0 : e.size, base); // width
    dir.writeUInt8(e.size === 256 ? 0 : e.size, base + 1); // height
    dir.writeUInt8(0, base + 2); // palette
    dir.writeUInt8(0, base + 3); // reserved
    dir.writeUInt16LE(1, base + 4); // color planes
    dir.writeUInt16LE(32, base + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, base + 8);
    dir.writeUInt32LE(offset, base + 12);
    offset += e.data.length;
    buffers.push(e.data);
  });

  return Buffer.concat([header, dir, ...buffers]);
}

/* ------------------------------------------------------------------ */

async function main() {
  await mkdir(path.join(OUT_DIR, 'icons'), { recursive: true });

  // master 1024 png
  const master = await sharp(Buffer.from(masterSvg())).png().toBuffer();
  await writeFile(path.join(OUT_DIR, 'icon.png'), master);

  // individual sizes (linux / runtime use)
  for (const size of [16, 24, 32, 48, 64, 128, 256, 512, 1024]) {
    const png = await sharp(master).resize(size, size).png().toBuffer();
    await writeFile(path.join(OUT_DIR, 'icons', `${size}x${size}.png`), png);
  }

  // windows .ico
  const ico = await buildIco();
  await writeFile(path.join(OUT_DIR, 'icon.ico'), ico);

  console.log(
    `icon set written to ${path.relative(process.cwd(), OUT_DIR)} ` +
      `(icon.ico ${(ico.length / 1024).toFixed(0)} KB, icon.png ${(master.length / 1024).toFixed(0)} KB)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
