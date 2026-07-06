import type {Metadata} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE} from '@/config/site';

// path FĂRĂ limbă. ex: getAlternates('ro', '/croaziere')
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
    canonical: `${SITE_URL}/${locale}${path}`, // canonical = limba curentă
    languages
  };
}