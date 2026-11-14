'use client';

/**
 * Iris brand mark + wordmark for the marketing surfaces. The three-petal
 * iris flower is the product logo (also used inside the studio) — it is
 * drawn as inline SVG so it stays crisp at any size and inherits `color`.
 */

export function IrisMark({
  size = 24,
  className = '',
  color = '#8B5CF6',
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill={color}>
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
      </g>
      <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** Mark + “Iris” wordmark lockup used in the navbar, auth page and footer. */
export function IrisLogo({
  size = 26,
  dark = false,
  className = '',
}: {
  size?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <IrisMark size={size} />
      <span
        className="font-display text-[1.35rem] font-semibold leading-none tracking-tight"
        style={{ color: dark ? '#FFFFFF' : '#1B1712' }}
      >
        Iris
      </span>
    </span>
  );
}
