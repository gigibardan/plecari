// src/components/Breadcrumbs.tsx
// Breadcrumb vizual + schema BreadcrumbList. Path-urile se dau FĂRĂ limbă
// (ex: '/asigurari'); Link-ul din i18n adaugă prefixul de limbă automat.
import {Link} from '@/i18n/navigation';
import {JsonLd} from './JsonLd';
import {breadcrumbSchema} from '@/lib/schema';

type Crumb = {name: string; path: string}; // path fără limbă, ex: '/asigurari'

export function Breadcrumbs({items, locale}: {items: Crumb[]; locale: string}) {
  // pentru schema avem nevoie de URL absolut cu limbă
  const withLocale = items.map((c) => ({
    name: c.name,
    path: `/${locale}${c.path === '/' ? '' : c.path}`
  }));

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <JsonLd data={breadcrumbSchema(withLocale)} />
      <ol>
        {items.map((c, i) => (
          <li key={i}>
            {i < items.length - 1 ? (
              <Link href={c.path}>{c.name}</Link>
            ) : (
              <span aria-current="page">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
