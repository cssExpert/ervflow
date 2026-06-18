#!/usr/bin/env node
/**
 * Makes Next.js CSS non-render-blocking while preserving data-precedence.
 *
 * Strategy: keep the <link> element exactly as Next.js emits it (so React
 * hydration reconciliation via data-precedence still works), but add
 * media="print" so the browser doesn't block render on it. onload="" switches
 * media back to "all" once the file is fetched. A <link rel="preload"> is
 * prepended so the fetch starts as early as possible.
 *
 * The previous attempt removed the original <link> entirely, which broke
 * Next.js CSS reconciliation (Tailwind group-hover/card variants disappeared
 * after client-side navigation). This approach keeps the element in the DOM.
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

// Matches: <link rel="stylesheet" href="/_next/static/chunks/foo.css" data-precedence="VALUE"/>
const CSS_RE =
  /<link rel="stylesheet" href="(\/_next\/static\/chunks\/[^"]+\.css)" data-precedence="([^"]*)"\s*\/>/g;

let count = 0;
for (const file of walkHTML("./out")) {
  const original = readFileSync(file, "utf8");
  const patched = original.replace(CSS_RE, (_match, href, precedence) =>
    // 1. Preload hint — browser fetches the file at high priority immediately
    `<link rel="preload" href="${href}" as="style"/>` +
    // 2. Original link preserved with data-precedence (React finds it during hydration)
    //    media="print" stops the browser blocking render; onload restores media="all"
    `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" data-precedence="${precedence}"/>`
  );
  if (patched !== original) {
    writeFileSync(file, patched, "utf8");
    count++;
  }
}
console.log(`[postbuild] Made CSS non-blocking in ${count} HTML files`);
