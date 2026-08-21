// Post-build prerender: writes a static HTML file per route with real
// <title>, meta description, canonical and OG tags so crawlers (and GitHub
// Pages, which has no SSR) see content without executing JavaScript.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE_URL = "https://www.saswattripathi.com.np";
const MAX_PAGES = 500;

const siteSrc = fs.readFileSync(path.join(root, "src/lib/site.ts"), "utf8");

const section = (from, to) => {
  const a = siteSrc.indexOf(from);
  const b = to ? siteSrc.indexOf(to) : siteSrc.length;
  return siteSrc.slice(a, b === -1 ? siteSrc.length : b);
};

const field = (block, name) => {
  const m = block.match(new RegExp(`\\b${name}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? m[1].replace(/\\"/g, '"') : "";
};

const parse = (text) => {
  const out = [];
  const re = /slug:\s*"([^"]+)"/g;
  const marks = [];
  let m;
  while ((m = re.exec(text))) marks.push({ slug: m[1], i: m.index });
  marks.forEach((mk, i) => {
    const block = text.slice(mk.i, marks[i + 1]?.i ?? text.length);
    out.push({ slug: mk.slug, block });
  });
  return out;
};

const services = parse(section("export const SERVICES", "export const POSTS")).map((s) => ({
  path: `/services/${s.slug}`,
  title: field(s.block, "title"),
  description: field(s.block, "description"),
  changefreq: "monthly",
  priority: "0.9",
}));

const posts = parse(section("export const POSTS")).map((p) => ({
  path: `/blog/${p.slug}`,
  title: field(p.block, "metaTitle") || field(p.block, "title"),
  description: field(p.block, "description"),
  type: "article",
  changefreq: "monthly",
  priority: "0.7",
}));

const staticPages = [
  {
    path: "/",
    title: "Saswat Tripathi — ERP Project Manager & Software Consultant in Nepal",
    description:
      "Project Manager at Neosoftware, Lalitpur. ERP development, HR & payroll software, AI agents and software consulting for businesses in Nepal. 5+ years building home-grown ERP systems.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/consulting",
    title: "Software & ERP Consulting in Nepal — Saswat Tripathi",
    description:
      "Independent ERP and software consulting in Nepal: vendor selection, architecture review, delivery rescue and AI automation strategy.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/blog",
    title: "Blog — ERP, HR Software & AI Agents in Nepal | Saswat Tripathi",
    description:
      "Practical writing on ERP buying, HR and payroll software, and AI agents for Nepali businesses — from someone who ships them.",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/tools",
    title: "Free Nepal Tools — Tax, Loan, Date Converter & More",
    description:
      "Free browser tools: Nepal salary tax estimator, EMI calculator, BS/AD date converter, unit and unicode converters, QR generator and more.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/games",
    title: "Free Browser Games Arcade — Play Instantly, No Download",
    description:
      "A free browser arcade: 2048, Tetris, Minesweeper, Breakout, Snake, Sudoku and more. Play instantly in a popup, no download or sign-up.",
    priority: "0.8",
    changefreq: "monthly",
  },
];

const routes = [...staticPages, ...services, ...posts].slice(0, MAX_PAGES);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const headFor = (r) => {
  const url = `${SITE_URL}${r.path}`;
  return `    <title>${esc(r.title)}</title>
    <meta name="description" content="${esc(r.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(r.title)}" />
    <meta property="og:description" content="${esc(r.description)}" />
    <meta property="og:type" content="${r.type || "website"}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(r.title)}" />
    <meta name="twitter:description" content="${esc(r.description)}" />`;
};

let written = 0;
for (const r of routes) {
  let html = template
    // drop the template's static head tags so we do not emit duplicates
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace(/\s*<meta property="og:title"[^>]*>/, "")
    .replace(/\s*<meta property="og:description"[^>]*>/, "")
    .replace(/\s*<meta property="og:type"[^>]*>/, "")
    .replace(/\s*<meta name="twitter:card"[^>]*>/, "")
    .replace("</head>", `${headFor(r)}\n  </head>`);

  const outDir = r.path === "/" ? dist : path.join(dist, r.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  written++;
}

// SPA fallback shares the homepage shell
fs.writeFileSync(path.join(dist, "404.html"), fs.readFileSync(path.join(dist, "index.html")));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.6"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

console.log(`prerendered ${written} routes + sitemap.xml`);
