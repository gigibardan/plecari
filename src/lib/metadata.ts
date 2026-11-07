// src/lib/metadata.ts
import type { Metadata } from 'next';
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/config/site';
import { articleHreflang, articleCounterpart } from '@/lib/hreflang';

// Versiunea generică — pentru pagini care există în TOATE localele
// (hub-uri, homepage, pagini legale)
export function getAlternates(
  locale: string,
  pathWithoutLocale = ''
): Metadata['alternates'] {
  const clean = pathWithoutLocale.replace(/^\/+/, '');
  const path = clean ? `/${clean}` : '';
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${path}`;
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages
  };
}

// Versiunea pentru articole — delegă gruparea către @/lib/hreflang,
// ACELAȘI modul folosit de sitemap.ts. Nu mai presupune slug identic RO/EN.
export function getArticleAlternates(
  currentLocale: string,
  vertical: string,
  slug: string
): Metadata['alternates'] {
  const languages = articleHreflang(currentLocale, vertical, slug);
  return {
    canonical: `${SITE_URL}/${currentLocale}/${vertical}/${slug}`,
    ...(languages ? { languages } : {})
  };
}

// Path-ul în locala opusă pentru LanguageSwitcher.
// Fără prefix de locale (next-intl îl adaugă prin router.replace).
// Dacă nu există pereche → hub-ul verticalei.
export function getTranslationPath(
  locale: string,
  vertical: string,
  slug: string
): string {
  const other = articleCounterpart(locale, vertical, slug);
  return other ? `/${other.vertical}/${other.slug}` : `/${vertical}`;
}
