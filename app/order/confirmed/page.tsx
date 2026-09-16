import Link from "next/link";
import { TapeRule } from "@/components/TapeRule";
export const metadata = { title: "That's ordered — Nine Lives Supply Co." };
export default function Confirmed() {
  return (
    <main className="page page-confirm">
      <p className="num confirm-no">NL-2417</p>
      <h1 className="h1">That's ordered.</h1>
      <p>Thank you. It'll leave Kirkwall on Wednesday; the tag's being cut first, which is the three days. You'll get an email when it's on the boat, and we hope it's a long time before anybody needs to ring the number on it.</p>
      <TapeRule />
      <p className="confirm-check">Check the engraving: <strong>07700 900 123 / chipped</strong>. If that's wrong, reply to the email in the next hour and we'll stop the machine.</p>
      <p><Link href="/gear" className="btn">Back to the shop</Link></p>
    </main>
  );
}
