"use client";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { useBasket } from "@/lib/basket";

export function TopBar() {
  const { count } = useBasket();
  return (
    <header className="topbar">
      <Wordmark />
      <nav className="topbar-nav" aria-label="Site">
        <Link href="/gear">Shop</Link>
        <Link href="/girth">Fit</Link>
        <Link href="/from-kirkwall"><span className="nav-long">Delivery &amp; Returns</span><span className="nav-short">Delivery</span></Link>
        <Link href="/made-in-orkney">Made in Orkney</Link>
        <Link href="/basket" className="topbar-basket">Basket{count > 0 ? ` · ${count}` : ""}</Link>
      </nav>
    </header>
  );
}
