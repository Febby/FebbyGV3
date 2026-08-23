// Astro configuration for Febby Gunawan's portfolio site.
// This config enables Tailwind CSS via the official integration.
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://febbygunawan.com',
  integrations: [tailwind(), sitemap()],
});
