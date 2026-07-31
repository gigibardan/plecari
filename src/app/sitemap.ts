// src/app/sitemap.ts
import type {MetadataRoute} from 'next';
import {SITE_URL, LOCALES, DEFAULT_LOCALE, INDEXABLE} from '@/config/site';
import {VERTICAL_SLUGS} from '@/config/verticals';
import {articles, pages} from '@/lib/content';

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
        'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`,
      }
    }
  });

  // ── Hub-uri verticale ─────────────────────────────────────────────────────
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

  // ── Articole ──────────────────────────────────────────────────────────────
  //
  // Logica de grupare (prioritate):
  //
  // 1. Articol EN cu `translationOf: "slug-ro"` → se alătură grupului RO explicit
  // 2. Articol EN cu slug identic cu un RO din aceeași verticală → grupare automată
  // 3. Orice altceva → grup solitar, fără hreflang cross-locale
  //    (mai bine fără hreflang decât cu hreflang greșit)

  // Index rapid: "vertical/slug" → article (doar RO, care sunt ancora grupurilor)
  const roByVerticalSlug = new Map<string, (typeof articles)[number]>();
  for (const a of articles) {
    if (a.locale === DEFAULT_LOCALE) {
      roByVerticalSlug.set(`${a.vertical}/${a.slug}`, a);
    }
  }

  // Construim grupuri — cheia e întotdeauna "vertical/ro-slug"
  const groups = new Map<string, (typeof articles)[number][]>();

  for (const a of articles) {
    let groupKey: string;

    if (a.locale === DEFAULT_LOCALE) {
      // Articolele RO creează sau preiau propriul grup
      groupKey = `${a.vertical}/${a.slug}`;
    } else if ((a as any).translationOf) {
      // Articol EN cu legătură explicită → grup al articolului RO indicat
      groupKey = `${a.vertical}/${(a as any).translationOf}`;
    } else {
      // Articol EN fără translationOf → verificăm dacă există RO cu slug identic
      const hasRoPair = roByVerticalSlug.has(`${a.vertical}/${a.slug}`);
      groupKey = hasRoPair
        ? `${a.vertical}/${a.slug}`          // grupare automată prin slug identic
        : `__solo_en__/${a.vertical}/${a.slug}`; // grup solitar
    }

    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey)!.push(a);
  }

  // Generează entries
  for (const group of groups.values()) {
    const langs: Record<string, string> = {};
    for (const sibling of group) {
      langs[sibling.locale] = `${SITE_URL}/${sibling.locale}/${sibling.vertical}/${sibling.slug}`;
    }
    const defaultArticle = group.find((b) => b.locale === DEFAULT_LOCALE) ?? group[0];
    langs['x-default'] = `${SITE_URL}/${defaultArticle.locale}/${defaultArticle.vertical}/${defaultArticle.slug}`;

    for (const a of group) {
      entries.push({
        url: `${SITE_URL}/${a.locale}/${a.vertical}/${a.slug}`,
        lastModified: new Date(a.dateModified ?? a.datePublished),
        alternates: { languages: langs }
      });
    }
  }

  // ── Pagini legale ─────────────────────────────────────────────────────────
  // Slug identic în ambele locale (confidentialitate, cookies etc.) → grupare directă pe slug
  const pageGroups = new Map<string, typeof pages>();
  for (const p of pages) {
    if (!pageGroups.has(p.slug)) pageGroups.set(p.slug, []);
    pageGroups.get(p.slug)!.push(p);
  }

  for (const group of pageGroups.values()) {
    const langs: Record<string, string> = {};
    for (const sibling of group) {
      langs[sibling.locale] = `${SITE_URL}/${sibling.locale}/legal/${sibling.slug}`;
    }
    const defaultPage = group.find((b) => b.locale === DEFAULT_LOCALE) ?? group[0];
    langs['x-default'] = `${SITE_URL}/${defaultPage.locale}/legal/${defaultPage.slug}`;

    for (const p of group) {
      entries.push({
        url: `${SITE_URL}/${p.locale}/legal/${p.slug}`,
        lastModified: p.updated ? new Date(p.updated) : new Date(),
        alternates: { languages: langs }
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