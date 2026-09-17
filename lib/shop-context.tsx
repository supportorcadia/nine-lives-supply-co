"use client";
// Makes the Shopify-backed catalogue available to client components (the buying controls
// need variant ids for the product in hand and for the tag add-ons).

import { createContext, useContext } from "react";
import type { ShopProduct } from "./shop";

const ShopCtx = createContext<ShopProduct[]>([]);

export function ShopProvider({ products, children }: { products: ShopProduct[]; children: React.ReactNode }) {
  return <ShopCtx.Provider value={products}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const products = useContext(ShopCtx);
  return {
    products,
    byNo: (no: string) => products.find((p) => p.no === no),
  };
}
