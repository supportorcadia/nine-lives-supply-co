"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/*
 Motion budget (docs/art-direction.md, Phase 8): three effects, all tied to scroll.
 1. Signature: every tape rule is pulled out like a tape measure as it enters view (scaleX, scrubbed).
 2. Ambient: image frames and manifest rows rise 12px and fade in on entering view (300 ms, ease-out).
 3. Hero: the poster drifts up slowly as you scroll past it (parallax, scrubbed).
 Never moves: wordmark, prices, buttons, spec tables, girth readout, basket totals.
 prefers-reduced-motion: nothing here runs; Lenis is not started.
*/
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Signature: tape rules pulled out.
      gsap.utils.toArray<HTMLElement>(".rule").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: "left center" }, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 70%", scrub: true },
        });
      });
      // 2. Ambient: frames and rows rise in.
      gsap.utils.toArray<HTMLElement>(".frame:not(.hero-frame), .row, .card, .offer, .girth-tease-text").forEach((el) => {
        gsap.fromTo(el, { y: 12, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.3, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      // 3. Hero drift.
      const hero = document.querySelector<HTMLElement>(".hero-media");
      if (hero) {
        gsap.to(hero, { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      }
    });

    // Anchor links inside the page go through Lenis.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href")!);
      if (target) { e.preventDefault(); lenis.scrollTo(target as HTMLElement, { offset: -24 }); }
    };
    document.addEventListener("click", onClick);
    if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => lenis.scrollTo(t as HTMLElement, { offset: -24, immediate: true }), 50); }

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
