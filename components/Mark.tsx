// The Nine Lives mark: a heavy 9 that is also a cat. The bowl is the head, with two ears
// rising off it; the tail is a cat's tail, curling back the way a sitting cat's does.
// Drawn as strokes so it stays the same weight at any size.
// `stencil` cuts bridges through the strokes, the way a spray stencil has to.
const CX = 47;
const CY = 48;
const R = 24;

export function Mark({
  size = 28,
  color = "currentColor",
  stencil = false,
  bridge = "var(--night)",
  className = "",
}: {
  size?: number;
  color?: string;
  stencil?: boolean;
  bridge?: string;
  className?: string;
}) {
  return (
    <svg
      className={`mark ${className}`}
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      aria-hidden="true"
      focusable="false"
    >
      {/* ears: filled triangles whose bases sit inside the ring's stroke */}
      <g fill={color}>
        <path d="M28.6 32.6 L24 3 L43.5 24.2 Z" />
        <path d="M65.4 32.6 L70 3 L50.5 24.2 Z" />
      </g>
      <g fill="none" stroke={color} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round">
        {/* head: the bowl of the 9 */}
        <circle cx={CX} cy={CY} r={R} />
        {/* tail: down the right side, sweeping left, the tip hooking up */}
        <path d={`M${CX + R} ${CY} C${CX + R} 78 69 100 56 114 C48 122.5 35 122 30 112`} />
      </g>
      {stencil && (
        <g stroke={bridge} strokeWidth="5" strokeLinecap="butt">
          {/* stencil bridges: through the head, across the tail, through one ear */}
          <line x1="8" y1="58" x2="42" y2="42" />
          <line x1="86" y1="82" x2="56" y2="90" />
          <line x1="60" y1="12" x2="76" y2="18" />
        </g>
      )}
    </svg>
  );
}
