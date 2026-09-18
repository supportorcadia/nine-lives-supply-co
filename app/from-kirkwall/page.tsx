import { TapeRule } from "@/components/TapeRule";
import { Frame } from "@/components/Frame";

export const metadata = { title: "Delivery and returns, posted from Kirkwall — Nine Lives Supply Co." };

export default function FromKirkwall() {
  return (
    <main className="page page-policy">
      <header className="policy-head">
        <h1 className="h1">Posted from Kirkwall.</h1>
        <Frame id="env-kraft-box" ratio="3/2" />
      </header>
      <div className="policy-cols">
        <section>
          <h2 className="h2">Shipping</h2>
          <p>Everything leaves from one place, which is Kirkwall, Orkney. That means it goes on a boat or a plane before it gets anywhere else, and we'd rather say so here than argue about it later.</p>
          <table className="spec">
            <tbody>
              <tr><th scope="row">Mainland UK</th><td>£3.95, or free over £60. Two to three working days after it leaves us.</td></tr>
              <tr><th scope="row">Highlands, Islands, Northern Ireland</th><td>Same price. Three to five working days, and longer if the boat isn't running, which happens.</td></tr>
              <tr><th scope="row">Engraved tags</th><td>03, 04, and kits 23 and 24 are cut after you order. Add three working days before dispatch. You'll see this in the basket before you pay, and on the confirmation, and on the tag.</td></tr>
              <tr><th scope="row">Post days</th><td>Monday to Friday. An order after two on a Friday goes Monday.</td></tr>
              <tr><th scope="row">Where</th><td>UK only. Pounds only. If you're outside the UK we can't help, sorry.</td></tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="h2">Returns</h2>
          <p>Thirty days, unused, in the kraft box it came in, and we'll refund it or swap it. We know cats have opinions about new things; take your time.</p>
          <TapeRule />
          <h3 className="h3">Harnesses</h3>
          <p>If it's the wrong size we'll swap it, no argument. Tell us the girth you measured and we'll pay the return postage, because then it's our fault or the tape's. If you didn't measure, we'll still swap it, but the postage is yours, and please measure this time.</p>
          <h3 className="h3">Engraved tags</h3>
          <p>We can't take these back unless we cut it wrong, because a tag with your number on it is no use to anybody else. Check the number before you pay. We check it too.</p>
          <h3 className="h3">The shelter</h3>
          <p>If it hasn't been outside, thirty days like everything else. If it has, it's been used, and we can't resell it. If it's failed, that's different: email us a photograph and we'll sort it.</p>
          <h3 className="h3">Anything faulty</h3>
          <p>Photograph, email, and we'll replace it. Twelve months.</p>
          <TapeRule />
          <h3 className="h3">Trade</h3>
          <p>We supply two vets and a farm shop on the islands. If that's you, <a href="mailto:hello@ninelives.supply">email</a>; the site isn't built for it.</p>
        </section>
      </div>
    </main>
  );
}
