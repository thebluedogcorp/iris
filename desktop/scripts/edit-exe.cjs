/**
 * electron-builder `afterPack` hook — patches the Windows executable with
 * the Iris icon and version resource using resedit (pure JS, cross-platform).
 *
 * This replaces electron-builder's default rcedit step (which requires Wine
 * on Linux/macOS) and is enabled by `signAndEditExecutable: false` in
 * electron-builder.yml. @electron/packager uses the exact same approach.
 */

const fs = require('node:fs');
const path = require('node:path');

module.exports = async function editExe(context) {
  if (context.electronPlatformName !== 'win32') return;

  const { NtExecutable, NtExecutableResource, Data, Resource } = await import('resedit');

  const exePath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.exe`);
  const icoPath = path.join(__dirname, '..', 'build', 'icon.ico');

  const version = context.packager.appInfo.version;
  const [major, minor, patch] = version.split('.').map((n) => Number.parseInt(n, 10) || 0);

  const exe = NtExecutable.from(fs.readFileSync(exePath));
  const res = NtExecutableResource.from(exe);

  /* RT_GROUP_ICON(1) + RT_ICON entries — replaces Electron's default icon */
  const iconFile = Data.IconFile.from(fs.readFileSync(icoPath));
  Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    1,
    1033,
    iconFile.icons.map((icon) => icon.data),
  );

  /* VS_VERSIONINFO — FileVersion / ProductName / FileDescription … */
  const versionInfo = Resource.VersionInfo.createEmpty();
  versionInfo.setFileVersion(major, minor, patch, 0);
  versionInfo.setProductVersion(major, minor, patch, 0);
  versionInfo.setStringValues({ lang: 1033, codepage: 1200 }, {
    CompanyName: 'The Blue Dog Corp.',
    FileDescription: 'Iris — the local-first design studio',
    FileVersion: version,
    InternalName: 'Iris',
    LegalCopyright: 'Copyright © 2025 The Blue Dog Corp. (MIT License)',
    OriginalFilename: 'Iris.exe',
    ProductName: 'Iris',
    ProductVersion: version,
  });
  versionInfo.outputToResourceEntries(res.entries);

  res.outputResource(exe);
  fs.writeFileSync(exePath, Buffer.from(exe.generate()));

  console.log(`  • patched ${path.basename(exePath)} (icon + version ${version})`);
};
