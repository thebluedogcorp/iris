/**
 * Iris export: PNG/JPG (offscreen canvas, 1x-4x, optional transparency) and
 * SVG serialization (gradients, shadows, blur, blend modes included).
 */

import { ID, IrisDoc, IrisNode } from './model';
import {
  Rect,
  Vec,
  applyTextCase,
  arrowPath2d,
  boundsOfNodes,
  dashArray,
  firstBaseline,
  gradientLine,
  measureText,
  nodeWorldAABB,
  polygonPoints,
  regularPath2d,
  segmentEnds,
  starPointsOf,
  cssFontFamily,
} from './geometry';
import { useIris } from './store';
import { drawNodes } from './renderer';
import { loadImage } from './imageCache';

export type ExportScope = 'selection' | 'page';
export type RasterFormat = 'png' | 'jpg';

export function downloadBlob(data: Blob | string, filename: string): void {
  const blob = typeof data === 'string' ? new Blob([data], { type: 'image/svg+xml' }) : data;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\d-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'export';
}

/** Union AABB of the export target nodes (visible only). */
export function contentBounds(doc: IrisDoc, pageId: ID, ids?: ID[]): Rect | null {
  const page = doc.pagesById[pageId];
  if (!page) return null;
  let targets: IrisNode[];
  if (ids && ids.length > 0) {
    targets = ids.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible);
  } else {
    targets = page.nodeIds.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible);
  }
  if (targets.length === 0) return null;
  return boundsOfNodes(
    doc,
    targets.map((n) => n.id),
  );
}

async function preloadImages(doc: IrisDoc, pageId: ID, ids?: ID[]): Promise<void> {
  const page = doc.pagesById[pageId];
  if (!page) return;
  const srcs = new Set<string>();
  const visit = (n: IrisNode) => {
    if (n.type === 'image' && n.src && n.visible) srcs.add(n.src);
    n.children.forEach((c) => {
      const child = doc.nodesById[c];
      if (child) visit(child);
    });
  };
  if (ids && ids.length) ids.forEach((id) => { const n = doc.nodesById[id]; if (n) visit(n); });
  else page.nodeIds.forEach((id) => { const n = doc.nodesById[id]; if (n && n.visible) visit(n); });
  await Promise.all([...srcs].map((s) => loadImage(s)));
}

function exportFilename(ext: string, scope: ExportScope): string {
  const s = useIris.getState();
  let base = s.doc.name;
  if (scope === 'selection' && s.selection.length === 1) {
    const n = s.doc.nodesById[s.selection[0]];
    if (n) base = n.name;
  }
  return `${sanitizeFilename(base)}.${ext}`;
}

export async function exportRaster(
  scope: ExportScope = 'selection',
  scale = 2,
  opts?: { format?: RasterFormat; transparent?: boolean },
): Promise<void> {
  const format = opts?.format ?? 'png';
  const transparent = opts?.transparent ?? false;
  const s = useIris.getState();
  const ids = scope === 'selection' ? s.selection : undefined;
  const bounds = contentBounds(s.doc, s.currentPageId, ids);
  if (!bounds || bounds.w < 0.5 || bounds.h < 0.5) {
    s.toast(scope === 'selection' ? 'Select something to export' : 'Nothing to export on this page');
    return;
  }
  await preloadImages(s.doc, s.currentPageId, ids);
  const w = Math.min(8192, Math.max(1, Math.ceil(bounds.w * scale)));
  const h = Math.min(8192, Math.max(1, Math.ceil(bounds.h * scale)));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    s.toast('Export failed');
    return;
  }
  if (!transparent || format === 'jpg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
  }
  ctx.setTransform(scale, 0, 0, scale, -bounds.x * scale, -bounds.y * scale);
  drawNodes(ctx, s.doc, s.currentPageId, 1, ids && ids.length ? ids : undefined);
  const filename = exportFilename(format, scope);
  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality = format === 'jpg' ? 0.92 : undefined;
  await new Promise<void>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) downloadBlob(blob, filename);
        resolve();
      },
      mime,
      quality,
    );
  });
  s.toast(`Exported ${filename} (${w}×${h})`);
}

/** Backwards-compatible PNG export. */
export async function exportPNG(scope: ExportScope = 'selection', scale = 2, transparent = false): Promise<void> {
  return exportRaster(scope, scale, { format: 'png', transparent });
}

