/**
 * generate-sitemap.js
 * Reads src/assets/blog/index.json and prints blog URLs for inclusion in sitemap.xml
 *
 * Usage:
 *   node tools/generate-sitemap.js
 */
import fs from "node:fs";

const baseUrl = "https://ctrlshiftit.ca";
const indexPath = new URL("../src/assets/blog/index.json", import.meta.url);

const posts = JSON.parse(fs.readFileSync(indexPath, "utf8"));

for (const p of posts) {
  console.log(`${baseUrl}/blog/${p.slug}`);
}
