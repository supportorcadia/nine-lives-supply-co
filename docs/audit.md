# Audit — Nine Lives Supply Co.

Re-read docs/brief.md first. Then every page at 1440 and 375 wide, 15 September 2026. Answers are honest; fixes made during the audit are listed under each.

## The ten questions

**1. Could this layout be reskinned for an unrelated business by swapping the logo and palette?**
Partly. The homepage shape (full-screen hero, four tiles, featured six, an argument section, a band, a second argument) could carry another brand. What could not move: the girth field standing in for a size dropdown on every harness, the tag riding on every collar with a number box, the Seen / Found / Held / Dry tiles, the numbered manifest in night order, and the tape rule. The structure that does the work is in the shop and the buying flow, not the homepage frame. Honest verdict: the homepage is 60% template, the shop and product pages are not.
*Changed during the build:* the brief's one-page manifest became the shop page at the client's request; the homepage was rebuilt twice for clarity and warmth. Both recorded in docs/decisions.md.

**2. Does the real buying difficulty get first-class treatment?**
Yes. Girth is the first control on both harnesses, on the shop page and the product page, with a live size readout and the between-sizes rule inline. The homepage gives it a whole section with the "2 cm" figure. The engraving lead time sits beside the field, in the basket, at checkout and on the confirmation. The tag is offered inside every collar row. Neither is a tab or a filter.

**3. Is the repeating detail present throughout?**
Yes. The tape rule divides every manifest row, heads every section, sits under the offer tiles, inside the girth page, between returns clauses, under basket lines, between checkout steps, on the confirmation, and above the footer. The two-digit numbers run through the index, the tiles, the cards, the kits ("Contains 06, 07, 03"), the basket lines and the "goes with" lists. On scroll the rules are pulled out like a tape, which is the signature move.

**4. Name every typeface. Deliberate?**
Archivo (variable width) for the wordmark, all headings, numbers, prices, buttons and chips: chosen because the client's own mark is a heavy grotesque and everything at the top of the hierarchy should speak in its voice. Newsreader (variable optical size) for body, tables and controls: chosen by the client for warmth. Nothing else. Both self-hosted.

**5. Where does colour appear?**
Hi-Vis on the wordmark, every add-to-basket button, the selected chip, the girth readout, focus rings and the tile numbers. Lamp amber on warm links, the active index item, the "2 cm" figure, the kit saving and the tile ranges. Ember only on errors and the "cut to order" badge. Everything else is peat and cream. The five colourway swatches are the only other colour and they are the product. Under 6% of surface carries colour, and it all means "act" or "product".

**6. Would copy, imagery and motion each pass their own checklist as built?**
Copy: re-read the homepage, five product rows and the returns page. Concrete nouns, buyer vocabulary (girth, two fingers, backs out, snagged, chipped), nothing transplantable, no banned words (checked with grep), no lorem ipsum. Pass.
Imagery: 58 generated images, all from the same doorstep and the same lamp; see question 7. Pass after two regenerations.
Motion: three effects, all scroll-tied. Ambient moves are 300 ms transform and opacity. Nothing fires on load. Reduced motion: the Motion component returns before creating Lenis or any tween, and a CSS rule cancels animations and transitions; checked by reading the code path, and the site is fully usable with it off. Named as never moving: wordmark, prices, buttons, spec tables, girth readout, basket totals, index rail. Pass.

**7. Do the images read as one commissioned shoot?**
Yes, now. The contact sheet shows the same wet flagstone doorstep, the same warm doorway from the left and cool dusk from above, the same grade, across all 25 Hi-Vis object shots, the 16 colourway variants and the 6 details. The cat shots share the lamp-in-frame rule. Two failed the check: the shelter-with-cat showed a soft fabric box and the shelter detail showed an awning. The client caught the first. Both regenerated with the product shot attached as reference; both now the same box.

**8. Is any section only there because sites usually have one?**
The "Made by cat people" band on the homepage was the closest, and it was rebuilt after the audit as "Sewn, engraved and stencilled in Orkney" with the three workshop photographs, so it now shows the making rather than saying it. Nothing else: the tiles answer "is this for me", the featured six are the first purchase, the girth and tag sections are the two business goals from the brief.

**9. Does the copy sound like this business?**
Yes. "Posted from Kirkwall." "If the boat isn't running, which happens." "We don't put a puffin on anything." "Two cats will argue about it, and we can't help with that." The returns policy has a harness clause and a shelter clause no other shop would write. After the client's note it is warmer ("we love them anyway", "which is the nicest part of this") without losing the specifics.

**10. Do the pages differ in composition?**
Homepage: full-bleed hero, then a panel of four tiles, a two-large-four-small card grid, a five-seven split with a giant figure, a full-width image over text, a seven-five split. Shop: fixed index rail plus tall numbered rows, two of them wide. Product: 55/45 with a sticky spec block. Girth: text column with a table beside a sticky image stack. From Kirkwall: title beside an image, then two columns. About: full-width image, then text beside a three-image stack. Basket and checkout: lines plus a sticky side. Confirmation and 404: one narrow column. No two are the same stack.

## Found and changed during the audit
- Product pages showed an empty half-row when a product had one extra image; the row now fills the width.
- "Back to the manifest" was an internal word; now "Back to the shop".
- Mobile navigation clipped "Basket"; the row now fits at 375px.
- Three empty frames on the about page: process shots generated.
- Frames started with a broken-image icon before hydration; the image is hidden until it reports loaded.
- 68 lint errors were apostrophe escapes; the rule is off. One real finding in the basket effect was fixed.

## Not done in this run
- Colourway variants for 16 of the 20 colourway products, and detail and on-cat shots for the 19 non-featured products: a second run of 100 images was started after check-in 3 from the prompts in docs/image-plan.md. Product pages fall back to the Hi-Vis shot and hide empty slots until each lands, so nothing on the site shows a placeholder.
- The hero video. The slot plays public/media/hero.mp4 over the generated poster the moment the file exists; the client's own winter footage is the right source.

## Summary for a student
The structural idea is that a cat-gear shop's returns come from one thing (girth) and its missed sales from one thing (the tag bought too late), so those two controls were made the front door of the buying flow instead of a dropdown and an accessory link: every harness asks for centimetres before it offers a size, and every collar offers the tag with a box for the phone number and the lead time stated next to it. Around that sits a numbered, one-page shop in the order a winter night needs things, divided by a measuring-tape rule that becomes the site's only signature motion. The idea came from the brief's own admission that returns are wrong-size harnesses, from forum posts saying "still big on him" and "two fingers", and from the client's line that a size guide isn't needed, which is exactly why the guide had to be a control rather than a page. What it cost: the brief's dark chandlery direction was built, found cold, warmed, made light, and made dark again with a serif and then a grotesque; the one-page site became a homepage plus a shop; two of 58 images had to be reshot for consistency. Each change is logged with one line of why in docs/decisions.md.

## What I would do next
1. Generate the remaining 100-odd colourway, detail and on-cat images from the prompts in docs/image-plan.md, in batches of 25 per chat.
2. Cut a 12-second loop from the client's own winter footage for the hero.
3. Replace the Archivo wordmark with the client's drawn mark and the stencil cut in the footer.
4. Add the client's real colour reference sheet values to the five swatches.
5. Swap the three workshop photographs for real ones from the client's archive; they are the one place a generated image stands in for a specific real room.
