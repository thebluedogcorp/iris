/**
 * Iris desktop packaging orchestrator.
 *
 *   node scripts/package.mjs [--publish never|always]
 *
 * Pipeline:
 *   1. export the web studio (root: IRIS_DESKTOP=1 next build → out/)
 *   2. sync the export into desktop/app-web
 *   3. compile the Electron main/preload (tsc → dist/)
 *   4. electron-builder — NSIS installer (+ optional publish to GitHub)
 *
 * Everything is cross-platform, so the exact same script runs in the
 * release CI (windows-latest) — no wine or platform-specific tricks.
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const desktop = path.resolve(here, '..');

const args = process.argv.slice(2);
const publishFlag = args.includes('--publish')
  ? `${args[args.indexOf('--publish') + 1]}`
  : 'never';

const bun = process.env.BUN_EXEC ?? (process.platform === 'win32' ? 'bun.exe' : 'bun');

function step(label, fn) {
  console.log(`\n┌ ${label}`);
  const started = Date.now();
  fn();
  console.log(`└ done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

function run(cmd, cmdArgs, cwd) {
  const result = spawnSync(cmd, cmdArgs, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    console.error(`✗ command failed: ${cmd} ${cmdArgs.join(' ')}`);
    process.exit(result.status ?? 1);
  }
}

/* 1 — web export (skippable with SKIP_WEB=1 for fast electron-only rebuilds) */
if (process.env.SKIP_WEB !== '1') {
  step('building static web export (IRIS_DESKTOP=1 next build)', () => {
    run(bun, ['run', 'build:desktop'], root);
  });
}

/* 2 — sync into app-web */
step('syncing export → app-web', () => {
  run('node', [path.join(here, 'sync-web.mjs')], desktop);
});

/* 3 — compile electron sources */
step('compiling electron main + preload (tsc)', () => {
  run(bun, ['run', 'compile'], desktop);
});

/* 4 — electron-builder */
step(`packaging with electron-builder (publish: ${publishFlag})`, () => {
  const builderArgs = ['x', 'electron-builder', '--win', 'nsis', '--publish', publishFlag];
  run(bun, builderArgs, desktop);
});

console.log('\n✓ Iris desktop build complete — see desktop/release/');
