// src/app/[locale]/page.tsx — homepage v3 (spectaculos + responsive)
import { use } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getAlternates } from '@/lib/metadata';
import { VERTICALS } from '@/config/verticals';
import { articles } from '@/lib/content';
import { SearchWidget } from '@/components/SearchWidget';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TrustBar } from '@/components/TrustBar';
import React from 'react';

const HERO_WIDGET_SRC =
  'https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100';

/* ── Destinații populare ── */
const DESTINATIONS = [
  { city: 'Roma', slug: 'experiente/ce-sa-faci-in-roma', color: '#C15540', initial: 'R' },
  { city: 'Istanbul', slug: 'experiente/ce-sa-faci-in-istanbul', color: '#1F5E56', initial: 'I' },
  { city: 'Barcelona', slug: 'experiente/ce-sa-faci-in-barcelona', color: '#8B2252', initial: 'B' },
  { city: 'Paris', slug: 'experiente/ce-sa-faci-in-paris', color: '#2B2018', initial: 'P' },
  { city: 'Atena', slug: 'experiente/ce-sa-faci-in-atena', color: '#1F5E56', initial: 'A' },
  { city: 'Budapesta', slug: 'experiente/ce-sa-faci-in-budapesta', color: '#8B6914', initial: 'B' },
  { city: 'Praga', slug: 'experiente/ce-sa-faci-in-praga', color: '#5B2D8E', initial: 'P' },
  { city: 'Viena', slug: 'city-breaks/ce-sa-faci-in-viena', color: '#1A5C28', initial: 'V' },
];

/* ── Accent per verticală ── */
const VERTICAL_ACCENT: Record<string, string> = {
  zboruri: '#1F5E56',
  cazari: '#C15540',
  asigurari: '#2B2018',
  croaziere: '#8B6914',
  'esim-roaming': '#5B2D8E',
  'inchirieri-auto': '#1A5C28',
  'city-breaks': '#8B2252',
  experiente: '#B8860B',
};

