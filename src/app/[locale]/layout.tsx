// src/app/[locale]/layout.tsx — versiune completă actualizată (design + PWA + Analytics + GYG)
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SITE_URL, SITE_NAME, INDEXABLE } from '@/config/site';
import { ConsentProvider } from '@/lib/consent';
import { CookieConsent } from '@/components/CookieConsent';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GYGScript } from '@/components/GYGScript';
import { GoogleAnalytics } from '@next/third-parties/google';
import { JsonLd } from '@/components/JsonLd';
import { websiteSchema, organizationSchema } from '@/lib/schema';
import { TranslationPathProvider } from '@/lib/translation-context';

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
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: '%s' },
  robots: INDEXABLE ? undefined : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: '#C15540',
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
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontBody.variable}`}
    >
      <body>
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
        <NextIntlClientProvider>
          <ConsentProvider>
            <TranslationPathProvider>
              <Header locale={locale} />
              {children}
              <Footer locale={locale} />
              <CookieConsent />
              <GYGScript />
            </TranslationPathProvider>
          </ConsentProvider>
        </NextIntlClientProvider>

        <GoogleAnalytics gaId="G-HTF361X0TW" />
      </body>
    </html>
  );
}