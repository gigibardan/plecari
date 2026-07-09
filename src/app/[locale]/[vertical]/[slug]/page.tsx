// src/app/[locale]/[vertical]/[slug]/page.tsx
import {use} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {articles} from '@/lib/content';
import {getAlternates} from '@/lib/metadata';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {FAQ} from '@/components/FAQ';
import {AffiliateDisclosure} from '@/components/AffiliateDisclosure';
import {AffiliateButton} from '@/components/AffiliateButton';
import {JsonLd} from '@/components/JsonLd';
import {articleSchema} from '@/lib/schema';
import {AnswerBox} from '@/components/AnswerBox';
import {SearchWidget} from '@/components/SearchWidget';
import {GYGWidget} from '@/components/GYGWidget';
import {ArticleBody} from '@/components/ArticleBody';
import {verticalLabel} from '@/config/verticals';

type Props = {
  params: Promise<{locale: string; vertical: string; slug: string}>;
};

export function generateStaticParams() {
  return articles.map((a) => ({
    locale: a.locale,
    vertical: a.vertical,
    slug: a.slug
  }));
}

function findArticle(locale: string, vertical: string, slug: string) {
  return articles.find(
    (a) => a.locale === locale && a.vertical === vertical && a.slug === slug
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, vertical, slug} = await params;
  const a = findArticle(locale, vertical, slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: getAlternates(locale, `/${vertical}/${slug}`)
  };
}

export default function ArticlePage({params}: Props) {
  const {locale, vertical, slug} = use(params);
  setRequestLocale(locale);

  const a = findArticle(locale, vertical, slug);
  if (!a) notFound();

  const l = locale === 'en' ? 'en' : 'ro';
  const gygLocaleCode = a.gygLocale ?? (l === 'en' ? 'en-US' : 'ro-RO');

  return (
    <main className="article" style={{maxWidth: 760, margin: '0 auto'}}>
      <Breadcrumbs
        locale={locale}
        items={[
          {name: 'Acasă', path: '/'},
          {name: verticalLabel(vertical, locale), path: `/${vertical}`},
          {name: a.title, path: `/${vertical}/${slug}`}
        ]}
      />

      <JsonLd
        data={articleSchema({
          title: a.title,
          description: a.description,
          urlPath: `/${locale}/${vertical}/${slug}`,
          datePublished: a.datePublished,
          dateModified: a.dateModified
        })}
      />

      <h1>{a.title}</h1>

      {a.answer && <AnswerBox>{a.answer}</AnswerBox>}

      {/* ── CITY WIDGET (sus, card orașul) ── */}
      {a.gygLocationId && (
        <GYGWidget
          type="city"
          locationId={a.gygLocationId}
          locale={gygLocaleCode}
        />
      )}

      {/* ── CONȚINUT + AVAILABILITY WIDGETS INLINE ── */}
      <ArticleBody
        html={a.body}
        tours={a.gygTours}
        locale={l}
      />

      {/* ── ACTIVITY WIDGET (jos, carduri experiențe) ── */}
      {a.gygQuery && (
        <GYGWidget
          type="activity-manual"
          query={a.gygQuery}
          locale={gygLocaleCode}
          numberOfItems={3}
          title={l === 'en' ? 'Book experiences' : 'Rezervă experiențe'}
        />
      )}

      {/* Widget TP — motor de căutare */}
      {a.widget && (
        <SearchWidget
          title={l === 'en' ? 'Search & compare' : 'Caută și compară'}
          scriptSrc={a.widget}
          minHeight={a.widgetHeight ?? 320}
        />
      )}

      {a.cta && a.cta.length > 0 && (
        <div className="cta-group">
          {a.cta.map((c, i) => (
            <AffiliateButton key={i} href={c.href}>
              {c.label}
            </AffiliateButton>
          ))}
        </div>
      )}

      {a.faq && a.faq.length > 0 && (
        <FAQ heading="Întrebări frecvente" items={a.faq} />
      )}

      <AffiliateDisclosure />
    </main>
  );
}