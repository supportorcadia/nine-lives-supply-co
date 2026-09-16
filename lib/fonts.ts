import localFont from "next/font/local";

// Archivo: wordmark, headlines, numbers, buttons. Newsreader: body text.
export const archivo = localFont({
  src: [{ path: "../public/fonts/archivo.woff2", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

export const newsreader = localFont({
  src: [
    { path: "../public/fonts/newsreader.woff2", style: "normal" },
    { path: "../public/fonts/newsreader-italic.woff2", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
});
