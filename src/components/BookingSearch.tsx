// src/components/BookingSearch.tsx
// Form propriu de căutare cazare — construiește URL CJ deeplink la submit.
// Zero iframe, zero widget extern, zero consent gate.
'use client';

import { useState } from 'react';
import { bookingSearchUrl } from '@/config/booking';

type Props = {
  city: string;       // ex: "Roma, Italia"
  locale: 'ro' | 'en';
};

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

const LABELS = {
  ro: {
    title: 'Cazare în',
    subtitle: 'Compară prețuri pe Booking.com — cel mai mare motor de rezervări din lume.',
    destination: 'Destinație',
    checkin: 'Check-in',
    checkout: 'Check-out',
    guests: 'Persoane',
    button: 'Compară cele mai bune prețuri',
  },
  en: {
    title: 'Accommodation in',
    subtitle: 'Compare prices on Booking.com — the world\'s largest booking platform.',
    destination: 'Destination',
    checkin: 'Check-in',
    checkout: 'Check-out',
    guests: 'Guests',
    button: 'Find the best hotel deals',
  },
} as const;

export function BookingSearch({ city, locale }: Props) {
  const cityName = city.split(',')[0].trim();
  const l = LABELS[locale];
  const today = new Date();

  const [checkin, setCheckin] = useState(formatDate(addDays(today, 14)));
  const [checkout, setCheckout] = useState(formatDate(addDays(today, 17)));
  const [adults, setAdults] = useState(2);

  const handleSearch = () => {
    const url = bookingSearchUrl(city, locale, checkin, checkout, adults);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Checkout trebuie să fie mereu > checkin
  const handleCheckinChange = (val: string) => {
    setCheckin(val);
    if (val >= checkout) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      setCheckout(formatDate(next));
    }
  };

  return (
    <section className="booking-search">
      <h2 className="booking-search-title">
        🏨 {l.title} {cityName}
      </h2>
      <p className="booking-search-subtitle">{l.subtitle}</p>

      <div className="booking-search-grid">
        <div className="booking-search-field booking-search-dest">
          <label>{l.destination}</label>
          <input type="text" value={cityName} readOnly tabIndex={-1} />
        </div>

        <div className="booking-search-field">
          <label>{l.checkin}</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => handleCheckinChange(e.target.value)}
            min={formatDate(today)}
          />
        </div>

        <div className="booking-search-field">
          <label>{l.checkout}</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            min={checkin}
          />
        </div>

        <div className="booking-search-field">
          <label>{l.guests}</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="booking-search-btn"
      >
        {l.button} →
      </button>
    </section>
  );
}