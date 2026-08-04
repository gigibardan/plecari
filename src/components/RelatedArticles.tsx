// src/components/RelatedArticles.tsx
// Server Component — articole înrudite, filtrate după verticală, exclus articolul curent

import { articles } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import { verticalLabel } from '@/config/verticals';

interface Props {
  locale: string;
  vertical: string;
  currentSlug: string;
}

const V_ACCENT: Record<string, string> = {
  zboruri:           '#1F5E56',
  cazari:            '#b07d20',
  croaziere:         '#1a6fa8',
  'esim-roaming':    '#6b46c1',
  asigurari:         '#C15540',
  'inchirieri-auto': '#b36b20',
  'city-breaks':     '#8B2252',
  experiente:        '#2d7a4f',
};

export function RelatedArticles({ locale, vertical, currentSlug }: Props) {
  const l = locale === 'en' ? 'en' : 'ro';

  const related = articles
    .filter(
      (a) =>
        a.locale === locale &&
        a.vertical === vertical &&
        a.slug !== currentSlug
    )
    // Cele mai recente primele
    .sort((a, b) => {
      const da = a.dateModified ?? a.datePublished ?? '';
      const db = b.dateModified ?? b.datePublished ?? '';
      return db.localeCompare(da);
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  const accent = V_ACCENT[vertical] ?? '#2B2018';
  const label = verticalLabel(vertical, locale);

  return (
    <aside className="related-articles" aria-label={l === 'ro' ? 'Articole înrudite' : 'Related articles'}>
      <div className="related-header">
        <span className="related-label" style={{ color: accent }}>
          {l === 'ro' ? 'Citește și' : 'Read also'}
        </span>
        <span className="related-vertical">{label}</span>
      </div>
      <ul className="related-grid">
        {related.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/${a.vertical}/${a.slug}` as any}
              className="related-card"
              prefetch={false}
              style={{ '--rc-accent': accent } as React.CSSProperties}
            >
              <p className="related-card-title">{a.title}</p>
              <p className="related-card-desc">{a.description}</p>
              <span className="related-card-cta" aria-hidden="true">
                {l === 'ro' ? 'Citește' : 'Read'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}