import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart-actions";

export const metadata = { title: "Checkout — Nine Lives Supply Co." };
export const dynamic = "force-dynamic";

// Checkout happens on Shopify. This page just sends people there with their basket, or
// back to the basket if it's empty.
export default async function Checkout() {
  const cart = await getCart();
  if (cart && cart.totalQuantity > 0) redirect(cart.checkoutUrl);
  redirect("/basket");
}
