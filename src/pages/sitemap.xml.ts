import { getCollection } from "astro:content";
import { SITE_CONFIG } from "../components/layout";
import products from "../data/products.json";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
}

export async function GET() {
  const base = SITE_CONFIG.url.replace(/\/$/, "");

  const posts = await getCollection("blog", (entry) => !entry.data.draft);

  const entries: SitemapEntry[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/blog", changefreq: "weekly", priority: 0.8 },
    { path: "/cv", changefreq: "monthly", priority: 0.7 },
    ...products.map((product) => ({
      path: `/${product.slug}`,
      changefreq: "monthly",
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}/`,
      lastmod: (post.data.updated_date ?? post.data.published_date).toISOString(),
      changefreq: "yearly",
      priority: 0.5,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${base}${entry.path}</loc>${
      entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""
    }
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
