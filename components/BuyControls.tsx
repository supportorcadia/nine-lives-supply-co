"use client";
import { useState } from "react";
import Link from "next/link";
import { COLOURWAYS, COLOURWAY_HEX, isUkPhone, sizeForGirth, type Colourway, type Product } from "@/lib/catalogue";
import { useBasket, ATTR } from "@/lib/basket";
import { useShop } from "@/lib/shop-context";
import { pickVariant } from "@/lib/shop";
import type { AddLine } from "@/lib/cart-actions";

export function BuyControls({ product, compact = false, onColourway }: { product: Product; compact?: boolean; onColourway?: (c: Colourway) => void }) {
  const { add, busy } = useBasket();
  const shop = useShop();
  const live = shop.byNo(product.no);
  const brassTag = shop.byNo("03");
  const aluTag = shop.byNo("04");
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

  async function submit() {
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
    if (!live || !live.live) return setError("This isn't in the shop yet. Email us and we'll sort it by hand.");
    const chosenSize = size.kind === "size" ? size.size : undefined;
    const variant = pickVariant(live, product.colourways ? colourway : undefined, chosenSize);
    if (!variant) return setError("That combination isn't available. Try another colour or check the girth.");
    if (!variant.available) return setError("That one's out of stock for the moment. Try another colour, or email us.");

    const attributes: { key: string; value: string }[] = [];
    if (chosenSize && g !== null) attributes.push({ key: ATTR.girth, value: String(g) });
    if (product.engraved) {
      attributes.push({ key: ATTR.line1, value: line1.trim() });
      if (line2.trim()) attributes.push({ key: ATTR.line2, value: line2.trim() });
    }
    const lines: AddLine[] = [{ merchandiseId: variant.id, quantity: qty, attributes }];

    if (tag !== "none") {
      const tagProduct = tag === "brass" ? brassTag : aluTag;
      const tagVariant = tagProduct && tagProduct.live ? pickVariant(tagProduct, tag === "aluminium" ? colourway : undefined) : undefined;
      if (!tagVariant) return setError("The tag isn't in the shop yet. Add the collar now and the tag from its own page.");
      const tagAttrs: { key: string; value: string }[] = [{ key: ATTR.line1, value: tagLine1.trim() }];
      if (tagLine2.trim()) tagAttrs.push({ key: ATTR.line2, value: tagLine2.trim() });
      lines.push({ merchandiseId: tagVariant.id, quantity: 1, attributes: tagAttrs });
    }

    const ok = await add(lines);
    if (!ok) return setError("The basket didn't take that. Try once more.");
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
                {t === "none" ? "No tag" : t === "brass" ? `03 brass £${brassTag?.price ?? 14}` : `04 aluminium £${aluTag?.price ?? 11}`}
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
        <button type="button" className={`btn btn-add ${added ? "is-added" : ""}`} onClick={submit} disabled={busy}>
          {added ? "Added" : busy ? "Adding…" : "Add to basket"}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
