// Astro configuration for Febby Gunawan's portfolio site.
// Tailwind CSS v4 runs as a Vite plugin; its config lives in src/styles/global.css.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://febbygunawan.com',
  // Astro 7 defaults to JSX whitespace rules, which drop spaces between
  // elements on separate lines. Keep the lossless Astro 6 behaviour.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
