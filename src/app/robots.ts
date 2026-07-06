import type {MetadataRoute} from 'next';
import {SITE_URL, INDEXABLE} from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    // dev: blocăm tot, nu vrem workers.dev în Google
    return {rules: {userAgent: '*', disallow: '/'}};
  }
  return {
    // NU blocăm boții AI — vrem citări (ChatGPT/Perplexity/AI Overviews)
    rules: {userAgent: '*', allow: '/'},
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}