import type { Metadata } from "next";
import "./globals.css";
import { archivo, newsreader } from "@/lib/fonts";
import { BasketProvider } from "@/lib/basket";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { AgentationProvider } from "@/components/AgentationProvider";

export const metadata: Metadata = {
  title: "Nine Lives Supply Co. — Outdoor gear for cats, made in Orkney",
  description: "Collars, tags, harnesses, shelters and carriers for cats that live outside. Made in Orkney, posted from Kirkwall.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <BasketProvider>
          <TopBar />
          {children}
          <Footer />
          <Motion />
        </BasketProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
