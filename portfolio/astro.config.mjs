// Astro configuration for Febby Gunawan's portfolio site.
// Tailwind CSS runs through PostCSS (see postcss.config.mjs).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://febbygunawan.com',
  integrations: [sitemap()],
});
