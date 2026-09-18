import type { Metadata } from "next";
import "./globals.css";
import { archivo, newsreader } from "@/lib/fonts";
import { BasketProvider } from "@/lib/basket";
import { ShopProvider } from "@/lib/shop-context";
import { loadShop } from "@/lib/shop";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { AgentationProvider } from "@/components/AgentationProvider";

const TITLE = "Nine Lives Supply Co. — Outdoor gear for cats, made in Orkney";
const DESCRIPTION = "Collars, tags, harnesses, shelters and carriers for cats that live outside. Made in Orkney, posted from Kirkwall.";

// When the site is shared (messages, social, Slack), this is the card people see.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nine-lives-supply-co.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Nine Lives Supply Co.",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/media/hero-poster.jpg", width: 1672, height: 941, alt: "A tabby cat in a Hi-Vis collar stepping in through a lit doorway on a wet night." }],
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/media/hero-poster.jpg"] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const products = await loadShop();
  return (
    <html lang="en-GB" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <ShopProvider products={products}>
          <BasketProvider>
            <TopBar />
            {children}
            <Footer />
            <Motion />
          </BasketProvider>
        </ShopProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
