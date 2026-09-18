# Nine Lives Supply Co.

> Outdoor gear for cats who go out after dark, made in Orkney and posted from Kirkwall.

## Brand Identity
- Personality: warm, plain-spoken cat people who make serious kit. Specific, never cute.
- Colours: warm dark peat background (#1E1712), slightly lighter peat panels (#2A211A), cream text (#F2EAD9), Hi-Vis (#D7FF3F) for every button, the girth readout and selected options, lamplight amber (#E9A94F) for warm links, deeper night (#140F0B) for the footer. The five product colourways (Hi-Vis, Slate, Moss, Ember, Sand) appear only as swatches. Every colourway photo is the Hi-Vis photo with only the product's colour changed, so the design never varies between colours.
- Fonts: Archivo (wordmark, headings, numbers, prices, buttons; a stand-in for the client's own heavy grotesque) and Newsreader (all body text). Both self-hosted in `public/fonts`.
- Mark: a heavy 9 that is also a cat. The bowl is the head with two ears; the tail curls back like a sitting cat's tail (`components/Mark.tsx`). The same stencil-cut lock-up (mark with the name stacked beside it) sits small in the top bar and large in the footer; the mark alone is the favicon.
- Repeating detail: every horizontal line on the site is a measuring tape with tick marks, because girth is the whole sizing story. Every product has a two-digit number.

## Pages
- **Homepage** (`/`) - Full-screen hero (video slot with a poster image), the "If you love a cat who goes out" panel, six featured products, the girth argument, a "Sewn, engraved and stencilled in Orkney" band with three workshop photos and the cat on the wall, and the "buy the tag with the collar" section.
- **Shop** (`/gear`) - All 25 products on one long page, numbered 01–25 in five sections with an index down the side. Harnesses ask for girth before size; collars offer the engraved tag with a phone-number box.
- **Product pages** (`/gear/skerry-collar` etc.) - Photos left, spec table and buying controls right, "goes with" or "contains" underneath.
- **Fit** (`/girth`, shown as "Fit" in the menu) - How to measure a cat, the size table (1: 35–40 cm, 2: 40–45, 3: 45–50, 4: 50–56), a try-it box.
- **Delivery & Returns** (`/from-kirkwall`, shown as "Delivery & Returns" in the menu) - Shipping and returns in the owner's voice.
- **Made in Orkney** (`/made-in-orkney`) - About the business.
- **Basket** (`/basket`) - the Shopify cart, shown in the site's own design. **Checkout** (`/checkout`) hands straight over to Shopify's checkout, which takes payment and shows the order confirmation. And a 404 page.

## Components
- **TopBar** - the stencil lock-up left; Shop, Fit, Delivery & Returns, Made in Orkney, Basket right.
- **Footer** - dark peat band with the stencil mark and wordmark in Hi-Vis and the same links.
- **ManifestRow** - one numbered product row on the shop page, with its buying controls. Its picture changes with the chosen colourway.
- **BuyControls** - colourway swatches, girth field with size readout, engraving fields, tag add-on, add-to-basket. Adds the matching Shopify variant to the cart.
- **FeaturedCard** - the homepage product cards.
- **Frame** - an image slot that shows `public/images/<id>.jpg` when the file exists and a labelled kraft box otherwise. It knows which photographs exist from `lib/image-manifest.json`, which is rebuilt automatically before every dev run and build, so adding a photo to `public/images` is all that's needed.
- **HeroMedia** - plays `public/media/hero.mp4` over `public/media/hero-poster.jpg`. The video is a 16-second loop made with Remotion (see below), not footage.
- **Mark** - the cat-tail 9, drawn as strokes so it stays the same weight at any size; `stencil` adds the bridges.
- **Motion** - scroll effects: tape rules pull out like a tape measure, images and rows rise in, the hero drifts. All off for people with reduced motion switched on.

## The shop behind the site (Shopify)
- The site is a headless Shopify store. Shopify owns prices, stock, the basket, checkout, payment and orders. The site owns the words and photographs.
- Store: vercel-store-c5b3e15a-ag9b1f67.myshopify.com, created through Vercel's Shopify integration and owned by johanna@orcadiadesign.co.uk. The store is named Nine Lives Supply Co. in Shopify; its technical address stays vercel-store-c5b3e15a-ag9b1f67.myshopify.com. Admin: https://admin.shopify.com/store/vercel-store-c5b3e15a-ag9b1f67
- Products are matched by handle: the web address slug of each product on the site (for example `skerry-collar`) is the same as its handle in Shopify. Colourway and Size are Shopify options; girth and engraving text travel with the basket line and appear on the order.
- Shipping is set in Shopify: UK only, £3.95, free from £60.
- Checkout styling lives in Shopify (Settings → Checkout → Edit → the gear icon). It is set to match the site: peat background, Hi-Vis buttons and links, the stencil lock-up as the logo, Archivo headings and Newsreader body from Shopify's font library, dark see-through input fields, and the deeper night colour behind the order summary. The trial plan doesn't allow corner-radius changes or uploaded font files, so the checkout uses Shopify's copies of the same fonts.
- The site reads prices and variants from Shopify every minute. If Shopify is ever unreachable the pages still show, with buying switched off.
- To load or refresh the products in Shopify from `lib/catalogue.ts`: `shopify store auth --store <store> --scopes write_products,read_products,write_publications,read_publications` then `node scripts/shopify-seed.mjs --store <store>`. Safe to re-run.
- The connection details (store address and Storefront key) are set on the Vercel project by the integration and in `.env.local` locally. They are never in the code.

## Where the words and pictures live
- All product names, prices, descriptions and specs: `lib/catalogue.ts`.
- Page copy: in each page file under `app/`. The full copy deck is `docs/copy.md`.
- Images: `public/images/`, named by the IDs in `docs/image-plan.md`. Hero poster and video: `public/media/`.

## Live site
- Address: https://nine-lives-supply-co.vercel.app
- Hosted on Vercel (project nine-lives-supply-co, Orcadia Design team), connected to the GitHub repo supportorcadia/nine-lives-supply-co. Every push to the main branch deploys automatically.

## Recent Changes
- 18 Sep 2026: Full test pass at desktop and phone widths. Fixed small product cards wrapping on phones, the basket count being clipped in the phone menu, and pages requesting photographs that don't exist. Added link-preview details for when the address is shared, and a tester note in the basket with the demo password and test card. Browser-tab titles now match the menu names. Old branch removed.
- 17 Sep 2026: Headless Shopify. New store provisioned through Vercel, 25 products with 162 variants and 121 photos loaded, UK-only shipping set, basket and checkout moved onto Shopify. On the `headless-shopify` branch until approved.
- 16 Sep 2026: Site put live on Vercel and linked to GitHub for automatic deploys.
- 16 Sep 2026: Menu items renamed: Girth is now "Fit", From Kirkwall is now "Delivery & Returns" (web addresses unchanged). New mark: the 9 as a cat, head and ears on the bowl and a curling tail, in the top bar, stencil-cut in the footer, and as the favicon. Tape rule doubled in height with three tick sizes and a lighter twine colour. Tape-measure cat photo reshot: ticks only, no numbers, both tape ends hidden. Hero video made with Remotion: four night photographs drifting and crossfading with the tape rule pulling out along the bottom, 16 s, rendered to `public/media/hero.mp4`. Image folder now holds 133 photos; only 25 Sand is still missing.
- 15 Sep 2026: Research, direction, art direction and copy written (`docs/`). Greybox built. After feedback: offer-first homepage, featured products with the full range moved to `/gear`, warmer copy, dark peat theme with Hi-Vis buttons, Archivo headings and Newsreader body, full-screen video hero, four picture tiles for Seen / Found / Held / Dry. 58 images generated through ChatGPT and checked side by side. Motion added. Audit written (`docs/audit.md`).

## Sharing the site for testing
- This is a demonstration shop. Nothing is charged: checkout runs on Shopify's test gateway. The basket page tells testers the two things they need: the "Opening soon" password (chirti, while the store is on Shopify's trial) and the test card number 1.
- To take real orders one day: choose a Shopify plan, switch off the store password, and activate Shopify Payments. Then remove the tester note in `components/BasketView.tsx`.

## How to Customise
- The favicon is `app/icon.svg` (the 9 in Hi-Vis).
- To change a price or description: edit the product's entry in `lib/catalogue.ts`.
- To change the hero video: the film is described in `remotion/HeroLoop.tsx` (which photos, how long each holds). Run `npm run hero:preview` to watch it in a browser, and `npm run hero:render` to write the new `public/media/hero.mp4`. To use real footage instead, just replace `public/media/hero.mp4` with your own file.
- To change the mark: edit `components/Mark.tsx` and `app/icon.svg`.
- To replace a photo: overwrite the file in `public/images/` keeping the same name.
- To change colours or fonts: the tokens are at the top of `app/site.css`.
- To change which six products are featured: edit the numbers in `app/page.tsx`.
