"use client";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/catalogue";

export function IndexRail() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="index" aria-label="Manifest index">
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id} className={active === s.id ? "is-active" : ""}>
            <a href={`#${s.id}`}>
              <span className="index-range">{s.range}</span>
              <span className="index-title">{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
