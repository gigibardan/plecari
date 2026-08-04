'use client';
// src/components/SearchClient.tsx — v2: Tabler icons, sort, reading time, keyboard nav

import { useCallback, useTransition, useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

// ─── Tipuri ───────────────────────────────────────────────────────────────────
interface ArticleCard {
  title: string;
  description: string;
  vertical: string;
  slug: string;
  locale: string;
  datePublished: string;
  dateModified: string;
  wordCount?: number;
}

interface SearchClientProps {
  locale: string;
  initialQ: string;
  initialV: string;
  initialSort: string;
  initialPage: number;
  totalPages: number;
  totalCount: number;
  articles: ArticleCard[];
  perPage: number;
}

// ─── Date verticale cu icoane Tabler ─────────────────────────────────────────
const VERTICALS = [
  { slug: 'all',             ro: 'Toate',          en: 'All',          icon: 'ti-layout-grid'      },
  { slug: 'zboruri',         ro: 'Zboruri',        en: 'Flights',      icon: 'ti-plane-tilt'       },
  { slug: 'cazari',          ro: 'Cazări',         en: 'Stays',        icon: 'ti-bed'              },
  { slug: 'croaziere',       ro: 'Croaziere',      en: 'Cruises',      icon: 'ti-anchor'           },
  { slug: 'esim-roaming',    ro: 'eSIM',           en: 'eSIM',         icon: 'ti-wifi'             },
  { slug: 'asigurari',       ro: 'Asigurări',      en: 'Insurance',    icon: 'ti-shield-check'     },
  { slug: 'inchirieri-auto', ro: 'Auto',           en: 'Car rental',   icon: 'ti-steering-wheel'   },
  { slug: 'city-breaks',     ro: 'City breaks',    en: 'City breaks',  icon: 'ti-building-skyscraper' },
  { slug: 'experiente',      ro: 'Experiențe',     en: 'Experiences',  icon: 'ti-ticket'           },
] as const;

// Accentele per verticală
const V_ACCENT: Record<string, { color: string; bg: string }> = {
  zboruri:           { color: '#1F5E56', bg: 'rgba(31,94,86,0.08)'   },
  cazari:            { color: '#b07d20', bg: 'rgba(224,162,43,0.10)' },
  croaziere:         { color: '#1a6fa8', bg: 'rgba(26,111,168,0.08)' },
  'esim-roaming':    { color: '#6b46c1', bg: 'rgba(107,70,193,0.08)' },
  asigurari:         { color: '#C15540', bg: 'rgba(193,85,64,0.08)'  },
  'inchirieri-auto': { color: '#b36b20', bg: 'rgba(179,107,32,0.08)' },
  'city-breaks':     { color: '#8B2252', bg: 'rgba(139,34,82,0.08)'  },
  experiente:        { color: '#2d7a4f', bg: 'rgba(45,122,79,0.08)'  },
};

// Icoane Tabler per verticală (pentru carduri)
const V_CARD_ICON: Record<string, string> = {
  zboruri:           'ti-plane-tilt',
  cazari:            'ti-bed',
  croaziere:         'ti-anchor',
  'esim-roaming':    'ti-wifi',
  asigurari:         'ti-shield-check',
  'inchirieri-auto': 'ti-steering-wheel',
  'city-breaks':     'ti-building-skyscraper',
  experiente:        'ti-ticket',
};

type Locale = 'ro' | 'en';

function vLabel(slug: string, l: Locale): string {
  return VERTICALS.find((v) => v.slug === slug)?.[l] ?? slug;
}

function formatDate(iso: string, l: Locale): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(l === 'ro' ? 'ro-RO' : 'en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
}

// Estimare timp citire din wordCount sau fallback
function readingTime(wordCount: number | undefined, l: Locale): string {
  const wc = wordCount ?? 900; // articolele sunt ~900-4800 cuvinte
  const min = Math.max(1, Math.round(wc / 200));
  return l === 'ro' ? `${min} min citire` : `${min} min read`;
}

// ─── Componenta principală ────────────────────────────────────────────────────
export function SearchClient({
  locale,
  initialQ,
  initialV,
  initialSort,
  initialPage,
  totalPages,
  totalCount,
  articles,
}: SearchClientProps) {
  const l = locale === 'en' ? 'en' : 'ro' as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [inputVal, setInputVal] = useState(initialQ);

  useEffect(() => { setInputVal(initialQ); }, [initialQ]);

  // ── Navighează cu URL params ──────────────────────────────────────────────
  const navigate = useCallback(
    (q: string, v: string, sort: string, p: number) => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (v !== 'all') params.set('v', v);
      if (sort !== 'recent') params.set('sort', sort);
      if (p > 1) params.set('p', String(p));
      const qs = params.toString();
      startTransition(() => {
        router.push(`${pathname}${qs ? `?${qs}` : ''}` as any);
      });
    },
    [router, pathname]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(inputVal, initialV, initialSort, 1);
    },
    [navigate, inputVal, initialV, initialSort]
  );

  const handleVertical = useCallback(
    (v: string) => navigate(initialQ, v, initialSort, 1),
    [navigate, initialQ, initialSort]
  );

  const handleSort = useCallback(
    (sort: string) => navigate(initialQ, initialV, sort, 1),
    [navigate, initialQ, initialV]
  );

  const handlePage = useCallback(
    (p: number) => {
      navigate(initialQ, initialV, initialSort, p);
      // Scroll smooth la grid
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    },
    [navigate, initialQ, initialV, initialSort]
  );

  // Keyboard shortcut: "/" focusează search-ul
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const hasFilters = initialQ || initialV !== 'all';
  const activeAccent = V_ACCENT[initialV] ?? { color: 'var(--teal)', bg: 'rgba(31,94,86,0.08)' };

  const SORT_OPTIONS = [
    { val: 'recent', ro: 'Cele mai recente',  en: 'Most recent'   },
    { val: 'az',     ro: 'Titlu A → Z',       en: 'Title A → Z'  },
    { val: 'za',     ro: 'Titlu Z → A',       en: 'Title Z → A'  },
  ];

  return (
    <div className="sc-wrap">

        {/* ── Breadcrumb dinamic ────────────────────────────────────────── */}
      <nav className="sc-breadcrumb" aria-label="breadcrumb">
        <ol>
          <li>
            <Link href="/" locale={locale} prefetch={false}>
              {l === 'ro' ? 'Acasă' : 'Home'}
            </Link>
          </li>
          <li>
            {initialV === 'all' && !initialQ ? (
              <span aria-current="page">
                {l === 'ro' ? 'Caută' : 'Search'}
              </span>
            ) : (
              <Link href="/search" locale={locale} prefetch={false}>
                {l === 'ro' ? 'Caută' : 'Search'}
              </Link>
            )}
          </li>
          {initialV !== 'all' && (
            <li>
              <span aria-current="page">{vLabel(initialV, l)}</span>
            </li>
          )}
          {initialQ && initialV === 'all' && (
            <li>
              <span aria-current="page">„{initialQ}"</span>
            </li>
          )}
        </ol>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="sc-hero">
        <span className="sc-eyebrow">
          <i className="ti ti-books" aria-hidden="true" />
          {l === 'ro' ? 'Biblioteca Plecări' : 'Plecări library'}
        </span>
        <h1 className="sc-title">
          {l === 'ro' ? 'Găsește ghidul potrivit' : 'Find the right guide'}
        </h1>
        <p className="sc-subtitle">
          {l === 'ro'
            ? 'Zboruri, cazări, croaziere, eSIM, asigurări și experiențe — totul într-un loc'
            : 'Flights, stays, cruises, eSIM, insurance and experiences — all in one place'}
        </p>
      </div>

      {/* ── Search bar ────────────────────────────────────────────────────── */}
      <form className="sc-searchbar" onSubmit={handleSearch} role="search">
        <div className="sc-searchbar-inner">
          <i className="ti ti-search sc-search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            name="q"
            className="sc-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={l === 'ro' ? 'Caută: eSIM, Roma, croazieră... (/)' : 'Search: eSIM, Rome, cruise... (/)'}
            autoComplete="off"
            aria-label={l === 'ro' ? 'Caută ghiduri' : 'Search guides'}
          />
          {inputVal && (
            <button
              type="button"
              className="sc-clear"
              onClick={() => { setInputVal(''); navigate('', initialV, initialSort, 1); inputRef.current?.focus(); }}
              aria-label={l === 'ro' ? 'Șterge căutarea' : 'Clear search'}
            >
              <i className="ti ti-x" aria-hidden="true" style={{ fontSize: 13 }} />
            </button>
          )}
        </div>
        <button type="submit" className="sc-submit" disabled={isPending}>
          {isPending
            ? <i className="ti ti-loader-2 sc-spin" aria-hidden="true" />
            : <><i className="ti ti-search" aria-hidden="true" /> {l === 'ro' ? 'Caută' : 'Search'}</>
          }
        </button>
      </form>

      {/* ── Filtre verticale ──────────────────────────────────────────────── */}
      <div className="sc-filters" role="group"
        aria-label={l === 'ro' ? 'Filtrează pe categorie' : 'Filter by category'}>
        {VERTICALS.map((v) => {
          const isActive = initialV === v.slug;
          const accent = V_ACCENT[v.slug];
          return (
            <button
              key={v.slug}
              className={`sc-pill${isActive ? ' sc-pill--active' : ''}`}
              onClick={() => handleVertical(v.slug)}
              aria-pressed={isActive}
              style={isActive && accent
                ? { '--pill-color': accent.color, '--pill-bg': accent.bg } as React.CSSProperties
                : undefined}
            >
              <i className={`ti ${v.icon} sc-pill-icon`} aria-hidden="true" />
              {v[l]}
            </button>
          );
        })}
      </div>

      {/* ── Toolbar: count + sort ──────────────────────────────────────────── */}
      <div className="sc-toolbar">
        <p className="sc-count" aria-live="polite" aria-atomic="true">
          {isPending ? (
            <span className="sc-loading">
              <i className="ti ti-loader-2 sc-spin" aria-hidden="true" />
              {l === 'ro' ? 'Se caută...' : 'Searching...'}
            </span>
          ) : totalCount === 0 ? (
            l === 'ro' ? 'Niciun ghid găsit' : 'No guides found'
          ) : (
            <>
              <strong>{totalCount}</strong>{' '}
              {l === 'ro' ? (totalCount === 1 ? 'ghid' : 'ghiduri') : (totalCount === 1 ? 'guide' : 'guides')}
              {hasFilters && (
                <button className="sc-reset" onClick={() => { setInputVal(''); navigate('', 'all', initialSort, 1); }}>
                  <i className="ti ti-x" aria-hidden="true" style={{ fontSize: 11 }} />
                  {l === 'ro' ? 'Resetează' : 'Reset'}
                </button>
              )}
            </>
          )}
        </p>

        <div className="sc-sort">
          <i className="ti ti-arrows-sort" aria-hidden="true" style={{ fontSize: 15, color: 'var(--ink-soft)' }} />
          <select
            className="sc-sort-select"
            value={initialSort}
            onChange={(e) => handleSort(e.target.value)}
            aria-label={l === 'ro' ? 'Sortează' : 'Sort'}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.val} value={opt.val}>{opt[l]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Grid articole ─────────────────────────────────────────────────── */}
      {articles.length === 0 ? (
        <div className="sc-empty">
          <div className="sc-empty-visual">
            <i className="ti ti-search-off" aria-hidden="true" />
          </div>
          <p className="sc-empty-title">
            {l === 'ro' ? 'Niciun ghid găsit' : 'No guides found'}
          </p>
          <p className="sc-empty-sub">
            {l === 'ro'
              ? 'Încearcă alte cuvinte cheie sau elimină filtrele.'
              : 'Try different keywords or remove filters.'}
          </p>
          <button className="sc-empty-reset btn-primary"
            onClick={() => { setInputVal(''); navigate('', 'all', initialSort, 1); }}>
            <i className="ti ti-layout-grid" aria-hidden="true" />
            {l === 'ro' ? 'Arată toate ghidurile' : 'Show all guides'}
          </button>
        </div>
      ) : (
        <ul
          ref={gridRef}
          className={`sc-grid${isPending ? ' sc-grid--pending' : ''}`}
          aria-label={l === 'ro' ? 'Ghiduri de călătorie' : 'Travel guides'}
        >
          {articles.map((a) => {
            const accent = V_ACCENT[a.vertical] ?? { color: 'var(--clay)', bg: 'rgba(193,85,64,0.08)' };
            const cardIcon = V_CARD_ICON[a.vertical] ?? 'ti-article';
            return (
              <li key={`${a.vertical}-${a.slug}`}>
                <Link
                  href={`/${a.vertical}/${a.slug}` as any}
                  locale={locale}
                  className="sc-card"
                  prefetch={false}
                  style={{
                    '--card-accent': accent.color,
                    '--card-accent-bg': accent.bg,
                  } as React.CSSProperties}
                >
                  {/* Icon decorativ verticală */}
                  <div className="sc-card-icon-wrap" aria-hidden="true">
                    <i className={`ti ${cardIcon} sc-card-icon`} />
                  </div>

                  <div className="sc-card-body">
                    <div className="sc-card-top">
                      <span className="sc-card-tag">{vLabel(a.vertical, l)}</span>
                      <span className="sc-card-date">{formatDate(a.dateModified || a.datePublished, l)}</span>
                    </div>
                    <h2 className="sc-card-title">{a.title}</h2>
                    <p className="sc-card-desc">{a.description}</p>
                  </div>

                  <div className="sc-card-foot">
                    <span className="sc-card-readtime">
                      <i className="ti ti-clock" aria-hidden="true" />
                      {readingTime(a.wordCount, l)}
                    </span>
                    <span className="sc-card-cta" aria-hidden="true">
                      {l === 'ro' ? 'Citește' : 'Read'}
                      <i className="ti ti-arrow-narrow-right" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* ── Paginare ──────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <nav className="sc-pagination" aria-label={l === 'ro' ? 'Paginare' : 'Pagination'}>
          <button
            className="sc-pag-btn"
            onClick={() => handlePage(initialPage - 1)}
            disabled={initialPage <= 1 || isPending}
            aria-label={l === 'ro' ? 'Pagina anterioară' : 'Previous page'}
          >
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>

          {getPageNumbers(initialPage, totalPages).map((item, i) =>
            item === '…' ? (
              <span key={`dots-${i}`} className="sc-pag-dots">…</span>
            ) : (
              <button
                key={item}
                className={`sc-pag-num${item === initialPage ? ' sc-pag-num--active' : ''}`}
                onClick={() => handlePage(item as number)}
                disabled={isPending}
                aria-label={`${l === 'ro' ? 'Pagina' : 'Page'} ${item}`}
                aria-current={item === initialPage ? 'page' : undefined}
              >
                {item}
              </button>
            )
          )}

          <button
            className="sc-pag-btn"
            onClick={() => handlePage(initialPage + 1)}
            disabled={initialPage >= totalPages || isPending}
            aria-label={l === 'ro' ? 'Pagina următoare' : 'Next page'}
          >
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </button>
        </nav>
      )}

      {/* ── Hint keyboard ─────────────────────────────────────────────────── */}
      <p className="sc-keyboard-hint" aria-hidden="true">
        <kbd>/</kbd> {l === 'ro' ? 'pentru a căuta rapid' : 'to search quickly'}
      </p>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  if (current > 3) pages.push('…');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}