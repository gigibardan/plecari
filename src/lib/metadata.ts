// src/lib/metadata.ts
import type {Metadata} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE} from '@/config/site';

// Versiunea generică — pentru pagini care există în TOATE localele (hub-uri, homepage, pagini legale)
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

// Versiunea pentru articole — primește explicit localele disponibile
// Exemplu: getArticleAlternates('ro', 'zboruri', 'cum-gasesti-bilete', ['ro'])
// Dacă articolul există doar în RO, EN nu apare în hreflang
export function getArticleAlternates(
  currentLocale: string,
  vertical: string,
  slug: string,
  availableLocales: string[]
): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    languages[l] = `${SITE_URL}/${l}/${vertical}/${slug}`;
  }
  // x-default = RO dacă există, altfel primul locale disponibil
  const defaultLocale = availableLocales.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : availableLocales[0];
  languages['x-default'] = `${SITE_URL}/${defaultLocale}/${vertical}/${slug}`;

  return {
    canonical: `${SITE_URL}/${currentLocale}/${vertical}/${slug}`,
    languages
  };
}