/* ── SVG-uri line-art per verticală ── */
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
  experiente: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
      <circle cx="16" cy="23" r="3" />
      <path d="M10 28c0-3.3 2.7-6 6-6s6 2.7 6 6" />
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

  /* ── Titlul animat (cuvânt cu cuvânt) ── */
  const titleWords = t('title').split(' ');

  /* ── Articole: featured + recente ── */
  const allLocale = articles
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  const featured = allLocale.find((a) => a.featured) ?? allLocale[0];
  const recentArticles = allLocale
    .filter((a) => !featured || a.slug !== featured.slug)
    .slice(0, 6);

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO — text animat + glassmorphism
          ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-tint" />
        <div className="hero-veil" />

        <div className="hero-wrap">
          <p className="hero-eyebrow">Plecări</p>
          <h1 className="hero-title">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ '--word-i': i } as React.CSSProperties}
              >
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{t('subtitle')}</p>

          {/* Desktop: widget cu glassmorphism */}
          <div className="hero-search">
            <SearchWidget
              title={
                l === 'en'
                  ? 'Search flights, stays & more'
                  : 'Caută zboruri, cazări și mai mult'
              }
              scriptSrc={HERO_WIDGET_SRC}
              minHeight={200}
            />
          </div>

          {/* Mobil: buton CTA în loc de widget */}
          <a className="hero-cta-mobile" href="#cauta">
            {l === 'en' ? 'Search flights & stays' : 'Caută zboruri și cazări'}
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M7 17l9.2-9.2M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* Separator ondulat (coastline) */}
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="var(--cream)">
            <path d="M0,32 C240,65 480,0 720,32 C960,65 1200,10 1440,32 L1440,70 L0,70Z" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. DESTINAȚII POPULARE — bandă vizuală
          ═══════════════════════════════════════════ */}
      <section className="hp-destinations">
        <div className="hp-destinations-inner">
          <p className="hp-label">
            {l === 'en' ? 'Popular right now' : 'Populare acum'}
          </p>
          <div className="destinations-track">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.city}
                href={`/${d.slug}`}
                className="dest-item"
                prefetch={false}
              >
                <span
                  className="dest-circle"
                  style={
                    {
                      '--dest-color': d.color,
                      backgroundImage: `url(/destinations/${d.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.webp)`
                    } as React.CSSProperties
                  }
                >
                  <span className="dest-initial" aria-hidden="true">
                    {d.initial}
                  </span>
                </span>
                <span className="dest-name">{d.city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. VERTICALE — pills mobil, carduri desktop
          ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="hp-section hp-verticals-section">
          <div className="hp-section-head">
            <span className="hp-label">
              {l === 'en' ? 'Explore' : 'Explorează'}
            </span>
            <h2>{l === 'en' ? 'All services' : 'Toate serviciile'}</h2>
          </div>
          <div className="verticals-grid">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={`/${v.slug}`}
                className="vertical-card"
                prefetch={false}
                style={
                  {
                    '--vc-accent': VERTICAL_ACCENT[v.slug] ?? '#2B2018'
                  } as React.CSSProperties
                }
              >
                <div className="vertical-card-icon">{ICONS[v.slug]}</div>
                <div className="vertical-card-body">
                  <span className="vertical-card-name">
                    {l === 'en' ? v.label.en : v.label.ro}
                  </span>
                  <span className="vertical-card-desc">
                    {l === 'en' ? v.desc.en : v.desc.ro}
                  </span>
                </div>
                <span className="vertical-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════
          4. MOTOR DE CĂUTARE MOBIL (sub fold)
          ═══════════════════════════════════════════ */}
      <section className="hp-search-mobile" id="cauta">
        <div className="hp-search-mobile-inner">
          <SearchWidget
            title={
              l === 'en'
                ? 'Search flights, stays & more'
                : 'Caută zboruri, cazări și mai mult'
            }
            scriptSrc={HERO_WIDGET_SRC}
            minHeight={200}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. TRUST BAR — cifre animate
          ═══════════════════════════════════════════ */}
      <TrustBar locale={l} />

      {/* ═══════════════════════════════════════════
          6. ARTICOLE — featured + grid
          ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="hp-section hp-section--articles">
          <div className="hp-section-head">
            <span className="hp-label">
              {l === 'en' ? 'Guides' : 'Ghiduri'}
            </span>
            <h2>{l === 'en' ? 'Recommended reads' : 'Recomandate'}</h2>
          </div>

          {/* Featured article — piesă de rezistență */}
          {featured && (
            <Link
              href={`/${featured.vertical}/${featured.slug}`}
              className="article-featured"
              prefetch={false}
              style={
                {
                  '--af-accent':
                    VERTICAL_ACCENT[featured.vertical] ?? '#2B2018'
                } as React.CSSProperties
              }
            >
              <span className="article-featured-tag">
                {l === 'en'
                  ? (VERTICALS.find((v) => v.slug === featured.vertical)
                    ?.label.en ?? featured.vertical)
                  : (VERTICALS.find((v) => v.slug === featured.vertical)
                    ?.label.ro ?? featured.vertical)}
              </span>
              <h3 className="article-featured-title">{featured.title}</h3>
              <p className="article-featured-desc">{featured.description}</p>
              <span className="article-featured-cta">
                {l === 'en' ? 'Read guide' : 'Citește ghidul'} →
              </span>
            </Link>
          )}

          {/* Restul articolelor */}
          {recentArticles.length > 0 && (
            <div className="articles-grid">
              {recentArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.vertical}/${a.slug}`}
                  className="article-card"
                  prefetch={false}
                  style={
                    {
                      '--ac-accent':
                        VERTICAL_ACCENT[a.vertical] ?? '#2B2018'
                    } as React.CSSProperties
                  }
                >
                  <span className="article-card-tag">
                    {l === 'en'
                      ? (VERTICALS.find((v) => v.slug === a.vertical)?.label
                        .en ?? a.vertical)
                      : (VERTICALS.find((v) => v.slug === a.vertical)?.label
                        .ro ?? a.vertical)}
                  </span>
                  <h3 className="article-card-title">{a.title}</h3>
                  <p className="article-card-desc">{a.description}</p>
                  <span className="article-card-cta">
                    {l === 'en' ? 'Read guide' : 'Citește ghidul'} →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════
          7. DE CE PLECĂRI — credibilitate vizuală
          ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="hp-why">
          <div className="hp-why-inner">
            <div className="hp-section-head" style={{ textAlign: 'center' }}>
              <span className="hp-label">
                {l === 'en' ? 'Why us' : 'De ce noi'}
              </span>
              <h2>
                {l === 'en'
                  ? 'Why travellers choose Plecări'
                  : 'De ce călătorii aleg Plecări'}
              </h2>
            </div>
            <div className="why-grid">
              {/* Experiență reală */}
              <div className="why-item">
                <div className="why-icon">
                  <svg viewBox="0 0 40 40" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="20" cy="20" r="16" />
                    <path d="M20 8v4M20 28v4M32 20h-4M12 20H8" />
                    <path d="M20 14l2 6-6 2" />
                    <circle cx="20" cy="20" r="2" fill="var(--teal)" />
                  </svg>
                </div>
                <h3>
                  {l === 'en' ? 'Real industry experience' : 'Experiență reală'}
                </h3>
                <p>
                  {l === 'en'
                    ? "We come from the cruise industry, not from a content farm. Our guides have details you won't find elsewhere."
                    : 'Venim din industria croazierelor, nu dintr-o fabrică de conținut. Ghidurile noastre au detalii pe care nu le găsești în altă parte.'}
                </p>
              </div>

              {/* Instrumente integrate */}
              <div className="why-item">
                <div className="why-icon">
                  <svg viewBox="0 0 40 40" fill="none" stroke="var(--clay)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="17" cy="17" r="12" />
                    <path d="M26 26l8 8" strokeWidth="2" />
                    <path d="M12 17h10M17 12v10" />
                  </svg>
                </div>
                <h3>
                  {l === 'en'
                    ? 'Tools, not just links'
                    : 'Instrumente, nu doar linkuri'}
                </h3>
                <p>
                  {l === 'en'
                    ? 'Compare prices and options right here — our search tools connect to real booking platforms.'
                    : 'Compari prețuri și opțiuni direct pe site — motoarele noastre de căutare sunt conectate la platforme reale.'}
                </p>
              </div>

              {/* Transparență */}
              <div className="why-item">
                <div className="why-icon">
                  <svg viewBox="0 0 40 40" fill="none" stroke="var(--ochre)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6c-8 0-14 6-14 11s6 11 14 11 14-6 14-11S28 6 20 6z" />
                    <path d="M8 20h24" />
                    <path d="M20 6c4 3.5 6 8 6 11s-2 7.5-6 11c-4-3.5-6-8-6-11s2-7.5 6-11z" />
                  </svg>
                </div>
                <h3>
                  {l === 'en' ? 'Zero hidden costs' : 'Zero costuri ascunse'}
                </h3>
                <p>
                  {l === 'en'
                    ? 'You pay the same price with or without us. We earn a commission from partners only when we help you.'
                    : 'Plătești aceeași sumă, cu sau fără noi. Primim comision de la parteneri doar dacă ți-am fost de folos.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════
          8. INSPIRAȚIE — carduri vizuale cu imagini
          ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="hp-section hp-inspiration">
          <div className="hp-section-head" style={{ textAlign: 'center' }}>
            <span className="hp-label">
              {l === 'en' ? 'Inspiration' : 'Inspirație'}
            </span>
            <h2>
              {l === 'en'
                ? 'Where will you go next?'
                : 'Unde pleci data viitoare?'}
            </h2>
          </div>
          <div className="inspiration-grid">
            <Link
              href="/croaziere/ghid-croaziere-mediterana"
              className="inspo-card inspo-card--wide"
              prefetch={false}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80')" }}
            >
              <span className="inspo-label">
                {l === 'en' ? 'Cruises' : 'Croaziere'}
              </span>
              <span className="inspo-title">
                {l === 'en' ? 'Mediterranean 2026' : 'Mediterana 2026'}
              </span>
            </Link>
            <Link
              href="/experiente/ce-sa-faci-in-istanbul"
              className="inspo-card"
              prefetch={false}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80')" }}
            >
              <span className="inspo-label">City break</span>
              <span className="inspo-title">Istanbul</span>
            </Link>
            <Link
              href="/experiente/ce-sa-faci-in-roma"
              className="inspo-card"
              prefetch={false}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80')" }}
            >
              <span className="inspo-label">City break</span>
              <span className="inspo-title">Roma</span>
            </Link>
            <Link
              href="/experiente/ce-sa-faci-in-barcelona"
              className="inspo-card"
              prefetch={false}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80')" }}
            >
              <span className="inspo-label">City break</span>
              <span className="inspo-title">Barcelona</span>
            </Link>
            <Link
              href="/experiente/ce-sa-faci-in-paris"
              className="inspo-card inspo-card--wide"
              prefetch={false}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80')" }}
            >
              <span className="inspo-label">City break</span>
              <span className="inspo-title">Paris</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>
      {/* ═══════════════════════════════════════════
          9. PREGĂTIT DE PLECARE — CTA final
          ═══════════════════════════════════════════ */}
      <section className="hp-ready">
        <div className="hp-ready-inner">
          <h2>
            {l === 'en' ? 'Ready to go?' : 'Pregătit de plecare?'}
          </h2>
          <p>
            {l === 'en'
              ? 'Pick a starting point — we handle the rest.'
              : 'Alege un punct de plecare — noi ne ocupăm de rest.'}
          </p>
          <div className="ready-actions">
            <Link href="/zboruri" className="ready-btn" prefetch={false}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-2 8-8 5-4-4 5-8 8-2 5z" /><path d="M11 11l4 4" /></svg>
              {l === 'en' ? 'Flights' : 'Zboruri'}
            </Link>
            <Link href="/croaziere" className="ready-btn" prefetch={false}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17h18" /><path d="M6 17l-1 3h14l-1-3" /><path d="M12 5v8M8 11h8" /></svg>
              {l === 'en' ? 'Cruises' : 'Croaziere'}
            </Link>
            <Link href="/experiente" className="ready-btn" prefetch={false}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5H18l-3.5 3 1.5 4.5L12 12l-4 3 1.5-4.5L6 7.5h4.5z" /></svg>
              {l === 'en' ? 'Experiences' : 'Experiențe'}
            </Link>
            <Link href="/asigurari" className="ready-btn" prefetch={false}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L4 7v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V7l-8-4z" /><path d="M9 12l2 2 4-4" /></svg>
              {l === 'en' ? 'Insurance' : 'Asigurări'}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. PARTENERI — bandă de încredere
          ═══════════════════════════════════════════ */}
          <section className="hp-partners" aria-label={l === 'en' ? 'Our partners' : 'Partenerii noștri'}>
        <div className="hp-partners-inner">
          <p className="partners-label">
            {l === 'en' ? 'Trusted partners' : 'Parteneri de încredere'}
          </p>
          <div className="partners-track">
            <a href="https://www.anrdoezrs.net/click-101821346-7299361" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/cruisedirect.webp" alt="CruiseDirect" width="120" height="40" loading="lazy" />
            </a>
            <a href="https://www.getyourguide.com/?partner_id=EKAA80H" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/getyourguide.webp" alt="GetYourGuide" width="120" height="40" loading="lazy" />
            </a>
            <a href="https://airalo.tpo.mx/mYekFAo3" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/airalo.webp" alt="Airalo" width="120" height="40" loading="lazy" />
            </a>
            <a href="https://saily.tpo.mx/3mxe5Ao3" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/saily.webp" alt="Saily" width="120" height="40" loading="lazy" />
            </a>
            <a href="https://ektatraveling.tpo.mx/uU7jZ5jK" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/ekta.webp" alt="EKTA Travel Insurance" width="120" height="40" loading="lazy" />
            </a>
            <a href="https://aviasales.tpo.mx/k7yrWro3?marker=547266" target="_blank" rel="noopener noreferrer" className="partner-link">
              <img src="/partners/kiwi.webp" alt="Kiwi.com" width="120" height="40" loading="lazy" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}