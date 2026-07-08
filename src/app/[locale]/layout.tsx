// src/app/[locale]/layout.tsx — versiune completă actualizată (design + PWA)
import type {Metadata, Viewport} from 'next'; // Adăugat Viewport
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Fraunces, Hanken_Grotesk} from 'next/font/google';
import {routing} from '@/i18n/routing';
import {SITE_URL, SITE_NAME, INDEXABLE} from '@/config/site';
import {ConsentProvider} from '@/lib/consent';
import {CookieConsent} from '@/components/CookieConsent';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import '../globals.css';

const fontDisplay = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap'
});

const fontBody = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {default: SITE_NAME, template: `%s · ${SITE_NAME}`},
  robots: INDEXABLE ? undefined : {index: false, follow: false}
};

// Blocul adăugat pentru culoarea temei pe mobil
export const viewport: Viewport = {
  themeColor: '#C15540',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontBody.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <ConsentProvider>
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
            <CookieConsent />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}