/**
 * Iris export: PNG (offscreen canvas, 1x/2x) and SVG serialization.
 */

import { ID, IrisDoc, IrisNode } from './model';
import { Rect, boundsOfNodes, firstBaseline, measureText, nodeWorldAABB, cssFontFamily } from './geometry';
import { useIris } from './store';
import { drawNodes } from './renderer';
import { loadImage } from './imageCache';

export type ExportScope = 'selection' | 'page';

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
    // include children of hidden roots? no — visible roots only
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

export async function exportPNG(scope: ExportScope = 'selection', scale = 2): Promise<void> {
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
  ctx.setTransform(scale, 0, 0, scale, -bounds.x * scale, -bounds.y * scale);
  drawNodes(ctx, s.doc, s.currentPageId, 1, ids && ids.length ? ids : undefined);
  const filename = exportFilename('png', scope);
  await new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, filename);
      resolve();
    }, 'image/png');
  });
  s.toast(`Exported ${filename} (${w}×${h})`);
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

function nodeToSVG(doc: IrisDoc, n: IrisNode, indent: string): string {
  if (!n.visible) return '';
  const pad = '  ';
  const op = n.opacity < 1 ? ` opacity="${escAttrNum(n.opacity)}"` : '';
  const transform =
    Math.abs(n.rotation) > 0.001
      ? ` transform="translate(${escAttrNum(n.x)} ${escAttrNum(n.y)}) rotate(${escAttrNum(n.rotation)} ${escAttrNum(n.w / 2)} ${escAttrNum(n.h / 2)})"`
      : n.x !== 0 || n.y !== 0
        ? ` transform="translate(${escAttrNum(n.x)} ${escAttrNum(n.y)})"`
        : '';
  const fill = n.fill ?? 'none';
  const stroke = n.stroke ?? 'none';
  const strokeW = n.strokeWidth;

  if (n.type === 'group') {
    const inner = n.children
      .map((c) => doc.nodesById[c])
      .filter(Boolean)
      .map((c) => nodeToSVG(doc, c as IrisNode, indent + pad))
      .join('\n');
    return `${indent}<g${transform}${op}>\n${inner}\n${indent}</g>`;
  }
  if (n.type === 'frame') {
    const clipId = `iris-clip-${clipSeq++}`;
    const inner = n.children
      .map((c) => doc.nodesById[c])
      .filter(Boolean)
      .map((c) => nodeToSVG(doc, c as IrisNode, indent + pad + pad))
      .join('\n');
    const bg =
      n.fill && n.cornerRadius > 0
        ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}" fill="${esc(fill)}"${op} stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`
        : n.fill
          ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" fill="${esc(fill)}"${op} stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`
          : n.stroke
            ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" fill="none" stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`
            : '';
    const clipDef = `${indent}<defs><clipPath id="${clipId}"><rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}"/></clipPath></defs>\n`;
    const clipAttr = n.clip ? ` clip-path="url(#${clipId})"` : '';
    return `${indent}<g${transform}${op}${clipAttr}>\n${clipDef}${bg}${inner ? '\n' + inner : ''}\n${indent}</g>`;
  }
  switch (n.type) {
    case 'rect':
      return `${indent}<rect${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${esc(fill)}"${op} stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`;
    case 'ellipse':
      return `${indent}<ellipse${transform} cx="${escAttrNum(n.w / 2)}" cy="${escAttrNum(n.h / 2)}" rx="${escAttrNum(n.w / 2)}" ry="${escAttrNum(n.h / 2)}" fill="${esc(fill)}"${op} stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`;
    case 'line': {
      const [x1, y1, x2, y2] = n.flip ? [n.w, 0, 0, n.h] : [0, 0, n.w, n.h];
      return `${indent}<line${transform} x1="${escAttrNum(x1)}" y1="${escAttrNum(y1)}" x2="${escAttrNum(x2)}" y2="${escAttrNum(y2)}" stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"${op}/>`;
    }
    case 'path': {
      const pts = n.points;
      if (pts.length === 0) return '';
      let d = `M ${escAttrNum(pts[0].x)} ${escAttrNum(pts[0].y)}`;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1];
        const c = pts[i];
        d += ` C ${escAttrNum(p.x + p.hx)} ${escAttrNum(p.y + p.hy)} ${escAttrNum(c.x - c.hx)} ${escAttrNum(c.y - c.hy)} ${escAttrNum(c.x)} ${escAttrNum(c.y)}`;
      }
      if (n.closed) {
        const last = pts[pts.length - 1];
        const first = pts[0];
        d += ` C ${escAttrNum(last.x + last.hx)} ${escAttrNum(last.y + last.hy)} ${escAttrNum(first.x - first.hx)} ${escAttrNum(first.y - first.hy)} ${escAttrNum(first.x)} ${escAttrNum(first.y)} Z`;
      }
      return `${indent}<path${transform} d="${d}" fill="${esc(fill)}"${op} stroke="${esc(stroke)}" stroke-width="${escAttrNum(strokeW)}"/>`;
    }
    case 'text': {
      const m = measureText(n);
      const base = firstBaseline(n, m.ascent, m.descent);
      const lineH = n.fontSize * n.lineHeight;
      const anchor = n.textAlign === 'center' ? 'middle' : n.textAlign === 'right' ? 'end' : 'start';
      const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
      const tspans = m.lines
        .map((line, i) => `${indent}  <tspan x="${escAttrNum(x)}" y="${escAttrNum(base + i * lineH)}">${esc(line)}</tspan>`)
        .join('\n');
      return `${indent}<text${transform} font-family="${esc(cssFontFamily(n.fontFamily))}" font-size="${escAttrNum(n.fontSize)}" font-weight="${n.fontWeight}" text-anchor="${anchor}" fill="${esc(fill)}"${op} xml:space="preserve">\n${tspans}\n${indent}</text>`;
    }
    case 'image': {
      if (!n.src) return '';
      const href = esc(n.src);
      return `${indent}<image${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" href="${href}"${op}/>`;
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
  const body = roots.map((n) => nodeToSVG(s.doc, n, '  ')).filter(Boolean).join('\n');
  const w = Math.ceil(bounds.w * 100) / 100;
  const h = Math.ceil(bounds.h * 100) / 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${escAttrNum(bounds.x)} ${escAttrNum(bounds.y)} ${w} ${h}">\n${body}\n</svg>`;
  const filename = exportFilename('svg', scope);
  downloadBlob(svg, filename);
  s.toast(`Exported ${filename}`);
}
