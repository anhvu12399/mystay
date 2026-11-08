import type { MetadataRoute } from 'next';
import { SITE_URL } from '../data/business';

// AI search and assistant crawlers are allowed explicitly. Each named group
// repeats the Disallow list, because a crawler that matches a named group
// ignores the `*` group entirely.
const AI_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'CCBot',
];

const disallow = ['/admin', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
      { userAgent: '*', allow: '/', disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
