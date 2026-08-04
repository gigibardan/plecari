// src/app/[locale]/search/page.tsx — v2: sort param + wordCount

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { articles } from '@/lib/content';
import { getAlternates } from '@/lib/metadata';
import { SITE_URL } from '@/config/site';
import { SearchClient } from '@/components/SearchClient';
import { JsonLd } from '@/components/JsonLd';

const PER_PAGE = 12;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; v?: string; sort?: string; p?: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'ro' }, { locale: 'en' }];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { q, v } = await searchParams;
  const l = locale === 'en' ? 'en' : 'ro';

  const title = l === 'ro'
    ? q ? `Rezultate pentru „${q}" — Ghiduri de călătorie` : 'Caută ghiduri de călătorie — Plecări'
    : q ? `Results for "${q}" — Travel guides` : 'Search travel guides — Plecări';

  const description = l === 'ro'
    ? 'Caută în toate ghidurile Plecări: zboruri, cazări, croaziere, eSIM, asigurări și city breaks.'
    : 'Search all Plecări guides: flights, stays, cruises, eSIM, insurance and city breaks.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/search'),
    robots: (q || v)
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-snippet': -1 },
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q = '', v = 'all', sort = 'recent', p = '1' } = await searchParams;
  setRequestLocale(locale);

  const l = locale === 'en' ? 'en' : 'ro';
  const page = Math.max(1, parseInt(p, 10) || 1);

  // ── Filtrare ────────────────────────────────────────────────────────────────
  const pool = articles.filter((a) => a.locale === locale);

  const filtered = pool.filter((a) => {
    const matchV = v === 'all' || a.vertical === v;
    const qLow = q.toLowerCase().trim();
    const matchQ = !qLow
      || a.title.toLowerCase().includes(qLow)
      || a.description.toLowerCase().includes(qLow);
    return matchV && matchQ;
  });

  // ── Sortare ──────────────────────────────────────────────────────────────────
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'az') return a.title.localeCompare(b.title, locale);
    if (sort === 'za') return b.title.localeCompare(a.title, locale);
    // 'recent' default — după dateModified descrescător
    const da = a.dateModified ?? a.datePublished ?? '';
    const db = b.dateModified ?? b.datePublished ?? '';
    return db.localeCompare(da);
  });

  // ── Paginare ─────────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // ── Serializare (fără body) ───────────────────────────────────────────────────
  const serialized = pageItems.map((a) => ({
    title: a.title,
    description: a.description,
    vertical: a.vertical,
    slug: a.slug,
    locale: a.locale,
    datePublished: a.datePublished ?? '',
    dateModified: a.dateModified ?? a.datePublished ?? '',
    // Estimare wordCount din body HTML (caractere / 5 ≈ cuvinte)
    wordCount: a.body ? Math.round(a.body.replace(/<[^>]+>/g, '').length / 5) : undefined,
  }));

  // ── JSON-LD ItemList ─────────────────────────────────────────────────────────
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: l === 'ro' ? 'Ghiduri de călătorie Plecări' : 'Plecări travel guides',
    numberOfItems: filtered.length,
    itemListElement: pageItems.map((a, i) => ({
      '@type': 'ListItem',
      position: (safePage - 1) * PER_PAGE + i + 1,
      url: `${SITE_URL}/${locale}/${a.vertical}/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <main className="search-page">
      <JsonLd data={itemListSchema} />
      <div className="search-page-inner">
        
        <SearchClient
          locale={locale}
          initialQ={q}
          initialV={v}
          initialSort={sort}
          initialPage={safePage}
          totalPages={totalPages}
          totalCount={filtered.length}
          articles={serialized}
          perPage={PER_PAGE}
        />
      </div>
    </main>
  );
}