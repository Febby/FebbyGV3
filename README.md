# FebbyGV3

My personal portfolio site — still a work in progress. Built with Astro and Tailwind.

## What's in here

- `portfolio/` — the main site at [febbygunawan.com](https://febbygunawan.com). Uses Astro 6 + Tailwind 3, with a custom light/dark toggle, CSS variables, and Inter / Space Grotesk from Google Fonts.
- `blog/` — blog experiments. Astro 5 + Tailwind 4 + React. Also has Octokit for GitHub stuff, reading-time for post estimates, and a sitemap.

## Tech stack

- **Astro** for the static site foundation
- **Tailwind CSS** for styling (v3 in the portfolio, v4 in the blog)
- **React** only in the blog for interactive bits
- **Octokit** for pulling GitHub data into the blog
- **Google Fonts** (Inter + Space Grotesk)
- **npm** as the package manager

## Running it

Both apps are separate packages. Pick one:

```bash
cd portfolio  # or cd blog
npm install
npm run dev    # http://localhost:4321
```

Other useful commands:

```bash
npm run build    # build to ./dist/
npm run preview  # preview the build
```

For the blog, you can also run Astro CLI commands with:

```bash
npm run astro -- --help
```

## Deployment

Since these are static Astro builds, you can deploy the `dist/` folder pretty much anywhere:

- **Vercel** or **Netlify** — easiest if you want git push deploys and preview branches
- **Cloudflare Pages** — good if you want CDN + custom domain
- **GitHub Pages** — free and simple enough for a personal site
- **Any static host** — just upload the contents of `dist/`

The portfolio is already configured for `site: 'https://febbygunawan.com'` in `astro.config.mjs`.

## Replacing the old portfolio at febbygunawan.com

A few things I'm keeping in mind before flipping the switch:

1. **Build first, preview locally** — run `npm run build && npm run preview` in `portfolio/` and click through everything.
2. **Check the old URLs** — if any old pages are indexed or linked, plan redirects so they don't 404.
3. **SEO basics** — make sure `<title>`, meta descriptions, and heading structure are in place before going live.
4. **Test the theme toggle** — the current toggle uses `localStorage` and a `dark` class; make sure it behaves across page reloads.
5. **Deploy the `dist/` folder from `portfolio/`**, not the blog — unless I want to combine them later.
6. **Point the DNS** to the new host and wait for it to propagate before considering it done.
