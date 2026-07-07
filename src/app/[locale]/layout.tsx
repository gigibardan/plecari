import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, SITE_NAME, INDEXABLE } from '@/config/site';
import '../globals.css';
import { ConsentProvider } from '@/lib/consent';
import { CookieConsent } from '@/components/CookieConsent';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  robots: INDEXABLE ? undefined : { index: false, follow: false }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ConsentProvider>
            {children}
            <CookieConsent />
            <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '.85rem' }}>
              <Link href="/legal/confidentialitate">Confidențialitate</Link>{' · '}
              <Link href="/legal/cookies">Cookies</Link>{' · '}
              <Link href="/legal/disclosure">Afiliere</Link>{' · '}
              <Link href="/legal/termeni">Termeni</Link>
            </footer>
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}