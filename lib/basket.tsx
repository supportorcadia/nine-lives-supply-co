"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { byNo, type Colourway } from "./catalogue";

export type Line = {
  key: string;
  no: string;
  qty: number;
  colourway?: Colourway;
  size?: number;
  girth?: number;
  line1?: string;
  line2?: string;
  metal?: "brass" | "aluminium";
};

type Ctx = {
  loaded: boolean;
  lines: Line[];
  add: (l: Omit<Line, "key">) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  hasEngraved: boolean;
  hasCollarWithoutTag: boolean;
};

const BasketCtx = createContext<Ctx | null>(null);
const KEY = "nl-basket";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reads the saved basket once after mount; localStorage is not available during server render.
    let saved: Line[] = [];
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(saved);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, loaded]);

  const value = useMemo<Ctx>(() => {
    const subtotal = lines.reduce((s, l) => s + byNo(l.no).price * l.qty, 0);
    const hasEngraved = lines.some((l) => byNo(l.no).engraved);
    const hasCollar = lines.some((l) => l.no === "01" || l.no === "02");
    const hasTag = lines.some((l) => l.no === "03" || l.no === "04" || l.no === "23" || l.no === "24");
    return {
      loaded,
      lines,
      add: (l) => setLines((prev) => {
        const key = [l.no, l.colourway, l.size, l.line1, l.line2, l.metal].join("|");
        const i = prev.findIndex((p) => p.key === key);
        if (i >= 0) return prev.map((p, j) => (j === i ? { ...p, qty: p.qty + l.qty } : p));
        return [...prev, { ...l, key }];
      }),
      remove: (key) => setLines((prev) => prev.filter((p) => p.key !== key)),
      setQty: (key, qty) => setLines((prev) => prev.map((p) => (p.key === key ? { ...p, qty: Math.max(1, qty) } : p))),
      clear: () => setLines([]),
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping: subtotal === 0 || subtotal >= 60 ? 0 : 3.95,
      hasEngraved,
      hasCollarWithoutTag: hasCollar && !hasTag,
    };
  }, [lines, loaded]);

  return <BasketCtx.Provider value={value}>{children}</BasketCtx.Provider>;
}

export function useBasket() {
  const c = useContext(BasketCtx);
  if (!c) throw new Error("BasketProvider missing");
  return c;
}
