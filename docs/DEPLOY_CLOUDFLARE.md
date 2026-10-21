# Deploying the IRONFUEL site on Cloudflare (free): step by step

**Do not do this until `docs/LAUNCH_CHECKLIST.md` section A and B are finished.** Cloudflare's own pages can change; if a screen looks different, stop and tell me what you see (hide any passwords).

Cloudflare's documentation (checked 21 October 2026) says static files are served free and unlimited, and that its dashboard drag-and-drop option accepts a ZIP or a folder (limits: 1,000 files, 25 MiB per file; this site is about 170 files, the largest under 250 KB).

## Step 1. Get the release build
**Easiest:** send me the details from checklist section A. I build the release and give you `ironfuel-site-release.zip`. Skip to Step 3.
**Or build it yourself:**
1. Install Node.js LTS (22.22 or newer) from nodejs.org.
2. Unzip the project, open a terminal in the folder, run `npm install`.
3. Edit `src/data/site.ts` and the three legal pages as described in the checklist.
4. Run `npm run build:release -- https://your-domain.com` (use the free `https://ironfuel.pages.dev` style address if you have no domain yet; it must match what Cloudflare gives you).
5. If it says "RELEASE BLOCKED", read the message: it names the placeholder still missing.
6. Success ends with "Release check passed". Your site is now the `dist` folder.

## Step 2. Free Cloudflare account
Go to dash.cloudflare.com/sign-up, create an account with your email, and verify the email. Choose the **Free** plan. If anything asks for a payment card, stop.

## Step 3. Upload (drag and drop, no software)
1. In the dashboard open **Workers & Pages**.
2. Select **Create application**, then **Get started**, then **Drag and drop your files** (the Pages "Direct Upload" option).
3. Name the project, for example `ironfuel`. Your address will be `https://ironfuel.pages.dev` (the name must be free; if taken, Cloudflare tells you).
4. Select **Deploy site**, then drag in the **dist** folder (or the release ZIP).
5. Wait for "Success", then open the address.

## Step 4. Check it worked
- Home page, Privacy, Terms and Disclaimer all open; the footer shows no yellow `[TODO]` markers.
- Click **Join Our Telegram Channel** (opens t.me/ironfuel0) and **Explore Our Guides** (opens the Whop store), plus two guide cards.
- On a phone, open the menu button; it must open and close.
- Security headers: in Chrome press F12, open **Network**, reload, click the first request and read **Response headers**. You should see `Content-Security-Policy` and `X-Content-Type-Options`. If they are missing, tell me (the `_headers` file may need re-uploading).
- Paste the address into pagespeed.web.dev (free) for a quality score.

## Step 5. Your own domain (optional, costs money, not required to start)
Buy nothing until you decide. A typical .com is roughly $10 to $15 a year (an estimate, not verified). If the domain is on Cloudflare (or you move its nameservers there): project > **Custom domains** > **Set up a domain** and follow the prompts. After adding a domain, rebuild with `npm run build:release -- https://your-domain.com` and upload again so links and the sitemap use it.

## Step 6. Free, cookieless analytics (optional)
1. Dashboard > **Analytics & Logs** > **Web Analytics** > add your site and copy the token.
2. Put it in `analytics.cloudflareWebAnalyticsToken` in `src/data/site.ts`, rebuild, upload again. The security policy already allows Cloudflare's beacon.
3. Update the Privacy page analytics sentence to match (it is a marker you must resolve anyway).

## Updating later
Rebuild, then upload the new `dist` as a new deployment. The **Deployments** list lets you roll back to an earlier version.

## Advanced alternative (command line, Workers static assets)
The project includes `wrangler.jsonc` for Cloudflare Workers static assets. After a release build: `npx wrangler login`, then `npx wrangler deploy`. Cloudflare's current guidance favours Workers for new projects; Pages drag-and-drop is simply easier for a beginner. Either is free for static files.

## After it is live
- Submit the address to Whop as the place customers discover your business. Whop makes its own decision; acceptance is not guaranteed.
- You may link the website from your Telegram channel and Whop store descriptions (your action; I changed neither).
