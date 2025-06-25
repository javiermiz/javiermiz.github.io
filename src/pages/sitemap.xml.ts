import { SITE_CONFIG } from '../components/layout';

export async function GET() {
  const pages = [
    {
      url: SITE_CONFIG.url,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}es/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 