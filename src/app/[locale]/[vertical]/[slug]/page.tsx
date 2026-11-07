// src/app/[locale]/[vertical]/[slug]/page.tsx
// MODIFICĂRI față de versiunea anterioară:
// 1. Import RelatedArticles, ReadingProgress, BackToTop
// 2. <ReadingProgress /> adăugat în <main> (sus, înainte de breadcrumb)
// 3. <RelatedArticles /> adăugat după FAQ/AffiliateDisclosure
// 4. <BackToTop /> adăugat la finalul <main>

import { use } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { articles } from '@/lib/content';
import { getArticleAlternates } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQ } from '@/components/FAQ';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { AffiliateButton } from '@/components/AffiliateButton';
import { JsonLd } from '@/components/JsonLd';
import { AnswerBox } from '@/components/AnswerBox';
import { SearchWidget } from '@/components/SearchWidget';
import { GYGWidget } from '@/components/GYGWidget';
import { ArticleBody } from '@/components/ArticleBody';
import { RelatedArticles } from '@/components/RelatedArticles';
import { ReadingProgress } from '@/components/ReadingProgress';
import { BackToTop } from '@/components/BackToTop';
import { verticalLabel } from '@/config/verticals';
import { SITE_URL } from '@/config/site';
import { articleSchema, productOfferSchema, touristTripSchema } from '@/lib/schema';
import { TranslationPathSetter } from '@/components/TranslationPathSetter';
import { getTranslationPath } from '@/lib/metadata';
import { BookingSearch } from '@/components/BookingSearch';
type Props = {
  params: Promise<{ locale: string; vertical: string; slug: string }>;
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

function getOgImage(vertical: string, articleImage?: string): string {
  if (articleImage) return articleImage;
  return `${SITE_URL}/verticals/${vertical}.webp`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, vertical, slug } = await params;
  const a = findArticle(locale, vertical, slug);
  if (!a) return {};

  const ogImage = getOgImage(vertical);

  return {
    title: a.title,
    description: a.description,
    alternates: getArticleAlternates(locale, vertical, slug),
    openGraph: {
      title: a.title,
      description: a.description,
      url: `${SITE_URL}/${locale}/${vertical}/${slug}`,
      siteName: 'Plecări',
      type: 'article',
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified ?? a.datePublished,
      locale: locale === 'en' ? 'en_US' : 'ro_RO',
      images: [{ url: ogImage, width: 1200, height: 630, alt: a.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.description,
      images: [ogImage]
    }
  };
}

export default function ArticlePage({ params }: Props) {
  const { locale, vertical, slug } = use(params);
  setRequestLocale(locale);

  const a = findArticle(locale, vertical, slug);
  if (!a) notFound();

  const l = locale === 'en' ? 'en' : 'ro';
  const gygLocaleCode = a.gygLocale ?? (l === 'en' ? 'en-US' : 'ro-RO');

  return (
    <>
      <ReadingProgress />

      <main className="article" style={{ maxWidth: 760, margin: '0 auto' }}>
        <TranslationPathSetter path={getTranslationPath(locale, vertical, slug)} />
        <Breadcrumbs
          locale={locale}
          items={[
            { name: 'Acasă', path: '/' },
            { name: verticalLabel(vertical, locale), path: `/${vertical}` },
            { name: a.title, path: `/${vertical}/${slug}` }
          ]}
        />

        <JsonLd
          data={articleSchema({
            title: a.title,
            description: a.description,
            urlPath: `/${locale}/${vertical}/${slug}`,
            datePublished: a.datePublished,
            dateModified: a.dateModified,
            image: getOgImage(vertical)
          })}
        />

        {a.seoOffer && a.seoOffer.type === 'TouristTrip' && (
          <JsonLd
            data={touristTripSchema({
              name: a.seoOffer.name || a.title,
              description: a.seoOffer.description || a.description,
              providerName: a.seoOffer.provider,
              url: a.seoOffer.url || (a.cta && a.cta.length > 0 ? a.cta[0].href : '')
            })}
          />
        )}

        {a.seoOffer && a.seoOffer.type === 'Product' && (
          <JsonLd
            data={productOfferSchema({
              name: a.seoOffer.name || a.title,
              description: a.seoOffer.description || a.description,
              price: a.seoOffer.price,
              currency: a.seoOffer.currency,
              url: a.seoOffer.url || (a.cta && a.cta.length > 0 ? a.cta[0].href : '')
            })}
          />
        )}

        <h1>{a.title}</h1>

        {a.answer && <AnswerBox>{a.answer}</AnswerBox>}

        {a.gygLocationId && (
          <GYGWidget
            type="city"
            locationId={a.gygLocationId}
            locale={gygLocaleCode}
          />
        )}

        <ArticleBody
          html={a.body}
          tours={a.gygTours}
          locale={l}
          cdLinkId={a.cdLinkId}
        />

        {a.gygQuery && (
          <GYGWidget
            type="activity-manual"
            query={a.gygQuery}
            locale={gygLocaleCode}
            numberOfItems={3}
            title={l === 'en' ? 'Book experiences' : 'Rezervă experiențe'}
          />
        )}

        {a.widget && (
          <SearchWidget
            title={l === 'en' ? 'Search & compare' : 'Caută și compară'}
            scriptSrc={a.widget}
            minHeight={a.widgetHeight ?? 200}
          />
        )}
        {a.bookingCity && (
          <BookingSearch city={a.bookingCity} locale={l} />
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

        <RelatedArticles
          locale={locale}
          vertical={vertical}
          currentSlug={slug}
        />
      </main>

      <BackToTop />
    </>
  );
}