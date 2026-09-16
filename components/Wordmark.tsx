import Link from "next/link";
import { Mark } from "./Mark";

// One lock-up, two sizes: the stencil-cut mark with the name stacked beside it.
// The bridges are cut in the background colour of wherever it sits.
export function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" className={`wordmark wordmark-${size}`} aria-label="Nine Lives Supply Co. Home">
      <Mark size={lg ? 72 : 30} color="var(--hivis)" stencil bridge={lg ? "var(--night)" : "var(--ground)"} className="wordmark-mark" />
      <span className="wordmark-words">
        <span className="wordmark-main">NINE LIVES</span>
        <span className="wordmark-sub">SUPPLY CO.</span>
      </span>
    </Link>
  );
}
