import fs from "fs";
import path from "path";

// required for `output: export` — the sitemap is generated once at build time
export const dynamic = "force-static";

const BASE_URL = "https://ervflow.com";

type RouteMeta = { changefreq: string; priority: number };

/* Per-route tuning — routes not listed here get DEFAULTS */
const ROUTE_META: Record<string, RouteMeta> = {
  "/": { changefreq: "weekly", priority: 1.0 },
  "/pricing": { changefreq: "monthly", priority: 0.9 },
  "/services": { changefreq: "monthly", priority: 0.8 },
  "/blog": { changefreq: "weekly", priority: 0.8 },
  "/contact": { changefreq: "yearly", priority: 0.6 },
};
const DEFAULTS: RouteMeta = { changefreq: "monthly", priority: 0.7 };

/* Extra XML appended inside specific <url> entries */
const ROUTE_EXTRAS: Record<string, string> = {
  "/": `
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>ERVFlow — Visual Web Builder for Developers</image:title>
      <image:caption>Build stunning layouts with AI-powered component generation and Tailwind CSS</image:caption>
    </image:image>`,
};

const PAGE_FILES = ["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"];

/* Walk the app/ directory and collect every static route that has a page
   file, using the page file's mtime as <lastmod> */
function collectRoutes(dir: string, urlPath: string, out: Map<string, Date>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const pageFile = entries.find(
    (e) => e.isFile() && PAGE_FILES.includes(e.name)
  );
  if (pageFile) {
    out.set(urlPath || "/", fs.statSync(path.join(dir, pageFile.name)).mtime);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // skip API routes, private folders (_), parallel slots (@) and
    // dynamic segments ([id]) — those can't be listed as static URLs
    if (name === "api" || /^[_.@[]/.test(name)) continue;
    // route groups like (marketing) don't appear in the URL
    const isGroup = name.startsWith("(") && name.endsWith(")");
    collectRoutes(
      path.join(dir, name),
      isGroup ? urlPath : `${urlPath}/${name}`,
      out
    );
  }
}

export async function GET() {
  const routes = new Map<string, Date>();
  collectRoutes(path.join(process.cwd(), "app"), "", routes);
  // the sitemap route itself is picked up as a "page" folder — drop it
  routes.delete("/sitemap.xml");

  const urls = [...routes.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([route, mtime]) => {
      const { changefreq, priority } = ROUTE_META[route] ?? DEFAULTS;
      const loc = route === "/" ? `${BASE_URL}/` : `${BASE_URL}${route}`;
      const lastmod = mtime.toISOString().slice(0, 10);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>${ROUTE_EXTRAS[route] ?? ""}
  </url>`;
    })
    .join("\n\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xsi:schemaLocation="
    http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
    http://www.google.com/schemas/sitemap-image/1.1
    http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

${urls}

</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
