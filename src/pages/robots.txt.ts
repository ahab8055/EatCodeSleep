import type { APIRoute } from 'astro';
import { SITE } from '@/lib/constants';

const getRobotsTxt = (sitemapURL: string) => `User-agent: *
Allow: /

# Keep crawl budget on marketing + insights pages
Disallow: /api/
Disallow: /cdn-cgi/

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? SITE.url;
  const sitemapURL = new URL('sitemap-index.xml', origin).href;

  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
