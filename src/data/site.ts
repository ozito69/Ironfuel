// Single source of truth for links, brand text and launch-blocking placeholders.

export const SITE_URL = process.env.SITE_URL || 'https://ironfuel.example';

/** A release build (npm run build:release) refuses to build while any TODO placeholder is rendered. */
export const IS_RELEASE = process.env.IRONFUEL_RELEASE === '1';

export const links = {
  telegram: 'https://t.me/ironfuel0',
  telegramPreview: 'https://t.me/s/ironfuel0',
  whopStore: 'https://whop.com/jawon-sanders-holdings-inc/products/',
} as const;

export const brand = {
  name: 'IRONFUEL',
  tagline: 'Train smarter. Eat better. Build stronger.',
  title: 'IRONFUEL | Evidence-Aware Fitness Education & Guides',
  description:
    'Evidence-aware fitness education from IRONFUEL: guides on training, nutrition, supplements, recovery and progress tracking, plus a free public Telegram channel.',
} as const;

/**
 * Details the owner has NOT yet provided. They render as visible TODO markers in preview builds
 * and BLOCK release builds. Fill them in here (and nowhere else), then run `npm run build:release`.
 */
export const operator = {
  legalEntity: 'IRONFUEL' as string | null, // e.g. "Example Holdings LLC": do not guess
  legalAddress: null as string | null,
  contactEmail: 'oussama.gogogogo@outlook.fr' as string | null,
  contactNote: null as string | null, // e.g. a Telegram handle, if you prefer that to email
  governingLaw: 'the State of North Carolina, USA' as string | null, // jurisdiction named in the Terms
  policiesLastUpdated: '25 August 2026' as string | null, // e.g. "1 November 2026"
} as const;

/** Optional privacy-friendly analytics. Paste the Cloudflare Web Analytics token to enable. */
export const analytics = {
  cloudflareWebAnalyticsToken: null as string | null,
} as const;
