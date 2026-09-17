import { notFound } from "next/navigation";
import { PRODUCTS, bySlug } from "@/lib/catalogue";
import { loadProduct } from "@/lib/shop";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  return { title: p ? `${p.no} ${p.name} — Nine Lives Supply Co.` : "Not here" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
