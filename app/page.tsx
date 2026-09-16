import Link from "next/link";
import { byNo } from "@/lib/catalogue";
import { Frame } from "@/components/Frame";
import { TapeRule } from "@/components/TapeRule";
import { FeaturedCard } from "@/components/FeaturedCard";
import { HeroMedia } from "@/components/HeroMedia";

export default function Home() {
  return (
    <main className="home home-hero">
      <section className="hero">
        <HeroMedia />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="display">For cats who go out after dark, and the people who wait up for them.</h1>
            <p className="hero-body">
              A collar a driver can see, a tag with your number on it, a harness that stays on, and a warm dry place to wait if they're late home. We make all of it in Orkney, for our own cats first, and post it from Kirkwall to yours.
            </p>
          </div>
          <div className="hero-ctas">
            <Link href="/gear" className="btn btn-hivis">See everything we make</Link>
            <Link href="/girth" className="btn btn-ghost">Find your cat's size</Link>
          </div>
        </div>
      </section>

      <section className="offer" aria-labelledby="offer-h">
        <div className="offer-text">
          <h2 className="h2" id="offer-h">If you love a cat who goes out, this is for you.</h2>
          <p>If there's a road, weather and no streetlights between your cat and your door, you already know the feeling of waiting up. It's dark here by half past three from November to February. Everything we make does one of four jobs.</p>
        </div>
        <ol className="offer-tiles">
          {[
            { word: "Seen", range: "01–02", href: "/gear#on-the-cat", img: "01-cat", line: "A collar a driver spots from eighty metres away, that lets go if it snags on a fence." },
            { word: "Found", range: "03–05", href: "/gear#item-03", img: "03-detail", line: "A tag with your number cut into it so a stranger can ring you, and a pouch for a tracker." },
            { word: "Held", range: "06–09", href: "/gear#item-06", img: "06-cat", line: "A harness sized by girth, not by guess, so they come home on the same lead they went out on." },
            { word: "Dry", range: "10–12", href: "/gear#out-there", img: "env-cat-shelter", line: "A warm shelter and a feeding station that shrug off horizontal rain, for the nights they're late." },
          ].map((t, i) => (
            <li key={t.word} className="tile">
              <Link href={t.href}>
                <div className="tile-image">
                  <Frame id={t.img} ratio="4/3" alt="" />
                  <span className="tile-word">{t.word}<span className="tile-dot">.</span></span>
                  <span className="tile-index num">{i + 1}</span>
                </div>
                <p className="tile-line"><span className="num tile-range">{t.range}</span> {t.line}</p>
              </Link>
            </li>
          ))}
        </ol>
        <p className="offer-more">Carriers, mats and a few toys for the nights they stay in are on the <Link href="/gear">full list</Link>.</p>
      </section>

      <section className="featured" aria-labelledby="featured-h">
        <header className="featured-head">
          <h2 className="h2" id="featured-h">Start here.</h2>
          <p>The six things most of our cats leave the house in. The rest is on the <Link href="/gear">full list</Link>.</p>
        </header>
        <TapeRule />
        <div className="featured-grid">
          <FeaturedCard product={byNo("01")} large imageId="01-cat" />
          <FeaturedCard product={byNo("06")} large imageId="06-cat" />
          <FeaturedCard product={byNo("03")} />
          <FeaturedCard product={byNo("05")} />
          <FeaturedCard product={byNo("10")} />
          <FeaturedCard product={byNo("23")} />
        </div>
      </section>

      <section className="girth-tease">
        <div className="girth-tease-image"><Frame id="girth-tape-detail" ratio="4/5" /></div>
        <div className="girth-tease-text">
          <p className="girth-tease-figure"><span className="num girth-tease-no">2 cm</span><span className="girth-tease-caption">is the difference between a harness that holds and one a cat reverses straight out of.</span></p>
          <h2 className="h2">Nobody knows what size their cat is, and that's fine.</h2>
          <p>Two centimetres round the chest is all it takes, so we don't sell harnesses by small, medium and large. You measure the girth, twice, while they're asleep on you, and we tell you the size. Nearly every harness that comes back to us was a guess, and we'd much rather you got it right first time than had a fright in a vet car park.</p>
          <p><Link href="/girth" className="btn">How to measure a cat that won't be measured</Link></p>
        </div>
      </section>

      <section className="made">
        <div className="made-text">
          <h2 className="h2">Sewn, engraved and stencilled in Orkney.</h2>
          <p>Ours live outside, in horizontal rain, on single-track roads with no streetlights, and they come home when they feel like it. We love them anyway. The webbing is sewn here, the tags are cut on a machine in the back room, and every box goes out with the stencil on the lid and one hi-vis sticker. Posted from Kirkwall, and we don't put a puffin on anything.</p>
          <p className="home-band-links"><Link href="/made-in-orkney">About us</Link> · <Link href="/from-kirkwall">Shipping and returns</Link></p>
        </div>
        <ol className="made-strip">
          <li><Frame id="process-webbing" ratio="1/1" alt="Hi-vis webbing under the sewing machine" /><span>Sewn</span></li>
          <li><Frame id="process-engraver" ratio="1/1" alt="A brass tag on the engraving machine" /><span>Engraved</span></li>
          <li><Frame id="process-stencil" ratio="1/1" alt="The stencil on a kraft box lid" /><span>Stencilled</span></li>
        </ol>
        <Frame id="env-cat-wall" ratio="21/9" alt="A cat in a hi-vis collar on a wet wall by a lit farmhouse" className="made-wide" />
      </section>

      <section className="tag-tease">
        <TapeRule />
        <div className="tag-tease-grid">
          <div>
            <h2 className="h2">Buy the tag with the collar. Please.</h2>
            <p>Most people order the tag after their cat has gone missing once, and we understand, because we did too. Every collar here offers the tag underneath it, with a box for your number. It's cut here, which adds three working days, and we'd rather tell you that now than on the phone.</p>
            <p><Link href="/gear/skerry-collar" className="btn btn-add">01 Skerry Collar, with the tag</Link></p>
          </div>
          <Frame id="03-detail" ratio="1/1" />
        </div>
      </section>
    </main>
  );
}
