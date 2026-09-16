"use client";
import { useEffect, useRef, useState } from "react";

// Full-bleed hero background. Plays /media/hero.mp4 when the file exists, over the
// poster image /media/hero-poster.jpg. Until either exists, shows the labelled frame.
export function HeroMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasPoster, setHasPoster] = useState(false);

  useEffect(() => {
    fetch("/media/hero-poster.jpg", { method: "HEAD" }).then((r) => setHasPoster(r.ok)).catch(() => {});
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    fetch("/media/hero.mp4", { method: "HEAD" }).then((r) => setHasVideo(r.ok && (r.headers.get("content-type") || "").includes("video"))).catch(() => {});
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      {hasPoster && <img className="hero-poster" src="/media/hero-poster.jpg" alt="" />}
      {hasVideo && (
        <video ref={ref} className="hero-video" autoPlay muted loop playsInline poster={hasPoster ? "/media/hero-poster.jpg" : undefined}>
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      )}
      {!hasPoster && !hasVideo && (
        <div className="frame hero-frame"><span className="frame-label">hero-video · poster hero-cat-door · 16:9</span></div>
      )}
      <div className="hero-shade" />
    </div>
  );
}
