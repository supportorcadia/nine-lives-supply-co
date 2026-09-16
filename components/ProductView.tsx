"use client";
import { useState } from "react";
import Link from "next/link";
import { byNo, gbp, objectRatio, type Colourway, type Product } from "@/lib/catalogue";
import { Frame } from "./Frame";
import { BuyControls } from "./BuyControls";
import { TapeRule } from "./TapeRule";

export function ProductView({ product }: { product: Product }) {
  const [cw, setCw] = useState<Colourway>("Hi-Vis");
  const slugCw = cw.toLowerCase().replace("-", "");
  return (
    <main className="product">
      <div className="product-grid">
        <div className="product-images">
          <Frame id={`${product.no}-object-${product.colourways ? slugCw : "hivis"}`} fallbackId={`${product.no}-object-hivis`} ratio={objectRatio(product.no)} alt={`${product.name} in ${cw}`} />
          <div className="product-images-pair">
            <Frame id={`${product.no}-detail`} ratio="1/1" optional alt={`${product.name}, detail`} />
            <Frame id={`${product.no}-cat`} ratio="1/1" optional alt={`${product.name} on a cat`} />
          </div>
        </div>
        <div className="product-spec">
          <p className="num product-no">{product.no}</p>
          <h1 className="h1">{product.name}</h1>
          <p className="product-kind">{product.kind}</p>
          <p className="price num">{gbp(product.price)}{product.saves ? <span className="product-saves"> · saves {gbp(product.saves)}</span> : null}</p>
          <p className="product-for">{product.forLine}</p>
          <p className="product-desc">{product.description}</p>
          <table className="spec">
            <tbody>
              {product.spec.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
          <BuyControls product={product} onColourway={setCw} />
          <p className="product-ship">Posted from Kirkwall. Mainland two to three working days after it leaves; Highlands and Islands three to five, longer if the boat isn't running. <Link href="/from-kirkwall">Shipping and returns →</Link></p>
        </div>
      </div>

      {(product.contains || product.goesWith) && (
        <section className="goeswith">
          <TapeRule />
          <h2 className="h2">{product.contains ? "Contains" : "Goes with"}</h2>
          <ul className="goeswith-list">
            {(product.contains || product.goesWith || []).map((no) => {
              const p = byNo(no);
              return (
                <li key={no}>
                  <Link href={`/gear/${p.slug}`}>
                    <Frame id={`${p.no}-object-hivis`} ratio="1/1" />
                    <span className="num">{p.no}</span>
                    <span className="goeswith-name">{p.name}</span>
                    <span className="goeswith-price">{gbp(p.price)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <p className="backlink"><Link href={`/gear#item-${product.no}`}>← Back to the shop at {product.no}</Link></p>
    </main>
  );
}
