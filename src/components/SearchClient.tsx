'use client';
// src/components/SearchClient.tsx
// Client component — UI interactiv pentru pagina de căutare
// Actualizează URL params (router.push) → Server re-renderizează cu date noi

import { useCallback, useTransition, useRef, useEffect } from 'react';
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
}

interface SearchClientProps {
  locale: string;
  initialQ: string;
  initialV: string;
  initialPage: number;
  totalPages: number;
  totalCount: number;
  articles: ArticleCard[];
  perPage: number;
}

// ─── Date verticale ───────────────────────────────────────────────────────────
const VERTICALS = [
  { slug: 'all',            ro: 'Toate',          en: 'All',         icon: '✦' },
  { slug: 'zboruri',        ro: 'Zboruri',        en: 'Flights',     icon: '✈' },
  { slug: 'cazari',         ro: 'Cazări',         en: 'Stays',       icon: '🏨' },
  { slug: 'croaziere',      ro: 'Croaziere',      en: 'Cruises',     icon: '⚓' },
  { slug: 'esim-roaming',   ro: 'eSIM',           en: 'eSIM',        icon: '📡' },
  { slug: 'asigurari',      ro: 'Asigurări',      en: 'Insurance',   icon: '🛡' },
  { slug: 'inchirieri-auto',ro: 'Auto',           en: 'Car rental',  icon: '🚗' },
  { slug: 'experiente',     ro: 'Experiențe',     en: 'Experiences', icon: '🗺' },
] as const;

// Accentele per verticală — mapate pe --clay, --teal, --ochre etc.
const V_ACCENT: Record<string, string> = {
  zboruri:          'var(--teal)',
  cazari:           'var(--ochre)',
  croaziere:        '#1a6fa8',
  'esim-roaming':   '#6b46c1',
  asigurari:        'var(--clay)',
  'inchirieri-auto':'#c07c30',
  experiente:       '#2d7a4f',
};

function vLabel(slug: string, l: 'ro' | 'en'): string {
  return VERTICALS.find((v) => v.slug === slug)?.[l] ?? slug;
}

function formatDate(iso: string, l: 'ro' | 'en'): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(l === 'ro' ? 'ro-RO' : 'en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return iso;
  }
}

