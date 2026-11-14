'use client';

/**
 * Canvas host: wires the renderer + tool state machine to a full-size canvas.
 */

import { useEffect, useRef } from 'react';
import { initRenderer } from '../engine/renderer';
import { initTools } from '../engine/tools';
import { TextEditorOverlay } from './TextEditorOverlay';

export function CanvasView() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const disposeRenderer = initRenderer(canvas);
    const disposeTools = initTools(canvas);
    return () => {
      disposeTools();
      disposeRenderer();
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden" aria-label="Design canvas">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: 'none' }}
      />
      <TextEditorOverlay />
    </div>
  );
}
