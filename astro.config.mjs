import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL to the real public address before a release build.
// Preview builds use a placeholder and are marked noindex.
const SITE = process.env.SITE_URL || 'https://ironfuel.example';

export default defineConfig({
  site: SITE,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'ignore',
  build: {
    // External CSS only, so the Content-Security-Policy needs no 'unsafe-inline' for styles.
    inlineStylesheets: 'never',
  },
  integrations: [sitemap()],
  vite: {
    // Never inline scripts or assets: the Content-Security-Policy forbids inline script.
    build: { assetsInlineLimit: 0 },
  },
});
