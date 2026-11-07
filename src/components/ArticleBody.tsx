// src/components/ArticleBody.tsx
'use client';

import { GYGWidget } from '@/components/GYGWidget';
import CruiseDirectWidget from '@/components/CruiseDirectWidget';

export type InlineTour = {
  tourId: string;
  afterHeading: string;
  label?: string;
  locale?: string;
  currency?: string;
  variant?: 'horizontal' | 'vertical';
};

type Props = {
  html: string;
  tours?: InlineTour[];
  locale: string;
  cdLinkId?: string;
};

/**
 * Elimină un <h1> aflat la începutul corpului articolului.
 *
 * Titlul paginii este randat de [slug]/page.tsx din `title`-ul din frontmatter.
 * Unele articole au, în plus, un `# Titlu` la începutul MDX-ului — rezultau
 * două H1 pe pagină (rău pentru SEO și vizibil urât). Sursa a fost curățată,
 * dar păstrăm filtrul ca plasă de siguranță pentru articolele viitoare.
 *
 * Atinge DOAR un h1 aflat înaintea oricărui alt conținut; un h1 din mijlocul
 * articolului rămâne neatins, pentru că acolo e o decizie editorială.
 */
function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '');
}

export function ArticleBody({ html: rawHtml, tours, locale, cdLinkId }: Props) {
  const defaultLocale = locale === 'en' ? 'en-US' : 'ro-RO';
  const html = stripLeadingH1(rawHtml);

  if (!tours || tours.length === 0) {
    return (
      <>
        {cdLinkId && <CruiseDirectWidget size="300x250" linkId={cdLinkId} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  }

  const sections = splitByH2(html);

  return (
    <>
      {cdLinkId && <CruiseDirectWidget size="300x250" linkId={cdLinkId} />}

      {sections.map((section, i) => {
        const matchedTour = section.headingText
          ? tours.find((t) =>
              section.headingText!
                .toLowerCase()
                .includes(t.afterHeading.toLowerCase())
            )
          : undefined;

        return (
          <div key={i}>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
            {matchedTour && (
              <GYGWidget
                type="availability"
                tourId={matchedTour.tourId}
                locale={matchedTour.locale ?? defaultLocale}
                currency={matchedTour.currency ?? 'EUR'}
                variant={matchedTour.variant ?? 'horizontal'}
                title={matchedTour.label}
                className="gyg-inline-availability"
              />
            )}
          </div>
        );
      })}
    </>
  );
}

type Section = {
  html: string;
  headingText: string | null;
};

function splitByH2(html: string): Section[] {
  const parts = html.split(/(?=<h2[\s>])/i);
  return parts.map((part) => {
    const h2Match = part.match(/<h2[^>]*>(.*?)<\/h2>/i);
    return {
      html: part,
      headingText: h2Match ? h2Match[1].replace(/<[^>]+>/g, '') : null
    };
  });
}