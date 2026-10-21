// Fails when the built site is not safe to publish. Run automatically by `npm run build:release`.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
if (!existsSync(dist)) { console.error('No dist/ folder. Run the build first.'); process.exit(1); }

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } })(dist);

const problems = [];
const SITE = process.env.SITE_URL || '';
if (!SITE || /example/.test(SITE)) problems.push('SITE_URL is not set to the real public address (set it before building).');

for (const f of files.filter((x) => /\.(html|xml|txt)$/.test(x))) {
  const t = readFileSync(f, 'utf8');
  if (/data-todo=/.test(t)) problems.push(`${f}: unresolved TODO/VERIFY marker.`);
  if (/name="robots" content="noindex/.test(t)) problems.push(`${f}: still marked noindex (preview build).`);
  if (/ironfuel\.example/.test(t)) problems.push(`${f}: placeholder domain found.`);
  if (/PREVIEW BUILD/.test(t)) problems.push(`${f}: preview banner present.`);
}
for (const must of ['privacy', 'terms', 'disclaimer']) {
  if (!existsSync(join(dist, `${must}.html`)) && !existsSync(join(dist, must, 'index.html'))) problems.push(`Missing legal page: ${must}`);
}
if (problems.length) {
  console.error('\nRELEASE CHECK FAILED:\n - ' + [...new Set(problems)].join('\n - ') + '\n');
  process.exit(1);
}
console.log(`Release check passed: ${files.length} files, no placeholders, indexable, real domain.`);
