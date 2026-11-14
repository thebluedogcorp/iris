'use client';

import dynamic from 'next/dynamic';

const Gate = dynamic(() => import('@/iris/ui/AppGate'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1E1E]">
      <div className="flex flex-col items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true">
          <g fill="#8B5CF6">
            <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
            <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
            <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
          </g>
          <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
        </svg>
        <p className="text-[12px] text-[#9A9A9A]">Loading Iris…</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return <Gate />;
}
