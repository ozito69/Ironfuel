// Cross-platform release build:  npm run build:release -- https://your-real-domain.com
// 1) refuses to build while any TODO/VERIFY placeholder exists, 2) builds an indexable site, 3) re-checks the output.
import { spawnSync } from 'node:child_process';

const site = process.argv[2] || process.env.SITE_URL;
if (!site || !/^https:\/\/[^/]+\.[^/]+/.test(site) || /example|invalid|localhost/.test(site)) {
  console.error('\nUsage: npm run build:release -- https://your-real-domain.com\nA real https address is required (not example/localhost).\n');
  process.exit(1);
}
const env = { ...process.env, SITE_URL: site.replace(/\/$/, ''), IRONFUEL_RELEASE: '1' };
const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', env, shell: process.platform === 'win32' });

const build = run('npx', ['astro', 'build']);
if (build.status !== 0) {
  console.error('\nRELEASE BUILD REFUSED: see the "RELEASE BLOCKED" line above. Fill in the missing details (see docs/LAUNCH_CHECKLIST.md), then try again.\n');
  process.exit(1);
}
const check = run('node', ['scripts/check-release.mjs']);
process.exit(check.status ?? 1);
