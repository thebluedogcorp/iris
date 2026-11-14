'use client';

/**
 * Export dialog: scope (selection / page), format (PNG / SVG), PNG scale,
 * a size estimate, and the export action itself.
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useIris } from '../engine/store';
import { exportPNG, exportSVG, type ExportScope } from '../engine/export';
import { boundsOfNodes } from '../engine/geometry';

type ExportFormat = 'png' | 'svg';
type ExportScale = 1 | 2;

interface SegOption<T extends string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

/** Figma-style segmented control. */
function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  'aria-label': ariaLabel,
}: {
  value: T;
  options: SegOption<T>[];
  onChange: (v: T) => void;
  'aria-label': string;
}) {
  return (
    <div className="flex rounded-md border border-[#3E3E3E] p-0.5" role="radiogroup" aria-label={ariaLabel}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={o.disabled}
            className={`h-7 flex-1 rounded text-[11px] transition-colors disabled:pointer-events-none disabled:opacity-40 ${
              active
                ? 'bg-[#8B5CF6] text-white'
                : 'text-[#C9C9C9] hover:bg-[#383838] hover:text-white'
            }`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Dialog body. Radix unmounts dialog content while closed, so this mounts
 * fresh on every open and the useState initializers re-derive the defaults
 * ("selection" scope when something is selected, otherwise "page").
 */
function ExportDialogBody() {
  const setExportOpen = useIris((s) => s.setExportOpen);
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);

  const [scope, setScope] = useState<ExportScope>(() =>
    useIris.getState().selection.length > 0 ? 'selection' : 'page',
  );
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState<ExportScale>(2);

  const hasSelection = selection.length > 0;
  /* never stay on "selection" when the selection vanished mid-dialog */
  const effectiveScope: ExportScope = scope === 'selection' && !hasSelection ? 'page' : scope;

  const page = doc.pagesById[currentPageId];
  const bounds =
    effectiveScope === 'selection'
      ? boundsOfNodes(doc, selection)
      : page
        ? boundsOfNodes(doc, page.nodeIds)
        : null;
  const hasContent = !!bounds && bounds.w > 0.5 && bounds.h > 0.5;
  const effScale = format === 'png' ? scale : 1;

  const doExport = (): void => {
    if (!hasContent) return;
    if (format === 'png') void exportPNG(effectiveScope, scale);
    else exportSVG(effectiveScope);
    setExportOpen(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-[13px] font-semibold text-white">Export</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1 text-[11px] text-[#9A9A9A]">Scope</p>
          <Segmented
            aria-label="Export scope"
            value={effectiveScope}
            onChange={setScope}
            options={[
              { value: 'selection', label: 'Selection', disabled: !hasSelection },
              { value: 'page', label: 'Page' },
            ]}
          />
        </div>

        <div>
          <p className="mb-1 text-[11px] text-[#9A9A9A]">Format</p>
          <Segmented
            aria-label="Export format"
            value={format}
            onChange={setFormat}
            options={[
              { value: 'png', label: 'PNG' },
              { value: 'svg', label: 'SVG' },
            ]}
          />
        </div>

        {format === 'png' && (
          <div>
            <p className="mb-1 text-[11px] text-[#9A9A9A]">Scale</p>
            <Segmented
              aria-label="Export scale"
              value={scale}
              onChange={setScale}
              options={[
                { value: 1, label: '1x' },
                { value: 2, label: '2x' },
              ]}
            />
          </div>
        )}

        <p className="text-[11px] text-[#9A9A9A]">
          {hasContent && bounds
            ? `≈ ${Math.ceil(bounds.w * effScale)} × ${Math.ceil(bounds.h * effScale)} px`
            : 'Nothing to export'}
        </p>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          className="h-8 rounded-md px-4 text-[12px] text-[#C9C9C9] hover:bg-[#383838] hover:text-white"
          onClick={() => setExportOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="h-8 rounded-md bg-[#8B5CF6] px-4 text-[12px] text-white hover:bg-[#7C3AED]"
          disabled={!hasContent}
          onClick={doExport}
        >
          Export
        </Button>
      </DialogFooter>
    </>
  );
}

export function ExportDialog() {
  const exportOpen = useIris((s) => s.exportOpen);
  const setExportOpen = useIris((s) => s.setExportOpen);

  return (
    <Dialog open={exportOpen} onOpenChange={(o) => setExportOpen(o)}>
      <DialogContent className="gap-3 border-[#4E4E4E] bg-[#2C2C2C] p-4 text-white sm:max-w-[360px]">
        <ExportDialogBody />
      </DialogContent>
    </Dialog>
  );
}
