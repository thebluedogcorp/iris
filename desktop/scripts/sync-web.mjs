/**
 * Copies the Next.js static export (../out) into desktop/app-web — the tree
 * electron-builder bundles into the installer. Cross-platform (used by both
 * the local build and the Windows release CI).
 */

import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, '../../out');
const target = path.resolve(here, '../app-web');

if (!existsSync(source)) {
  console.error('✗ ../out not found — run `bun run build:web` first (IRIS_DESKTOP=1 next build).');
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`✓ synced static export → ${path.relative(path.resolve(here, '../..'), target)}`);
