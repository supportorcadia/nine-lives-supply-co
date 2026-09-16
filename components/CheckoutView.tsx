"use client";
import { useState } from "react";
import Link from "next/link";
import { byNo, gbp } from "@/lib/catalogue";
import { useBasket } from "@/lib/basket";
import { TapeRule } from "./TapeRule";

export function CheckoutView() {
  const b = useBasket();
  const [postcode, setPostcode] = useState("");
  const [delivery, setDelivery] = useState<"mainland" | "islands">("mainland");
  const [stub, setStub] = useState(false);
  const total = b.subtotal + b.shipping;
  const nonUk = postcode.trim().length > 0 && !/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(postcode.trim());

  return (
    <main className="page page-checkout">
      <h1 className="h1">Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setStub(true); }}>
          <section className="cstep">
            <h2 className="h2"><span className="num">1</span> Address</h2>
            <div className="field"><label className="field-label" htmlFor="name">Name</label><input id="name" className="input" required /></div>
            <div className="field"><label className="field-label" htmlFor="email">Email</label><input id="email" className="input" type="email" required /></div>
            <div className="field"><label className="field-label" htmlFor="addr">Address</label><input id="addr" className="input" required /></div>
            <div className="field-pair">
              <div className="field"><label className="field-label" htmlFor="town">Town</label><input id="town" className="input" required /></div>
              <div className="field"><label className="field-label" htmlFor="pc">Postcode</label><input id="pc" className="input" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
                {nonUk && <p className="error">We only post within the UK. Sorry.</p>}
              </div>
            </div>
          </section>
          <TapeRule />
          <section className="cstep">
            <h2 className="h2"><span className="num">2</span> Delivery</h2>
            <div className="options" role="radiogroup">
              <label className={`option ${delivery === "mainland" ? "is-selected" : ""}`}>
                <input type="radio" name="d" checked={delivery === "mainland"} onChange={() => setDelivery("mainland")} />
                <span><strong>Mainland</strong> — 2–3 working days after dispatch</span>
              </label>
              <label className={`option ${delivery === "islands" ? "is-selected" : ""}`}>
                <input type="radio" name="d" checked={delivery === "islands"} onChange={() => setDelivery("islands")} />
                <span><strong>Highlands, Islands, NI</strong> — 3–5 working days, longer if the boat's off</span>
              </label>
            </div>
            {b.hasEngraved && <p className="notice">There's an engraved tag in this order. Cutting it adds three working days before anything leaves Kirkwall.</p>}
          </section>
          <TapeRule />
          <section className="cstep">
            <h2 className="h2"><span className="num">3</span> Payment</h2>
            <div className="field"><label className="field-label" htmlFor="card">Card number</label><input id="card" className="input" inputMode="numeric" placeholder="0000 0000 0000 0000" /></div>
            <div className="field-pair">
              <div className="field"><label className="field-label" htmlFor="exp">Expiry</label><input id="exp" className="input" placeholder="MM / YY" /></div>
              <div className="field"><label className="field-label" htmlFor="cvc">CVC</label><input id="cvc" className="input" placeholder="123" /></div>
            </div>
            <button type="submit" className="btn btn-add btn-block" disabled={b.lines.length === 0}>Pay £{total.toFixed(2)}</button>
            {stub && (
              <p className="notice">Payment isn't wired up in this build. <Link href="/order/confirmed">See what the confirmation looks like →</Link></p>
            )}
          </section>
        </form>
        <aside className="checkout-side">
          <h2 className="h3">Order</h2>
          <ul className="osummary">
            {b.lines.map((l) => { const p = byNo(l.no); return (
              <li key={l.key}><span className="num">{p.no}</span> {p.name}{l.colourway ? `, ${l.colourway}` : ""}{l.size ? `, size ${l.size}` : ""} × {l.qty} <span className="num">{gbp(p.price * l.qty)}</span></li>
            ); })}
            {b.lines.length === 0 && <li>Nothing in the basket. <Link href="/gear">Back to the shop</Link></li>}
          </ul>
          <TapeRule />
          <p className="osummary-total"><span>Posted from Kirkwall</span><span>{b.shipping === 0 ? "free" : `£${b.shipping.toFixed(2)}`}</span></p>
          <p className="osummary-total osummary-grand"><span>Total</span><span className="num">£{total.toFixed(2)}</span></p>
        </aside>
      </div>
    </main>
  );
}
