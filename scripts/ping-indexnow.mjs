/**
 * Tells Bing (which feeds ChatGPT Search and Copilot), Yandex and others that
 * pages changed. Run after each deploy: node scripts/ping-indexnow.mjs
 */
const HOST = 'mystay.mywaytravel.com';
const KEY = 'ab6f49d0dedb13dfea0a58598c19015c';
const urls = ['/', '/llms.txt', '/sitemap.xml'].map((p) => `https://${HOST}${p}`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} ${res.statusText}`);
if (![200, 202].includes(res.status)) console.log(await res.text());
