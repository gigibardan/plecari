import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';

export default function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
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