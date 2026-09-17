import { SECTIONS } from "@/lib/catalogue";
import { loadShop } from "@/lib/shop";
import { IndexRail } from "@/components/IndexRail";
import { ManifestRow } from "@/components/ManifestRow";
import { Frame } from "@/components/Frame";
import { TapeRule } from "@/components/TapeRule";

export const metadata = { title: "Everything we make — Nine Lives Supply Co." };

export default async function Gear() {
  const products = await loadShop();
  return (
    <main className="manifest">
      <header className="manifest-head">
        <h1 className="h1">Everything we make.</h1>
        <p className="manifest-head-body">Twenty-five things, five colours, all on this page, in the order your cat needs them on a winter night. Hi-Vis goes in the basket unless you change it, because it's the one that gets seen.</p>
      </header>
      <div className="manifest-layout">
        <aside className="manifest-index"><IndexRail /></aside>
        <div className="manifest-body">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className={`msection msection-${s.id}`}>
              <header className="msection-head">
                <span className="msection-range num">{s.range}</span>
                <h2 className="h2">{s.title}</h2>
                <p className="msection-intro">{s.intro}</p>
              </header>
              {i === 1 && <div className="msection-env"><Frame id="env-cat-shelter" ratio="21/9" /></div>}
              {products.filter((p) => p.section === s.id).map((p) => (
                <ManifestRow key={p.no} product={p} />
              ))}
            </section>
          ))}
          <TapeRule />
          <p className="manifest-end">That's everything. Twenty-five things, five colours, one address.</p>
        </div>
      </div>
    </main>
  );
}
