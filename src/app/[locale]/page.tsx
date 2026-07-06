import {use} from 'react';
import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import {getAlternates} from '@/lib/metadata';

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

  return (
    <main style={{padding: '4rem', fontFamily: 'system-ui'}}>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </main>
  );
}