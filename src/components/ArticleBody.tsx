// src/components/ArticleBody.tsx
// Randează body-ul articolului cu widget-uri GYG availability
// inserate după secțiunile relevante (match pe heading).
'use client';

import {GYGWidget} from '@/components/GYGWidget';

export type InlineTour = {
  tourId: string;
  afterHeading: string; // substring match pe textul h2
  label?: string;       // text opțional deasupra widget-ului
  locale?: string;
  currency?: string;
  variant?: 'horizontal' | 'vertical';
};

type Props = {
  html: string;
  tours?: InlineTour[];
  locale: string;
};

/**
 * Sparge HTML-ul pe <h2 și randează fiecare secțiune
 * cu un widget GYG availability după secțiunile care match-uiesc.
 */
export function ArticleBody({html, tours, locale}: Props) {
  if (!tours || tours.length === 0) {
    return <div dangerouslySetInnerHTML={{__html: html}} />;
  }

  const sections = splitByH2(html);
  const defaultLocale = locale === 'en' ? 'en-US' : 'ro-RO';

  return (
    <>
      {sections.map((section, i) => {
        // Găsește turul care match-uiește heading-ul acestei secțiuni
        const matchedTour = section.headingText
          ? tours.find((t) =>
              section.headingText!
                .toLowerCase()
                .includes(t.afterHeading.toLowerCase())
            )
          : undefined;

        return (
          <div key={i}>
            <div dangerouslySetInnerHTML={{__html: section.html}} />
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
  // Split pe <h2 dar păstrează tag-ul în secțiunea sa
  const parts = html.split(/(?=<h2[\s>])/i);
  return parts.map((part) => {
    // Extrage textul din h2 (fără tag-uri HTML)
    const h2Match = part.match(/<h2[^>]*>(.*?)<\/h2>/i);
    return {
      html: part,
      headingText: h2Match ? h2Match[1].replace(/<[^>]+>/g, '') : null
    };
  });
}