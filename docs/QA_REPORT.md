# IRONFUEL website: QA report (21 October 2026)

Scope: local preview build of the Astro site, tested with Chromium (Playwright), axe-core and Lighthouse against a local server that applies the site's real security headers. **Nothing was deployed.** Lab results are not a substitute for testing on real phones.

## Summary
| Area | Result |
|---|---|
| Build | PASS: Astro 7.4.1, 5 pages, `npm audit`: 0 vulnerabilities |
| Security policy (CSP) | PASS after a fix: 0 console or CSP errors at desktop, tablet and mobile (see issue 1) |
| Accessibility (axe-core, WCAG 2.0 to 2.2 A/AA + best practice) | PASS: 0 violations across 5 pages x 2 screen sizes; Lighthouse accessibility 100 (mobile and desktop) |
| Keyboard and mobile menu | PASS: skip link first; visible 3 px focus ring; menu opens by button, closes with Escape and on link click, under the enforced CSP |
| Responsive layout | PASS: no horizontal overflow at 320, 360, 375, 390, 414, 768, 820, 1024, 1280, 1440, 1920 px |
| Performance (Lighthouse lab, simulated throttling) | Mobile 95 (LCP 2.8 s, FCP 1.7 s, TBT 0 ms, CLS 0.01); desktop 100 (LCP 0.8 s, TBT 0 ms, CLS 0.005) |
| Best practices | Lighthouse 100 (mobile and desktop) |
| SEO | Lighthouse 69 on the preview, **only** because preview builds are intentionally `noindex`; 100 on an indexable copy |
| Links | PASS: Telegram channel and preview, Whop store, and all 10 individual Whop product pages loaded live; guides 11 and 12 use the store link |
| Release safety guard | PASS: refuses to build without a real domain, and while any TODO/VERIFY placeholder exists |
| Legal pages | DRAFTS ONLY: cannot ship until every marker is resolved and a lawyer has reviewed them |

## Detail
- **Page weight:** about 297 KiB on a phone, 406 KiB on desktop (Lighthouse). `dist/` is 8.4 MB because it holds every responsive size of every image (AVIF with WebP fallback); a visitor downloads only the ones needed. Hero: phone crop 61/120 KB, desktop crop 111/209 KB. JavaScript total 0.7 KB, CSS 23.7 KB, five self-hosted fonts (about 107 KB, only two preloaded). No third-party requests.
- **Contrast:** white on graphite 18.4:1; muted grey `#9aa0a6` 7.0:1; `#8a9099` 5.7:1; crimson on graphite 5.0:1; graphite text on crimson buttons 5.0:1 (white on crimson is only 3.7:1, so it is not used for button text). axe flags 30 text items on the home page "needs review" because they sit over artwork or gradients, which no tool can compute; those were reviewed on the screenshots and are legible.
- **Touch targets:** no stand-alone control is under WCAG 2.2's 24 px minimum (inline text links are exempt); buttons are 54 px or taller; a few secondary links and chips are 36 to 43 px.
- **Structure:** one h1, no skipped heading levels, every image has alt text (artwork is decorative `alt=""`, covers are described), all in-page anchors resolve, all external links use `rel="noopener noreferrer"`, `lang="en"`.
- **SEO:** title, 160-character description, canonical, Open Graph and Twitter image (1200 x 630), JSON-LD for Organization, WebSite and FAQPage (matches the visible FAQ), sitemap, robots (preview: disallow all; release: allow and sitemap).
- **Whop and Telegram checks:** the Whop store and product pages were fetched on 21 October 2026 and matched your listing copy. The Telegram channel was live with 1,788 subscribers when checked; no count is shown on the site.
- **Release guard tests:** (a) no domain: refused; (b) domain given but placeholders left: "RELEASE BLOCKED: unresolved placeholder: legal entity name"; (c) the output check rejected the preview build (placeholder domain, noindex, missing legal pages).

## Issues found during review and fixed
| # | Issue | Fix |
|---|---|---|
| 1 | The strict security policy **blocked the site's own inline scripts and style attributes**, which would have broken the mobile menu on the live site | all scripts forced to external files; every inline style moved into CSS; re-tested with 0 errors |
| 2 | Mobile hero artwork overflowed its box and ran under the headline | block-level picture sizing, plus a dedicated wider phone crop |
| 3 | Desktop headline wrapped onto four lines and pushed the Telegram button below the fold | tighter type scale and wider column: two-line headline, both buttons visible |
| 4 | Mobile guide covers were tiny and cropped | two covers per row, larger, with a "What's inside" toggle |
| 5 | Two-card guide groups left a dead third of the row | wide horizontal cards for pairs; equal card heights |
| 6 | FAQ looked lopsided on desktop | two-column layout with a sticky heading |
| 7 | Horizontal scroll on phones (tagline strip at 390 px, About label card at 320 px) | layout fixes; verified at 11 widths |
| 8 | axe: content outside landmarks; label on a plain div | preview banner is now a landmark; strip simplified |
| 9 | Mobile performance 84 (late hero image, heavy decode) | art-directed hero, preloads, smaller phone image: 95 |
| 10 | Release command would not work on Windows | cross-platform release script that takes the domain as an argument |
| 11 | Guide number badge covered part of each cover | number moved above the title |

## Not tested, and known limits
- Only Chromium was used: Safari, Firefox and real phones were not tested. The scroll-reveal animation is a progressive enhancement; browsers without it show everything immediately.
- Lighthouse figures are lab results with simulated throttling; real-world speed depends on the visitor's network.
- No screen-reader session was run (axe, keyboard and structure checks only).
- The impeccable skill's own automated detector was not run; its principles (distinct type, restrained motion, real assets, no template look) and the frontend-design and taste-skill guidance were applied by hand during the visual review. No SEO-specific or Chrome-DevTools plugin was available, so Playwright, axe-core and Lighthouse were used instead.
- The legal pages are unreviewed drafts. The hero artwork contains small labels baked into your approved image.

## Re-running the checks
`npm run build`, then in one terminal `python3 qa/serve.py` (applies the real headers) and in another `python3 qa/shots.py` (screenshots, console errors) and `python3 qa/audit.py` (axe, overflow, targets, menu, keyboard). `audit.py` needs Playwright for Python and `npm i axe-core` in a tools folder (path set at the top of the script).
