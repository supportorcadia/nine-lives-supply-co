import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";

export const FPS = 30;
const SHOT = 4 * FPS;          // each photograph holds for 4 seconds
const FADE = FPS;              // one-second crossfade
// Each shot can be reframed: `zoom` pushes in, `origin` is the point that stays put while it
// does, so the cat can be placed clear of the headline that sits bottom-left over the film.
type ShotDef = { src: string; zoom?: number; origin?: string };
const SHOTS: ShotDef[] = [
  { src: "media/hero-poster.jpg" },            // the doorstep: first and last, so the loop closes on itself
  { src: "images/env-cat-wall.jpg" },
  { src: "images/env-cat-track.jpg", zoom: 1.5, origin: "2% 100%" },  // cat moved from bottom-centre to right of the headline
  { src: "images/env-cat-shelter.jpg" },
];
export const DURATION = SHOT * SHOTS.length;   // 16 s

// Slow drift on each photograph: a small push in and a few pixels of travel, so the
// hero moves the way the rest of the site does, not like a slideshow.
function Shot({ src, zoom = 1, origin = "50% 50%", index }: ShotDef & { index: number }) {
  const frame = useCurrentFrame();
  const start = index * SHOT;
  const local = frame - start;
  // Wrap the first shot so it also covers the tail of the loop.
  const wrapped = index === 0 && frame > DURATION - FADE ? frame - DURATION : local;
  const t = (wrapped + FADE) / (SHOT + FADE);
  const scale = interpolate(t, [0, 1], [1.06, 1.14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(t, [0, 1], [index % 2 === 0 ? -18 : 18, index % 2 === 0 ? 18 : -18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Each shot fades in over the last second of the previous slot and out over the last
  // second of its own, so the crossfades all happen inside the film, including the one
  // from the last shot back to the first.
  const opacity = interpolate(
    wrapped,
    [-FADE, 0, SHOT - FADE, SHOT],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: origin, transform: `scale(${scale * zoom}) translateX(${x}px)` }}
      />
    </AbsoluteFill>
  );
}

// The tape rule, pulled out along the bottom edge over the whole loop and rewound in the
// last second, so the signature move from the site is in the film too.
function Tape() {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [0, DURATION - FPS, DURATION], [0, 1, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ticks = Array.from({ length: 241 }, (_, i) => i);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, opacity: 0.55 }}>
      <svg width="1920" height="26" style={{ transform: `scaleX(${out})`, transformOrigin: "left" }}>
        <line x1="0" y1="25" x2="1920" y2="25" stroke="#D7FF3F" strokeWidth="2" />
        {ticks.map((i) => (
          <line key={i} x1={i * 8} y1="25" x2={i * 8} y2={i % 10 === 0 ? 1 : i % 5 === 0 ? 11 : 19} stroke="#D7FF3F" strokeWidth={i % 10 === 0 ? 2 : 1} />
        ))}
      </svg>
    </div>
  );
}

export const HeroLoop = () => (
  <AbsoluteFill style={{ backgroundColor: "#140F0B" }}>
    {SHOTS.map((shot, i) => <Shot key={shot.src} {...shot} index={i} />)}
    <Tape />
  </AbsoluteFill>
);
