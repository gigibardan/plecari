// src/lib/schema.ts
// Generatoare JSON-LD. Le folosesc componentele ca să injecteze schema.org
// pe fiecare pagină -> indexare + citabilitate AI "din construcție".
import {SITE_URL, SITE_NAME} from '@/config/site';

type FaqItem = {question: string; answer: string};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  urlPath: string; // include limba, ex: /ro/asigurari/ghid
  datePublished: string; // ISO, ex: '2026-07-06'
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.urlPath}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {'@type': 'Organization', name: opts.author ?? SITE_NAME},
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {'@type': 'ImageObject', url: `${SITE_URL}/logo.png`}
    },
    ...(opts.image ? {image: opts.image} : {})
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {'@type': 'Answer', text: it.answer}
    }))
  };
}

export function breadcrumbSchema(items: {name: string; path: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`
    }))
  };
}

// ── NOU: SCHEME PENTRU AFILIERE ȘI MONETIZARE ──

export function productOfferSchema(opts: {
  name: string;
  description: string;
  price?: string; // ex: '399.00'
  currency?: string; // ex: 'EUR'
  url: string; // Linkul tău de afiliat
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    ...(opts.image ? {image: opts.image} : {}),
    ...(opts.price && opts.currency ? {
      offers: {
        '@type': 'Offer',
        price: opts.price,
        priceCurrency: opts.currency,
        url: opts.url,
        availability: 'https://schema.org/InStock'
      }
    } : {})
  };
}

export function touristTripSchema(opts: {
  name: string;
  description: string;
  itinerary?: string[]; // ex: ['Barcelona', 'Marsilia', 'Genova']
  providerName?: string; // ex: 'MSC Cruises' sau 'CruiseDirect'
  url: string; // Linkul de afiliat
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: opts.name,
    description: opts.description,
    ...(opts.providerName ? {
      provider: {
        '@type': 'Organization',
        name: opts.providerName
      }
    } : {}),
    ...(opts.itinerary && opts.itinerary.length > 0 ? {
      itinerary: {
        '@type': 'ItemList',
        itemListElement: opts.itinerary.map((stop, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: stop
        }))
      }
    } : {}),
    offers: {
      '@type': 'Offer',
      url: opts.url
    }
  };
}