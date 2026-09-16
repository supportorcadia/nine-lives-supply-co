"use client";
import { useState } from "react";
import { sizeForGirth } from "@/lib/catalogue";

export function GirthTry() {
  const [g, setG] = useState("");
  const r = sizeForGirth(g === "" ? null : Number(g));
  return (
    <div className="girth-try">
      <label className="field-label" htmlFor="girth-try">Try it — girth, cm</label>
      <div className="girth-row">
        <input id="girth-try" className="input input-girth" inputMode="decimal" placeholder="e.g. 44" value={g} onChange={(e) => setG(e.target.value.replace(/[^\d.]/g, ""))} />
        <output className={`girth-readout ${r.kind === "size" ? "is-set" : ""}`}>
          {r.kind === "size" && (r.boundary ? `Size ${r.size}. Between sizes, the smaller one.` : `Size ${r.size} · ${r.min}–${r.max} cm`)}
          {r.kind === "small" && "Under 35 cm: too small for a harness yet. Try a collar and a line."}
          {r.kind === "large" && "Over 56 cm: email us the number and we'll see."}
          {r.kind === "none" && "Type the girth and we'll give you the size."}
        </output>
      </div>
    </div>
  );
}
