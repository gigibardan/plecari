// src/components/GYGWidget.tsx
// Widget GetYourGuide — consent-gated, lazy-loaded.
// Tipuri:
//   activity-auto   — widget automat pe bază de query
//   activity-manual  — carduri cu query + control
//   city             — card oraș cu buton
//   availability     — disponibilitate live per tur (tourId)
'use client';

import {useEffect, useRef, useState} from 'react';
import {useConsent} from '@/lib/consent';

const GYG_PARTNER_ID = 'EKAA80H';

type ActivityAutoProps = {
  type: 'activity-auto';
  query: string;
};

type ActivityManualProps = {
  type: 'activity-manual';
  query: string;
  locale?: string;
  numberOfItems?: number;
  excludeUrls?: string[];
};

type CityProps = {
  type: 'city';
  locationId: string;
  locale?: string;
};

type AvailabilityProps = {
  type: 'availability';
  tourId: string;
  locale?: string;
  currency?: string;
  variant?: 'horizontal' | 'vertical';
};

type GYGWidgetProps = (
  | ActivityAutoProps
  | ActivityManualProps
  | CityProps
  | AvailabilityProps
) & {
  title?: string;
  className?: string;
};

export function GYGWidget(props: GYGWidgetProps) {
  const {consent, setConsent} = useConsent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Lazy-load: randează doar când e în viewport
  useEffect(() => {
    if (consent !== 'all') return;
    const el = containerRef.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      {rootMargin: '200px'}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [consent, visible]);

  // Re-inițializează scriptul GYG pentru widget-uri adăugate dinamic
  useEffect(() => {
    if (!visible) return;
    const w = window as any;
    if (w.GYG && typeof w.GYG.Widget === 'function') {
      w.GYG.Widget();
    }
  }, [visible]);

  const widgetDiv = visible ? renderWidgetDiv(props) : null;

  return (
    <section
      className={`gyg-widget ${props.className ?? ''}`}
      aria-label={props.title ?? 'GetYourGuide'}
    >
      {props.title && <h2 className="gyg-widget-title">{props.title}</h2>}
      {consent === 'all' ? (
        <div ref={containerRef} style={{minHeight: props.type === 'availability' ? 100 : 200}}>
          {widgetDiv}
        </div>
      ) : (
        <div className="widget-consent-gate" style={{minHeight: 100}}>
          <p>
            Acest widget folosește cookies de la GetYourGuide.
            Activează-le pentru a vedea experiențele disponibile.
          </p>
          <button
            type="button"
            className="primary"
            onClick={() => setConsent('all')}
          >
            Activează și încarcă
          </button>
        </div>
      )}
    </section>
  );
}

function renderWidgetDiv(props: GYGWidgetProps) {
  switch (props.type) {
    case 'activity-auto':
      return (
        <div
          data-gyg-widget="auto"
          data-gyg-partner-id={GYG_PARTNER_ID}
          data-gyg-cmp={props.query}
        />
      );

    case 'activity-manual':
      return (
        <div
          data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
          data-gyg-locale-code={props.locale ?? 'ro-RO'}
          data-gyg-widget="activities"
          data-gyg-number-of-items={String(props.numberOfItems ?? 3)}
          data-gyg-partner-id={GYG_PARTNER_ID}
          data-gyg-q={props.query}
        >
          <span>
            Powered by{' '}
            <a
              target="_blank"
              rel="sponsored nofollow"
              href="https://www.getyourguide.com/"
            >
              GetYourGuide
            </a>
          </span>
        </div>
      );

    case 'city':
      return (
        <div
          data-gyg-href="https://widget.getyourguide.com/default/city.frame"
          data-gyg-location-id={props.locationId}
          data-gyg-locale-code={props.locale ?? 'ro-RO'}
          data-gyg-widget="city"
          data-gyg-partner-id={GYG_PARTNER_ID}
        />
      );

    case 'availability':
      return (
        <div
          data-gyg-href="https://widget.getyourguide.com/default/availability.frame"
          data-gyg-tour-id={props.tourId}
          data-gyg-locale-code={props.locale ?? 'ro-RO'}
          data-gyg-currency={props.currency ?? 'EUR'}
          data-gyg-widget="availability"
          data-gyg-variant={props.variant ?? 'horizontal'}
          data-gyg-partner-id={GYG_PARTNER_ID}
        >
          <span>
            Powered by{' '}
            <a
              target="_blank"
              rel="sponsored nofollow"
              href="https://www.getyourguide.com/"
            >
              GetYourGuide
            </a>
          </span>
        </div>
      );
  }
}