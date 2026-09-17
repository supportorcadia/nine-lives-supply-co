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

export const metadata: Metadata = {
  title: "Nine Lives Supply Co. — Outdoor gear for cats, made in Orkney",
  description: "Collars, tags, harnesses, shelters and carriers for cats that live outside. Made in Orkney, posted from Kirkwall.",
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
