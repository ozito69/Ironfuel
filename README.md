# IRONFUEL website (Astro, static)

A fast, accessible landing page for IRONFUEL: Telegram community first, Whop guides second.
Preview build: **not for public release** until every placeholder is resolved (see `docs/LAUNCH_CHECKLIST.md`).

## Requirements
- Node.js 22.22 or newer (https://nodejs.org, LTS)

## Everyday commands
| Command | What it does |
|---|---|
| `npm install` | install dependencies (first time only) |
| `npm run dev` | live preview at http://localhost:4321 |
| `npm run build` | **preview build** into `dist/`: shows yellow TODO markers, marked `noindex` |
| `npm run build:release -- https://your-domain.com` | **release build**: refuses to build while any TODO/VERIFY marker, placeholder domain or preview banner remains |
| `npm run preview` | serve the built `dist/` locally |

## Where things live
- `src/data/site.ts`: links, legal entity, contact details, analytics token (the only place to fill in missing details)
- `src/data/guides.json`: the 12 guides (titles, subtitles, descriptions, Whop page slug; `null` slug links to the store)
- `src/data/topics.ts`, `src/data/faq.ts`: "What you'll learn" topics and FAQ text
- `src/components/*.astro`: page sections; `src/styles/global.css`: the whole design system (brand tokens at the top)
- `src/pages/privacy|terms|disclaimer.astro`: legal drafts. Highlighted `<Todo />` markers must be replaced with verified text
- `src/assets/covers`, `src/assets/art`: your cover and artwork images (optimized automatically at build time)
- `public/_headers`: security headers and cache rules (Cloudflare reads this file)
- `qa/`: local test scripts (screenshots, accessibility, overflow); `docs/`: QA report, launch checklist, deployment guide

## Design notes
- Fonts: Barlow Condensed, Barlow, Source Serif 4 (self-hosted, no external requests)
- Colours: graphite `#131416`, black `#0b0c0d`, charcoal `#2a2d32`, crimson `#e5535c`, white `#f3f4f5`
- Strict Content-Security-Policy: no inline scripts or inline `style` attributes. Keep it that way: put styles in CSS files
- No cookies, no third-party scripts (optional Cloudflare Web Analytics only if you add a token)

## Safety rails
`build:release` fails on purpose if the site is not ready. Do not edit that check to get past it.
