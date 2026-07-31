// src/lib/metadata.ts
import type {Metadata} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE} from '@/config/site';
import {articles} from '@/lib/content';

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

// Calculează path-ul în locala opusă pentru LanguageSwitcher
// Folosit în [slug]/page.tsx (Server Component) și pasat ca prop către LanguageSwitcher
// Returnează path fără prefix de locale (next-intl îl adaugă el prin router.replace)
export function getTranslationPath(
  locale: string,
  vertical: string,
  slug: string
): string {
  const other = locale === 'ro' ? 'en' : 'ro';

  if (locale === DEFAULT_LOCALE) {
    // Suntem pe RO → căutăm EN care pointează spre noi via translationOf
    // sau EN cu slug identic (articole simetrice)
    const target = articles.find(
      (a) =>
        a.locale === other &&
        a.vertical === vertical &&
        ((a as any).translationOf === slug || a.slug === slug)
    );
    // Dacă nu există pereche EN → trimitem la hub-ul verticalei
    return target ? `/${target.vertical}/${target.slug}` : `/${vertical}`;
  } else {
    // Suntem pe EN → citim translationOf dacă există, altfel folosim același slug
    const current = articles.find(
      (a) => a.locale === locale && a.vertical === vertical && a.slug === slug
    );
    const roSlug = (current as any)?.translationOf ?? slug;
    const target = articles.find(
      (a) => a.locale === DEFAULT_LOCALE && a.vertical === vertical && a.slug === roSlug
    );
    // Dacă nu există pereche RO → trimitem la hub-ul verticalei
    return target ? `/${target.vertical}/${target.slug}` : `/${vertical}`;
  }
}