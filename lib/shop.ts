// The shop: the site's own product copy (lib/catalogue.ts) married to Shopify's live
// prices, variants and stock. Shopify owns money and inventory; the site owns the words.
// Products are matched by handle, which is the same string as the catalogue slug.

import { PRODUCTS, type Colourway, type Product } from "./catalogue";
import { shopifyFetch, shopifyConfigured } from "./shopify";
import { PRODUCTS_QUERY, type StorefrontProduct } from "./shopify-queries";

export type Variant = {
  id: string;             // gid://shopify/ProductVariant/…
  colourway?: Colourway;
  size?: number;
  price: number;
  available: boolean;
};

export type ShopProduct = Product & {
  shopifyId?: string;
  variants: Variant[];    // empty when the product is not in Shopify yet
  live: boolean;          // true when prices and variants came from Shopify
};

function toVariant(v: StorefrontProduct["variants"]["nodes"][number]): Variant {
  const opt = (name: string) => v.selectedOptions.find((o) => o.name === name)?.value;
  const size = opt("Size");
  return {
    id: v.id,
    colourway: opt("Colourway") as Colourway | undefined,
    size: size ? Number(size) : undefined,
    price: Number(v.price.amount),
    available: v.availableForSale,
  };
}

async function fetchAllProducts(): Promise<StorefrontProduct[]> {
  const out: StorefrontProduct[] = [];
  let after: string | null = null;
  do {
    const data: { products: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: StorefrontProduct[] } } =
      await shopifyFetch(PRODUCTS_QUERY, { first: 50, after }, { revalidate: 60, tags: ["products"] });
    out.push(...data.products.nodes);
    after = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
  } while (after);
  return out;
}

// Every product in the catalogue, with Shopify data where it exists. Never throws: if
// Shopify is unreachable the site still renders, with buying switched off.
export async function loadShop(): Promise<ShopProduct[]> {
  let remote = new Map<string, StorefrontProduct>();
  if (shopifyConfigured()) {
    try {
      remote = new Map((await fetchAllProducts()).map((p) => [p.handle, p]));
    } catch (e) {
      console.error("Shopify unavailable, rendering catalogue without live prices:", e);
    }
  }
  return PRODUCTS.map((p) => {
    const r = remote.get(p.slug);
    if (!r) return { ...p, variants: [], live: false };
    const variants = r.variants.nodes.map(toVariant);
    const price = variants.length ? Math.min(...variants.map((v) => v.price)) : p.price;
    return { ...p, price, shopifyId: r.id, variants, live: true };
  });
}

export async function loadProduct(slug: string): Promise<ShopProduct | undefined> {
  return (await loadShop()).find((p) => p.slug === slug);
}

// The variant for a chosen colourway and size. Products without colourways or sizes have
// exactly one variant.
export function pickVariant(p: ShopProduct, colourway?: Colourway, size?: number): Variant | undefined {
  return p.variants.find((v) =>
    (p.colourways ? v.colourway === colourway : true) &&
    (p.sized ? v.size === size : true),
  );
}
