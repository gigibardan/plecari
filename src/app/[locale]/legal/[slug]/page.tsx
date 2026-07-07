// src/app/[locale]/legal/[slug]/page.tsx
// Ruta pentru paginile legale/statice. Segmentul static "legal" are
// prioritate față de [vertical], deci nu există conflict de rutare.
import {use} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {pages} from '@/lib/content';
import {getAlternates} from '@/lib/metadata';
import {MDXContent} from '@/components/MDXContent';
import {Breadcrumbs} from '@/components/Breadcrumbs';

type Props = {params: Promise<{locale: string; slug: string}>};

export function generateStaticParams() {
  return pages.map((p) => ({locale: p.locale, slug: p.slug}));
}

function findPage(locale: string, slug: string) {
  return pages.find((p) => p.locale === locale && p.slug === slug);
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const p = findPage(locale, slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: getAlternates(locale, `/legal/${slug}`)
  };
}

export default function LegalPage({params}: Props) {
  const {locale, slug} = use(params);
  setRequestLocale(locale);

  const p = findPage(locale, slug);
  if (!p) notFound();

  return (
    <main className="legal" style={{padding: '2rem', maxWidth: 760, margin: '0 auto'}}>
      <Breadcrumbs
        locale={locale}
        items={[
          {name: 'Acasă', path: '/'},
          {name: p.title, path: `/legal/${slug}`}
        ]}
      />
      <h1>{p.title}</h1>
      {p.updated && (
        <p style={{color: '#6b7280', fontSize: '.9rem'}}>
          Ultima actualizare: {p.updated}
        </p>
      )}
      <MDXContent code={p.code} />
    </main>
  );
}
