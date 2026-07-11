// src/components/CruiseSearchHero.tsx
// Motor de căutare vizual pentru croaziere — arată ca un search engine,
// duce pe CruiseDirect cu deep-link per destinație.
'use client';

import {useState} from 'react';

const DESTINATIONS: {label: string; href: string}[] = [
  {label: 'Toate croazierele', href: 'https://www.anrdoezrs.net/click-101821346-7299361'},
  {label: 'Mediterana', href: 'https://www.anrdoezrs.net/click-101821346-7299361'},
  {label: 'Caraibe', href: 'https://www.tkqlhce.com/click-101821346-15534704'},
  {label: 'Alaska', href: 'https://www.dpbolvw.net/click-101821346-13096740'},
  {label: 'Bahamas', href: 'https://www.anrdoezrs.net/click-101821346-13096743'},
  {label: 'Last-minute', href: 'https://www.tkqlhce.com/click-101821346-17037666'},
];

const MONTHS = [
  'Oricând', 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai',
  'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
];

const CRUISE_LINES: {label: string; href: string}[] = [
  {label: 'MSC Cruises', href: 'https://www.anrdoezrs.net/click-101821346-7299361'},
  {label: 'Celebrity', href: 'https://www.kqzyfj.com/click-101821346-13096784'},
  {label: 'Costa', href: 'https://www.jdoqocy.com/click-101821346-13096786'},
  {label: 'Carnival', href: 'https://www.kqzyfj.com/click-101821346-13096782'},
  {label: 'Holland America', href: 'https://www.tkqlhce.com/click-101821346-13096799'},
  {label: 'Disney', href: 'https://www.dpbolvw.net/click-101821346-13096793'},
];

export function CruiseSearchHero({locale}: {locale: string}) {
  const [destIndex, setDestIndex] = useState(0);
  const [month, setMonth] = useState(0);
  const isEn = locale === 'en';

  const selectedDest = DESTINATIONS[destIndex];

  return (
    <section className="cruise-search-hero">
      {/* Background imagine navă */}
      <div className="cruise-search-bg" />
      <div className="cruise-search-overlay" />

      <div className="cruise-search-content">
        <h2 className="cruise-search-title">
          {isEn ? 'Find your perfect cruise' : 'Găsește croaziera perfectă'}
        </h2>
        <p className="cruise-search-sub">
          {isEn
            ? 'Compare prices across top cruise lines'
            : 'Compară prețuri la cele mai bune companii de croaziere'}
        </p>

        {/* Formular vizual */}
        <div className="cruise-search-form">
          <div className="cruise-search-field">
            <label className="cruise-search-label">
              {isEn ? 'Destination' : 'Destinație'}
            </label>
            <select
              className="cruise-search-select"
              value={destIndex}
              onChange={(e) => setDestIndex(Number(e.target.value))}
            >
              {DESTINATIONS.map((d, i) => (
                <option key={i} value={i}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="cruise-search-field">
            <label className="cruise-search-label">
              {isEn ? 'When' : 'Când'}
            </label>
            <select
              className="cruise-search-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
          </div>

          <a
            href={selectedDest.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="cruise-search-button"
          >
            {isEn ? 'Search cruises' : 'Caută croaziere'}
          </a>
        </div>

        {/* Quick links companii */}
        <div className="cruise-search-lines">
          <span className="cruise-search-lines-label">
            {isEn ? 'Popular lines:' : 'Companii populare:'}
          </span>
          {CRUISE_LINES.map((line, i) => (
            <a
              key={i}
              href={line.href}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="cruise-search-line-chip"
            >
              {line.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}