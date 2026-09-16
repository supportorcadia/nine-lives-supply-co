export type Colourway = "Hi-Vis" | "Slate" | "Moss" | "Ember" | "Sand";
export const COLOURWAYS: Colourway[] = ["Hi-Vis", "Slate", "Moss", "Ember", "Sand"];
export const COLOURWAY_HEX: Record<Colourway, string> = {
  "Hi-Vis": "#D7FF3F",
  Slate: "#5C6670",
  Moss: "#4A5A3E",
  Ember: "#B8481F",
  Sand: "#C7B48E",
};

export const SIZES = [
  { size: 1, min: 35, max: 40 },
  { size: 2, min: 40, max: 45 },
  { size: 3, min: 45, max: 50 },
  { size: 4, min: 50, max: 56 },
] as const;

export type SizeResult =
  | { kind: "size"; size: number; min: number; max: number; boundary: boolean }
  | { kind: "small" }
  | { kind: "large" }
  | { kind: "none" };

export function sizeForGirth(girth: number | null): SizeResult {
  if (girth === null || Number.isNaN(girth)) return { kind: "none" };
  if (girth < 35) return { kind: "small" };
  if (girth > 56) return { kind: "large" };
  // Between sizes, the smaller one: a boundary value belongs to the lower size.
  for (const s of SIZES) {
    if (girth >= s.min && girth <= s.max) {
      return { kind: "size", size: s.size, min: s.min, max: s.max, boundary: girth === s.max && s.size < 4 };
    }
  }
  return { kind: "none" };
}

export type SectionId = "on-the-cat" | "out-there" | "in-transit" | "indoor-months" | "kits";

export const SECTIONS: { id: SectionId; title: string; range: string; intro: string }[] = [
  { id: "on-the-cat", title: "On the cat", range: "01–09", intro: "What they wear out of the door. Collar first, tag on the collar, harness if they go on a lead." },
  { id: "out-there", title: "Out there", range: "10–12", intro: "For the cat who comes home when they feel like it. Somewhere warm and dry to wait for you, and something to eat that hasn't frozen." },
  { id: "in-transit", title: "In transit", range: "13–17", intro: "Vet, ferry, car. The bits that make a cat in a box less of an ordeal for both of you." },
  { id: "indoor-months", title: "Indoor months", range: "18–22", intro: "For the nights they decide to stay in with you. A short list, on purpose." },
  { id: "kits", title: "Kits", range: "23–25", intro: "The three combinations people buy together anyway, at a saving. Contents by number." },
];

export type Product = {
  no: string;
  slug: string;
  name: string;
  kind: string;
  price: number;
  section: SectionId;
  forLine: string;
  materials: string;
  description: string;
  colourways: boolean;
  sized?: boolean;
  engraved?: boolean;
  metal?: "brass" | "aluminium";
  tagAddon?: boolean;
  contains?: string[];
  saves?: number;
  goesWith?: string[];
  spec: [string, string][];
};

