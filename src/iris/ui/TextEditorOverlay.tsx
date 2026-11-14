'use client';

/**
 * On-canvas text editing overlay: a transparent textarea positioned,
 * scaled and rotated to match the text node.
 */

import { useEffect, useRef, type CSSProperties } from 'react';
import { useIris } from '../engine/store';
import {
  RULER,
  cssFontFamily,
  mApply,
  measureText,
  nodeWorldMatrix,
  worldToScreen,
} from '../engine/geometry';

export function TextEditorOverlay() {
  const editingTextId = useIris((s) => s.editingTextId);
  const doc = useIris((s) => s.doc);
  const viewport = useIris((s) => s.viewport);
  const rulers = useIris((s) => s.viewFlags.rulers);
  const ref = useRef<HTMLTextAreaElement>(null);

  const node = editingTextId ? doc.nodesById[editingTextId] : null;

  useEffect(() => {
    if (!node || node.type !== 'text') return;
    const id = node.id;
    const initialText = node.text;
    const start = Date.now();
    const st = useIris.getState();
    st.historyBegin();
    const ta = ref.current;
    if (ta) {
      ta.focus();
      ta.select();
    }
    return () => {
      const s2 = useIris.getState();
      const n = s2.doc.nodesById[id];
      const elapsed = Date.now() - start;
      const changed = !!n && n.text !== initialText;
      // guard against React strict-mode double-mount remounts
      if (elapsed < 80 && !changed) {
        return;
      }
      if (n && n.type === 'text' && n.text.trim().length > 0) {
        s2.historyCommit();
      } else if (n) {
        s2.historyCancel();
        s2.deleteNodes([id]);
      } else {
        s2.historyCancel();
      }
    };
  }, [editingTextId]);

  if (!node || node.type !== 'text') return null;

  const W = nodeWorldMatrix(doc, node);
  const tl = mApply(W, 0, 0);
  const origin = rulers ? RULER : 0;
  const p = worldToScreen(viewport, tl.x, tl.y);
  const angleDeg = (Math.atan2(W.b, W.a) * 180) / Math.PI;
  const width = Math.max(node.w, 2) * viewport.zoom;
  const height = Math.max(node.h, node.fontSize * node.lineHeight) * viewport.zoom;

  const style: CSSProperties = {
    left: p.x + origin,
    top: p.y + origin,
    width,
    minHeight: height,
    transform: angleDeg ? `rotate(${angleDeg}deg)` : undefined,
    fontFamily: cssFontFamily(node.fontFamily),
    fontSize: node.fontSize * viewport.zoom,
    fontWeight: node.fontWeight,
    lineHeight: `${node.fontSize * node.lineHeight * viewport.zoom}px`,
    textAlign: node.textAlign,
    color: node.fill ?? '#000000',
    caretColor: '#8B5CF6',
  };

  return (
    <textarea
      ref={ref}
      className="iris-text-overlay"
      style={style}
      value={node.text}
      onChange={(e) => {
        const st = useIris.getState();
        const text = e.target.value;
        const n = st.doc.nodesById[st.editingTextId ?? ''];
        if (!n || n.type !== 'text') return;
        const m = measureText({ ...n, text });
        st.updateNodes(
          [n.id],
          {
            text,
            ...(n.autoWidth ? { w: Math.max(2, Math.ceil(m.width) + 2) } : {}),
            h: Math.max(1, Math.ceil(m.height)),
          },
          { history: false },
        );
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          useIris.getState().setEditingText(null);
        }
        e.stopPropagation();
      }}
      onBlur={() => useIris.getState().setEditingText(null)}
      spellCheck={false}
      aria-label="Edit text"
    />
  );
}
