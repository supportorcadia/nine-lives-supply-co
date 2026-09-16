import Link from "next/link";
import { gbp, type Product } from "@/lib/catalogue";
import { Frame } from "./Frame";

export function FeaturedCard({ product, large = false, imageId }: { product: Product; large?: boolean; imageId?: string }) {
  return (
    <Link href={`/gear/${product.slug}`} className={`card ${large ? "card-large" : ""}`}>
      <Frame id={imageId ?? `${product.no}-object-hivis`} ratio={large ? "4/5" : "1/1"} />
      <div className="card-body">
        <span className="num card-no">{product.no}</span>
        <span className="card-name">{product.name}</span>
        <span className="card-kind">{product.kind}</span>
        <span className="card-for">{product.forLine}</span>
        <span className="num card-price">{gbp(product.price)}</span>
      </div>
    </Link>
  );
}
