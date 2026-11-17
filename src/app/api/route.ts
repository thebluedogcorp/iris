import { NextResponse } from "next/server";

/**
 * Health endpoint — lets uptime checks (and humans) confirm the studio is
 * being served correctly. Iris itself is fully client-side; this route
 * exists purely for operational monitoring.
 *
 * `force-static` keeps the route compatible with the desktop build's
 * static export (output: export) — the response is prerendered at build
 * time instead of needing a server runtime.
 */
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "iris",
    version: "1.0.0",
    localFirst: true,
    time: new Date().toISOString(),
  });
}