/* ------------------------------------------------------------------ */
/* SVG                                                                 */
/* ------------------------------------------------------------------ */

function esc(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttrNum(v: number): string {
  return String(Math.round(v * 100) / 100);
}

let clipSeq = 0;
let gradSeq = 0;
let filtSeq = 0;
/** svg defs accumulated while serializing (gradients / filters) */
let defsOut: string[] = [];

function dashAttr(n: IrisNode): string {
  const d = dashArray(n.dash, n.strokeWidth);
  if (!d.length) return '';
  return ` stroke-dasharray="${d.map(escAttrNum).join(' ')}"`;
}

function paintDefs(n: IrisNode, indent: string): { fill: string; def?: string } {
  if (!n.fillGradient) return { fill: n.fill ? esc(n.fill) : 'none' };
  const g = n.fillGradient;
  const id = `iris-grad-${gradSeq++}`;
  if (g.type === 'radial') {
    const def = `${indent}<radialGradient id="${id}"><stop offset="0" stop-color="${esc(g.from)}"/><stop offset="1" stop-color="${esc(g.to)}"/></radialGradient>`;
    defsOut.push(def);
    return { fill: `url(#${id})` };
  }
  const l = gradientLine(n.w, n.h, g.angle);
  const def = `${indent}<linearGradient id="${id}" x1="${escAttrNum(l.x1)}" y1="${escAttrNum(l.y1)}" x2="${escAttrNum(l.x2)}" y2="${escAttrNum(l.y2)}"><stop offset="0" stop-color="${esc(g.from)}"/><stop offset="1" stop-color="${esc(g.to)}"/></linearGradient>`;
  defsOut.push(def);
  return { fill: `url(#${id})` };
}

function shadowAttrs(n: IrisNode): { attr: string; def?: string } {
  if (!n.shadow) return { attr: '' };
  const id = `iris-shadow-${filtSeq++}`;
  const def = `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="${escAttrNum(n.shadow.x)}" dy="${escAttrNum(n.shadow.y)}" stdDeviation="${escAttrNum(Math.max(0, n.shadow.blur / 2))}" flood-color="${esc(n.shadow.color)}"/></filter>`;
  defsOut.push(def);
  return { attr: ` filter="url(#${id})"`, def };
}

function blurAttrs(n: IrisNode): { attr: string; def?: string } {
  if (!n.blur) return { attr: '' };
  const id = `iris-blur-${filtSeq++}`;
  const def = `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${escAttrNum(n.blur / 2)}"/></filter>`;
  defsOut.push(def);
  return { attr: ` filter="url(#${id})"` };
}

function blendAttr(n: IrisNode): string {
  return n.blend && n.blend !== 'normal' ? ` style="mix-blend-mode:${n.blend}"` : '';
}

function transformAttr(n: IrisNode): string {
  const parts: string[] = [];
  if (n.x !== 0 || n.y !== 0) parts.push(`translate(${escAttrNum(n.x)} ${escAttrNum(n.y)})`);
  if (n.flipH || n.flipV) parts.push(`translate(${escAttrNum(n.w / 2)} ${escAttrNum(n.h / 2)}) scale(${n.flipH ? -1 : 1} ${n.flipV ? -1 : 1}) translate(${escAttrNum(-n.w / 2)} ${escAttrNum(-n.h / 2)})`);
  if (Math.abs(n.rotation) > 0.001) parts.push(`rotate(${escAttrNum(n.rotation)} ${escAttrNum(n.w / 2)} ${escAttrNum(n.h / 2)})`);
  return parts.length ? ` transform="${parts.join(' ')}"` : '';
}

function nodeToSVG(doc: IrisDoc, n: IrisNode, indent: string): string {
  if (!n.visible) return '';
  const pad = '  ';
  const op = n.opacity < 1 ? ` opacity="${escAttrNum(n.opacity)}"` : '';
  const transform = transformAttr(n);
  const paint = paintDefs(n, indent);
  const fill = paint.fill;
  const stroke = n.stroke ? esc(n.stroke) : 'none';
  const strokeW = n.strokeWidth;
  const strokePart = ` stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}`;
  const shadow = shadowAttrs(n);
  const blur = blurAttrs(n);
  const fx = `${shadow.attr}${blur.attr}`;
  const blend = blendAttr(n);

  if (n.type === 'group') {
    const inner = n.children
      .map((c) => doc.nodesById[c])
      .filter(Boolean)
      .map((c) => nodeToSVG(doc, c as IrisNode, indent + pad))
      .join('\n');
    return `${indent}<g${transform}${op}${fx}${blend}>\n${inner}\n${indent}</g>`;
  }
  if (n.type === 'frame') {
    const clipId = `iris-clip-${clipSeq++}`;
    const inner = n.children
      .map((c) => doc.nodesById[c])
      .filter(Boolean)
      .map((c) => nodeToSVG(doc, c as IrisNode, indent + pad + pad))
      .join('\n');
    const bg = fill !== 'none'
      ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${fill}"${op}${strokePart}${shadow.attr}/>`
      : n.stroke
        ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="none"${strokePart}/>`
        : '';
    const clipDef = `${indent}<defs><clipPath id="${clipId}"><rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}"/></clipPath></defs>\n`;
    const clipAttr = n.clip ? ` clip-path="url(#${clipId})"` : '';
    return `${indent}<g${transform}${op}${clipAttr}${blend}>\n${clipDef}${bg}${inner ? '\n' + inner : ''}\n${indent}</g>`;
  }
  switch (n.type) {
    case 'rect':
      return `${indent}<rect${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    case 'ellipse':
      return `${indent}<ellipse${transform} cx="${escAttrNum(n.w / 2)}" cy="${escAttrNum(n.h / 2)}" rx="${escAttrNum(n.w / 2)}" ry="${escAttrNum(n.h / 2)}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    case 'polygon': {
      const pts = polygonPoints(n).map((p) => `${escAttrNum(p.x)},${escAttrNum(p.y)}`).join(' ');
      return `${indent}<polygon${transform} points="${pts}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    }
    case 'star': {
      const pts = starPointsOf(n).map((p) => `${escAttrNum(p.x)},${escAttrNum(p.y)}`).join(' ');
      return `${indent}<polygon${transform} points="${pts}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    }
    case 'line': {
      const { a, b } = segmentEnds(n);
      return `${indent}<line${transform} x1="${escAttrNum(a.x)}" y1="${escAttrNum(a.y)}" x2="${escAttrNum(b.x)}" y2="${escAttrNum(b.y)}" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}${op}${blend}/>`;
    }
    case 'arrow': {
      const { a, b } = segmentEnds(n);
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const dir = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
      const size = Math.max(8, strokeW * 4.5);
      const parts: string[] = [];
      const shaftB = n.arrowEnd !== 'none' ? { x: b.x - dir.x * size * 0.85, y: b.y - dir.y * size * 0.85 } : b;
      parts.push(
        `${indent}<line${transform} x1="${escAttrNum(a.x)}" y1="${escAttrNum(a.y)}" x2="${escAttrNum(shaftB.x)}" y2="${escAttrNum(shaftB.y)}" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}${op}${blend}/>`,
      );
      const headAt = (tip: Vec, d: Vec): string => {
        if (n.arrowEnd === 'line' || n.arrowStart === 'line') {
          const px = -d.y;
          const py = d.x;
          const back = { x: tip.x - d.x * size * 0.7, y: tip.y - d.y * size * 0.7 };
          return `${indent}<path${transform} d="M ${escAttrNum(back.x + px * size * 0.4)} ${escAttrNum(back.y + py * size * 0.4)} L ${escAttrNum(tip.x)} ${escAttrNum(tip.y)} L ${escAttrNum(back.x - px * size * 0.4)} ${escAttrNum(back.y - py * size * 0.4)}" fill="none" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${op}/>`;
        }
        const px = -d.y;
        const py = d.x;
        const back = { x: tip.x - d.x * size, y: tip.y - d.y * size };
        return `${indent}<path${transform} d="M ${escAttrNum(tip.x)} ${escAttrNum(tip.y)} L ${escAttrNum(back.x + px * size * 0.4)} ${escAttrNum(back.y + py * size * 0.4)} L ${escAttrNum(back.x - px * size * 0.4)} ${escAttrNum(back.y - py * size * 0.4)} Z" fill="${stroke}"${op}/>`;
      };
      if (n.arrowEnd !== 'none') parts.push(headAt(b, dir));
      if (n.arrowStart !== 'none') parts.push(headAt(a, { x: -dir.x, y: -dir.y }));
      return parts.join('\n');
    }
    case 'path': {
      const pts = n.points;
      if (pts.length === 0) return '';
      let d = `M ${escAttrNum(pts[0].x)} ${escAttrNum(pts[0].y)}`;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1];
        const cur = pts[i];
        if (p.hx === 0 && p.hy === 0 && cur.hx === 0 && cur.hy === 0) {
          d += ` L ${escAttrNum(cur.x)} ${escAttrNum(cur.y)}`;
        } else {
          d += ` C ${escAttrNum(p.x + p.hx)} ${escAttrNum(p.y + p.hy)} ${escAttrNum(cur.x - cur.hx)} ${escAttrNum(cur.y - cur.hy)} ${escAttrNum(cur.x)} ${escAttrNum(cur.y)}`;
        }
      }
      if (n.closed) {
        const last = pts[pts.length - 1];
        const first = pts[0];
        d += ` C ${escAttrNum(last.x + last.hx)} ${escAttrNum(last.y + last.hy)} ${escAttrNum(first.x - first.hx)} ${escAttrNum(first.y - first.hy)} ${escAttrNum(first.x)} ${escAttrNum(first.y)} Z`;
      }
      return `${indent}<path${transform} d="${d}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    }
    case 'text': {
      const m = measureText(n);
      const base = firstBaseline(n, m.ascent, m.descent);
      const lineH = n.fontSize * n.lineHeight;
      const anchor = n.textAlign === 'center' ? 'middle' : n.textAlign === 'right' ? 'end' : 'start';
      const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
      const spacing = n.letterSpacing ? ` letter-spacing="${escAttrNum(n.letterSpacing)}"` : '';
      const deco = n.underline && n.strike ? ' line-through underline' : n.underline ? ' underline' : n.strike ? ' line-through' : '';
      const tspans = m.lines
        .map((line, i) => `${indent}  <tspan x="${escAttrNum(x)}" y="${escAttrNum(base + i * lineH)}">${esc(line)}</tspan>`)
        .join('\n');
      return `${indent}<text${transform} font-family="${esc(cssFontFamily(n.fontFamily))}" font-size="${escAttrNum(n.fontSize)}" font-weight="${n.fontWeight}"${spacing}${deco ? ` text-decoration="${deco.trim()}"` : ''} text-anchor="${anchor}" fill="${fill}"${op} xml:space="preserve">\n${tspans}\n${indent}</text>`;
    }
    case 'image': {
      if (!n.src) return '';
      const href = esc(n.src);
      const clipR = n.cornerRadius > 0;
      if (clipR) {
        const clipId = `iris-clip-${clipSeq++}`;
        defsOut.push(`${indent}<clipPath id="${clipId}"><rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}"/></clipPath>`);
        return `${indent}<image${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" href="${href}" clip-path="url(#${clipId})"${op}${blend}/>`;
      }
      return `${indent}<image${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" href="${href}"${op}${blend}/>`;
    }
  }
  return '';
}

