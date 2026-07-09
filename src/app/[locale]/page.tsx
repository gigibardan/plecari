// src/app/[locale]/page.tsx — homepage v2 (premium, SVG icons, 6 articole)
import { use } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAlternates } from '@/lib/metadata';
import { VERTICALS } from '@/config/verticals';
import { articles } from '@/lib/content';
import { SearchWidget } from '@/components/SearchWidget';
import React from 'react';


const HERO_WIDGET_SRC =
  'https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100';

// Culoarea accentului per verticală (folosită pe badge-ul articolului)
const VERTICAL_ACCENT: Record<string, string> = {
  zboruri: '#1F5E56',
  cazari: '#C15540',
  asigurari: '#2B2018',
  croaziere: '#8B6914',
  'esim-roaming': '#5B2D8E',
  'inchirieri-auto': '#1A5C28',
  'city-breaks': '#8B2252',
  'experiente': 'var(--ochre)',
};

// SVG-uri line-art per verticală (stroke, nu fill)
const ICONS: Record<string, React.ReactElement> = {
  zboruri: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20l5-2 10-10 8-5-5 8-10 10-2 5z" />
      <path d="M13 13l6 6" />
      <path d="M3 29h6M23 3l2 2" />
    </svg>
  ),
  cazari: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="24" height="18" rx="2" />
      <path d="M4 16h24" />
      <path d="M10 10V6a6 6 0 0112 0v4" />
      <circle cx="16" cy="22" r="2" />
    </svg>
  ),
  'experiente': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="12" r="4" />
      <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M22 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      <path d="M26 16l1.5 1.5" />
    </svg>
  ),
  asigurari: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3L5 7v9c0 7 5 12 11 13 6-1 11-6 11-13V7L16 3z" />
      <path d="M11 16l3 3 7-7" />
    </svg>
  ),
  croaziere: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h26" />
      <path d="M8 22l-2 4h20l-2-4" />
      <path d="M16 6v10M10 14h12" />
      <path d="M8 10l8-6 8 6" />
      <path d="M6 18l3-4h14l3 4" />
    </svg>
  ),
  'esim-roaming': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="4" width="12" height="24" rx="3" />
      <path d="M13 8h6M15 24h2" />
      <path d="M4 12c3.3-3.3 8-5 12-5s8.7 1.7 12 5" />
      <path d="M7 15.5c2.3-2.3 5.5-3.5 9-3.5s6.7 1.2 9 3.5" />
    </svg>
  ),
  'inchirieri-auto': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20H4a1 1 0 01-1-1v-3l4-8h18l4 8v3a1 1 0 01-1 1h-2" />
      <circle cx="9" cy="22" r="3" />
      <circle cx="23" cy="22" r="3" />
      <path d="M12 22h8M7 14h18" />
    </svg>
  ),
  'city-breaks': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 28h26" />
      <rect x="14" y="14" width="8" height="14" rx="1" />
      <rect x="5" y="18" width="7" height="10" rx="1" />
      <path d="M14 14V8l-5-4-5 4v6" />
      <path d="M17 28V20h2v8M22 14V6h5v8" />
    </svg>
  ),
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: getAlternates(locale, '')
  };
}

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const l = locale === 'en' ? 'en' : 'ro';

  // Ultimele 6 articole (cele mai recent publicate pe locale curent)
  const recentArticles = articles
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-tint" />
        <div className="hero-veil" />
        <div className="hero-wrap">
          <p className="hero-eyebrow">Plecări</p>
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-sub">{t('subtitle')}</p>
          <div className="hero-search">
            <SearchWidget
              title={l === 'en' ? 'Search flights, stays & more' : 'Caută zboruri, cazări și mai mult'}
              scriptSrc={HERO_WIDGET_SRC}
              minHeight={200}
            />
          </div>
        </div>
      </section>

      {/* VERTICALE */}
      <section className="hp-section">
        <div className="hp-section-head">
          <span className="hp-label">{l === 'en' ? 'Explore' : 'Explorează'}</span>
          <h2>{l === 'en' ? 'All services' : 'Toate serviciile'}</h2>
        </div>
        <div className="verticals-grid">
          {VERTICALS.map((v) => (
            <Link
              key={v.slug}
              href={`/${v.slug}`}
              className="vertical-card"
              prefetch={false}
              style={{ '--vc-accent': VERTICAL_ACCENT[v.slug] ?? '#2B2018' } as React.CSSProperties}
            >
              <div className="vertical-card-icon">
                {ICONS[v.slug]}
              </div>
              <div className="vertical-card-body">
                <span className="vertical-card-name">{l === 'en' ? v.label.en : v.label.ro}</span>
                <span className="vertical-card-desc">{l === 'en' ? v.desc.en : v.desc.ro}</span>
              </div>
              <span className="vertical-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ARTICOLE RECENTE */}
      {recentArticles.length > 0 && (
        <section className="hp-section hp-section--articles">
          <div className="hp-section-head">
            <span className="hp-label">{l === 'en' ? 'Guides' : 'Ghiduri'}</span>
            <h2>{l === 'en' ? 'Recommended reads' : 'Recomandate'}</h2>
          </div>
          <div className="articles-grid">
            {recentArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.vertical}/${a.slug}`}
                className="article-card"
                prefetch={false}
                style={{ '--ac-accent': VERTICAL_ACCENT[a.vertical] ?? '#2B2018' } as React.CSSProperties}
              >
                <span className="article-card-tag">{l === 'en'
                  ? VERTICALS.find(v => v.slug === a.vertical)?.label.en ?? a.vertical
                  : VERTICALS.find(v => v.slug === a.vertical)?.label.ro ?? a.vertical
                }</span>
                <h3 className="article-card-title">{a.title}</h3>
                <p className="article-card-desc">{a.description}</p>
                <span className="article-card-cta">
                  {l === 'en' ? 'Read guide' : 'Citește ghidul'} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}