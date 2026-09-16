"use client";
import { useState } from "react";
import Link from "next/link";
import { gbp, objectRatio, type Colourway, type Product } from "@/lib/catalogue";
import { Frame } from "./Frame";
import { BuyControls } from "./BuyControls";
import { TapeRule } from "./TapeRule";

export function ManifestRow({ product }: { product: Product }) {
  const wide = product.no === "10" || product.no === "13";
  const [cw, setCw] = useState<Colourway>("Hi-Vis");
  const slugCw = cw.toLowerCase().replace("-", "");
  return (
    <article className={`row ${wide ? "row-wide" : ""}`} id={`item-${product.no}`}>
      <TapeRule />
      <div className="row-grid">
        <div className="row-no"><span className="num">{product.no}</span></div>
        <Link href={`/gear/${product.slug}`} className="row-image">
          <Frame id={`${product.no}-object-${product.colourways ? slugCw : "hivis"}`} fallbackId={`${product.no}-object-hivis`} ratio={objectRatio(product.no)} alt={`${product.name} in ${cw}`} />
        </Link>
        <div className="row-body">
          <h3 className="h3" data-no={product.no}><Link href={`/gear/${product.slug}`}>{product.name}</Link></h3>
          <p className="row-kind">{product.kind}</p>
          <p className="row-for">{product.forLine}</p>
          <p className="row-materials">{product.materials}</p>
          {product.saves && <p className="row-saves">Saves {gbp(product.saves)}.</p>}
          <Link href={`/gear/${product.slug}`} className="row-more">Full spec →</Link>
        </div>
        <div className="row-controls">
          <p className="price num">{gbp(product.price)}</p>
          <BuyControls product={product} compact onColourway={setCw} />
        </div>
      </div>
    </article>
  );
}
