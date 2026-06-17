#!/usr/bin/env node
/**
 * Adds <link rel="preload" as="style"> hints before each blocking stylesheet.
 * CSS remains render-blocking (prevents CLS/FOUC) but the browser starts
 * fetching it earlier, reducing the blocking window.
 *
 * NOTE: Making CSS fully async breaks Next.js's data-precedence CSS
 * reconciliation, causing visual regressions (e.g. Tailwind group-hover
 * variants stop working after client-side navigation). Preload hints are
 * the safe maximum we can do without critical CSS inlining.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

function walkHTML(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      files.push(...walkHTML(full));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const CSS_RE =
  /(<link rel="stylesheet" href="(\/_next\/static\/chunks\/[^"]+\.css)" data-precedence="[^"]*"\/>)/g;

let count = 0;
for (const file of walkHTML("./out")) {
  const original = readFileSync(file, "utf8");
  const patched = original.replace(CSS_RE, (match, _full, href) =>
    `<link rel="preload" href="${href}" as="style"/>${match}`
  );
  if (patched !== original) {
    writeFileSync(file, patched, "utf8");
    count++;
  }
}
console.log(`[postbuild] Added CSS preload hints to ${count} HTML files`);
