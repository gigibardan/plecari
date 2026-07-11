// src/app/[locale]/[vertical]/page.tsx — hub cu CruiseSearchHero pe croaziere
import {use} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {articles} from '@/lib/content';
import {getAlternates} from '@/lib/metadata';
import {Link} from '@/i18n/navigation';
import {VERTICAL_SLUGS, getVertical} from '@/config/verticals';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {SearchWidget} from '@/components/SearchWidget';
import {AffiliateButton} from '@/components/AffiliateButton';
import {GYGWidget} from '@/components/GYGWidget';
import {CruiseSearchHero} from '@/components/CruiseSearchHero';
export const dynamic = 'force-static';
export const revalidate = false;

type Props = {params: Promise<{locale: string; vertical: string}>};

export function generateStaticParams() {
  const out: {locale: string; vertical: string}[] = [];
  for (const locale of routing.locales) {
    for (const vertical of VERTICAL_SLUGS) {
      out.push({locale, vertical});
    }
  }
  return out;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, vertical} = await params;
  const v = getVertical(vertical);
  if (!v) return {};
  const l = locale === 'en' ? 'en' : 'ro';
  return {
    title: v.label[l],
    description: v.intro[l],
    alternates: getAlternates(locale, `/${vertical}`)
  };
}

export default function VerticalHub({params}: Props) {
  const {locale, vertical} = use(params);
  const v = getVertical(vertical);
  if (!v) notFound();
  setRequestLocale(locale);

  const l = locale === 'en' ? 'en' : 'ro';
  const posts = articles.filter(
    (a) => a.locale === locale && a.vertical === vertical
  );
  const hasEngine = Boolean(v.widget) || v.cta.length > 0;

  return (
    <>
      {/* HERO de verticală */}
      <section className="hub-hero">
        <div
          className="hub-hero-photo"
          style={{backgroundImage: `url(${v.image})`}}
        />
        <div className="hub-hero-tint" />
        <div className="hub-hero-veil" />
        <div className="hub-hero-wrap">
          <p className="hub-hero-eyebrow">Plecări</p>
          <h1 className="hub-hero-title">{v.label[l]}</h1>
          <p className="hub-hero-sub">{v.intro[l]}</p>
        </div>
      </section>

      <div className="hub-body">
        <Breadcrumbs
          locale={locale}
          items={[
            {name: 'Acasă', path: '/'},
            {name: v.label[l], path: `/${vertical}`}
          ]}
        />

        {/* MOTOR CROAZIERE — CruiseSearchHero */}
        {vertical === 'croaziere' && (
          <CruiseSearchHero locale={locale} />
        )}

        {/* MOTOR: widget TP unde există, butoane unde nu */}
        {hasEngine && vertical !== 'croaziere' && (
          <div className="hub-engine">
            {v.widget && (
              <SearchWidget
                title={l === 'en' ? 'Search & compare' : 'Caută și compară'}
                scriptSrc={v.widget}
                minHeight={v.widgetHeight}
              />
            )}
            {v.cta.length > 0 && (
              <div className="cta-group">
                {v.cta.map((c, i) => (
                  <AffiliateButton key={i} href={c.href}>
                    {c.label}
                  </AffiliateButton>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA-uri croaziere SUB motorul vizual */}
        {vertical === 'croaziere' && v.cta.length > 0 && (
          <div className="cta-group">
            {v.cta.map((c, i) => (
              <AffiliateButton key={i} href={c.href}>
                {c.label}
              </AffiliateButton>
            ))}
          </div>
        )}

        {/* WIDGET GYG — pe experiențe și city-breaks */}
        {vertical === 'experiente' && (
          <GYGWidget
            type="activity-manual"
            query={l === 'en' ? 'bucharest' : 'bucuresti'}
            locale={l === 'en' ? 'en-US' : 'ro-RO'}
            numberOfItems={3}
            title={l === 'en' ? 'Popular experiences' : 'Experiențe populare'}
          />
        )}

        {vertical === 'city-breaks' && (
          <GYGWidget
            type="activity-manual"
            query={l === 'en' ? 'europe city tours' : 'tururi orașe europene'}
            locale={l === 'en' ? 'en-US' : 'ro-RO'}
            numberOfItems={3}
            title={l === 'en' ? 'City experiences' : 'Experiențe în orașe'}
          />
        )}

        {/* ARTICOLE */}
        {posts.length > 0 ? (
          <>
            <h2>{l === 'en' ? 'Guides' : 'Ghiduri'}</h2>
            <ul className="hub-list">
              {posts.map((a) => (
                <li key={a.slug} className="hub-card">
                  <Link href={`/${vertical}/${a.slug}`} prefetch={false}>
                    {a.title}
                  </Link>
                  <p>{a.description}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="hub-empty">
            {l === 'en' ? 'Guides coming soon.' : 'Ghiduri în curând.'}
          </p>
        )}
      </div>
    </>
  );
}