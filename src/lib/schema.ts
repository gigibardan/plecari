// src/lib/schema.ts
// Generatoare JSON-LD. Le folosesc componentele ca să injecteze schema.org
// pe fiecare pagină -> indexare + citabilitate AI "din construcție".
import {SITE_URL, SITE_NAME} from '@/config/site';

type FaqItem = {question: string; answer: string};

const AUTHOR_PERSON = {
  '@type': 'Person' as const,
  name: 'Radu Cristescu',
  url: `${SITE_URL}/ro/legal/despre`
};

const PUBLISHER = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  logo: {'@type': 'ImageObject' as const, url: `${SITE_URL}/logo.png`}
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    founder: AUTHOR_PERSON
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  urlPath: string;
  datePublished: string;
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
    author: opts.author
      ? {'@type': 'Person', name: opts.author}
      : AUTHOR_PERSON,
    publisher: PUBLISHER,
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

// ── SCHEME PENTRU AFILIERE ȘI MONETIZARE ──

export function productOfferSchema(opts: {
  name: string;
  description: string;
  price?: string;
  currency?: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    ...(opts.image ? {image: opts.image} : {}),
    ...(opts.price && opts.currency
      ? {
          offers: {
            '@type': 'Offer',
            price: opts.price,
            priceCurrency: opts.currency,
            url: opts.url,
            availability: 'https://schema.org/InStock'
          }
        }
      : {})
  };
}

export function touristTripSchema(opts: {
  name: string;
  description: string;
  itinerary?: string[];
  providerName?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: opts.name,
    description: opts.description,
    ...(opts.providerName
      ? {
          provider: {
            '@type': 'Organization',
            name: opts.providerName
          }
        }
      : {}),
    ...(opts.itinerary && opts.itinerary.length > 0
      ? {
          itinerary: {
            '@type': 'ItemList',
            itemListElement: opts.itinerary.map((stop, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: stop
            }))
          }
        }
      : {}),
    offers: {
      '@type': 'Offer',
      url: opts.url
    }
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['ro', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/ro/zboruri?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}