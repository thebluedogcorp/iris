import type { NextConfig } from "next";

/**
 * Two build targets share this config:
 *
 *  - web (default)  → `next dev` / `next build` exactly as before
 *  - desktop        → `IRIS_DESKTOP=1 next build` produces a fully static
 *                     export in `out/`, which the Electron shell in
 *                     `desktop/` serves through its private `app://` scheme.
 *                     Iris is 100% client-side, so the export needs no
 *                     server runtime at all.
 */
const nextConfig: NextConfig = {
  ...(process.env.IRIS_DESKTOP === "1"
    ? { output: "export" as const, images: { unoptimized: true } }
    : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["space-z.ai", "*.space-z.ai"],
};

export default nextConfig;
