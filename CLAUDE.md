# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run develop       # Start local dev server at localhost:8000
npm run build         # Production build
npm run serve         # Serve the production build locally
npm run clean         # Clear Gatsby cache (.cache and public/)
npm run format        # Format with Prettier

# Worker (Cloudflare Worker for contact form emails)
cd worker && npx wrangler dev src/index.js   # Local worker dev
cd worker && npx wrangler publish            # Deploy worker
```

No test suite is configured (`npm test` exits with an error by default).

## Architecture

**Gatsby 2 static site** hosted on Netlify. Content is stored in JSON files under `src/content/` (not fetched from a live CMS at runtime — the Cosmic CMS integration via `gatsby-source-cosmicjs` is configured in `gatsby-config.js` but content has been migrated to local JSON).

### Localization

Two supported locales: `en-GB` (default) and `uk-UA`. The URL scheme is:
- English: `/products`, `/contact`, etc. (no locale prefix)
- Ukrainian: `/uk-UA/products`, `/uk-UA/contact`, etc.

`gatsby-node.js` drives all page creation. It iterates over `langs = ["en-GB", "uk-UA"]` and calls `createPage` for each locale, passing the matching locale slice of each JSON file as `pageContext.data`. The `localizeUrl` helper in `src/utils/localization.js` strips the `en-GB` prefix so English URLs remain clean.

**Content JSON structure:** each content file (e.g. `src/content/home/home.json`) is keyed by locale: `{ "en-GB": [...], "uk-UA": [...] }`. Templates receive their locale's data via `pageContext`.

### Page generation

`gatsby-node.js` defines two groups of pages:

1. **Named pages** (`home`, `contact`, `certification`, `team`, `harvest`) — each mapped to a template under `src/templates/` with its own JSON file.
2. **Content pages** — dynamic slugs from `src/content/content.json`, rendered with `src/templates/page.js`.
3. **Products** — a listing page (`src/templates/products.js`) and individual product pages (`src/templates/single_product.js`), both from `src/content/products/products.json`.

### Components

All reusable components are exported from `src/components/index.js` as a barrel file. Components are split into:
- `layout/` — `Layout`, `Section`, `Grid`, `Card`, `Footer`, `Contact`, `Address`
- `images/` — `Hero` (gatsby-background-image), `Image` (imgix URLs or local)
- `navigation/` — `Navigation`, `SEO` (react-helmet)
- `components/` — `Links` (internal/external), `Input`
- `LanguageSelector/` — switcher between `en-GB` ↔ `uk-UA`

The `buildLink` helper in `src/utils/helper.js` is used inside templates to prepend `/uk-UA/` based on `window.location.pathname`.

### Contact form / Cloudflare Worker

The contact form (`src/components/Form.js`) POSTs to `https://proo.izone.workers.dev` — a Cloudflare Worker defined in `worker/src/index.js`. The worker:
- Applies spam protection (honeypot field, minimum 3-second fill time)
- Validates required fields (`proo_name`, `proo_email`, `proo_message`)
- Sends email via Mailgun EU API using a `MAILGUN_API_KEY` secret stored in Cloudflare

### Environment variables

The Gatsby build reads `COSMIC_BUCKET` and `COSMIC_READ_KEY` from the environment (see `src/env.sh`). Source `src/env.sh` before running `build.sh` on a server, or set these in the Netlify environment variables UI.

### Styling

Global styles in `src/styles/app.css`. Styled Components is available but CSS classes are used throughout. `gatsby-plugin-purgecss` removes unused CSS in production builds.
