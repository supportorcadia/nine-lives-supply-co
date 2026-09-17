"use server";

// Server Actions for the Shopify cart. The cart lives in Shopify; the browser only keeps
// its id in a cookie. Every action returns the whole cart so the client can replace state.

import { cookies } from "next/headers";
import { shopifyFetch } from "./shopify";
import { CART_CREATE, CART_LINES_ADD, CART_LINES_REMOVE, CART_LINES_UPDATE, CART_QUERY, type Cart } from "./shopify-queries";

const COOKIE = "nl-cart";
const YEAR = 60 * 60 * 24 * 365;

type UserError = { field: string[] | null; message: string };
type CartPayload = { cart: Cart | null; userErrors: UserError[] };

function check(payload: CartPayload, what: string): Cart {
  if (payload.userErrors?.length) throw new Error(`${what}: ${payload.userErrors.map((e) => e.message).join("; ")}`);
  if (!payload.cart) throw new Error(`${what}: no cart returned`);
  return payload.cart;
}

async function cartId(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value;
}

async function remember(cart: Cart) {
  (await cookies()).set(COOKIE, cart.id, { path: "/", maxAge: YEAR, sameSite: "lax", httpOnly: true, secure: process.env.NODE_ENV === "production" });
}

async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: CartPayload }>(
    CART_CREATE,
    { input: { buyerIdentity: { countryCode: "GB" } } },
    { cache: "no-store" },
  );
  const cart = check(data.cartCreate, "Creating the basket");
  await remember(cart);
  return cart;
}

export async function getCart(): Promise<Cart | null> {
  const id = await cartId();
  if (!id) return null;
  try {
    const data = await shopifyFetch<{ cart: Cart | null }>(CART_QUERY, { cartId: id }, { cache: "no-store" });
    return data.cart; // null when Shopify has expired or converted it (after checkout)
  } catch {
    return null;
  }
}

export type AddLine = { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] };

export async function addLines(lines: AddLine[]): Promise<Cart> {
  let cart = await getCart();
  if (!cart) cart = await createCart();
  const data = await shopifyFetch<{ cartLinesAdd: CartPayload }>(CART_LINES_ADD, { cartId: cart.id, lines }, { cache: "no-store" });
  return check(data.cartLinesAdd, "Adding to the basket");
}

export async function updateLine(lineId: string, quantity: number): Promise<Cart> {
  const id = await cartId();
  if (!id) throw new Error("No basket");
  const data = await shopifyFetch<{ cartLinesUpdate: CartPayload }>(
    CART_LINES_UPDATE,
    { cartId: id, lines: [{ id: lineId, quantity: Math.max(1, quantity) }] },
    { cache: "no-store" },
  );
  return check(data.cartLinesUpdate, "Changing the quantity");
}

export async function removeLine(lineId: string): Promise<Cart> {
  const id = await cartId();
  if (!id) throw new Error("No basket");
  const data = await shopifyFetch<{ cartLinesRemove: CartPayload }>(CART_LINES_REMOVE, { cartId: id, lineIds: [lineId] }, { cache: "no-store" });
  return check(data.cartLinesRemove, "Removing from the basket");
}

// After Shopify's checkout completes the cart is gone; drop the cookie so the next visit
// starts clean.
export async function forgetCart() {
  (await cookies()).delete(COOKIE);
}
