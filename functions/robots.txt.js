export async function onRequest(context) {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://superior7products.com/sitemap.xml`;

    return new Response(robotsContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}