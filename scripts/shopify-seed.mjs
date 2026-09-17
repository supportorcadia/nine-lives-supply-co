#!/usr/bin/env node
// Loads the catalogue (lib/catalogue.ts) into the Shopify store as products with
// Colourway and Size options, prices in GBP, SKUs, images, and publishes them to the
// sales channels. Safe to re-run: products are matched by handle and replaced in place.
//
// Runs through the Shopify CLI's store connection, so first:
//   shopify store auth --store <shop>.myshopify.com --scopes write_products,read_products,write_publications,read_publications
// then:
//   node scripts/shopify-seed.mjs --store <shop>.myshopify.com [--images https://nine-lives-supply-co.vercel.app] [--only 01,02]

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true] : [])).filter((x) => x.length));
const STORE = args.store || process.env.SHOPIFY_STORE_DOMAIN;
const IMAGES = (args.images || "https://nine-lives-supply-co.vercel.app").replace(/\/$/, "");
const ONLY = typeof args.only === "string" ? args.only.split(",") : null;
if (!STORE) { console.error("Pass --store <shop>.myshopify.com"); process.exit(1); }

// ---- read the catalogue without a TypeScript toolchain: evaluate the data parts only
const src = readFileSync(new URL("../lib/catalogue.ts", import.meta.url), "utf8");
const grab = (name) => {
  const m = src.match(new RegExp(`export const ${name}[^=]*= (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`Could not read ${name} from lib/catalogue.ts`);
  return Function(`"use strict"; return (${m[1]});`)();
};
const PRODUCTS = grab("PRODUCTS");
const COLOURWAYS = ["Hi-Vis", "Slate", "Moss", "Ember", "Sand"];
const SIZES = [1, 2, 3, 4];
const SECTION_TITLE = { "on-the-cat": "On the cat", "out-there": "Out there", "in-transit": "In transit", "indoor-months": "Indoor months", kits: "Kits" };

// ---- Admin API through the CLI
function gql(query, variables = {}, { mutate = false } = {}) {
  const out = execFileSync("shopify", [
    "store", "execute", "--store", STORE, "--json", "--query", query, "--variables", JSON.stringify(variables),
    ...(mutate ? ["--allow-mutations"] : []),
  ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
  const start = out.indexOf("{");
  const json = JSON.parse(out.slice(start));
  const data = json.data ?? json;
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors));
  return data;
}

const slugColour = (c) => c.toLowerCase().replace("-", "");
const skuFor = (p, colour, size) => ["NL", p.no, colour ? colour.toUpperCase().replace("-", "") : null, size ? `S${size}` : null].filter(Boolean).join("-");

function productInput(p, existingId) {
  const options = [];
  if (p.colourways) options.push({ name: "Colourway", position: 1, values: COLOURWAYS.map((name) => ({ name })) });
  if (p.sized) options.push({ name: "Size", position: options.length + 1, values: SIZES.map((s) => ({ name: String(s) })) });

  const combos = [];
  const colours = p.colourways ? COLOURWAYS : [null];
  const sizes = p.sized ? SIZES : [null];
  for (const c of colours) for (const s of sizes) combos.push([c, s]);

  const variants = combos.map(([c, s]) => ({
    price: p.price.toFixed(2),
    sku: skuFor(p, c, s),
    inventoryPolicy: "CONTINUE",
    optionValues: [
      ...(c ? [{ optionName: "Colourway", name: c }] : []),
      ...(s ? [{ optionName: "Size", name: String(s) }] : []),
    ],
  }));
  // A product with no options still needs one variant with the default option value.
  if (!options.length) {
    options.push({ name: "Title", position: 1, values: [{ name: "Default Title" }] });
    variants[0].optionValues = [{ optionName: "Title", name: "Default Title" }];
  }

  const html = [
    `<p>${escape(p.forLine)}</p>`,
    `<p>${escape(p.description)}</p>`,
    `<p><strong>Materials.</strong> ${escape(p.materials)}</p>`,
    `<table>${p.spec.map(([k, v]) => `<tr><th>${escape(k)}</th><td>${escape(v)}</td></tr>`).join("")}</table>`,
    p.contains ? `<p>Contains ${p.contains.join(", ")}.</p>` : "",
  ].join("");

  const tags = [`no-${p.no}`, SECTION_TITLE[p.section], p.engraved ? "engraved" : null, p.sized ? "sized" : null, p.contains ? "kit" : null].filter(Boolean);

  return {
    ...(existingId ? { id: existingId } : {}),
    title: `${p.no} ${p.name}`,
    handle: p.slug,
    descriptionHtml: html,
    productType: p.kind,
    vendor: "Nine Lives Supply Co.",
    status: "ACTIVE",
    tags,
    productOptions: options,
    variants,
  };
}
const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PRODUCT_SET = `mutation SetProduct($input: ProductSetInput!) {
  productSet(input: $input, synchronous: true) {
    product { id handle variants(first: 50) { nodes { id sku } } media(first: 30) { nodes { id alt } } }
    userErrors { field message code }
  }
}`;
const FIND = `query Find($q: String!) { products(first: 1, query: $q) { nodes { id handle media(first: 30) { nodes { id alt } } } } }`;
const ADD_MEDIA = `mutation AddMedia($productId: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $productId, media: $media) { media { id alt status } mediaUserErrors { field message code } }
}`;
const VARIANT_MEDIA = `mutation VariantMedia($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) { userErrors { field message } }
}`;
const PUBLICATIONS = `{ publications(first: 20) { nodes { id name } } }`;
const PUBLISH = `mutation Publish($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) { userErrors { field message } }
}`;

const publications = gql(PUBLICATIONS).publications.nodes;
console.log("Publications:", publications.map((p) => p.name).join(", "));

const todo = PRODUCTS.filter((p) => !ONLY || ONLY.includes(p.no));
for (const p of todo) {
  // 1. Create or replace the product and its variants.
  const found = gql(FIND, { q: `handle:${p.slug}` }).products.nodes[0];
  const res = gql(PRODUCT_SET, { input: productInput(p, found?.id) }, { mutate: true }).productSet;
  if (res.userErrors?.length) { console.error(`${p.no} ${p.name}:`, res.userErrors); continue; }
  const product = res.product;
  const variantBySku = new Map(product.variants.nodes.map((v) => [v.sku, v.id]));

  // 2. Images: the Hi-Vis shot plus each colourway shot, alt text names the colour so it
  //    can be found again on a re-run.
  const wanted = (p.colourways ? COLOURWAYS : ["Hi-Vis"]).map((c) => ({ colour: c, alt: `${p.no} ${p.name} in ${c}`, url: `${IMAGES}/images/${p.no}-object-${slugColour(c)}.jpg` }));
  const have = new Map(product.media.nodes.map((m) => [m.alt, m.id]));
  const missing = wanted.filter((w) => !have.has(w.alt));
  if (missing.length) {
    const added = gql(ADD_MEDIA, { productId: product.id, media: missing.map((w) => ({ alt: w.alt, mediaContentType: "IMAGE", originalSource: w.url })) }, { mutate: true }).productCreateMedia;
    if (added.mediaUserErrors?.length) console.error(`${p.no} media:`, added.mediaUserErrors);
    for (const m of added.media ?? []) have.set(m.alt, m.id);
  }

  // 3. Point each variant at the image of its colour (once the media has been processed).
  if (p.colourways) {
    const variants = [];
    for (const c of COLOURWAYS) {
      const mediaId = have.get(`${p.no} ${p.name} in ${c}`);
      if (!mediaId) continue;
      for (const s of p.sized ? SIZES : [null]) {
        const id = variantBySku.get(skuFor(p, c, s));
        if (id) variants.push({ id, mediaId });
      }
    }
    if (variants.length) {
      // Media must be READY before it can be attached; retry a few times.
      for (let attempt = 0; attempt < 6; attempt++) {
        const r = gql(VARIANT_MEDIA, { productId: product.id, variants }, { mutate: true }).productVariantsBulkUpdate;
        if (!r.userErrors?.length) break;
        if (attempt === 5) console.error(`${p.no} variant images:`, r.userErrors);
        else execFileSync("sleep", ["4"]);
      }
    }
  }

  // 4. Publish to every sales channel the store has (Online Store, Headless, …).
  const pub = gql(PUBLISH, { id: product.id, input: publications.map((x) => ({ publicationId: x.id })) }, { mutate: true }).publishablePublish;
  if (pub.userErrors?.length) console.error(`${p.no} publish:`, pub.userErrors);

  console.log(`${found ? "Updated" : "Created"} ${p.no} ${p.name}: ${product.variants.nodes.length} variants, ${have.size} images`);
}
console.log("Done.");
