import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { TapeRule } from "./TapeRule";

export function Footer() {
  return (
    <footer className="footer">
      <TapeRule />
      <div className="footer-inner">
        <Wordmark size="lg" />
        <p className="footer-line">Made in Orkney. Posted from Kirkwall. UK only, in pounds.</p>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/gear">Everything we make</Link>
          <Link href="/girth">Fit</Link>
          <Link href="/from-kirkwall">Delivery & Returns</Link>
          <Link href="/made-in-orkney">Made in Orkney</Link>
          <a href="mailto:hello@ninelives.supply">Trade: email us</a>
          <a href="mailto:hello@ninelives.supply">hello@ninelives.supply</a>
        </nav>
      </div>
    </footer>
  );
}
