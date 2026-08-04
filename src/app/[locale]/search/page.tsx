// src/app/[locale]/search/page.tsx
// Pagină de căutare — Server Component static, SEO-first
// URL: /ro/search?q=esim&v=zboruri&p=2

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { articles } from '@/lib/content';
import { getAlternates } from '@/lib/metadata';
import { SITE_URL } from '@/config/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchClient } from '@/components/SearchClient';
import { JsonLd } from '@/components/JsonLd';

// ─── Constante ────────────────────────────────────────────────────────────────
const PER_PAGE = 12;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; v?: string; p?: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'ro' }, { locale: 'en' }];
}

// ─── Metadata SEO ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { q, v } = await searchParams;
  const l = locale === 'en' ? 'en' : 'ro';

  const title =
    l === 'ro'
      ? q
        ? `Rezultate pentru „${q}" — Ghiduri de călătorie`
        : 'Caută ghiduri de călătorie — Plecări'
      : q
        ? `Results for "${q}" — Travel guides`
        : 'Search travel guides — Plecări';

  const description =
    l === 'ro'
      ? 'Caută în toate ghidurile Plecări: zboruri, cazări, croaziere, eSIM, asigurări și city breaks.'
      : 'Search all Plecări guides: flights, stays, cruises, eSIM, insurance and city breaks.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/search'),
    // Paginile de search cu filtre active nu se indexează (duplicate content)
    robots:
      q || v
        ? { index: false, follow: true }
        : { index: true, follow: true, 'max-snippet': -1 },
  };
}

// ─── Server Component ──────────────────────────────────────────────────────────
export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q = '', v = 'all', p = '1' } = await searchParams;
  setRequestLocale(locale);

  const l = locale === 'en' ? 'en' : 'ro';
  const page = Math.max(1, parseInt(p, 10) || 1);

  // ── Filtrare ─────────────────────────────────────────────────────────────────
  const pool = articles.filter((a) => a.locale === locale);

  const filtered = pool.filter((a) => {
    const matchV = v === 'all' || a.vertical === v;
    const qLow = q.toLowerCase().trim();
    const matchQ =
      !qLow ||
      a.title.toLowerCase().includes(qLow) ||
      a.description.toLowerCase().includes(qLow);
    return matchV && matchQ;
  });

  // ── Sortare: mai recente primele ──────────────────────────────────────────────
  const sorted = [...filtered].sort((a, b) => {
    const da = a.dateModified ?? a.datePublished ?? '';
    const db = b.dateModified ?? b.datePublished ?? '';
    return db.localeCompare(da);
  });

  // ── Paginare ──────────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // ── Serializăm articolele (fără `body` — nu e necesar în listare) ─────────────
  const serialized = pageItems.map((a) => ({
    title: a.title,
    description: a.description,
    vertical: a.vertical,
    slug: a.slug,
    locale: a.locale,
    datePublished: a.datePublished ?? '',
    dateModified: a.dateModified ?? a.datePublished ?? '',
  }));

  // ── JSON-LD ItemList (SEO) ────────────────────────────────────────────────────
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
        <Breadcrumbs
          locale={locale}
          items={[
            { name: l === 'ro' ? 'Acasă' : 'Home', path: '/' },
            { name: l === 'ro' ? 'Caută' : 'Search', path: '/search' },
          ]}
        />

        {/* Client component preia controlul interactivității */}
        <SearchClient
          locale={locale}
          initialQ={q}
          initialV={v}
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