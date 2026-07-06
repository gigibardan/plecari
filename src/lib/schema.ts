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
