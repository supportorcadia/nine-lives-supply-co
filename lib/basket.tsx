"use client";
// The basket is a Shopify cart. This context loads it once, then replaces it with whatever
// each Server Action returns. Line details the site needs (product number, colourway,
// size, girth, engraving) are read back from the variant's options and the line attributes.

import { createContext, useContext, useEffect, useMemo, useState, useTransition } from "react";
import { PRODUCTS, type Colourway, type Product } from "./catalogue";
import { addLines, getCart, removeLine, updateLine, type AddLine } from "./cart-actions";
import type { Cart, CartLine } from "./shopify-queries";

export const ATTR = { girth: "Girth (cm)", line1: "Engraving line 1", line2: "Engraving line 2" } as const;

export type Line = {
  id: string;
  product: Product;
  qty: number;
  colourway?: Colourway;
  size?: number;
  girth?: number;
  line1?: string;
  line2?: string;
  unitPrice: number;
  total: number;
};

type Ctx = {
  loaded: boolean;
  busy: boolean;
  error: string | null;
  lines: Line[];
  add: (lines: AddLine[]) => Promise<boolean>;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  count: number;
  subtotal: number;
  shippingEstimate: number;
  checkoutUrl: string | null;
  hasEngraved: boolean;
  hasCollarWithoutTag: boolean;
};

const BasketCtx = createContext<Ctx | null>(null);

function toLine(l: CartLine): Line | null {
  const product = PRODUCTS.find((p) => p.slug === l.merchandise.product.handle);
  if (!product) return null;
  const opt = (name: string) => l.merchandise.selectedOptions.find((o) => o.name === name)?.value;
  const attr = (key: string) => l.attributes.find((a) => a.key === key)?.value;
  const size = opt("Size");
  const girth = attr(ATTR.girth);
  return {
    id: l.id,
    product,
    qty: l.quantity,
    colourway: opt("Colourway") as Colourway | undefined,
    size: size ? Number(size) : undefined,
    girth: girth ? Number(girth) : undefined,
    line1: attr(ATTR.line1),
    line2: attr(ATTR.line2),
    unitPrice: Number(l.merchandise.price.amount),
    total: Number(l.cost.totalAmount.amount),
  };
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, start] = useTransition();

  useEffect(() => {
    getCart().then((c) => { setCart(c); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  const value = useMemo<Ctx>(() => {
    const lines = (cart?.lines.nodes ?? []).map(toLine).filter((l): l is Line => l !== null);
    const subtotal = cart ? Number(cart.cost.subtotalAmount.amount) : 0;
    const hasCollar = lines.some((l) => l.product.no === "01" || l.product.no === "02");
    const hasTag = lines.some((l) => ["03", "04", "23", "24"].includes(l.product.no));
    const run = (work: () => Promise<Cart>) =>
      new Promise<boolean>((resolve) => {
        start(async () => {
          try { setCart(await work()); setError(null); resolve(true); }
          catch (e) { setError(e instanceof Error ? e.message : "Something went wrong with the basket."); resolve(false); }
        });
      });
    return {
      loaded, busy, error, lines,
      add: (ls) => run(() => addLines(ls)),
      remove: (id) => { void run(() => removeLine(id)); },
      setQty: (id, qty) => { void run(() => updateLine(id, qty)); },
      count: cart?.totalQuantity ?? 0,
      subtotal,
      shippingEstimate: subtotal === 0 || subtotal >= 60 ? 0 : 3.95,
      checkoutUrl: cart?.checkoutUrl ?? null,
      hasEngraved: lines.some((l) => l.product.engraved),
      hasCollarWithoutTag: hasCollar && !hasTag,
    };
  }, [cart, loaded, busy, error]);

  return <BasketCtx.Provider value={value}>{children}</BasketCtx.Provider>;
}

export function useBasket() {
  const c = useContext(BasketCtx);
  if (!c) throw new Error("BasketProvider missing");
  return c;
}
