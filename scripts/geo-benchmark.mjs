/**
 * Asks web-grounded AI models the questions in reports/ai-benchmark-queries.json
 * and records whether they mention or cite My Stay Hotel & Apartment.
 * Usage: OPENROUTER_API_KEY=sk-or-... node scripts/geo-benchmark.mjs
 * Run once now (baseline) and again every 2-4 weeks; compare the saved files.
 */
import fs from 'fs';
import path from 'path';

const KEY = process.env.OPENROUTER_API_KEY;
const DOMAIN = 'mystay.mywaytravel.com';
const BRAND = /my\s*stay(\s*hotel)?\s*(&|and)?\s*apartment|mystay\.mywaytravel/i;
const MODELS = (process.env.GEO_MODELS || 'perplexity/sonar,openai/gpt-4o-mini:online').split(',');

const queries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'reports', 'ai-benchmark-queries.json'), 'utf8'));
if (!KEY) {
  console.log(`${queries.length} queries loaded. Set OPENROUTER_API_KEY to run against: ${MODELS.join(', ')}`);
  process.exit(0);
}

async function ask(model, query) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, max_tokens: 600, messages: [{ role: 'user', content: query }] }),
  });
  if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
  const msg = (await res.json()).choices?.[0]?.message || {};
  const citations = (msg.annotations || []).filter((a) => a.type === 'url_citation').map((a) => a.url_citation?.url).filter(Boolean);
  return { content: msg.content || '', citations };
}

const results = [];
for (const q of queries) {
  for (const model of MODELS) {
    const r = await ask(model, q.query);
    if (r.error && /HTTP (401|402)/.test(r.error)) {
      console.error(`Stopped: ${r.error.slice(0, 160)}`);
      process.exit(1);
    }
    const mentioned = BRAND.test(r.content || '');
    const cited = (r.citations || []).some((u) => u.includes(DOMAIN));
    results.push({ ...q, model, mentioned, cited, citations: r.citations || [], error: r.error, snippet: (r.content || '').slice(0, 300) });
    console.log(`[${q.id}] ${model}: mention=${mentioned ? 'YES' : 'no'} cite=${cited ? 'YES' : 'no'}${r.error ? ` (${r.error.slice(0, 80)})` : ''}`);
    await new Promise((s) => setTimeout(s, 1000));
  }
}

const summary = MODELS.map((m) => {
  const rows = results.filter((r) => r.model === m);
  return { model: m, total: rows.length, mentions: rows.filter((r) => r.mentioned).length, citations: rows.filter((r) => r.cited).length };
});
console.table(summary);
const out = path.join(process.cwd(), 'reports', `ai-benchmark-${new Date().toISOString().slice(0, 10)}.json`);
fs.writeFileSync(out, JSON.stringify({ summary, results }, null, 2));
console.log(`Saved ${out}`);
