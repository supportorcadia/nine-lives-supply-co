# Art direction — Nine Lives Supply Co.

Every choice carries one line of why, tied to the brief or docs/research.md.

## Positioning and voice

Nine Lives makes the few things that get an outdoor cat seen, held, found and dry between November and February, and brings it home to a lit door. Made in Orkney, sold to anyone in the UK whose cat goes out.

Voice, demonstrated (from docs/copy.md):
- "Outdoor gear for cats that go out after dark, and come home."
- "Between sizes, buy the smaller one. A harness that is a bit snug holds. A harness that is a bit loose is in a hedge."
- "The tag is cut after you order, with your number on it, which adds three working days. We would rather tell you here than on the phone."

## Wordmark

- Set "NINE LIVES" in Archivo, weight 900, width axis 125, tracking −0.03em, all caps, on one line. "SUPPLY CO." follows on the same line in Archivo 500, width 100, tracking 0, at 45% of the cap height, baseline-aligned. Why: the brief already owns a heavy grotesque wordmark; this is the closest honest stand-in and the client's real mark drops straight in.
- Clear space: one cap-height on all sides. Minimum size 22px cap height.
- Appears: top-left of every page at 26px cap height; footer at 64px cap height as a stencil (letters cut with 2px bridges, drawn in CSS by a repeating gradient mask) to nod to the stencil cut on the shelter and carriers. Nowhere else. Never on product photography, never as a watermark, never in the favicon (favicon is the "9" alone).

## Repeating detail — the tape rule

Every horizontal rule on the site is a measuring tape: a 1px line in Rule `#2A2F37` with 1px ticks rising 4px every 8px and 8px every fifth tick. Drawn once as a CSS background on a `.rule` element and a `border-image` on tables. Why: girth is the whole returns problem; the tape is the thing on the back of the client's swing tag, so it becomes the thing that divides every row, heads every section, underlines every spec table, sits under the basket total and closes the footer. Companion detail: every product carries a two-digit number set in Archivo 900, which is how the index, the kits ("contains 01, 03, 05") and the "goes with" lines refer to things.

## Typography

*Revised after check-in 2 (third pass). The client's own wordmark is a heavy grotesque, so headlines, numbers and buttons follow it; body text is a serif for warmth.*

Self-hosted variable fonts in /public/fonts, loaded with `next/font/local`.

- **Archivo** (variable weight and width). The wordmark (900, width 112), all headings (800), item numbers and prices (800), buttons and chips (700). Why: it is the closest honest stand-in for the client's drawn grotesque, so the whole top layer of the site speaks in the wordmark's voice, and the width axis gives the mark its heft without a second family.
- **Newsreader** (variable weight and optical size). Body, spec tables, controls, small print, with tabular lining figures. Why: a warm, readable news serif chosen by the client; at 19px with optical size 18 it reads like a well-set paper.

Scale (size / line-height, px):

| Token | Face | Size | LH | Use |
|---|---|---|---|---|
| display | Archivo 800, −0.025em | 60 (mobile 40) | 1.0 | Hero headline only |
| h1 | Archivo 800, −0.02em | 40 (mobile 30) | 1.04 | Page titles, product name on product page |
| h2 | Archivo 800, −0.015em | 28 | 1.1 | Section titles |
| h3 | Archivo 700 | 20 | 1.15 | Product name in a row |
| num | Archivo 800, tabular | 28 | 1 | Item numbers, prices |
| btn | Archivo 700 | 16 | 1 | Buttons, chips |
| body | Newsreader 400, opsz 18 | 19 | 1.5 | Descriptions, policies |
| small | Newsreader 400 | 15 | 1.45 | Spec tables, controls, index |
| micro | Newsreader 500 | 13 | 1.4 | Lead-time notes, hints. Never uppercase, never tracked |

Wordmark: "NINE LIVES" in Hi-Vis, "SUPPLY CO." in cream, in both header and footer. No uppercase anywhere else.

## Colour

*Revised a third time after check-in 2. The client asked for warmth and a serif, then, on reflection, for a dark theme because the product is safety gear for the dark. This is the brief's "winter night" made warm: peat rather than blue-black, cream rather than white, a lamp in the frame.*

| Name | Hex | Role |
|---|---|---|
| Peat | `#1E1712` | Ground. ~65% of surface. A winter night with the lamp on. |
| Peat panel | `#2A211A` | The offer panel, notices, spec block, basket side. ~20%. |
| Peat deep | `#362A20` | Image frames before the photograph loads. |
| Twine | `#4E3F32` | Tape rules, table borders, input borders. Structural only. |
| Cream | `#F2EAD9` | Text. |
| Cream faded | `#B9A88F` | Secondary text, spec labels, index inactive. |
| Night | `#140F0B` | Footer ground. |
| **Hi-Vis** | `#D7FF3F` | The product colour and the action colour: every add-to-basket, the girth readout, selected chips, focus. Under 4%. It is the brightest thing on the page for the same reason it is the brightest thing on the road. |
| Lamp | `#E9A94F` | Warm links, kit savings, active index item, the "2 cm" figure. Under 2%. |
| Ember | `#E0663A` | Errors and the "cut to order" badge. Rarely. |

