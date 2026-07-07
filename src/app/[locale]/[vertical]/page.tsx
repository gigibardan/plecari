// src/app/[locale]/[vertical]/page.tsx
import {use} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {articles} from '@/lib/content';
import {getAlternates} from '@/lib/metadata';
import {Link} from '@/i18n/navigation';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {VERTICAL_SLUGS, verticalLabel} from '@/config/verticals';

type Props = {params: Promise<{locale: string; vertical: string}>};

export function generateStaticParams() {
  const params: {locale: string; vertical: string}[] = [];
  for (const locale of routing.locales) {
    for (const vertical of VERTICAL_SLUGS) {
      params.push({locale, vertical});
    }
  }
  return params;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, vertical} = await params;
  if (!VERTICAL_SLUGS.includes(vertical)) return {};
  return {
    title: verticalLabel(vertical, locale),
    alternates: getAlternates(locale, `/${vertical}`)
  };
}

export default function VerticalHub({params}: Props) {
  const {locale, vertical} = use(params);
  if (!VERTICAL_SLUGS.includes(vertical)) notFound();
  setRequestLocale(locale);

  const label = verticalLabel(vertical, locale);
  const posts = articles.filter(
    (a) => a.locale === locale && a.vertical === vertical
  );

  return (
    <main className="hub">
      <Breadcrumbs
        locale={locale}
        items={[
          {name: 'Acasă', path: '/'},
          {name: label, path: `/${vertical}`}
        ]}
      />
      <h1>{label}</h1>

      {/* AICI vine widget-ul (motorul de căutare) al verticalei:
          <SearchWidget title="..." scriptSrc="..." /> */}

      <ul>
        {posts.map((a) => (
          <li key={a.slug}>
            <Link href={`/${vertical}/${a.slug}`}>{a.title}</Link>
            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}