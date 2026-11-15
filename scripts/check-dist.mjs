// Checks the built site in dist/. Run automatically by `npm run build`.
// Exits 1 and lists every problem, so a bad build never deploys.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const DIST = 'dist';
const problems = [];
const fail = (msg) => problems.push(msg);

// Text that must never appear in any published file.
const BANNED = [
  { test: (t) => /(?:\+91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b/.test(t), name: 'a phone number' },
  { test: (t) => /open to work/i.test(t), name: '"open to work"' },
  { test: (t) => /\bseeking\b/i.test(t), name: '"seeking"' },
  { test: (t) => t.includes('—'), name: 'an em dash' },
];
// Optional extra words, kept out of this public repo: a local, git-ignored
// file .private-checks.json shaped like { "banned": ["word", "another"] }.
if (existsSync('.private-checks.json')) {
  const extra = JSON.parse(readFileSync('.private-checks.json', 'utf8')).banned ?? [];
  for (const word of extra) {
    BANNED.push({ test: (t) => t.toLowerCase().includes(word.toLowerCase()), name: 'a privately banned word' });
  }
  console.log(`Private word list loaded (${extra.length} entries)`);
} else {
  console.log('No .private-checks.json found: only the public word list was checked');
}
const TEXT_EXT = new Set(['.html', '.txt', '.xml', '.css', '.js', '.json', '.svg', '.md', '.webmanifest']);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  const p = join(DIST, clean);
  if (existsSync(p) && statSync(p).isFile()) return true;
  return existsSync(join(p, 'index.html'));
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('CHECK FAILED\n- dist/index.html missing');
  process.exit(1);
}

const files = walk(DIST);
const rel = (f) => relative(DIST, f).replaceAll('\\', '/');
const read = (name) => (existsSync(join(DIST, name)) ? readFileSync(join(DIST, name), 'utf8') : null);

