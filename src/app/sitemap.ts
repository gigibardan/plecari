// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES, DEFAULT_LOCALE, INDEXABLE } from '@/config/site';
import { VERTICAL_SLUGS } from '@/config/verticals';
import { articles, pages } from '@/lib/content';
import { articleHreflang } from '@/lib/hreflang';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];

  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage ──────────────────────────────────────────────────────────────
  entries.push({
    url: `${SITE_URL}/${DEFAULT_LOCALE}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
        'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`
      }
    }
  });

  // ── Search (ambele locale, nu doar RO) ───────────────────────────────────
  for (const l of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${l}/search`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((x) => [x, `${SITE_URL}/${x}/search`])),
          'x-default': `${SITE_URL}/${DEFAULT_LOCALE}/search`
        }
      }
    });
  }

  // ── Hub-uri verticale (ambele locale — altfel /en/<hub> rămâne orfan) ─────
  for (const slug of VERTICAL_SLUGS) {
    const languages = {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${slug}`])),
      'x-default': `${SITE_URL}/${DEFAULT_LOCALE}/${slug}`
    };
    for (const l of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${l}/${slug}`,
        lastModified: new Date(),
        alternates: { languages }
      });
    }
  }

  // ── Articole ──────────────────────────────────────────────────────────────
  // Gruparea hreflang vine din @/lib/hreflang — ACELAȘI modul folosit de
  // generateMetadata în [slug]/page.tsx, ca <head> și sitemap să nu se contrazică.
  for (const a of articles) {
    const languages = articleHreflang(a.locale, a.vertical, a.slug);
    entries.push({
      url: `${SITE_URL}/${a.locale}/${a.vertical}/${a.slug}`,
      lastModified: new Date(a.dateModified ?? a.datePublished),
      ...(languages ? { alternates: { languages } } : {})
    });
  }

  // ── Pagini legale ─────────────────────────────────────────────────────────
  const pageGroups = new Map<string, typeof pages>();
  for (const p of pages) {
    if (!pageGroups.has(p.slug)) pageGroups.set(p.slug, []);
    pageGroups.get(p.slug)!.push(p);
  }

  for (const group of pageGroups.values()) {
    const languages: Record<string, string> = {};
    for (const sibling of group) {
      languages[sibling.locale] = `${SITE_URL}/${sibling.locale}/legal/${sibling.slug}`;
    }
    const defaultPage = group.find((b) => b.locale === DEFAULT_LOCALE) ?? group[0];
    languages['x-default'] = `${SITE_URL}/${defaultPage.locale}/legal/${defaultPage.slug}`;

    for (const p of group) {
      entries.push({
        url: `${SITE_URL}/${p.locale}/legal/${p.slug}`,
        lastModified: p.updated ? new Date(p.updated) : new Date(),
        alternates: { languages }
      });
    }
  }

  // ── Deduplicare ───────────────────────────────────────────────────────────
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
