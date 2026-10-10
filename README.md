# FebbyGV3

My personal portfolio site, live at [febbygunawan.com](https://febbygunawan.com). Built with Astro and Tailwind.

## What's in here

- `portfolio/` — the main site at [febbygunawan.com](https://febbygunawan.com). Uses Astro 7 + Tailwind 4, with a custom light/dark toggle, CSS variables, and self-hosted Inter / Space Grotesk fonts.

## Tech stack

- **Astro** for the static site foundation
- **Tailwind CSS** v4 for styling (configured in `src/styles/global.css` via `@theme`)
- **Fontsource** for self-hosted Inter + Space Grotesk
- **npm** as the package manager

## Running it

```bash
cd portfolio
npm install
npm run dev    # http://localhost:4321
```

Other useful commands:

```bash
npm run build    # build to ./dist/
npm run preview  # preview the build
npm run check    # type-check .astro and TS files
npm run astro -- --help
```

## Deployment

The portfolio is configured for `site: 'https://febbygunawan.com'` in `portfolio/astro.config.mjs`.
It's deployed on **Vercel** (settings in `portfolio/vercel.json`): every push to `main` deploys to production, and every pull request gets a preview deployment.
Vercel runs `npm ci` against the committed `package-lock.json`, then `npm run build`, and serves `dist/`. Security and caching headers are set in `vercel.json`.

GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci`, `npm run check` and `npm run build` on every push to `main` and on every pull request.

## SEO & discoverability

The portfolio now includes the basics for search and social sharing:

- Meta description, canonical URLs, and robots meta tags on every page.
- Open Graph and Twitter Card tags for link previews.
- JSON-LD `Person` structured data using the contact links in `portfolio/src/components/ContactSection.astro`.
- `sitemap.xml` and `robots.txt` generated via `@astrojs/sitemap`.
- Favicon (`public/favicon.svg`) and OG image placeholder (`public/og-image.jpg`).

If you want to improve rankings further:

1. Replace `public/og-image.jpg` with a real 1200×630 social-preview image.
2. Add Google Search Console and submit the sitemap.
3. Consider adding a `/now` or `/uses` page for additional indexable content.

## Pre-launch / deployment checklist

Run these before any deploy:

1. **Build and preview locally** — run `npm run build && npm run preview` in `portfolio/` and click through everything.
2. **Check old URLs** — if any old pages are indexed or linked, plan redirects so they don't 404.
3. **Test the theme toggle** — the current toggle uses `localStorage` and a `dark` class; make sure it behaves across page reloads.
4. **Deploy the `dist/` folder from `portfolio/`**.
5. **Point the DNS** to the new host and wait for propagation.

## Requirements

- **Node.js** `>=22.12.0` (defined in `portfolio/package.json`).
- Install dependencies with `npm install --legacy-peer-deps` if you hit peer-dependency conflicts.