for (const f of files) {
  if (!TEXT_EXT.has(extname(f))) continue;
  const text = readFileSync(f, 'utf8');
  for (const b of BANNED) if (b.test(text)) fail(`${rel(f)}: contains ${b.name}`);

  if (extname(f) !== '.html') continue;
  if (!/<title>[^<]+<\/title>/.test(text)) fail(`${rel(f)}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(text)) fail(`${rel(f)}: missing meta description`);
  if (!/<link rel="canonical" href="[^"]+"/.test(text)) fail(`${rel(f)}: missing canonical link`);
  if (/<script[^>]*\ssrc=/.test(text)) fail(`${rel(f)}: loads a script file (the site must work without JavaScript)`);
  for (const m of text.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (!resolves(m[1])) fail(`${rel(f)}: broken internal link ${m[1]}`);
  }
  // Outside links, the resume and full-size images open in a new tab; links within the site do not.
  for (const m of text.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+|[^"]+\.(?:pdf|jpg|png))"[^>]*>/g)) {
    if (!/target="_blank"/.test(m[0]) || !/rel="[^"]*noopener/.test(m[0])) fail(`${rel(f)}: link to ${m[1]} should open in a new tab`);
  }
}

// ---- Page-specific checks ----
const count = (text, re) => (text.match(re) || []).length;
const POP = /class="[^"]*\bbtn-pop\b/g;

function mustContain(page, text, needles) {
  for (const n of needles) if (!text.includes(n)) fail(`${page}: expected to find "${n}"`);
}

// Home page
const home = read('index.html');
mustContain('index.html', home, [
  'Vinay Purohit',
  'Software Engineer | Full-Stack, Backend &amp; AI/GenAI',
  'href="/projects/lore/"',
  'https://play.google.com/store/apps/details?id=com.network.buddyup',
  'https://apps.apple.com/in/app/buddy-up-network/id6569240717',
  'https://play.google.com/store/apps/details?id=com.rentmyclass.rent_my_class',
  'href="/Vinay_Purohit_Resume.pdf"',
  'id="projects"',
  'id="experience"',
  'id="contact"',
]);
if (count(home, POP) !== 1) fail(`index.html: expected exactly 1 orange button, found ${count(home, POP)}`);

// Project pages
const projectDir = join(DIST, 'projects');
const slugs = existsSync(projectDir) ? readdirSync(projectDir) : [];
if (!slugs.includes('lore')) fail('projects/lore/index.html missing');
for (const slug of slugs) {
  const page = `projects/${slug}/index.html`;
  const text = read(page);
  if (!text) { fail(`${page} missing`); continue; }
  if (count(text, POP) !== 1) fail(`${page}: expected exactly 1 orange button, found ${count(text, POP)}`);
  if (count(text, /<h1[\s>]/g) !== 1) fail(`${page}: expected exactly 1 <h1>`);
  if (/<img(?![^>]*\salt="[^"]+")[^>]*>/.test(text)) fail(`${page}: an image has no alt text`);
  if (/<figure[^>]*>\s*<\/figure>/.test(text)) fail(`${page}: empty <figure>`);
  if (/<(ol|ul)[^>]*>\s*<\/\1>/.test(text)) fail(`${page}: empty list`);
}

// Lore: the reference project page
const lore = read('projects/lore/index.html');
if (lore) {
  mustContain('projects/lore/index.html', lore, ['Problem', 'How it works', 'Key decisions', 'Results', 'https://github.com/vinay162/lore', 'class="table-wrap"']);
  const tbody = (lore.match(/<tbody>([\s\S]*?)<\/tbody>/) || [, ''])[1];
  if (count(tbody, /<tr[\s>]/g) !== 5) fail(`projects/lore/index.html: results table should have 5 rows, found ${count(tbody, /<tr[\s>]/g)}`);
  if (count(lore, /class="[^"]*\bflow-step\b/g) < 6) fail('projects/lore/index.html: the how-it-works diagram is missing steps');
}

// Files for search engines, link previews and AI readers
for (const name of ['llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap-index.xml', '404.html', 'og-2.png', 'favicon.svg']) {
  if (!existsSync(join(DIST, name))) fail(`${name} missing`);
}
const llms = read('llms.txt');
if (llms) {
  if (!llms.startsWith('# Vinay Purohit\n')) fail('llms.txt: must start with "# Vinay Purohit"');
  if (!/^> .{80,}$/m.test(llms)) fail('llms.txt: missing the one-paragraph summary line');
  for (const heading of ['## Projects', '## About', '## Contact']) {
    if (!llms.includes(`\n${heading}\n`)) fail(`llms.txt: missing section "${heading}"`);
  }
  for (const slug of slugs) {
    if (!llms.includes(`/projects/${slug}/)`)) fail(`llms.txt: no link to project "${slug}"`);
  }
}
const full = read('llms-full.txt');
if (full && !full.includes('Key decisions')) fail('llms-full.txt: project text is missing');
const robots = read('robots.txt');
if (robots && !/^Sitemap: https?:\/\/\S+\/sitemap-index\.xml$/m.test(robots)) fail('robots.txt: missing the Sitemap line');

const ld = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (ld.length !== 1) {
  fail(`index.html: expected 1 structured-data block, found ${ld.length}`);
} else {
  try {
    if (JSON.parse(ld[0][1])['@type'] !== 'Person') fail('index.html: structured data is not a Person');
  } catch {
    fail('index.html: structured data is not valid JSON');
  }
}
for (const f of files.filter((f) => extname(f) === '.html')) {
  const text = readFileSync(f, 'utf8');
  if (!/<meta property="og:image" content="https?:\/\/[^"]+\/og-\d+\.png"/.test(text)) fail(`${rel(f)}: missing link-preview image tag`);
  if (!/<link rel="icon"/.test(text)) fail(`${rel(f)}: missing favicon link`);
}

// The site address must be written in astro.config.mjs only.
const siteHost = (readFileSync('astro.config.mjs', 'utf8').match(/site:\s*'https?:\/\/([^/']+)/) || [])[1];
if (!siteHost) fail('astro.config.mjs: could not read the site address');
if (siteHost && existsSync('src')) {
  for (const f of walk('src')) {
    if (readFileSync(f, 'utf8').includes(siteHost)) fail(`${f.replaceAll('\\', '/')}: hard-codes the site address (use Astro.site)`);
  }
}

if (problems.length) {
  console.error('CHECK FAILED\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log(`OK: ${files.length} files checked`);
