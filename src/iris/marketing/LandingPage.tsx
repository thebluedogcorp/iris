'use client';

/**
 * Iris marketing site — the "startup page". A professional SaaS-style
 * landing: navbar, hero (with a hand-built replica of the studio UI plus
 * paper-flower polaroids), stats band, how-it-works, feature grid, craft
 * gallery, manifesto, CTA and footer.
 *
 * The paper-flower photography carries the brand metaphor: Iris is made by
 * makers — warm, crafted, creative — while the studio mock proves the
 * engineering underneath is real.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  PenTool,
  HardDrive,
  Layers,
  Magnet,
  FileJson,
  ImageDown,
  Github,
  Star,
  Menu,
  X,
  Flower2,
  Sparkles,
  MousePointer2,
  Square,
  Frame as FrameIcon,
  Type,
  Hand,
  Download,
  FilePlus2,
  CloudOff,
  Braces,
} from 'lucide-react';
import { BRAND, IMAGES } from './brand';
import { IrisLogo, IrisMark } from './IrisLogo';

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Subtle scroll-reveal wrapper used across all sections. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E7DFD2] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B5CF6]">
      <Flower2 className="size-3" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Washi-taped polaroid frame — the signature craft element. */
function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  tape = true,
  floatDelay = 0,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  tape?: boolean;
  floatDelay?: number;
  className?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.92, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      className={`group relative rounded-[4px] bg-white p-2 pb-3 shadow-[0_18px_40px_-18px_rgba(27,23,18,0.35)] ${className}`}
      style={{ zIndex: 1 }}
    >
      {tape && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#8B5CF6]/30 shadow-sm backdrop-blur-[0.5px] transition-opacity group-hover:opacity-80"
        />
      )}
      <div className="overflow-hidden bg-[#F3EDE3]">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="block h-full w-full object-cover"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
        />
      </div>
      {caption && (
        <figcaption className="font-display pt-2 text-center text-[12.5px] italic text-[#57504A]">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/* ------------------------------------------------------------------ */
/* studio replica (pure CSS/SVG — mirrors the real editor chrome)       */
/* ------------------------------------------------------------------ */

function StudioMock() {
  const tools = [
    { icon: MousePointer2, label: 'Move' },
    { icon: FrameIcon, label: 'Frame' },
    { icon: Square, label: 'Rectangle' },
    { icon: PenTool, label: 'Pen' },
    { icon: Type, label: 'Text' },
    { icon: Hand, label: 'Hand' },
  ];
  return (
    <div
      aria-label="Preview of the Iris studio interface"
      className="relative w-full overflow-hidden rounded-xl border border-[#3A3A3A] bg-[#1E1E1E] text-left shadow-[0_40px_80px_-30px_rgba(27,23,18,0.55)]"
    >
      {/* title bar */}
      <div className="flex h-9 items-center gap-2 border-b border-[#3E3E3E] bg-[#252525] px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-[#FF5F57]" />
          <i className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-[#1E1E1E] px-2.5 py-1 text-[10.5px] text-[#C9C9C9]">
          <IrisMark size={11} />
          brand-poster.iris
        </span>
        <span className="rounded bg-[#1E1E1E] px-1.5 py-0.5 text-[10px] text-[#9A9A9A]">62%</span>
      </div>

      <div className="flex h-[300px] sm:h-[340px]">
        {/* layers panel */}
        <div className="hidden w-[104px] shrink-0 flex-col gap-1 border-r border-[#3E3E3E] bg-[#232323] p-2 sm:flex">
          <p className="px-1 pb-1 text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Layers</p>
          {[
            { w: 'w-3/4', c: 'bg-[#8B5CF6]' },
            { w: 'w-2/3', c: 'bg-[#E8A0B0]' },
            { w: 'w-1/2', c: 'bg-[#93A89B]' },
            { w: 'w-3/5', c: 'bg-[#D97757]' },
            { w: 'w-2/5', c: 'bg-[#C9C9C9]' },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded px-1 py-1 hover:bg-[#2C2C2C]">
              <i className={`h-2 rounded-sm ${row.c} ${row.w}`} aria-hidden="true" />
            </div>
          ))}
          <p className="mt-2 px-1 text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Pages</p>
          <div className="flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1 py-1">
            <i className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
            <span className="text-[9px] text-[#E5E5E5]">Page 1</span>
          </div>
        </div>

        {/* canvas */}
        <div className="relative min-w-0 flex-1 overflow-hidden bg-[#242424]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(circle, #333333 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          {/* frame */}
          <div className="absolute left-[9%] top-[10%] h-[74%] w-[64%] rounded-lg bg-[#2B2B2B] p-3 shadow-[0_0_0_1px_#3E3E3E]">
            <span className="absolute -top-4 left-0 text-[9px] text-[#9A9A9A]">Poster</span>
            {/* selected violet card with handles */}
            <div className="relative mt-3 h-[38%] w-[70%] rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_10px_24px_-10px_rgba(139,92,246,0.7)]">
              {[
                '-left-1 -top-1', 'left-1/2 -top-1 -translate-x-1/2', '-right-1 -top-1',
                '-left-1 top-1/2 -translate-y-1/2', '-right-1 top-1/2 -translate-y-1/2',
                '-left-1 -bottom-1', 'left-1/2 -bottom-1 -translate-x-1/2', '-right-1 -bottom-1',
              ].map((pos) => (
                <i key={pos} className={`absolute ${pos} size-2 rounded-[1px] border border-[#8B5CF6] bg-white`} aria-hidden="true" />
              ))}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#8B5CF6] px-1.5 py-0.5 text-[8.5px] text-white">
                240 × 150
              </span>
            </div>
            {/* rose circle */}
            <div className="absolute right-[8%] top-[16%] size-14 rounded-full bg-[#E8A0B0]" aria-hidden="true" />
            {/* text */}
            <div className="absolute bottom-[12%] left-[6%]">
              <p className="font-display text-[15px] leading-tight text-white">Aa</p>
              <p className="mt-1 h-1.5 w-16 rounded bg-[#4E4E4E]" aria-hidden="true" />
              <p className="mt-1 h-1.5 w-10 rounded bg-[#3E3E3E]" aria-hidden="true" />
            </div>
            {/* pen path */}
            <svg viewBox="0 0 120 40" className="absolute bottom-[10%] right-[10%] h-10 w-24" aria-hidden="true">
              <path d="M4 32 C 30 4, 60 40, 116 10" fill="none" stroke="#D97757" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {/* sage line */}
            <div className="absolute right-[20%] top-[48%] h-0.5 w-12 rotate-[-24deg] rounded bg-[#93A89B]" aria-hidden="true" />
          </div>
          {/* snap guides */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#8B5CF6]/60" aria-hidden="true" />
          <div className="absolute left-0 top-[38%] h-px w-full bg-[#8B5CF6]/60" aria-hidden="true" />

          {/* floating toolbar */}
          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-[#4E4E4E] bg-[#383838]/95 px-1.5 py-1 shadow-xl backdrop-blur">
            {tools.map((t, i) => (
              <span
                key={t.label}
                className={`flex size-6 items-center justify-center rounded-full ${
                  i === 0 ? 'bg-[#8B5CF6] text-white' : 'text-[#C9C9C9]'
                }`}
                title={t.label}
              >
                <t.icon className="size-3" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        {/* properties panel */}
        <div className="hidden w-[92px] shrink-0 flex-col gap-2 border-l border-[#3E3E3E] bg-[#232323] p-2 md:flex">
          <p className="text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Position</p>
          <div className="flex gap-1">
            <span className="flex-1 rounded bg-[#2C2C2C] px-1 py-1 text-center text-[9px] text-[#C9C9C9]">128</span>
            <span className="flex-1 rounded bg-[#2C2C2C] px-1 py-1 text-center text-[9px] text-[#C9C9C9]">64</span>
          </div>
          <p className="text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Fill</p>
          <div className="flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1.5 py-1.5">
            <i className="size-3 rounded-sm bg-[#8B5CF6]" aria-hidden="true" />
            <span className="text-[9px] text-[#C9C9C9]">#8B5CF6</span>
          </div>
          <p className="text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Stroke</p>
          <div className="flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1.5 py-1.5">
            <i className="size-3 rounded-sm border border-[#C9C9C9]" aria-hidden="true" />
            <span className="text-[9px] text-[#C9C9C9]">None</span>
          </div>
          <p className="text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]">Radius</p>
          <span className="rounded bg-[#2C2C2C] px-1.5 py-1 text-[9px] text-[#C9C9C9]">16</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* step + feature visuals                                              */
/* ------------------------------------------------------------------ */

function StepVisual({ step }: { step: 1 | 2 | 3 }) {
  if (step === 1) {
    return (
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#F3EDE3]">
        <div className="relative w-32 rotate-[-3deg] rounded-lg bg-white p-3 shadow-[0_16px_30px_-16px_rgba(27,23,18,0.35)]">
          <IrisMark size={18} className="mx-auto" />
          <p className="mt-2 text-center text-[11px] font-medium text-[#1B1712]">Untitled</p>
          <p className="text-center text-[10px] text-[#57504A]">.iris</p>
          <span className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-[#E8A0B0]/40" aria-hidden="true" />
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#8B5CF6] px-2.5 py-1 text-[10px] font-medium text-white">
          <FilePlus2 className="size-3" aria-hidden="true" /> New file
        </span>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="relative h-36 overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#242424]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="absolute left-[14%] top-[24%] size-12 rounded-full bg-[#E8A0B0]" aria-hidden="true" />
        <div className="absolute left-[38%] top-[36%] h-10 w-16 rounded-lg bg-[#8B5CF6]" aria-hidden="true" />
        <div className="absolute right-[16%] top-[22%] h-8 w-8 rounded bg-[#D97757]" aria-hidden="true" />
        <div className="absolute bottom-[16%] left-[46%] h-1.5 w-14 -rotate-12 rounded bg-[#93A89B]" aria-hidden="true" />
        <div className="absolute left-0 top-[30%] h-px w-full bg-[#8B5CF6]/70" aria-hidden="true" />
        <div className="absolute left-[52%] top-0 h-full w-px bg-[#8B5CF6]/70" aria-hidden="true" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-[#4E4E4E] bg-[#383838] px-2 py-1 text-[10px] text-[#C9C9C9]">
          <Sparkles className="size-3 text-[#8B5CF6]" aria-hidden="true" /> Smart guides
        </span>
      </div>
    );
  }
  return (
    <div className="relative flex h-36 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#F3EDE3]">
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1B1712] shadow-sm">
          <ImageDown className="size-3.5 text-[#8B5CF6]" aria-hidden="true" /> poster.png
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1B1712] shadow-sm">
          <Braces className="size-3.5 text-[#D97757]" aria-hidden="true" /> poster.svg
        </span>
      </div>
      <div className="flex gap-1.5">
        {['1×', '2×', '4×'].map((s) => (
          <span key={s} className="rounded-full border border-[#E7DFD2] bg-white px-2 py-0.5 text-[10px] text-[#57504A]">
            {s}
          </span>
        ))}
      </div>
      <Download className="absolute bottom-2.5 right-3 size-4 text-[#8B5CF6]" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* landing page                                                        */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: PenTool,
    title: 'Vector & pen tools',
    copy: 'Bezier paths with mirrored handles, rects, ellipses, lines and in-canvas text — the full drawing kit.',
    kbd: 'P',
  },
  {
    icon: HardDrive,
    title: 'Local-first, always',
    copy: 'Documents live on your machine. No uploads, no accounts, no tracking. Works completely offline.',
    kbd: '',
  },
  {
    icon: Layers,
    title: 'Pages & layers',
    copy: 'Multi-page documents with a full layer tree — reorder, rename, lock and toggle visibility.',
    kbd: '⌘G',
  },
  {
    icon: Magnet,
    title: 'Smart snapping',
    copy: 'Snap guides to sibling edges and centers, arrow-key nudging and Alt-drag duplicates.',
    kbd: '⇡⇣',
  },
  {
    icon: FileJson,
    title: 'Portable .iris files',
    copy: 'A clean JSON document format with autosave, recents and instant import/export.',
    kbd: '⌘S',
  },
  {
    icon: ImageDown,
    title: 'PNG & SVG export',
    copy: 'Ship anywhere with scale factors up to 4× and transparent backgrounds.',
    kbd: '',
  },
] as const;

const STEPS = [
  {
    n: '01',
    title: 'Create a document',
    copy: 'One click and you are on the canvas. Pick a frame preset or start from a blank page — Iris autosaves as you go.',
  },
  {
    n: '02',
    title: 'Design on an infinite canvas',
    copy: 'Draw with the pen, shape with smart guides, align with a keystroke. Everything responds at 60 fps.',
  },
  {
    n: '03',
    title: 'Export & share anywhere',
    copy: 'Send crisp PNGs at 1–4× or infinitely-scalable SVG. Your .iris file stays yours — forever.',
  },
] as const;

const GALLERY = [
  { src: IMAGES.giantRoses, alt: 'A maker holding three giant handmade paper roses in blush pink', caption: 'Studio-made, by hand', rotate: -2.5 },
  { src: IMAGES.hyacinth, alt: 'Purple paper hyacinths on a workbench beside a paint palette', caption: 'Petals, with patience', rotate: 2 },
  { src: IMAGES.statice, alt: 'Close-up of purple paper statice flowers with yellow centers', caption: 'Purple, but make it paper', rotate: -1.5 },
  { src: IMAGES.diyWall, alt: 'A DIY paper flower wall backdrop in ivory and dusty pink in a home', caption: 'Makers everywhere', rotate: 3 },
] as const;

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const repo = BRAND.repoUrl;

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'How it works', href: '#how' },
    { label: 'Craft', href: '#craft' },
    { label: 'Open source', href: repo, external: true },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#1B1712] antialiased">
      {/* ------------------------------- nav ------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-[#E7DFD2]/70 bg-[#FAF7F2]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
          <a href="#top" aria-label="Iris — home">
            <IrisLogo />
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-[13.5px] font-medium text-[#57504A] transition-colors hover:text-[#1B1712]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Iris on GitHub"
              className="flex size-9 items-center justify-center rounded-full border border-[#E7DFD2] bg-white text-[#1B1712] transition-colors hover:border-[#1B1712]"
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1B1712] px-4 text-[13px] font-medium text-white transition-all hover:bg-[#8B5CF6] hover:shadow-[0_10px_24px_-10px_rgba(139,92,246,0.8)]"
            >
              Open Studio <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-[#E7DFD2] bg-white md:hidden"
          >
            {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#E7DFD2] bg-[#FAF7F2] px-4 pb-4 pt-2 md:hidden">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-2 py-2.5 text-[14px] font-medium text-[#57504A] hover:bg-white hover:text-[#1B1712]"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onEnter();
              }}
              className="mt-2 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#1B1712] text-[13.5px] font-medium text-white"
            >
              Open Studio <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      {/* ------------------------------ hero ------------------------------- */}
      <section id="top" className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* soft color wash */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 size-[420px] rounded-full bg-[#E8A0B0]/25 blur-3xl" />
          <div className="absolute -right-40 top-64 size-[460px] rounded-full bg-[#8B5CF6]/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-[380px] rounded-full bg-[#93A89B]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-[#6D28D9]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#8B5CF6]" />
                </span>
                {BRAND.version} — now open source under MIT
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="font-display mt-5 text-[2.9rem] font-semibold leading-[1.04] tracking-tight text-[#1B1712] sm:text-6xl"
            >
              Design that
              <br />
              <span className="italic text-[#8B5CF6]">blooms.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              className="mt-5 text-[16.5px] leading-relaxed text-[#57504A]"
            >
              Iris is the open-source, local-first design studio. Sketch, iterate and ship
              beautiful vector work — no accounts, no uploads, no limits. Just you and the
              canvas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={onEnter}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#8B5CF6] px-6 text-[15px] font-medium text-white shadow-[0_16px_32px_-12px_rgba(139,92,246,0.75)] transition-all hover:bg-[#7C4DF3] hover:shadow-[0_20px_40px_-12px_rgba(139,92,246,0.85)]"
              >
                Start creating — it&apos;s free
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <a
                href="#how"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#1B1712]/15 bg-white/70 px-6 text-[15px] font-medium text-[#1B1712] transition-colors hover:border-[#1B1712]/40"
              >
                See how it works <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#57504A]"
            >
              {['MIT licensed', 'Works offline', 'Your files stay on your machine'].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#93A89B]" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* collage: studio mock + paper-flower polaroids */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <StudioMock />

            {/* floating polaroids (desktop) */}
            <Polaroid
              src={IMAGES.bouquet}
              alt="Bouquet of handmade crepe-paper flowers in orange, pink and violet"
              caption="made by hand"
              rotate={-7}
              floatDelay={0.4}
              className="absolute -left-10 -top-10 hidden w-32 lg:block xl:w-36"
            />
            <Polaroid
              src={IMAGES.pastelWall}
              alt="Pastel paper rose wall fading from blush pink to cream"
              caption="petal by petal"
              rotate={6}
              floatDelay={1.2}
              className="absolute -bottom-12 -left-6 hidden w-36 lg:block xl:w-40"
            />
            <Polaroid
              src={IMAGES.orangeRoses}
              alt="Orange crepe-paper roses in a white vase against a slate wall"
              caption="craft first"
              rotate={8}
              floatDelay={0.8}
              className="absolute -right-8 top-1/3 hidden w-28 lg:block xl:w-32"
            />
          </motion.div>
        </div>

        {/* mobile polaroid strip */}
        <div className="mx-auto -mt-8 flex max-w-md justify-center gap-4 px-4 pb-14 lg:hidden">
          <Polaroid src={IMAGES.bouquet} alt="Handmade crepe-paper flower bouquet" rotate={-4} tape={false} className="w-28" />
          <Polaroid src={IMAGES.pastelWall} alt="Pastel paper rose wall" rotate={3} tape={false} className="w-28" />
          <Polaroid src={IMAGES.orangeRoses} alt="Orange paper roses in a vase" rotate={-2} tape={false} className="w-28" />
        </div>
      </section>

      {/* ----------------------------- stats band --------------------------- */}
      <section className="border-y border-[#E7DFD2] bg-white/60" aria-label="Iris at a glance">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-[#E7DFD2] px-4 sm:px-6 md:grid-cols-4 md:divide-x">
          {[
            { k: '100%', v: 'local — files never leave the device' },
            { k: '0', v: 'servers, accounts & trackers' },
            { k: 'MIT', v: 'open-source license, free forever' },
            { k: '60 fps', v: 'canvas, on everyday hardware' },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06} className="px-2 py-7 text-center md:py-9">
              <p className="font-display text-3xl font-semibold text-[#1B1712]">{s.k}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-[#57504A]">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------- how it works -------------------------- */}
      <section id="how" className="scroll-mt-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h2 id="how-heading" className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]">
              From first petal to final pixel
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#57504A]">
              Three steps. Twelve seconds. No onboarding emails, no “verify your workspace”.
              Iris gets out of the way so the making can start.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <article className="group h-full rounded-2xl border border-[#E7DFD2] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:shadow-[0_24px_48px_-24px_rgba(27,23,18,0.25)]">
                  <StepVisual step={(i + 1) as 1 | 2 | 3} />
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-[13px] font-semibold text-[#8B5CF6]">{s.n}</span>
                    <h3 className="text-[16px] font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#57504A]">{s.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ features ---------------------------- */}
      <section id="product" className="scroll-mt-20 border-y border-[#E7DFD2] bg-white/60" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>The toolkit</SectionEyebrow>
            <h2 id="features-heading" className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]">
              A studio-grade toolkit, handcrafted
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#57504A]">
              Every Figma behaviour you muscle-memory — selection, snapping, groups, undo —
              rebuilt cleanly from scratch and tuned for the browser.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <article className="group h-full rounded-2xl border border-[#E7DFD2] bg-[#FAF7F2] p-6 transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:bg-white hover:shadow-[0_24px_48px_-24px_rgba(27,23,18,0.25)]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[#F1EBFC] text-[#6D28D9] transition-colors group-hover:bg-[#8B5CF6] group-hover:text-white">
                      <f.icon className="size-5" aria-hidden="true" />
                    </span>
                    {f.kbd && (
                      <kbd className="rounded-md border border-[#E7DFD2] bg-white px-2 py-0.5 font-mono text-[11px] text-[#57504A]">
                        {f.kbd}
                      </kbd>
                    )}
                  </div>
                  <h3 className="mt-4 text-[15.5px] font-semibold">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#57504A]">{f.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- craft gallery ------------------------- */}
      <section id="craft" className="scroll-mt-20" aria-labelledby="craft-heading">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow>Our craft</SectionEyebrow>
              <h2 id="craft-heading" className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]">
                Paper petals,
                <br />
                pixel petals.
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-[#57504A]">
                Iris is named after the flower, and built like one — layer upon layer of
                carefully creased code. We are a small studio of makers who fold paper
                flowers in the evening and shape vectors by day.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#57504A]">
                We believe software should feel handmade: warm, precise, and a little bit
                playful. That is why every pixel in Iris is crafted in the open, and why our
                walls are always in bloom.
              </p>
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[#6D28D9] transition-colors hover:text-[#8B5CF6]"
              >
                See how we build
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <p className="mt-8 border-t border-[#E7DFD2] pt-4 text-[11.5px] leading-relaxed text-[#57504A]/80">
                Imagery: handmade paper flowers by independent craft studios. Used with
                appreciation, made with crepe paper.
              </p>
            </Reveal>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5">
            {GALLERY.map((g, i) => (
              <Polaroid
                key={g.src}
                src={g.src}
                alt={g.alt}
                caption={g.caption}
                rotate={g.rotate}
                floatDelay={i * 0.5}
                className="break-inside-avoid"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- manifesto ----------------------------- */}
      <section className="relative overflow-hidden bg-[#1B1712] text-white" aria-labelledby="manifesto-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 size-72 rounded-full bg-[#8B5CF6]/25 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-72 rounded-full bg-[#E8A0B0]/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <Reveal>
            <IrisMark size={34} className="mx-auto" />
            <h2 id="manifesto-heading" className="font-display mt-8 text-[2rem] font-medium italic leading-snug tracking-tight sm:text-[2.6rem]">
              “Tools should disappear.
              <br />
              Craft should remain.”
            </h2>
            <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
              The Iris manifesto
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[13.5px] font-medium text-white transition-colors hover:border-white/60"
              >
                <Github className="size-4" aria-hidden="true" /> Read the source
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2.5 text-[12.5px] text-white/60">
                <CloudOff className="size-3.5" aria-hidden="true" /> No cloud required
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- CTA -------------------------------- */}
      <section aria-labelledby="cta-heading" className="px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#8B5CF6] via-[#7C4DF3] to-[#6D28D9] px-6 py-16 text-center text-white sm:px-12 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-[#E8A0B0]/25 blur-3xl" />
              <svg className="absolute right-10 top-8 size-16 text-white/15" viewBox="0 0 16 16" aria-hidden="true">
                <g fill="currentColor">
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
                </g>
              </svg>
              <svg className="absolute bottom-10 left-12 size-10 text-white/15" viewBox="0 0 16 16" aria-hidden="true">
                <g fill="currentColor">
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
                  <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
                </g>
              </svg>
            </div>
            <div className="relative">
              <h2 id="cta-heading" className="font-display mx-auto max-w-xl text-4xl font-semibold tracking-tight sm:text-[2.8rem]">
                Ready to make something beautiful?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/85">
                Open the studio and start your first document — it takes twelve seconds,
                and it&apos;s free forever.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onEnter}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-[#6D28D9] shadow-xl transition-transform hover:scale-[1.03]"
                >
                  Start creating — free <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-[14px] font-medium text-white transition-colors hover:border-white/80"
                >
                  <Star className="size-4" aria-hidden="true" /> Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------- footer ------------------------------ */}
      <footer className="mt-auto border-t border-[#E7DFD2] bg-[#F3EDE3]" aria-label="Footer">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <IrisLogo />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#57504A]">
                {BRAND.tagline}. Vector design that lives on your machine — open source
                and free forever.
              </p>
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-[#1B1712]/15 bg-white px-4 text-[12.5px] font-medium text-[#1B1712] transition-colors hover:border-[#1B1712]/50"
              >
                <Github className="size-3.5" aria-hidden="true" /> thebluedogcorp/iris
              </a>
            </div>

            {[
              {
                h: 'Product',
                links: [
                  { label: 'Features', href: '#product' },
                  { label: 'How it works', href: '#how' },
                  { label: 'Our craft', href: '#craft' },
                  { label: 'Open the Studio', href: '#top' },
                ],
              },
              {
                h: 'Resources',
                links: [
                  { label: 'README & docs', href: `${repo}#readme`, external: true },
                  { label: 'Keyboard shortcuts', href: `${repo}#keyboard-shortcuts`, external: true },
                  { label: '.iris file format', href: `${repo}#iris-document-format`, external: true },
                  { label: 'Releases', href: `${repo}/releases`, external: true },
                ],
              },
              {
                h: 'Community',
                links: [
                  { label: 'GitHub', href: repo, external: true },
                  { label: 'Report an issue', href: `${repo}/issues/new/choose`, external: true },
                  { label: 'Discussions', href: `${repo}/discussions`, external: true },
                  { label: 'MIT License', href: `${repo}/blob/main/LICENSE`, external: true },
                ],
              },
            ].map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1B1712]">{col.h}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-[13.5px] text-[#57504A] transition-colors hover:text-[#1B1712]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E7DFD2] pt-6 sm:flex-row">
            <p className="text-[12.5px] text-[#57504A]">
              © 2025 Iris Studio · Crafted with paper petals &amp; pixels.
            </p>
            <p className="inline-flex items-center gap-1.5 text-[12.5px] text-[#57504A]">
              <Flower2 className="size-3.5 text-[#8B5CF6]" aria-hidden="true" />
              Local-first. Always.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
