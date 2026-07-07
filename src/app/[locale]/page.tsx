// src/app/[locale]/page.tsx — homepage
import {use} from 'react';
import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {getAlternates} from '@/lib/metadata';
import {FEATURED, REST} from '@/config/verticals';
import {SearchWidget} from '@/components/SearchWidget';

// TODO: când alegi un widget în Travelpayouts (Tools → Widgets), pune aici
// scriptul lui. Cât e gol, hero-ul arată un placeholder curat "în curând".
const HERO_WIDGET_SRC = 'https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage'});
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: getAlternates(locale, '')
  };
}

export default function HomePage({params}: Props) {
  const {locale} = use(params);
  setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const l = locale === 'en' ? 'en' : 'ro';

  return (
    <>
      <section className="home-hero">
        <p className="home-hero-eyebrow">
          {l === 'en' ? 'Your travel guide' : 'Ghidul tău de călătorie'}
        </p>
        <h1>{t('title')}</h1>
        <p className="home-hero-sub">{t('subtitle')}</p>

        <div className="hero-search">
          {HERO_WIDGET_SRC ? (
            <SearchWidget
              title={
                l === 'en'
                  ? 'Search flights, stays, insurance & more'
                  : 'Caută zboruri, cazări, asigurări și mai mult'
              }
              scriptSrc={HERO_WIDGET_SRC}
              minHeight={180}
            />
          ) : (
            <div className="hero-search-placeholder">
              <p>
                {l === 'en'
                  ? 'Search engine — connecting soon.'
                  : 'Motorul de căutare — se conectează în curând.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>{l === 'en' ? 'Start here' : 'Începe aici'}</h2>
        </div>
        <div className="featured-grid">
          {FEATURED.map((v) => (
            <Link key={v.slug} href={`/${v.slug}`} className="featured-card">
              <span className="featured-card-label">
                {l === 'en' ? v.label.en : v.label.ro}
              </span>
              <span className="featured-card-desc">
                {l === 'en' ? v.desc.en : v.desc.ro}
              </span>
              <span className="featured-card-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>{l === 'en' ? 'All services' : 'Toate serviciile'}</h2>
        </div>
        <div className="rest-grid">
          {REST.map((v) => (
            <Link key={v.slug} href={`/${v.slug}`} className="rest-card">
              <span>{l === 'en' ? v.label.en : v.label.ro}</span>
              <span className="rest-card-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}