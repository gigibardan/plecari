import type {MetadataRoute} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE, INDEXABLE} from '@/config/site';

// Adaugi rute aici pe măsură ce creezi pagini (fără prefixul de limbă)
const routes = [
  ''             // homepage
  // '/croaziere',
  // '/despre'
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return []; // pe workers.dev, sitemap gol

  return routes.map((route) => ({
    url: `${SITE_URL}/${DEFAULT_LOCALE}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`])
      )
    }
  }));
}