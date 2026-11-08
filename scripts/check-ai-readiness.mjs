/**
 * Checks what AI crawlers see on the site, without running JavaScript.
 * Usage: node scripts/check-ai-readiness.mjs [baseUrl]
 * Default baseUrl: https://mystay.mywaytravel.com
 */
const base = (process.argv[2] || 'https://mystay.mywaytravel.com').replace(/\/$/, '');

const BOTS = {
  GPTBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  PerplexityBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  ClaudeBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  Bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Google-Extended': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
};

// Facts that must be readable in the raw HTML (must match Google Business Profile).
const MUST_HAVE = [
  'My Stay Hotel &amp; Apartment',
  '139/5 Nguyễn Cư Trinh',
  'Cầu Ông Lãnh',
  '+84 988 600 388',
  'mywayapt@gmail.com',
  'until midnight',
  '12:00 noon',
  '13,000,000',
  '16,000,000',
  'airport',
];

let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? '✅' : '❌'} ${msg}`); if (!cond) failures++; };

async function get(path, ua) {
  const res = await fetch(base + path, { headers: { 'User-Agent': ua }, redirect: 'follow' });
  return { status: res.status, type: res.headers.get('content-type') || '', text: await res.text() };
}

console.log(`\nAI readiness check for ${base}\n`);

// 1. Every AI bot gets the page with the core facts in the HTML.
for (const [name, ua] of Object.entries(BOTS)) {
  const r = await get('/', ua);
  const missing = MUST_HAVE.filter((f) => !r.text.includes(f));
  ok(r.status === 200 && missing.length === 0, `${name}: HTTP ${r.status}${missing.length ? `, missing: ${missing.join(' | ')}` : ', all core facts in HTML'}`);
}

// 2. robots.txt allows the AI bots and points to the sitemap.
const robots = await get('/robots.txt', BOTS.GPTBot);
ok(robots.status === 200, `robots.txt HTTP ${robots.status}`);
for (const bot of ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot']) {
  const block = robots.text.split(/\n(?=User-Agent:)/i).find((b) => new RegExp(`^User-Agent:\\s*${bot}\\s*$`, 'im').test(b));
  ok(block && /Allow:\s*\/\s*$/im.test(block) && !/Disallow:\s*\/\s*$/im.test(block), `robots.txt allows ${bot}`);
}
ok(/Sitemap:\s*https?:\/\//i.test(robots.text), 'robots.txt declares the sitemap');

// 3. Sitemap and llms.txt.
const sm = await get('/sitemap.xml', BOTS.Bingbot);
ok(sm.status === 200 && sm.text.includes('<urlset'), `sitemap.xml HTTP ${sm.status}`);
const llms = await get('/llms.txt', BOTS.ClaudeBot);
ok(llms.status === 200 && llms.text.startsWith('# My Stay Hotel & Apartment'), `llms.txt HTTP ${llms.status}`);

// 4. JSON-LD parses and has the key entity fields.
const home = await get('/', BOTS.GPTBot);
const blocks = [...home.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
ok(blocks.length > 0, `JSON-LD blocks found: ${blocks.length}`);
let graph = [];
try { graph = blocks.flatMap((b) => JSON.parse(b)['@graph'] || [JSON.parse(b)]); ok(true, 'JSON-LD parses'); }
catch (e) { ok(false, `JSON-LD parse error: ${e.message}`); }
const hotel = graph.find((n) => n['@type'] === 'Hotel');
ok(!!hotel, 'Hotel entity present');
if (hotel) {
  for (const k of ['name', 'address', 'geo', 'telephone', 'url', 'sameAs', 'hasMap', 'numberOfRooms', 'priceRange', 'containsPlace']) ok(hotel[k] !== undefined, `Hotel.${k}`);
  ok(hotel.name === 'My Stay Hotel & Apartment', `Hotel.name matches Google Business ("${hotel.name}")`);
}
const faq = graph.find((n) => n['@type'] === 'FAQPage');
ok(faq && faq.mainEntity.every((q) => home.text.includes(q.name.replace(/&/g, '&amp;'))), 'FAQ schema matches visible questions');

// 5. Basic on-page signals.
ok(/<link rel="canonical" href="https:\/\/mystay\.mywaytravel\.com\/?"/.test(home.text), 'canonical points to mystay.mywaytravel.com');
ok(/<title>[^<]*District 1[^<]*<\/title>/.test(home.text), 'title mentions District 1');
ok(/<h1[^>]*>[^<]*District 1/.test(home.text), 'H1 mentions District 1');
const admin = await get('/admin', BOTS.GPTBot);
ok(/<meta name="robots" content="noindex/.test(admin.text), '/admin is noindex');

console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
process.exit(failures ? 1 : 0);
