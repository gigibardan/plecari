// src/app/[locale]/[vertical]/[slug]/page.tsx
import {use} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {articles} from '@/lib/content';
import {getAlternates} from '@/lib/metadata';
import {MDXContent} from '@/components/MDXContent';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {FAQ} from '@/components/FAQ';
import {AffiliateDisclosure} from '@/components/AffiliateDisclosure';
import {JsonLd} from '@/components/JsonLd';
import {articleSchema} from '@/lib/schema';
// Componente disponibile ÎN interiorul fișierelor MDX:
import {AnswerBox} from '@/components/AnswerBox';
import {CompareTable} from '@/components/CompareTable';
import {SearchWidget} from '@/components/SearchWidget';

const mdxComponents = {AnswerBox, CompareTable, SearchWidget};

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

  return (
    <main className="article" style={{padding: '2rem', maxWidth: 760, margin: '0 auto'}}>
      <Breadcrumbs
        locale={locale}
        items={[
          {name: 'Acasă', path: '/'},
          {name: vertical, path: `/${vertical}`},
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
      <MDXContent code={a.code} components={mdxComponents} />

      {a.faq && a.faq.length > 0 && (
        <FAQ heading="Întrebări frecvente" items={a.faq} />
      )}

      <AffiliateDisclosure />
    </main>
  );
}
