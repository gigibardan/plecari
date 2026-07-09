// src/app/[locale]/layout.tsx — versiune completă actualizată (design + PWA + Analytics)
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
import {GoogleAnalytics} from '@next/third-parties/google'; // <-- 1. IMPORTUL ADĂUGAT AICI
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
  robots: INDEXABLE ? undefined : {index: false, follow: false},
  icons: {
    icon: [
      {url: '/favicon.ico'},
      {url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png'}
    ],
    apple: {url: '/apple-touch-icon.png', sizes: '180x180'},
    other: [
      {rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml'}
    ]
  }
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

        {/* <-- 2. COMPONENTA ADĂUGATĂ AICI ÎN BODY (AICI SETEZI TAGUL PENTRU PLECĂRI) */}
        <GoogleAnalytics gaId="G-HTF361X0TW" />
      </body>
    </html>
  );
}