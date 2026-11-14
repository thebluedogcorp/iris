import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Editorial display face for the marketing surfaces (paper-craft feel). */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/thebluedogcorp/iris"),
  title: {
    default: "Iris — The open-source, local-first design studio",
    template: "%s · Iris",
  },
  description:
    "Iris is a free, open-source design tool with a Figma-style workflow: vector and pen tools, smart snapping, pages and layers, .iris documents and PNG/SVG export. Local-first — your designs never leave your machine.",
  keywords: [
    "Iris",
    "design tool",
    "Figma alternative",
    "local-first",
    "vector editor",
    "open source",
    "pen tool",
    "SVG export",
  ],
  authors: [{ name: "Iris Studio" }],
  openGraph: {
    title: "Iris — The open-source, local-first design studio",
    description:
      "Sketch, iterate and ship beautiful vector work. No accounts, no uploads, no limits. Just you and the canvas.",
    type: "website",
    siteName: "Iris",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Iris — design that blooms" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iris — Design that blooms",
    description:
      "The open-source, local-first design studio. Free forever under MIT.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/iris.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
