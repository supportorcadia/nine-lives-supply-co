"use client";
import Link from "next/link";
import { gbp } from "@/lib/catalogue";
import { useBasket } from "@/lib/basket";
import { Frame } from "./Frame";
import { TapeRule } from "./TapeRule";

const money = (n: number) => (Number.isInteger(n) ? gbp(n) : `£${n.toFixed(2)}`);

export function BasketView() {
  const b = useBasket();
  if (!b.loaded) return <main className="page page-basket"><h1 className="h1">Basket</h1></main>;
  if (b.lines.length === 0) {
    return (
      <main className="page page-basket">
        <h1 className="h1">Basket</h1>
        <div className="empty">
          <h2 className="h2">Nothing in it.</h2>
          <p>The whole range is on one page, and the collar is a good place to start.</p>
          <Link href="/gear" className="btn">See everything we make</Link>
        </div>
      </main>
    );
  }
  const total = b.subtotal + b.shippingEstimate;
  return (
    <main className="page page-basket">
      <h1 className="h1">Basket</h1>
      {b.error && <p className="error" role="alert">{b.error}</p>}
      <div className={`basket-grid ${b.busy ? "is-busy" : ""}`}>
        <div className="basket-lines">
          {b.lines.map((l) => {
            const p = l.product;
            return (
              <div key={l.id} className="bline">
                <TapeRule />
                <div className="bline-grid">
                  <Frame id={`${p.no}-object-${l.colourway ? l.colourway.toLowerCase().replace("-", "") : "hivis"}`} fallbackId={`${p.no}-object-hivis`} ratio="1/1" alt={p.name} />
                  <div className="bline-body">
                    <p><span className="num">{p.no}</span> <strong>{p.name}</strong>{l.colourway ? ` — ${l.colourway}` : ""}</p>
                    {l.size && <p className="bline-note">Size {l.size}{l.girth ? `, from a girth of ${l.girth} cm` : ""}. If that's a guess, measure first: it's the only reason harnesses come back.</p>}
                    {p.engraved && <p className="bline-engrave">{l.line1}{l.line2 ? ` / ${l.line2}` : ""} — <span className="badge">cut to order</span></p>}
                    {p.contains && <p className="bline-note">Contains {p.contains.join(", ")}.</p>}
                    <button type="button" className="linkbtn" onClick={() => b.remove(l.id)} disabled={b.busy}>Remove</button>
                  </div>
                  <div className="qty" aria-label="Quantity">
                    <button type="button" onClick={() => b.setQty(l.id, l.qty - 1)} aria-label="Fewer" disabled={b.busy || l.qty <= 1}>−</button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => b.setQty(l.id, l.qty + 1)} aria-label="More" disabled={b.busy}>+</button>
                  </div>
                  <p className="num bline-price">{money(l.total)}</p>
                </div>
              </div>
            );
          })}
          <TapeRule />
        </div>
        <aside className="basket-side">
          {b.hasEngraved && (
            <p className="notice">There's an engraved tag in here. Cutting it adds three working days before the parcel leaves Kirkwall. Everything in this order waits for it.</p>
          )}
          {b.hasCollarWithoutTag && (
            <p className="notice notice-nudge">No tag on the collar. Add one now — <Link href="/gear/flag-tag-brass">03 brass £14</Link> · <Link href="/gear/ayre-tag-aluminium">04 aluminium £11</Link> — or they go out with your number on nothing.</p>
          )}
          <table className="spec totals">
            <tbody>
              <tr><th scope="row">Items</th><td className="num">{money(b.subtotal)}</td></tr>
              <tr><th scope="row">Posted from Kirkwall</th><td>{b.shippingEstimate === 0 ? "free" : `£${b.shippingEstimate.toFixed(2)}`}{b.shippingEstimate !== 0 && <span className="hint-inline"> · free over £60</span>}</td></tr>
              <tr className="totals-total"><th scope="row">Total</th><td className="num">{money(total)}</td></tr>
            </tbody>
          </table>
          {b.checkoutUrl ? (
            <a href={b.checkoutUrl} className="btn btn-add btn-block">Go to checkout</a>
          ) : (
            <span className="btn btn-add btn-block" aria-disabled="true">Go to checkout</span>
          )}
          <p className="hint">Checkout is handled by Shopify. UK addresses only, in pounds. Postage is confirmed there.</p>
          <p className="hint"><Link href="/gear">← Back to the shop</Link></p>
        </aside>
      </div>
    </main>
  );
}