// ─── Componenta principală ────────────────────────────────────────────────────
export function SearchClient({
  locale,
  initialQ,
  initialV,
  initialPage,
  totalPages,
  totalCount,
  articles,
}: SearchClientProps) {
  const l = locale === 'en' ? 'en' : 'ro';
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input la mount dacă există query
  useEffect(() => {
    if (initialQ && inputRef.current) inputRef.current.focus();
  }, [initialQ]);

  // ── Navighează actualizând URL params ────────────────────────────────────────
  const navigate = useCallback(
    (q: string, v: string, p: number) => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (v !== 'all') params.set('v', v);
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
      const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
      navigate(q, initialV, 1);
    },
    [navigate, initialV]
  );

  const handleVertical = useCallback(
    (v: string) => {
      navigate(initialQ, v, 1);
    },
    [navigate, initialQ]
  );

  const handlePage = useCallback(
    (p: number) => {
      navigate(initialQ, initialV, p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate, initialQ, initialV]
  );

  const hasFilters = initialQ || initialV !== 'all';

  return (
    <div className="sc-wrap">

      {/* ── Hero header ──────────────────────────────────────────────────────── */}
      <div className="sc-hero">
        <p className="sc-eyebrow">
          {l === 'ro' ? 'Biblioteca Plecări' : 'Plecări library'}
        </p>
        <h1 className="sc-title">
          {l === 'ro' ? 'Găsește ghidul potrivit' : 'Find the right guide'}
        </h1>
        <p className="sc-subtitle">
          {l === 'ro'
            ? `${totalCount > 0 ? totalCount : ''} ghiduri despre zboruri, cazări, croaziere, eSIM și mai mult`
            : `${totalCount > 0 ? totalCount : ''} guides on flights, stays, cruises, eSIM and more`}
        </p>
      </div>

      {/* ── Bară de căutare ──────────────────────────────────────────────────── */}
      <form className="sc-searchbar" onSubmit={handleSearch} role="search">
        <div className="sc-searchbar-inner">
          <svg className="sc-search-icon" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            name="q"
            className="sc-input"
            defaultValue={initialQ}
            placeholder={l === 'ro' ? 'Caută: eSIM, Roma, croazieră...' : 'Search: eSIM, Rome, cruise...'}
            autoComplete="off"
            aria-label={l === 'ro' ? 'Caută ghiduri' : 'Search guides'}
          />
          {initialQ && (
            <button
              type="button"
              className="sc-clear"
              onClick={() => navigate('', initialV, 1)}
              aria-label={l === 'ro' ? 'Șterge căutarea' : 'Clear search'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        <button type="submit" className="sc-submit">
          {l === 'ro' ? 'Caută' : 'Search'}
        </button>
      </form>

      {/* ── Filtre verticale ──────────────────────────────────────────────────── */}
      <div className="sc-filters" role="group"
        aria-label={l === 'ro' ? 'Filtrează pe verticală' : 'Filter by category'}>
        {VERTICALS.map((v) => (
          <button
            key={v.slug}
            className={`sc-pill${initialV === v.slug ? ' sc-pill--active' : ''}`}
            onClick={() => handleVertical(v.slug)}
            aria-pressed={initialV === v.slug}
            style={initialV === v.slug && v.slug !== 'all'
              ? { '--pill-accent': V_ACCENT[v.slug] ?? 'var(--clay)' } as React.CSSProperties
              : undefined}
          >
            <span className="sc-pill-icon" aria-hidden="true">{v.icon}</span>
            {v[l]}
          </button>
        ))}
      </div>

      {/* ── Meta rând ─────────────────────────────────────────────────────────── */}
      <div className="sc-meta-row">
        <p className="sc-count" aria-live="polite" aria-atomic="true">
          {isPending ? (
            <span className="sc-loading">
              {l === 'ro' ? 'Se caută...' : 'Searching...'}
            </span>
          ) : totalCount === 0 ? (
            l === 'ro' ? 'Niciun ghid găsit' : 'No guides found'
          ) : (
            <>
              <strong>{totalCount}</strong>{' '}
              {l === 'ro'
                ? totalCount === 1 ? 'ghid' : 'ghiduri'
                : totalCount === 1 ? 'guide' : 'guides'}
              {hasFilters && (
                <button className="sc-reset" onClick={() => navigate('', 'all', 1)}>
                  {l === 'ro' ? '× Resetează' : '× Reset'}
                </button>
              )}
            </>
          )}
        </p>
        {totalPages > 1 && (
          <p className="sc-page-info">
            {l === 'ro'
              ? `Pagina ${initialPage} din ${totalPages}`
              : `Page ${initialPage} of ${totalPages}`}
          </p>
        )}
      </div>

      {/* ── Grid articole ─────────────────────────────────────────────────────── */}
      {articles.length === 0 ? (
        <div className="sc-empty">
          <div className="sc-empty-icon" aria-hidden="true">🔍</div>
          <p className="sc-empty-title">
            {l === 'ro' ? 'Niciun ghid găsit' : 'No guides found'}
          </p>
          <p className="sc-empty-sub">
            {l === 'ro'
              ? 'Încearcă alte cuvinte cheie sau elimină filtrele.'
              : 'Try different keywords or remove filters.'}
          </p>
          <button className="sc-empty-reset" onClick={() => navigate('', 'all', 1)}>
            {l === 'ro' ? 'Arată toate ghidurile' : 'Show all guides'}
          </button>
        </div>
      ) : (
        <ul className="sc-grid" aria-label={l === 'ro' ? 'Ghiduri de călătorie' : 'Travel guides'}>
          {articles.map((a) => (
            <li key={`${a.vertical}-${a.slug}`} className="sc-card">
              <Link
                href={`/${a.vertical}/${a.slug}` as any}
                locale={locale}
                className="sc-card-link"
                prefetch={false}
              >
                <div className="sc-card-top">
                  <span
                    className="sc-card-tag"
                    style={{ '--tag-color': V_ACCENT[a.vertical] ?? 'var(--clay)' } as React.CSSProperties}
                  >
                    {vLabel(a.vertical, l)}
                  </span>
                  <span className="sc-card-date" aria-label={l === 'ro' ? 'Actualizat' : 'Updated'}>
                    {formatDate(a.dateModified || a.datePublished, l)}
                  </span>
                </div>
                <h2 className="sc-card-title">{a.title}</h2>
                <p className="sc-card-desc">{a.description}</p>
                <span className="sc-card-cta" aria-hidden="true">
                  {l === 'ro' ? 'Citește ghidul' : 'Read guide'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ── Paginare ──────────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <nav className="sc-pagination" aria-label={l === 'ro' ? 'Paginare' : 'Pagination'}>
          <button
            className="sc-pag-btn"
            onClick={() => handlePage(initialPage - 1)}
            disabled={initialPage <= 1}
            aria-label={l === 'ro' ? 'Pagina anterioară' : 'Previous page'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {getPageNumbers(initialPage, totalPages).map((item, i) =>
            item === '…' ? (
              <span key={`dots-${i}`} className="sc-pag-dots">…</span>
            ) : (
              <button
                key={item}
                className={`sc-pag-num${item === initialPage ? ' sc-pag-num--active' : ''}`}
                onClick={() => handlePage(item as number)}
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
            disabled={initialPage >= totalPages}
            aria-label={l === 'ro' ? 'Pagina următoare' : 'Next page'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}

// ── Helper: numerele paginației cu ellipsis ────────────────────────────────────
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