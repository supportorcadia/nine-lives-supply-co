import { AbsoluteFill, staticFile } from "remotion";
import { Mark } from "../components/Mark";

// Stills for Shopify's checkout: the lock-up as a transparent PNG, and a tape-rule band.
const HIVIS = "#D7FF3F";
const CREAM = "#F2EAD9";

const FONT = `@font-face { font-family: "ArchivoVar"; src: url("${staticFile("fonts/archivo.woff2")}") format("woff2"); font-weight: 100 900; font-stretch: 62% 125%; }`;

export const Logo = () => (
  <AbsoluteFill style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 28, padding: "0 20px", fontFamily: "ArchivoVar, Archivo, 'Helvetica Neue', Arial, sans-serif" }}>
    <style>{FONT}</style>
    <Mark size={150} color={HIVIS} stencil bridge="#1E1712" />
    <div style={{ display: "grid", gap: 6, lineHeight: 1 }}>
      <div style={{ color: HIVIS, fontWeight: 900, fontSize: 132, letterSpacing: "-0.02em", fontVariationSettings: '"wdth" 112' }}>NINE LIVES</div>
      <div style={{ color: CREAM, fontWeight: 500, fontSize: 58, letterSpacing: "0.02em" }}>SUPPLY CO.</div>
    </div>
  </AbsoluteFill>
);

// A tape rule: baseline plus ticks every 8 px, taller every 40 and 80, in twine on peat.
export const TapeBand = () => {
  const W = 2400, H = 36;
  const ticks = Array.from({ length: W / 8 + 1 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ background: "#1E1712" }}>
      <svg width={W} height={H}>
        <line x1={0} y1={H - 1} x2={W} y2={H - 1} stroke="#6B594A" strokeWidth={2} />
        {ticks.map((i) => (
          <line key={i} x1={i * 8} y1={H - 1} x2={i * 8} y2={i % 10 === 0 ? 2 : i % 5 === 0 ? 12 : 24} stroke="#6B594A" strokeWidth={i % 10 === 0 ? 2 : 1} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
