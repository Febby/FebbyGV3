# Inquiry form setup

## Architecture

Astro pages remain static. Both inquiry forms POST JSON to the same native Node.js Vercel Function at `/api/inquiry`. No Astro server adapter, SDK, database, or new dependency is needed. `npm run dev` and `npm run preview` serve the static site, not Vercel Functions; use a Vercel preview deployment (or Vercel CLI's `vercel dev`) for end-to-end delivery testing.

The function validates fields and a 32 KiB payload limit, checks the origin, rejects a honeypot, verifies a single-use Cloudflare Turnstile token (including hostname and action), then sends a plain-text email through Postmark. Tokens are not trusted without server-side verification. Turnstile prevents token replay across function instances; no unreliable in-memory rate counter is used. For additional protection if abuse occurs, configure a Vercel Firewall rate-limit rule for POST `/api/inquiry`, checking your plan's limits/costs first. No paid add-on is provisioned by this code.

The UI disables duplicate submits while pending, preserves input after failure, resets verification after each attempt, and announces submission/error states. A successful response means Postmark accepted the message, not that it reached the inbox. Provider requests time out without automatic email retries; ambiguous delivery failures ask the visitor to email before retrying.

## Configure the existing Vercel project's Preview environment first

Keep the existing project/root directory (`portfolio`) and its Git integration. Do not create a new hosting project, deploy with `--prod`, or merge to `main` during review.

| Environment variable | Purpose |
| --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public site key, baked into the static pages at build time. This is the only browser-exposed configuration. |
| `TURNSTILE_SECRET_KEY` | Server-only secret for that Turnstile widget. |
| `POSTMARK_SERVER_TOKEN` | Server-only Postmark server token. Never commit it or prefix it with `PUBLIC_`. |
| `POSTMARK_FROM_EMAIL` | A Postmark-verified sender address, normally `me@febbygunawan.com` once verified. The visitor is `ReplyTo`, never `From`. |
| `POSTMARK_MESSAGE_STREAM` | Optional transactional message stream ID; defaults to `outbound`. |
| `INQUIRY_ALLOWED_ORIGINS` | Optional comma-separated exact origins for preview aliases or local Vercel development. Production `https://febbygunawan.com` and the current `https://${VERCEL_URL}` are automatically allowed. No wildcard domains. |
| `SITE_NOINDEX` | Set `true` for any separate preview-only project or non-Vercel preview build. Standard Vercel Preview builds are automatically noindexed via `VERCEL_ENV=preview`. Never set this in the real production environment. |

1. Rotate any token pasted into chat, then enter its replacement using Vercel's environment-variable UI or a secure secret workflow. Do not put tokens in shell command arguments, logs, source code, or screenshots.
2. In Postmark, verify the sender address/domain, confirm the server can send live transactional mail (not a sandbox server), and use its server token. The destination is fixed in code as `me@febbygunawan.com`.
3. In Cloudflare, create a free Turnstile **Managed** widget. Allow the exact preview hostname you will test; add `febbygunawan.com` only when preparing the approved production rollout. Do not allow all `vercel.app` hosts. Configure both keys in Vercel Preview. Use a stable branch alias if available, adding its exact origin to `INQUIRY_ALLOWED_ORIGINS`. Add a commit-specific hostname if testing that URL instead.
4. Redeploy the existing preview after setting variables; the public site key and preview indexing flags are build-time values. Missing configuration fails closed and keeps a visible email alternative. Never configure Cloudflare test keys on a publicly reachable deployment with real Postmark credentials.
5. Send one clearly identified inquiry: name `Preview delivery test`, description beginning `TEST INQUIRY — preview validation; no client work requested`, with a reply address you control and no customer data. Record backend acceptance separately from Postmark's delivery status and actual recipient confirmation. Do not claim inbox receipt based on HTTP 200 alone.

Postmark and Turnstile configuration/account access must exist before real delivery can be verified. No Postmark calls are made by the unit tests. Tests use injected fake provider responses.

## Privacy and search

The visible notice names Febby as recipient, Vercel as request processor, Postmark as email processor, and Cloudflare Turnstile as spam-verification processor. No retention promise is made. The function does not log inquiry contents, tokens, or provider response bodies. Provider-side processing/logging follows the account settings and provider policies; no new database is created.

Preview HTML is `noindex, nofollow` while canonicals and sitemap URLs always reference `https://febbygunawan.com/`. Vercel also normally adds `X-Robots-Tag: noindex` to preview deployments; verify the deployed response. The existing production robots.txt crawler preferences are unchanged. Do not block preview crawling in robots.txt in a way that prevents crawlers seeing noindex. No new review/business schema is added.

## Checks

Run from `portfolio/`:

```sh
node --test tests/inquiry.test.mjs
npm run check
npm run build
```

Inspect the deployed `/api/inquiry` rather than assuming a static Astro preview exercises email delivery. Test both themes, responsive widths, keyboard validation/focus, failure recovery, duplicate pending submits, and the unchanged Three.js hero/cart behavior. Before production approval, configure production keys/hostname, verify sender and recipient, and repeat the delivery test there after an explicitly approved rollout.