export function exportSVG(scope: ExportScope = 'selection'): void {
  const s = useIris.getState();
  const ids = scope === 'selection' ? s.selection : undefined;
  const bounds = contentBounds(s.doc, s.currentPageId, ids);
  if (!bounds || bounds.w < 0.5 || bounds.h < 0.5) {
    s.toast(scope === 'selection' ? 'Select something to export' : 'Nothing to export on this page');
    return;
  }
  const page = s.doc.pagesById[s.currentPageId];
  const roots =
    ids && ids.length
      ? ids.map((id) => s.doc.nodesById[id]).filter(Boolean)
      : (page?.nodeIds ?? []).map((id) => s.doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible);
  clipSeq = 0;
  gradSeq = 0;
  filtSeq = 0;
  defsOut = [];
  const body = roots.map((n) => nodeToSVG(s.doc, n, '  ')).filter(Boolean).join('\n');
  const defs = defsOut.length ? `  <defs>\n${defsOut.map((d) => `  ${d}`).join('\n')}\n  </defs>\n` : '';
  const w = Math.ceil(bounds.w * 100) / 100;
  const h = Math.ceil(bounds.h * 100) / 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${escAttrNum(bounds.x)} ${escAttrNum(bounds.y)} ${w} ${h}">\n${defs}${body}\n</svg>`;
  const filename = exportFilename('svg', scope);
  downloadBlob(svg, filename);
  s.toast(`Exported ${filename}`);
}

/** Re-export helpers used elsewhere. */
export { applyTextCase, regularPath2d, arrowPath2d, nodeWorldAABB };
