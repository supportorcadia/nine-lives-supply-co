#!/usr/bin/env node
// Writes lib/image-manifest.json: the list of photographs in public/images, without the .jpg.
// Frame uses it to know an image exists before asking for it, so pages never request
// photographs that were never made (no 404s in the console, no wasted requests).
// Runs automatically before `next dev` and `next build`.
import { readdirSync, writeFileSync } from "node:fs";
const ids = readdirSync(new URL("../public/images/", import.meta.url))
  .filter((f) => f.endsWith(".jpg"))
  .map((f) => f.slice(0, -4))
  .sort();
writeFileSync(new URL("../lib/image-manifest.json", import.meta.url), JSON.stringify(ids, null, 0) + "\n");
console.log(`image manifest: ${ids.length} photographs`);
