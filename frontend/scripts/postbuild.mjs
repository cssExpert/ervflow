#!/usr/bin/env node
/**
 * Makes Next.js CSS non-render-blocking by replacing:
 *   <link rel="stylesheet" href="...css" data-precedence="next"/>
 * with the preload + onload pattern, which eliminates the render-blocking
 * resource warning. Safe because our loader covers the page for 900ms,
 * by which time CSS has finished downloading on any reasonable connection.
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

// Add <link rel="preload" as="style"> hints BEFORE blocking stylesheets.
// This keeps CSS render-blocking (prevents CLS/FOUC) while telling the browser
// to start fetching CSS sooner, reducing the blocking window slightly.
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
