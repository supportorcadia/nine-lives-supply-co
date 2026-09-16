"use client";
import { useState } from "react";
import Link from "next/link";
import { COLOURWAYS, COLOURWAY_HEX, isUkPhone, sizeForGirth, type Colourway, type Product } from "@/lib/catalogue";
import { useBasket } from "@/lib/basket";

export function BuyControls({ product, compact = false, onColourway }: { product: Product; compact?: boolean; onColourway?: (c: Colourway) => void }) {
  const { add } = useBasket();
  const [colourway, setColourway] = useState<Colourway>("Hi-Vis");
  const [girth, setGirth] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [tag, setTag] = useState<"none" | "brass" | "aluminium">("none");
  const [tagLine1, setTagLine1] = useState("");
  const [tagLine2, setTagLine2] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const g = girth === "" ? null : Number(girth);
  const size = sizeForGirth(g);

  function submit() {
    setError(null);
    if (product.sized && size.kind !== "size") return setError("We need a girth to pick the size.");
    if (product.engraved) {
      if (!line1.trim()) return setError("We won't cut a tag without a number on it.");
      if (!isUkPhone(line1)) return setError("That doesn't look like a UK number. It's the one a stranger will ring.");
    }
    if (tag !== "none") {
      if (!tagLine1.trim()) return setError("We won't cut a tag without a number on it.");
      if (!isUkPhone(tagLine1)) return setError("That doesn't look like a UK number. It's the one a stranger will ring.");
    }
    add({
      no: product.no, qty,
      colourway: product.colourways ? colourway : undefined,
      size: size.kind === "size" ? size.size : undefined,
      girth: size.kind === "size" ? g! : undefined,
      line1: product.engraved ? line1.trim() : undefined,
      line2: product.engraved ? line2.trim() || undefined : undefined,
      metal: product.metal,
    });
    if (tag !== "none") {
      add({ no: tag === "brass" ? "03" : "04", qty: 1, colourway: tag === "aluminium" ? colourway : undefined, line1: tagLine1.trim(), line2: tagLine2.trim() || undefined, metal: tag });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={`buy ${compact ? "buy-compact" : ""}`}>
      {product.colourways && (
        <div className="field">
          <span className="field-label">Colourway — {colourway}</span>
          <div className="swatches" role="radiogroup" aria-label="Colourway">
            {COLOURWAYS.map((c) => (
              <button
                key={c} type="button" role="radio" aria-checked={colourway === c} aria-label={c}
                className={`swatch ${colourway === c ? "is-selected" : ""}`}
                style={{ ["--swatch" as string]: COLOURWAY_HEX[c] }}
                onClick={() => { setColourway(c); onColourway?.(c); }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sized && (
        <div className="field field-girth">
          <label className="field-label" htmlFor={`girth-${product.no}-${compact ? "c" : "p"}`}>Girth, cm</label>
          <div className="girth-row">
            <input
              id={`girth-${product.no}-${compact ? "c" : "p"}`} className="input input-girth" inputMode="decimal" placeholder="e.g. 44"
              value={girth} onChange={(e) => setGirth(e.target.value.replace(/[^\d.]/g, ""))}
            />
            <output className={`girth-readout ${size.kind === "size" ? "is-set" : ""}`}>
              {size.kind === "size" && (size.boundary ? `Size ${size.size}. Between sizes, the smaller one.` : `Size ${size.size} · ${size.min}–${size.max} cm`)}
              {size.kind === "small" && "Under 35 cm: too small for a harness yet. Try a collar and a line."}
              {size.kind === "large" && "Over 56 cm: email us the number and we'll see."}
              {size.kind === "none" && "Type the girth and we'll give you the size."}
            </output>
          </div>
          <p className="hint">Round the chest behind the front legs, twice, asleep. <Link href="/girth">How →</Link></p>
        </div>
      )}

      {product.engraved && (
        <div className="field field-engrave">
          <div className="engrave-head">
            <span className="field-label">Engraving</span>
            <span className="badge">Cut to order · +3 working days</span>
          </div>
          <input className="input" placeholder="Line one, your phone number" inputMode="tel" value={line1} onChange={(e) => setLine1(e.target.value)} aria-label="Line one, your phone number" />
          <input className="input" placeholder="Line two, optional" value={line2} maxLength={18} onChange={(e) => setLine2(e.target.value)} aria-label="Line two, optional" />
        </div>
      )}

      {product.tagAddon && (
        <div className="field field-tag">
          <div className="engrave-head">
            <span className="field-label">Add the tag</span>
            {tag !== "none" && <span className="badge">Cut to order · +3 working days</span>}
          </div>
          <div className="tag-options" role="radiogroup" aria-label="Add the tag">
            {(["none", "brass", "aluminium"] as const).map((t) => (
              <button key={t} type="button" role="radio" aria-checked={tag === t} className={`chip ${tag === t ? "is-selected" : ""}`} onClick={() => setTag(t)}>
                {t === "none" ? "No tag" : t === "brass" ? "03 brass £14" : "04 aluminium £11"}
              </button>
            ))}
          </div>
          {tag !== "none" && (
            <>
              <input className="input" placeholder="Line one, your phone number" inputMode="tel" value={tagLine1} onChange={(e) => setTagLine1(e.target.value)} aria-label="Tag line one, your phone number" />
              <input className="input" placeholder="Line two, optional" value={tagLine2} maxLength={18} onChange={(e) => setTagLine2(e.target.value)} aria-label="Tag line two, optional" />
            </>
          )}
        </div>
      )}

      <div className="buy-row">
        {!compact && (
          <div className="qty" aria-label="Quantity">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer">−</button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)} aria-label="More">+</button>
          </div>
        )}
        <button type="button" className={`btn btn-add ${added ? "is-added" : ""}`} onClick={submit}>
          {added ? "Added" : "Add to basket"}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
