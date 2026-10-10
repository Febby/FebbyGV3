// Astro configuration for Febby Gunawan's portfolio site.
// Tailwind CSS runs through PostCSS (see postcss.config.mjs).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://febbygunawan.com',
  // Astro 7 defaults to JSX whitespace rules, which drop spaces between
  // elements on separate lines. Keep the lossless Astro 6 behaviour.
  compressHTML: true,
  integrations: [sitemap()],
});
