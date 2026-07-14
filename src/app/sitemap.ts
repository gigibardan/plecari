// src/app/sitemap.ts — sitemap dinamic (articole + hub-uri + pagini legale + homepage)
import type {MetadataRoute} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE, INDEXABLE} from '@/config/site';
import {VERTICAL_SLUGS} from '@/config/verticals';
import {articles, pages} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];

  const entries: MetadataRoute.Sitemap = [];

  // Homepage — există în toate localele, ok să rămână ca era
  entries.push({
    url: `${SITE_URL}/${DEFAULT_LOCALE}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
        'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`,
      }
    }
  });

  // Hub-uri de verticală — există în toate localele, ok
  for (const slug of VERTICAL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${slug}`])),
          'x-default': `${SITE_URL}/${DEFAULT_LOCALE}/${slug}`,
        }
      }
    });
  }

  // Articole — grupăm pe (vertical + slug) și generăm alternates DOAR pentru localele existente
  const articleGroups = new Map<string, typeof articles>();
  for (const a of articles) {
    const key = `${a.vertical}/${a.slug}`;
    if (!articleGroups.has(key)) articleGroups.set(key, []);
    articleGroups.get(key)!.push(a);
  }

  for (const group of articleGroups.values()) {
    for (const a of group) {
      // Alternates doar pentru localele în care articolul chiar există
      const langs: Record<string, string> = {};
      for (const sibling of group) {
        langs[sibling.locale] = `${SITE_URL}/${sibling.locale}/${sibling.vertical}/${sibling.slug}`;
      }
      // x-default = versiunea RO dacă există, altfel primul din grup
      const defaultLocale = group.find((b) => b.locale === DEFAULT_LOCALE) ?? group[0];
      langs['x-default'] = `${SITE_URL}/${defaultLocale.locale}/${defaultLocale.vertical}/${defaultLocale.slug}`;

      entries.push({
        url: `${SITE_URL}/${a.locale}/${a.vertical}/${a.slug}`,
        lastModified: new Date(a.dateModified ?? a.datePublished),
        alternates: { languages: langs }
      });
    }
  }

  // Pagini legale — grupăm pe slug, același tratament
  const pageGroups = new Map<string, typeof pages>();
  for (const p of pages) {
    if (!pageGroups.has(p.slug)) pageGroups.set(p.slug, []);
    pageGroups.get(p.slug)!.push(p);
  }

  for (const group of pageGroups.values()) {
    for (const p of group) {
      const langs: Record<string, string> = {};
      for (const sibling of group) {
        langs[sibling.locale] = `${SITE_URL}/${sibling.locale}/legal/${sibling.slug}`;
      }
      const defaultPage = group.find((b) => b.locale === DEFAULT_LOCALE) ?? group[0];
      langs['x-default'] = `${SITE_URL}/${defaultPage.locale}/legal/${defaultPage.slug}`;

      entries.push({
        url: `${SITE_URL}/${p.locale}/legal/${p.slug}`,
        lastModified: p.updated ? new Date(p.updated) : new Date(),
        alternates: { languages: langs }
      });
    }
  }

  // Deduplică
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}