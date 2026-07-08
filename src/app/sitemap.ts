// src/app/sitemap.ts — sitemap dinamic (articole + hub-uri + pagini legale + homepage)
import type {MetadataRoute} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE, INDEXABLE} from '@/config/site';
import {VERTICAL_SLUGS} from '@/config/verticals';
import {articles, pages} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return []; // pe dev, sitemap gol

  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: `${SITE_URL}/${DEFAULT_LOCALE}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      )
    }
  });

  // Hub-uri de verticală (/ro/asigurari, /en/asigurari etc.)
  for (const slug of VERTICAL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}/${slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/${slug}`])
        )
      }
    });
  }

  // Articole (din Velite)
  for (const a of articles) {
    entries.push({
      url: `${SITE_URL}/${a.locale}/${a.vertical}/${a.slug}`,
      lastModified: new Date(a.dateModified ?? a.datePublished),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/${a.vertical}/${a.slug}`])
        )
      }
    });
  }

  // Pagini statice / legale (din Velite)
  for (const p of pages) {
    entries.push({
      url: `${SITE_URL}/${p.locale}/legal/${p.slug}`,
      lastModified: p.updated ? new Date(p.updated) : new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/legal/${p.slug}`])
        )
      }
    });
  }

  // Deduplică (articolele/paginile apar per-locale, dar sitemap-ul vrea un entry per URL)
  const seen = new Set<string>();
  return entries.filter((e) => {
    const key = e.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}