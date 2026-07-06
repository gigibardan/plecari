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

// Verticalele valide. Le mutăm într-un config dedicat când crește lista.
const VERTICALS = [
  'croaziere',
  'zboruri',
  'cazari',
  'asigurari',
  'esim-roaming',
  'inchirieri-auto',
  'city-breaks'
];

type Props = {params: Promise<{locale: string; vertical: string}>};

export function generateStaticParams() {
  const params: {locale: string; vertical: string}[] = [];
  for (const locale of routing.locales) {
    for (const vertical of VERTICALS) {
      params.push({locale, vertical});
    }
  }
  return params;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, vertical} = await params;
  if (!VERTICALS.includes(vertical)) return {};
  return {
    title: vertical,
    alternates: getAlternates(locale, `/${vertical}`)
  };
}

export default function VerticalHub({params}: Props) {
  const {locale, vertical} = use(params);
  if (!VERTICALS.includes(vertical)) notFound();
  setRequestLocale(locale);

  const posts = articles.filter(
    (a) => a.locale === locale && a.vertical === vertical
  );

  return (
    <main className="hub" style={{padding: '2rem', maxWidth: 900, margin: '0 auto'}}>
      <Breadcrumbs
        locale={locale}
        items={[
          {name: 'Acasă', path: '/'},
          {name: vertical, path: `/${vertical}`}
        ]}
      />
      <h1>{vertical}</h1>

      {/* AICI vine widget-ul (motorul de căutare) al verticalei:
          <SearchWidget title="..." scriptSrc="..." /> */}

      <ul style={{listStyle: 'none', padding: 0}}>
        {posts.map((a) => (
          <li key={a.slug} style={{margin: '1.25rem 0'}}>
            <Link href={`/${vertical}/${a.slug}`}>
              <strong>{a.title}</strong>
            </Link>
            <p style={{color: '#4b5563', margin: '.25rem 0 0'}}>{a.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
