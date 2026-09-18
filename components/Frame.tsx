"use client";
import { useEffect, useRef, useState } from "react";
import manifest from "@/lib/image-manifest.json";

const KNOWN = new Set<string>(manifest as string[]);

// Image slot. Shows /public/images/<id>.jpg when it exists. If `fallbackId` is given and the
// file is missing, tries that instead. If `optional`, renders nothing when no file exists.
// Otherwise shows a labelled frame so a missing image is obvious in the audit.
export function Frame({ id, ratio, className = "", alt = "", fallbackId, optional = false }:
  { id: string; ratio: string; className?: string; alt?: string; fallbackId?: string; optional?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  // Decide up front from the manifest, so we never request a photograph that doesn't exist.
  const pick = (want: string) => (KNOWN.has(want) ? want : fallbackId && KNOWN.has(fallbackId) ? fallbackId : null);
  const first = pick(id);
  const [src, setSrc] = useState(first ?? id);
  const [state, setState] = useState<"pending" | "ok" | "missing">(first ? "pending" : "missing");

  useEffect(() => { const s = pick(id); setSrc(s ?? id); setState(s ? "pending" : "missing"); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const img = ref.current;
    if (!img || state !== "pending") return;
    if (img.complete) { if (img.naturalWidth > 0) setState("ok"); else fail(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, state]);

  function fail() {
    if (fallbackId && src !== fallbackId) { setSrc(fallbackId); setState("pending"); }
    else setState("missing");
  }

  if (state === "missing" && optional) return null;

  return (
    <div className={`frame frame-${state} ${className}`} style={{ aspectRatio: ratio }} aria-label={alt || `Image ${id}`}>
      {state !== "missing" && (
        <img
          key={src}
          ref={ref}
          className="frame-img"
          src={`/images/${src}.jpg`}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("ok")}
          onError={fail}
        />
      )}
      {state === "missing" && (
        <>
          <span className="frame-label">{id}</span>
          <span className="frame-ratio">{ratio.replace("/", ":")}</span>
        </>
      )}
    </div>
  );
}
