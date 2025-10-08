export async function onRequest(context) {
    const { request, env } = context;

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
    <url>
        <loc>https://superior7products.com/</loc>
        <lastmod>2025-09-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

    return new Response(sitemapContent, {
        headers: {
            'Content-Type': 'application/xml',
            'X-Robots-Tag': 'noindex'
        }
    });
}