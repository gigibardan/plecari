// src/lib/hreflang.ts
// SURSĂ UNICĂ DE ADEVĂR pentru gruparea hreflang RO/EN.
//
// Folosită simultan de:
//   - src/app/sitemap.ts                        (hreflang în sitemap)
//   - src/app/[locale]/[vertical]/[slug]/page.tsx (hreflang în <head>)
//
// Motiv: înainte, sitemap-ul grupa prin `translationOf`, iar <head>-ul grupa
// prin „slug identic", deci cele două se contraziceau. Ahrefs vedea pentru
// aceeași pagină două seturi de hreflang diferite și raporta
// „More than one page is linked for the same language" + „missing reciprocal".

import { SITE_URL, DEFAULT_LOCALE } from '@/config/site';
import { articles } from '@/lib/content';

type Article = (typeof articles)[number];

const url = (a: Article) => `${SITE_URL}/${a.locale}/${a.vertical}/${a.slug}`;

/**
 * Cheia de grup a unui articol:
 *  1. RO → își creează propriul grup
 *  2. EN cu `translationOf` → grupul articolului RO indicat (căutat după slug
 *     în ORICE verticală, pentru că perechile pot sta în verticale diferite)
 *  3. EN fără `translationOf`, dar cu RO cu slug identic → grupare automată
 *  4. altfel → grup solitar (mai bine fără hreflang decât cu hreflang greșit)
 */
function groupKey(a: Article, roArticles: Article[]): string {
  if (a.locale === DEFAULT_LOCALE) return `${a.vertical}/${a.slug}`;

  const tr = (a as { translationOf?: string }).translationOf;
  if (tr) {
    const ro =
      roArticles.find((b) => b.vertical === a.vertical && b.slug === tr) ??
      roArticles.find((b) => b.slug === tr);
    if (ro) return `${ro.vertical}/${ro.slug}`;
  }

  const same = roArticles.find((b) => b.vertical === a.vertical && b.slug === a.slug);
  if (same) return `${same.vertical}/${same.slug}`;

  return `__solo__/${a.locale}/${a.vertical}/${a.slug}`;
}

const { byUrl } = (() => {
  const roArticles = articles.filter((a) => a.locale === DEFAULT_LOCALE);
  const groups = new Map<string, Article[]>();

  for (const a of articles) {
    const k = groupKey(a, roArticles);
    const g = groups.get(k);
    if (g) g.push(a);
    else groups.set(k, [a]);
  }

  // Dacă un grup ajunge cu 2+ articole în aceeași limbă (conținut duplicat),
  // păstrăm un singur reprezentant/limbă — altfel emitem hreflang invalid.
  // Preferăm articolul cu `translationOf` explicit, apoi slug-ul cel mai lung.
  const byUrl = new Map<string, Article[]>();
  for (const group of groups.values()) {
    const perLocale = new Map<string, Article>();
    for (const a of group) {
      const cur = perLocale.get(a.locale);
      if (!cur) { perLocale.set(a.locale, a); continue; }
      const score = (x: Article) =>
        ((x as { translationOf?: string }).translationOf ? 2 : 0) + x.slug.length / 100;
      if (score(a) > score(cur)) perLocale.set(a.locale, a);
    }
    const clean = [...perLocale.values()];
    // Fiecare articol din grupul original primește harta curățată, ca să nu
    // existe pagini fără hreflang; cele eliminate pointează spre reprezentanți.
    for (const a of group) byUrl.set(`${a.locale}/${a.vertical}/${a.slug}`, clean);
  }
  return { byUrl };
})();

/** Harta `languages` pentru un articol — identică în <head> și în sitemap. */
export function articleHreflang(
  locale: string,
  vertical: string,
  slug: string
): Record<string, string> | undefined {
  const group = byUrl.get(`${locale}/${vertical}/${slug}`);
  if (!group || group.length === 0) return undefined;

  const languages: Record<string, string> = {};
  for (const a of group) languages[a.locale] = url(a);

  const def = group.find((a) => a.locale === DEFAULT_LOCALE) ?? group[0];
  languages['x-default'] = url(def);
  return languages;
}

/** Perechea din cealaltă limbă (pentru LanguageSwitcher). */
export function articleCounterpart(
  locale: string,
  vertical: string,
  slug: string
): Article | undefined {
  const group = byUrl.get(`${locale}/${vertical}/${slug}`);
  return group?.find((a) => a.locale !== locale);
}
