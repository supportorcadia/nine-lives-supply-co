import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page page-confirm">
      <h1 className="h1">Not here.</h1>
      <p>Nothing lives at this address. The whole range is on one page.</p>
      <p><Link href="/gear" className="btn">See everything we make</Link></p>
    </main>
  );
}
