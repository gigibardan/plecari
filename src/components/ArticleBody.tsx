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

export function ArticleBody({ html, tours, locale, cdLinkId }: Props) {
  const defaultLocale = locale === 'en' ? 'en-US' : 'ro-RO';

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