# IRONFUEL website: launch checklist (21 October 2026)

Nothing has been published. The site is built and tested locally as a **preview**. These items must be done before it goes public.

## A. Information only you can provide (nothing may be guessed)
| # | Needed | Where it goes | Why |
|---|---|---|---|
| 1 | **Legal entity name** that operates the site (do not assume the Whop account name) | `operator.legalEntity` in `src/data/site.ts` | footer, Privacy, Terms |
| 2 | Registered address (if you want it shown) | `operator.legalAddress` | Privacy |
| 3 | **Public contact method**: a business email or a Telegram handle | `operator.contactEmail` or `operator.contactNote` | footer, all legal pages; Whop wants a real business presence |
| 4 | **Governing law / jurisdiction** | `operator.governingLaw` | Terms |
| 5 | **Refund policy**, exactly as set in your Whop store (or delete that paragraph) | `src/pages/terms.astro` | I did not invent one |
| 6 | Date the policies were last updated | `operator.policiesLastUpdated` | all legal pages |
| 7 | **Domain name** (or start on the free `pages.dev` address) | the address you pass to the release command | canonical links, sitemap |
| 8 | Whop page links for **guides 11 and 12** (not on the live store page when checked) | `slug` in `src/data/guides.json` | until then they link to the store |
| 9 | Official **logo** file, if you have one | replace `src/components/Wordmark.astro` | temporary wordmark is built from the cover type |

## B. Statements to verify (blue VERIFY markers in the legal pages)
Privacy: no forms/accounts/cookies (true today), hosting provider and its data terms, analytics choice, purposes, rights by jurisdiction, children statement. Terms: Whop's terms apply to purchases, artwork/brand ownership, warranty and liability wording. Disclaimer: liability wording.
**Have a lawyer review all three pages before launch.** They are drafts, not legal advice.

## C. Confirm these content choices
- The 12 covers: guide 02's cover came from a file named "DRAFT", guide 01's from the "gold master candidate". Confirm they are final.
- The hero artwork contains its own small labels ("Motor unit activation", "Fibre recruitment", ...). They are part of your approved artwork; confirm you are happy to show them.
- The Telegram "Example post" is an illustration (the soreness post text). It is labelled as an example.
- No prices, no subscriber count, no testimonials, no statistics are shown (as requested).
- The Whop slugs `your-muscle-buildingstarting-point` and `therecovery-guide` look like typos but are the live links. If you rename them in Whop, update `guides.json`.

## D. Release steps
1. Fill in section A in `src/data/site.ts`; replace every `<Todo />` in the three legal pages with verified text.
2. `npm run build:release -- https://your-domain.com`. It must finish with "Release check passed".
3. Deploy the `dist/` folder (see `docs/DEPLOY_CLOUDFLARE.md`).
4. Re-check on the live address: pages load, Telegram and Whop buttons work, response headers present, mobile menu works.
5. Re-run the product link check (Whop pages can change) and PageSpeed Insights (free, pagespeed.web.dev).
6. Only then submit the address to Whop. **There is no guarantee Whop will accept it.**

## E. Optional, after launch
Cloudflare Web Analytics (free, cookieless): add the token to `analytics.cloudflareWebAnalyticsToken`, rebuild, re-upload. Per-campaign Telegram invite links (created in Telegram) give free join counts per ad. Whether Whop records UTM tags on its own pages is not confirmed; check Whop's dashboard.
