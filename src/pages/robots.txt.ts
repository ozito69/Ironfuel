import type { APIRoute } from 'astro';
import { IS_RELEASE, SITE_URL } from '../data/site';

export const GET: APIRoute = () =>
  new Response(
    IS_RELEASE
      ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
      : `User-agent: *\nDisallow: /\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