Colourway swatches unchanged: Slate `#5C6670`, Moss `#4A5A3E`, Ember `#B8481F`, Sand `#C7B48E`, Hi-Vis `#D7FF3F`. Square, 22px, selected one ringed in cream. Hi-Vis first and preselected.

Why dark, finally: the product is for being seen in the dark, and Hi-Vis only means something against night. Why warm: the client found cold darks unfriendly, and the photographs put a lit door in every frame; the interface is the room behind that door.

## Space

- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Max content width 1360. Index rail 208 fixed on desktop; content column fills the rest. 12-column grid inside the content column, 24 gutter.
- Section padding is not uniform: opening statement 96 top / 48 bottom; manifest section header 64 above / 16 below; manifest row 32 internal, rows separated by a tape rule with 0 extra space; product page 48 top; policy pages 64 top with a 640 measure.
- Corners: 0 everywhere. Buttons, inputs, swatches, images are square-cornered. Why: kraft box, stencil, swing tag. Warmth comes from the colour and the serif, not from rounding things off.
- Shadows: none. Depth comes from Panel on Night only.

## Imagery DNA

Executable paragraph, used verbatim in every prompt:

Two kinds of picture, one grade.

**Object shots** (manifest rows, product page first image):
> Product photographed alone as an object, resting on a worn flagstone doorstep at dusk, camera at table height looking slightly down. Warm light from a doorway to the left, like a kitchen light left on, giving soft long shadows to the right; a cool blue dusk fill from above. Reflective trim and hi-vis fabric catch the light and read brighter than anything else in frame. The stone is damp and falls off to a warm near-black at the edges. Lens feel 85mm, f/4, product sharp, background soft. Colour grade warm shadows, cool highlights, blacks lifted to a peat brown; the product's own colourway is the only saturated thing. No person, no hand, no props, no text, no logo, no puffin, no standing stone, no beach, no sunshine, no snow.

**Cat shots** (hero, section breaks, product page third image, about page):
> A real domestic cat, adult, ordinary (tabby, black, tortoiseshell or grey, never a pedigree, never a kitten), wearing the product and otherwise doing what cats do: sitting on a wet stone wall, coming in a back door, walking a farm track, curled in the shelter. Evening or night, real weather, wet fur where it makes sense. One warm light source in frame or just out of it: a lit window, an open door, a porch lamp, a car's headlights on a lane. The cat is not looking at the camera and nobody is holding it. Lens feel 50mm, f/2.8, cat sharp, background soft. Same grade: warm shadows, cool highlights, peat-brown blacks, hi-vis reads as the brightest thing. No people, no hands, no teacups, no props, no text, no logo, no puffin, no standing stone, no beach, no sunshine, no snow.

The rule that holds both: the cat looks like it lives there and the product looks like it is used.

Treatment applied identically to every generated image: crop to the layout ratio, levels so the darkest 2% clips to Peat night `#221A14`, saturation −10 except the Hi-Vis channel, 1px Rule border, no rounding.

## Motion raw material

Physical truths of the product, listed plainly. Phase 8 picks one.

1. Reflective tape flares when a light passes across it, then goes dull again.
2. A breakaway buckle snaps open under a pull of about a kilo.
3. Harness webbing slides through a tri-glide as you tighten it; two centimetres is the whole adjustment.
4. A tag on a split ring turns to face you.
5. The stencil is sprayed through a mask; the bridges leave gaps in the letters.
6. The shelter's door flap lifts and falls back.
7. The carrier's dome window is a bubble; things inside are seen through it.
8. Rain beads and runs off waxed fabric.
9. A tape measure is pulled round a chest and read.

## Motion (Phase 8, as built)

Signature move: **the tape pulled out.** Every tape rule on the site scales from 0 to full width, left to right, scrubbed to scroll position as it enters the viewport. Derived from physical truth 9 (a tape measure is pulled round a chest and read); it is the repeating detail doing its own job.

Budget of three, all tied to scroll:
1. Tape rules pulled out (signature; transform only, scrubbed).
2. Image frames, rows, cards and panels rise 12px and fade in on entering view (300 ms, ease-out, transform and opacity, once).
3. The hero image drifts up 12% as the page scrolls past it (scrubbed).

Never moves: the wordmark, prices, buttons, spec tables, the girth readout, basket totals, the index rail.

Reduced motion: the Motion component returns before starting Lenis or any tween; a CSS rule also cancels every animation and transition. The site is fully usable with no motion at all.
