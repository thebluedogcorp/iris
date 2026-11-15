/**
 * Patch for app-builder-lib (electron-builder): wine-free NSIS builds on
 * Linux/macOS.
 *
 * electron-builder extracts the NSIS uninstaller by *running* the freshly
 * built installer exe — which requires Wine on non-Windows hosts. A pure
 * Node.js PE parser (UninstallerReader) already exists in the package for
 * the macOS-Catalina special case; this patch widens it to every
 * non-Windows platform and keeps Wine as the fallback.
 *
 * Idempotent — safe to run on every install; a no-op on Windows.
 * Verified against electron-builder 26.x (app-builder-lib/out/targets/nsis/NsisTarget.js).
 */

const fs = require('node:fs');
const path = require('node:path');

const file = path.join(
  __dirname,
  '..',
  'node_modules',
  'app-builder-lib',
  'out',
  'targets',
  'nsis',
  'NsisTarget.js',
);

if (!fs.existsSync(file)) {
  console.log('  • electron-builder not installed yet — nothing to patch');
  process.exit(0);
}

const MARKER = '/* iris-wine-free-patch */';
let source = fs.readFileSync(file, 'utf8');

if (source.includes(MARKER)) {
  console.log('  • electron-builder already patched (wine-free NSIS)');
  process.exit(0);
}

/* the exact wine-spawning block shipped in app-builder-lib 26.x */
const WINE_BLOCK = `        else {
            const wineVm = new WineVm_1.WineVmManager((_a = packager.config.toolsets) === null || _a === void 0 ? void 0 : _a.wine);
            await wineVm.exec(installerPath, [], { env: { __COMPAT_LAYER: "RunAsInvoker" } });
        }`;

const PATCHED_BLOCK = `        else {
            /* iris-wine-free-patch */ try {
                await nsisUtil_1.UninstallerReader.exec(installerPath, uninstallerPath);
            }
            catch (error) {
                builder_util_1.log.warn(\`packager.vm is used: \${error.message}\`);
                const wineVm = new WineVm_1.WineVmManager((_a = packager.config.toolsets) === null || _a === void 0 ? void 0 : _a.wine);
                await wineVm.exec(installerPath, [], { env: { __COMPAT_LAYER: "RunAsInvoker" } });
            }
        }`;

if (!source.includes(WINE_BLOCK)) {
  /* Layout changed upstream — warn but do not fail the install. */
  console.log('  • app-builder-lib layout changed — wine-free patch NOT applied');
  process.exit(0);
}

source = source.replace(WINE_BLOCK, PATCHED_BLOCK);
fs.writeFileSync(file, source);
console.log('  • patched electron-builder: wine-free NSIS uninstaller extraction');
