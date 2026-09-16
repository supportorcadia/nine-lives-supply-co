import Link from "next/link";
import { SIZES } from "@/lib/catalogue";
import { Frame } from "@/components/Frame";
import { TapeRule } from "@/components/TapeRule";
import { GirthTry } from "@/components/GirthTry";

export const metadata = { title: "Girth — Nine Lives Supply Co." };

export default function Girth() {
  return (
    <main className="page page-girth">
      <div className="girth-grid">
        <div className="girth-text">
          <h1 className="h1">How to measure a cat who won't be measured.</h1>
          <p>You cannot ask a cat to stand still with a tape round their ribs, so don't. Wait until they're asleep on you, which is the nicest part of this. Run a soft tape round the chest just behind the front legs, at the widest point, snug but not pulling. Read it. Do it again the next time they're asleep, because the first number is usually wrong. If the two numbers are different, use the bigger one.</p>
          <p>That number is the girth, and it's the only number the harness cares about. Weight doesn't help; two cats the same weight can be four centimetres apart round the chest.</p>
          <TapeRule />
          <table className="spec spec-sizes">
            <thead><tr><th>Size</th><th>Chest girth</th></tr></thead>
            <tbody>{SIZES.map((s) => <tr key={s.size}><td className="num">{s.size}</td><td>{s.min}–{s.max} cm</td></tr>)}</tbody>
          </table>
          <p className="girth-rule"><strong>Between sizes, buy the smaller one.</strong> A harness that is a bit snug holds. A harness that is a bit loose is in a hedge.</p>
          <GirthTry />
          <dl className="girth-dl">
            <dt>Fit check</dt><dd>Two fingers flat under the strap at the back. Not three.</dd>
            <dt>No tape?</dt><dd>A shoelace and a ruler. Mark the lace, lay it flat.</dd>
          </dl>
          <p>If you've measured twice and it still doesn't fit, send it back and we'll swap it, no fuss. Postage on us if you tell us the girth you measured. <Link href="/from-kirkwall">Returns →</Link></p>
          <p className="girth-links">Harnesses: <Link href="/gear/geo-harness">06 Geo</Link> · <Link href="/gear/haar-harness">09 Haar</Link></p>
        </div>
        <div className="girth-image">
          <Frame id="girth-tape-detail" ratio="4/5" />
          <Frame id="06-detail" ratio="1/1" />
        </div>
      </div>
    </main>
  );
}
