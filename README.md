<div align="center">

<img src="public/iris.svg" width="72" alt="Iris logo" />

# Iris

**The open-source, local-first design studio.**

Iris is a free, Figma-style vector design tool that runs entirely in your
browser. No accounts. No uploads. No tracking. Your designs live on your
machine — where they belong.

[Website](#) · [Features](#-features) · [Getting started](#-getting-started) · [Roadmap](#-roadmap) · [Contributing](#-contributing)

[![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-93A89B.svg)](./CONTRIBUTING.md)

<img src="docs/screenshots/landing.png" width="880" alt="The Iris marketing site — “Design that blooms.” hero with a studio preview and handmade paper-flower photography" />

</div>

---

## Why Iris?

Most design tools want your files in *their* cloud. Iris takes the opposite
bet: **a studio-grade editor with zero servers**. It is a clean-room
reimplementation of the Figma editing experience — tools, panels, shortcuts
and behaviors — written from scratch, tuned for the browser, and released
under MIT.

| | Iris v1 |
|---|---|
| **Your files** | Stay in your browser / on your disk — never uploaded |
| **Accounts** | None required (a preview account flow exists; see below) |
| **Offline** | Fully functional — it is a local app that happens to ship in a tab |
| **Price** | Free forever, MIT-licensed |

## Screenshots

| The studio | The account flow (preview) |
|---|---|
| <img src="docs/screenshots/studio.png" width="440" alt="The Iris editor — dark UI with layers, canvas, properties panel and a small brand-poster design" /> | <img src="docs/screenshots/account.png" width="440" alt="Iris account creation — split screen with paper-flower photography and the sign-up form" /> |

## ✨ Features

### Canvas
- Infinite pan (Space + drag, middle-drag, Hand tool `H`) and zoom-to-cursor (`Ctrl` + wheel)
- Zoom controls, zoom to fit (`Shift+1`), zoom to selection (`Shift+2`), reset 100% (`Ctrl+0`), zoom preset dropdown in the right panel
- Rulers (`Shift+R`), draggable ruler guides, pixel grid at high zoom, layout grid with snap
- Frame name labels and big section labels, outline mode, canvas background color

### Tools *(Figma UI3 toolbar — grouped, with dropdowns)*
- **Move group** — Move `V` · Scale `K` · Hand `H`
- **Frame group** — Frame `F` · Section `Shift+S` · Slice `S`
- **Shape group** — Rectangle `R` · Line `L` · Arrow `Shift+L` · Ellipse `O` · Polygon `Y` · Star · Image/video `Ctrl+Shift+K`
- **Pen group** — Pen `P` (click = corner, drag = mirrored smooth handles) · Pencil `Shift+P` (freehand, auto-close)
- **Text group** — Text `T` with in-canvas editing overlay
- **Actions menu** — Presentation, Export…, Place image, Shortcuts
- **Comment tool** `C` — Figma-style comment pins with author, timestamp, resolve and threads
- **Eyedropper** `I` — sample any canvas pixel into the selection's fill
- Toolbar view toggles: Hand, Rulers, Pixel grid, Inspect code mode

### Objects
- Frames (with clipping + children) and groups (`Ctrl+G` / `Ctrl+Shift+G`)
- **Sections** — big labeled backdrop regions for organizing the canvas
- **Slices** — dashed export regions; exporting a slice rasterizes the area it covers
- Rects with corner radius, ellipses, lines, arrows with configurable heads, polygons, stars, bezier paths, text, images
- 18 frame size presets (Phone / Tablet / Desktop / Paper / Slide / Social / Watch) in the right panel
- Alt-drag duplicate, Alt-resize from center, Shift-constrain

### Selection & transform
- Click, Shift multi-select, marquee, Ctrl-click deep select, double-click into groups/frames
- 8 resize handles + rotation handle; **Scale tool `K`** with corner handles that scales
  strokes, corner radii and font sizes — for the whole selection including frame children
- Flip H/V (`Shift+H` / `Shift+V`), rotate 90° steps, free rotation with Shift snapping
- Arrow-key nudge (`Shift` = 10 px), smart snap guides to sibling edges/centers
- Z-order: bring forward/backward (`]` `[`), to front/back (`Ctrl+]` `Ctrl+[`)

### Panels
- **Left rail** — Home, Layers, Assets, Comments, Help navigation
- **Layers** — pages with per-page search, tree with type icons (topmost layer first, Figma
  order), visibility/lock toggles, inline rename, drag reorder (drag up = bring to front),
  shift-range select, page duplicate/reorder/delete
- **Assets** — every image used in the file as a clickable grid; click to place another copy
- **Comments** — list of pins with open/resolved counts, pin visibility toggle
- **Properties** — Design/Prototype tabs; X/Y/W/H/rotation/radius, opacity, blend modes,
  fill (solid + linear/radial gradients), stroke (weight/dash), effects (drop shadow, layer
  blur), full text controls (family/size/weight/align/line-height/letter-spacing/case),
  6 alignments + 2 distributes, frame clip toggle, polygon sides, star points/inner radius,
  arrow heads
- **Inspect mode** — live SVG markup of the selection with copy-to-clipboard
- **Prototype tab** — presentation launcher with the frame flow list

### Presentation mode
- Fullscreen frame presentation (`Ctrl+Enter` or the play button)
- Arrow / Space / PageUp / PageDown navigation, Home/End jumps, click to advance, Esc to exit
- Frame name + position bar at the bottom

### Documents & files
- Undo/redo with snapshot history and coalescing (`Ctrl+Z` / `Ctrl+Shift+Z`)
- `.iris` JSON documents (New / Open / Save / Save As), debounced localStorage autosave, recent documents
- Export to PNG/JPG (1×–4×, transparent background) and SVG — selection, frame, page or slice region
- Document templates (Mobile app, Web wireframe, Kanban, Poster) from the file browser
- Fake-but-featured account flow, Share dialog with copy-link and permissions (preview)

### Editor shell (Figma UI3 clone)
- Two-row title bar: app menus (File / Insert / Edit / View / Help) + tab bar with document
  tab, quick actions and window controls
- Bottom-center floating pill toolbar with grouped tools, chevrons, blue active state
- Bottom-right circular help button; shortcut overlay (`?`)
- Toasts with Undo actions, dirty/saved cloud indicator, avatars and Share button

## ⌨️ Keyboard shortcuts

| Context | Shortcut | Action |
|---|---|---|
| Tools | `V` `K` `F` `R` `O` `L` `T` `P` `C` `I` `H` | Move · Scale · Frame · Rect · Ellipse · Line · Text · Pen · Comment · Eyedropper · Hand |
| Tools | `Shift+S` / `S` / `Shift+L` / `Shift+P` | Section · Slice · Arrow · Pencil |
| View | `Ctrl` + wheel | Zoom to cursor |
| View | `Shift+1` / `Shift+2` / `Ctrl+0` | Zoom to fit / selection / 100% |
| View | `Shift+R` / `Ctrl+Enter` | Rulers · Presentation |
| View | `Space` + drag | Pan |
| Edit | `Ctrl+Z` / `Ctrl+Shift+Z` | Undo / redo |
| Edit | `Ctrl+G` / `Ctrl+Shift+G` | Group / ungroup |
| Edit | `Ctrl+D` / `Alt` + drag | Duplicate |
| Edit | Arrows (+`Shift`) | Nudge 1 px (10 px) |
| Files | `Ctrl+S` / `Ctrl+O` / `Ctrl+Shift+E` | Save · open · export |
| Home | `/` | Focus file search |

Press `?` inside the studio for the full in-app shortcut overlay.

## 📄 `.iris` document format

Every Iris file is a single self-describing JSON document:

```jsonc
{
  "format": "iris",
  "version": 1,
  "name": "Brand poster",
  "pages": [{ "id": "…", "name": "Page 1", "children": ["…"] }],
  "nodes":   { "…": { "type": "rect", "x": 128, "y": 64, "w": 240, "h": 150, "fill": "#8B5CF6" } },
  "images":  { "…": "data:image/png;base64,…" }
}
```

- **Stable schema, versioned** — forward-compatible migrations on load.
- **Human-readable** — diffs cleanly in git, trivially scriptable.
- **Round-trips exactly** — File → Save downloads the file; File → Open restores
  it bit-for-bit.

## 🔒 Privacy

Iris collects nothing. There are no analytics, no telemetry, no error
reporting, no cookies. Documents autosave to your browser's `localStorage`
and to `.iris` files you choose to save. In this preview the account flow is
simulated on-device (see below) — nothing is ever transmitted.

## 🏗️ Architecture

```
src/
  app/                     # Next.js 16 App Router shell (single "/" route)
    page.tsx               #   → dynamic import of the client gate (ssr: false)
    layout.tsx             #   fonts (Geist + Fraunces) + metadata
  iris/
    engine/                # framework-agnostic core (zero React imports)
      model.ts             # Document -> Pages -> Nodes (Frame, Group, Rect,
                           #   Ellipse, Line, Path, Text, Image); flat map + tree
      geometry.ts          # mat2d transforms, bounds, hit-testing, snapping,
                           #   selection-handle geometry, text metrics
      store.ts             # zustand store: doc, selection, tool, viewport,
                           #   snapshot history, clipboard, align/group/z-order
      renderer.ts          # canvas draw pass, selection overlay, snap guides,
                           #   rulers, pixel grid, draw previews
      tools.ts             # pointer/keyboard state machine
                           #   (marquee/move/resize/rotate/draw/pan/pen/text)
      overlay.ts           # mutable interaction state shared by tools -> renderer
      export.ts            # PNG (offscreen canvas) + SVG serialization
      files.ts             # .iris file I/O, recents, image import (IPC shim)
      library.ts           # local document library + thumbnails
      router.ts            # client-side routing: / <-> /?doc=<id>
    ui/                    # React shell
      AppGate.tsx          # phase flow: landing → account → studio
      HomeBrowser.tsx      # file browser (search, sort, grid/list, recents)
      TitleBar.tsx         # menus, document name, Local-first badge
      CanvasView.tsx       # canvas element + pointer wiring
      Toolbar.tsx          # floating tool switcher
      LayersPanel.tsx      # pages + layers tree
      PropertiesPanel.tsx  # design properties (position/fill/stroke/text)
      StatusBar.tsx        # doc state, hints, zoom
      ContextMenu.tsx      # right-click actions
      ExportDialog.tsx     # PNG/SVG export options
      ShortcutsOverlay.tsx # "?" cheat-sheet
    marketing/             # the website (landing page)
      LandingPage.tsx      # hero, how-it-works, features, craft gallery, CTA
      brand.ts             # palette, imagery, links
    auth/
      session.ts           # PREVIEW account simulation (localStorage)
      AuthPage.tsx         # sign-up / sign-in screen (preview)
```

The engine can be dropped into any host — the file layer (`files.ts`) is the
seam where Electron IPC (`window.irisAPI` via `contextBridge`) replaces the
browser download/upload shim in the planned desktop build.

## 🚀 Getting started

```bash
git clone https://github.com/thebluedogcorp/iris.git
cd iris
bun install          # or: npm install
bun run dev          # http://localhost:3000
```

Other handy scripts:

```bash
bun run lint         # ESLint (Next.js core-web-vitals + TS rules)
bun run db:generate  # regenerate the Prisma client (schema is minimal today)
```

> **Node/Bun**: developed and tested with Bun 1.2+ and Node 20+.

## 🗺️ Roadmap

- ✅ **v1.0 — the local studio** (this release): full editor, `.iris` files,
  home browser, marketing site
- 🔜 **v1.1** — multi-fill/stroke, gradients, effects; boolean operations;
  components & instances; auto layout & constraints
- 🔜 **v1.2** — prototyping; plugin API; Electron desktop packaging
  (`src/main` + `src/preload`)
- 🌤️ **Iris Cloud (optional)** — Google sign-in via NextAuth.js (the preview
  account flow already mirrors the final UX), encrypted sync & backup,
  link sharing, real-time collaboration. Always opt-in: the local studio
  stays fully functional without it.

## 🤝 Contributing

Iris is built in the open and contributions are welcome — bug reports,
feature ideas, keyboard-shortcut nits and pull requests alike.

1. Fork & branch: `feat/my-feature` or `fix/my-bugfix`
2. `bun run lint` must pass
3. Keep the engine framework-agnostic (no React imports in `src/iris/engine`)
4. Open a PR with a clear description + screenshots for UI changes

See [GOOD_FIRST_ISSUES](https://github.com/thebluedogcorp/iris/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
to get started.

## 📜 License

[MIT](./LICENSE) — Iris is an independent project and is not affiliated with
Figma, Inc.

## 🌸 Acknowledgments

- The paper-flower photography on the website comes from independent craft
  studios around the web — used with appreciation, made with crepe paper.
- Built by [The Blue Dog](https://github.com/thebluedogcorp) — *crafted with
  paper petals & pixels.*