export const PRODUCTS: Product[] = [
  {
    no: "01", slug: "skerry-collar", name: "Skerry Collar", kind: "Reflective breakaway collar", price: 18, section: "on-the-cat",
    forLine: "So a driver sees them on a road with no streetlights.",
    materials: "16 mm reflective webbing, breakaway buckle, stainless D-ring. One size, 20–30 cm.",
    description: "The whole collar is reflective, not a stripe. In headlights it reads as a ring of light from about eighty metres, which is roughly the stopping distance of a car doing forty on a wet road. The buckle lets go at about a kilo of pull, so if the collar snags on a fence the cat leaves the collar behind rather than the other way round. We would rather you lost a collar than a cat, which is why it costs eighteen pounds and not thirty.",
    colourways: true, tagAddon: true, goesWith: ["03", "04", "05"],
    spec: [["Webbing", "16 mm, reflective through the weave"], ["Closure", "Breakaway buckle, releases at about 1 kg"], ["Fits", "Neck 20–30 cm"], ["Weight", "14 g"], ["Made in", "Orkney"]],
  },
  {
    no: "02", slug: "ness-collar", name: "Ness Collar", kind: "Wide reflective collar with tracker loop", price: 22, section: "on-the-cat",
    forLine: "For the bigger cat, and for a tracker.",
    materials: "20 mm reflective webbing, breakaway buckle, stainless D-ring, sewn loop for 05. One size, 24–36 cm.",
    description: "Wider than the Skerry, with a loop stitched in for the Noust Pouch so a tracker sits flat on the neck instead of swinging under it. Same buckle, same reflective weave. If your cat is over five kilos, or you're fitting a tracker, this is the one.",
    colourways: true, tagAddon: true, goesWith: ["03", "05"],
    spec: [["Webbing", "20 mm, reflective through the weave"], ["Closure", "Breakaway buckle, releases at about 1 kg"], ["Fits", "Neck 24–36 cm"], ["Tracker loop", "Takes 05 Noust Pouch"], ["Weight", "19 g"], ["Made in", "Orkney"]],
  },
  {
    no: "03", slug: "flag-tag-brass", name: "Flag Tag, brass", kind: "Engraved brass ID tag", price: 14, section: "on-the-cat",
    forLine: "Your phone number, cut into brass, on the collar before they go missing rather than after.",
    materials: "Solid brass, 22 mm, split ring. Engraved to order.",
    description: "Two lines. Line one is your phone number, and we won't cut a tag without one. Line two is optional: a second number, or \"chipped\". We don't put the cat's name on the front. Whoever finds it doesn't need to know what to call it; they need to know who to ring. Brass darkens over a winter and the engraving goes darker with it, which makes it easier to read, not harder.",
    colourways: false, engraved: true, metal: "brass", goesWith: ["01", "02"],
    spec: [["Metal", "Solid brass"], ["Size", "22 mm, 1.5 mm thick"], ["Engraving", "Two lines, cut to order"], ["Lead time", "Adds 3 working days"], ["Weight", "6 g"], ["Made in", "Orkney"]],
  },
  {
    no: "04", slug: "ayre-tag-aluminium", name: "Ayre Tag, aluminium", kind: "Engraved aluminium ID tag", price: 11, section: "on-the-cat",
    forLine: "The same tag, lighter, for the kitten or the fussy one.",
    materials: "Anodised aluminium, 22 mm, split ring. Engraved to order.",
    description: "Half the weight of the brass. Same two lines, same rule about the phone number. The anodising takes the engraving well and doesn't chip. Comes in the five colourways so it matches the collar, or clashes with it if you want it found faster.",
    colourways: true, engraved: true, metal: "aluminium", goesWith: ["01", "02"],
    spec: [["Metal", "Anodised aluminium"], ["Size", "22 mm, 1.2 mm thick"], ["Engraving", "Two lines, cut to order"], ["Lead time", "Adds 3 working days"], ["Weight", "3 g"], ["Made in", "Orkney"]],
  },
  {
    no: "05", slug: "noust-pouch", name: "Noust Pouch", kind: "Collar-mounted tracker pouch", price: 16, section: "on-the-cat",
    forLine: "Holds a tracker on the collar so you can find out where they actually go.",
    materials: "Waxed cotton, reflective binding, press stud. Fits AirTag, Tile, and the small Tractive.",
    description: "A noust is where you pull a boat up out of the weather. This is the same idea for a tracker: a pocket that sits on the collar, closes with a stud, and keeps the thing dry. Fits the Ness Collar loop directly; slides onto the Skerry with the strap on the back.",
    colourways: true, goesWith: ["02", "01"],
    spec: [["Outer", "Waxed cotton, reflective binding"], ["Closure", "Press stud"], ["Fits", "AirTag, Tile, Tractive Mini"], ["Weight", "9 g empty"], ["Made in", "Orkney"]],
  },
  {
    no: "06", slug: "geo-harness", name: "Geo Harness", kind: "Escape-proof vest harness, four sizes", price: 34, section: "on-the-cat",
    forLine: "For the cat who goes on a lead, and the person who wants them home on the same one.",
    materials: "Vest style, 400D ripstop, fleece edge, reflective piping, two tri-glides, one buckle. Four sizes by girth.",
    description: "A cat backs out of a harness by tucking its elbows and walking out of the neck. This one doesn't have a neck loop to walk out of; it's a vest that closes at the back with one buckle, and the only thing that matters is the girth. Measure round the chest behind the front legs, twice, when the cat is asleep. Two fingers under the strap is right. Three is a cat in a hedge.",
    colourways: true, sized: true, goesWith: ["07", "08", "09"],
    spec: [["Style", "Vest, closes at the back"], ["Outer", "400D ripstop, fleece edge"], ["Closure", "One buckle, two tri-glides"], ["Sizes", "1–4 by chest girth, 35–56 cm"], ["Reflective", "Piping, full outline"], ["Made in", "Orkney"]],
  },
  {
    no: "07", slug: "voe-lead", name: "Voe Lead", kind: "Short reflective lead", price: 16, section: "on-the-cat",
    forLine: "The short one.",
    materials: "1.8 m, 16 mm reflective webbing, swivel trigger clip, sewn handle.",
    description: "For pavements, vet car parks and the walk from the car to the door. The clip swivels so the lead doesn't twist the harness. Reflective the whole length, so at night the lead is the bit of you a driver sees first.",
    colourways: true, goesWith: ["06", "09"],
    spec: [["Length", "1.8 m"], ["Webbing", "16 mm, reflective"], ["Clip", "Swivel trigger, stainless"], ["Weight", "48 g"], ["Made in", "Orkney"]],
  },
  {
    no: "08", slug: "stack-line", name: "Stack Line", kind: "Long garden line", price: 22, section: "on-the-cat",
    forLine: "The long one, for the garden.",
    materials: "5 m, 12 mm reflective cord, swivel trigger clip, no handle.",
    description: "A cat on a five-metre line in a garden is a cat that's outside without being on the road. No handle because you don't hold it; you tie it off. Sheathed cord so it doesn't cut into a hedge or a hand.",
    colourways: true, goesWith: ["06", "09"],
    spec: [["Length", "5 m"], ["Cord", "12 mm sheathed, reflective"], ["Clip", "Swivel trigger, stainless"], ["Handle", "None. Tie it off."], ["Made in", "Orkney"]],
  },
  {
    no: "09", slug: "haar-harness", name: "Haar Harness", kind: "Fleece-lined winter harness, four sizes", price: 38, section: "on-the-cat",
    forLine: "The Geo, lined, for December.",
    materials: "Vest style, 400D ripstop outer, full fleece lining, reflective piping, one buckle. Four sizes by girth.",
    description: "Same cut as the Geo with the fleece all the way through instead of just the edges. Warmer, slightly stiffer, and it takes a size off the wriggle. If your cat only goes out on a lead in the worst of it, this is the one. Same rule: girth, twice, asleep.",
    colourways: true, sized: true, goesWith: ["07", "08", "06"],
    spec: [["Style", "Vest, closes at the back"], ["Outer", "400D ripstop"], ["Lining", "Full fleece"], ["Closure", "One buckle, two tri-glides"], ["Sizes", "1–4 by chest girth, 35–56 cm"], ["Made in", "Orkney"]],
  },
  {
    no: "10", slug: "bothy-shelter", name: "Bothy Shelter", kind: "Insulated outdoor cat shelter", price: 96, section: "out-there",
    forLine: "Somewhere warm and dry to wait until you're home.",
    materials: "Insulated twin-wall shell, 50 mm closed-cell foam, kraft-lined floor raised 40 mm, offset door with weighted flap, stencilled lid. 58 × 44 × 40 cm.",
    description: "It's an insulated box with the door on the side, not the front, so the wind doesn't go straight in. The floor is up off the ground so damp doesn't come up through it. Put straw in it, not a blanket; a blanket holds water and a wet cat in a wet blanket is colder than no shelter at all. One cat fits comfortably. Two cats will argue about it, and we can't help with that.",
    colourways: true, goesWith: ["11", "12"],
    spec: [["Shell", "Twin-wall, 50 mm closed-cell foam"], ["Floor", "Raised 40 mm, kraft lined"], ["Door", "Offset side, weighted flap"], ["Size", "58 × 44 × 40 cm"], ["Weight", "3.2 kg"], ["Made in", "Orkney"]],
  },
  {
    no: "11", slug: "ware-feeding-station", name: "Ware Feeding Station", kind: "Covered outdoor feeding station", price: 42, section: "out-there",
    forLine: "Food that stays dry and out of the gulls.",
    materials: "Powder-coated steel frame, two-bowl tray, hinged lid with a lip, ground pegs. Bowls included.",
    description: "A covered tray for two bowls with a lid that overhangs enough to keep horizontal rain off the food. Pegs into the ground so it stays where you put it. The lid lifts from the front, which a cat learns in an evening and a gull doesn't.",
    colourways: true, goesWith: ["10", "12"],
    spec: [["Frame", "Powder-coated steel"], ["Tray", "Two bowls, included"], ["Lid", "Hinged, front-opening, 30 mm lip"], ["Fixing", "Four ground pegs"], ["Size", "42 × 26 × 18 cm"], ["Made in", "Orkney"]],
  },
  {
    no: "12", slug: "ware-bowl", name: "Ware Bowl", kind: "Insulated water bowl", price: 18, section: "out-there",
    forLine: "The water bowl that's still water in the morning.",
    materials: "Double-wall stainless, 400 ml, rubber base.",
    description: "An insulated bowl. It won't stop a hard frost but it holds water through most nights here, and it sits on the tray of the Feeding Station or on its own by the door.",
    colourways: false, goesWith: ["11", "10"],
    spec: [["Body", "Double-wall stainless"], ["Capacity", "400 ml"], ["Base", "Rubber, non-slip"], ["Weight", "210 g"], ["Made in", "Orkney"]],
  },
  {
    no: "13", slug: "noup-backpack-carrier", name: "Noup Backpack Carrier", kind: "Backpack cat carrier with dome window", price: 105, section: "in-transit",
    forLine: "For the ferry, the vet, and the cat who would rather see where they're going.",
    materials: "Ripstop shell, welded frame, clear dome window, mesh sides, padded straps, waterproof base, stencilled front. 34 × 28 × 44 cm, up to 8 kg.",
    description: "The dome is a bubble window at the front, so the cat can see where it's going instead of guessing from the noise. It's a backpack because on a ferry you need both hands. Waterproof base for the deck, mesh for the air, and the frame stops the whole thing folding in on the cat when you put it down.",
    colourways: true, goesWith: ["17", "15", "16"],
    spec: [["Shell", "Ripstop over welded frame"], ["Window", "Clear dome, 180 mm"], ["Base", "Waterproof, wipe-down"], ["Size", "34 × 28 × 44 cm"], ["Load", "Up to 8 kg"], ["Made in", "Orkney"]],
  },
  {
    no: "14", slug: "geo-carrier", name: "Geo Carrier", kind: "Car cat carrier, side and top doors", price: 64, section: "in-transit",
    forLine: "The one that goes in the car.",
    materials: "Ripstop shell, side and top door, mesh panel, removable waxed base, seatbelt loop. 46 × 30 × 30 cm.",
    description: "Side door for loading a cat that doesn't want to go in; top door for the vet to lift it out without a fight. The base wipes down. The loop takes a seatbelt so the carrier stays on the seat when you brake.",
    colourways: true, goesWith: ["17", "15"],
    spec: [["Shell", "Ripstop"], ["Doors", "Side and top"], ["Base", "Removable, waxed"], ["Fixing", "Seatbelt loop"], ["Size", "46 × 30 × 30 cm"], ["Made in", "Orkney"]],
  },
  {
    no: "15", slug: "ayre-mat", name: "Ayre Mat", kind: "Waxed travel mat", price: 24, section: "in-transit",
    forLine: "A dry square to sit on.",
    materials: "Waxed cotton top, fleece back, rolls to a tube. 60 × 45 cm.",
    description: "Goes in either carrier, on the vet's table, or on the seat of the car. Waxed side down keeps the damp out; fleece side up is what the cat sits on. Rolls up and lives in the door pocket.",
    colourways: true, goesWith: ["13", "14"],
    spec: [["Top", "Fleece"], ["Back", "Waxed cotton"], ["Size", "60 × 45 cm"], ["Rolled", "45 × 8 cm"], ["Made in", "Orkney"]],
  },
  {
    no: "16", slug: "voe-travel-bowl", name: "Voe Travel Bowl", kind: "Folding travel bowl", price: 12, section: "in-transit",
    forLine: "Water on the ferry.",
    materials: "Silicone, folds flat, 250 ml, carabiner.",
    description: "Folds to the thickness of a coaster and clips to the carrier. Not for leaving out; that's what 12 is for.",
    colourways: true, goesWith: ["13", "12"],
    spec: [["Body", "Silicone, folds flat"], ["Capacity", "250 ml"], ["Clip", "Carabiner"], ["Folded", "12 mm"], ["Made in", "Orkney"]],
  },
  {
    no: "17", slug: "haar-liner", name: "Haar Liner", kind: "Fleece carrier liner", price: 22, section: "in-transit",
    forLine: "The fleece bit for the carriers.",
    materials: "Deep-pile fleece, elasticated corners, machine washable. Fits 13 and 14.",
    description: "Sits in the base of either carrier and stays put. Washes at forty. Buy two so one is always dry.",
    colourways: true, goesWith: ["13", "14"],
    spec: [["Fleece", "Deep pile"], ["Fit", "13 and 14, elasticated corners"], ["Wash", "40°"], ["Made in", "Orkney"]],
  },
  {
    no: "18", slug: "bool", name: "Bool", kind: "Rubber ball", price: 8, section: "indoor-months",
    forLine: "A ball with grip.",
    materials: "Natural rubber, textured, 45 mm.",
    description: "Heavy enough to roll straight on a flagstone floor, textured enough to be picked up in teeth. That's all it does.",
    colourways: true,
    spec: [["Material", "Natural rubber"], ["Size", "45 mm"], ["Weight", "38 g"], ["Made in", "Orkney"]],
  },
  {
    no: "19", slug: "tangle", name: "Tangle", kind: "Rope kicker toy", price: 10, section: "indoor-months",
    forLine: "Rope to wreck.",
    materials: "Cotton rope, knotted, hand length.",
    description: "A knotted length of rope for a cat that needs something to kick. It frays, that's the point. Replace it when it's mostly loose.",
    colourways: true,
    spec: [["Material", "Cotton rope"], ["Length", "18 cm"], ["Made in", "Orkney"]],
  },
  {
    no: "20", slug: "limpet", name: "Limpet", kind: "Weighted wobble toy", price: 14, section: "indoor-months",
    forLine: "Won't fall over.",
    materials: "Weighted base, felted wool top.",
    description: "Rocks back up every time. Kept indoors because the wool is wool.",
    colourways: true,
    spec: [["Base", "Weighted"], ["Top", "Felted wool"], ["Height", "70 mm"], ["Made in", "Orkney"]],
  },
  {
    no: "21", slug: "tirl-wand", name: "Tirl Wand", kind: "Wand toy, wool tail", price: 12, section: "indoor-months",
    forLine: "Something on a string, without the feathers.",
    materials: "Ash handle, elastic cord, wool tail.",
    description: "No feathers because feathers end up in a cat. Wool tail on elastic, so it moves like something alive and survives being caught.",
    colourways: true,
    spec: [["Handle", "Ash, 40 cm"], ["Cord", "Elastic, 60 cm"], ["Tail", "Wool"], ["Made in", "Orkney"]],
  },
  {
    no: "22", slug: "kist-tunnel", name: "Kist Tunnel", kind: "Folding play tunnel", price: 26, section: "indoor-months",
    forLine: "A tunnel that folds into a box.",
    materials: "Sprung steel hoop, ripstop cover, two ends open. 90 cm long, folds flat.",
    description: "For the hallway. Springs open, folds away, and the cover is the same ripstop as the carriers so it lasts more than one winter.",
    colourways: true,
    spec: [["Frame", "Sprung steel"], ["Cover", "Ripstop"], ["Length", "90 cm"], ["Folded", "30 cm disc"], ["Made in", "Orkney"]],
  },
  {
    no: "23", slug: "out-after-dark-kit", name: "Out After Dark Kit", kind: "Collar, brass tag and tracker pouch", price: 42, section: "kits", saves: 6,
    forLine: "The first three things. Collar so they're seen, tag so they're brought back, pouch so you know where they are.",
    materials: "Contains 01 Skerry Collar, 03 Flag Tag brass, 05 Noust Pouch.",
    description: "Collar so they're seen, tag so they're brought back, pouch so you know where they are. Tag engraved to order: adds three working days.",
    colourways: true, engraved: true, metal: "brass", contains: ["01", "03", "05"],
    spec: [["Contains", "01, 03, 05"], ["Saves", "£6 on buying them separately"], ["Lead time", "Adds 3 working days for the tag"]],
  },
  {
    no: "24", slug: "on-the-lead-kit", name: "On the Lead Kit", kind: "Harness, lead and brass tag", price: 56, section: "kits", saves: 8,
    forLine: "Harness by girth, the short lead, and the tag.",
    materials: "Contains 06 Geo Harness, 07 Voe Lead, 03 Flag Tag brass.",
    description: "Harness by girth, the short lead, and the tag. Tag engraved to order: adds three working days.",
    colourways: true, sized: true, engraved: true, metal: "brass", contains: ["06", "07", "03"],
    spec: [["Contains", "06, 07, 03"], ["Saves", "£8 on buying them separately"], ["Harness", "Sized by girth"], ["Lead time", "Adds 3 working days for the tag"]],
  },
  {
    no: "25", slug: "staying-out-kit", name: "Staying Out Kit", kind: "Shelter, feeding station and bowl", price: 138, section: "kits", saves: 18,
    forLine: "For the cat who has decided they live in the garden now.",
    materials: "Contains 10 Bothy Shelter, 11 Ware Feeding Station, 12 Ware Bowl.",
    description: "For the cat that has decided it lives in the garden. Shelter, dry food, unfrozen water.",
    colourways: true, contains: ["10", "11", "12"],
    spec: [["Contains", "10, 11, 12"], ["Saves", "£18 on buying them separately"], ["Ships", "One parcel, 4.1 kg"]],
  },
];

export const byNo = (no: string) => PRODUCTS.find((p) => p.no === no)!;
export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const gbp = (n: number) => `£${n}`;
export const isUkPhone = (s: string) => /^(\+44\s?|0)\d[\d\s]{8,12}$/.test(s.trim());

// The object photographs are square except the three big items, which were shot wider.
export const WIDE_SHOTS = ["10", "13", "25"];
export function objectRatio(no: string): string { return WIDE_SHOTS.includes(no) ? "4/3" : "1/1"; }
