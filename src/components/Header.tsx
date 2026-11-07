// src/components/Header.tsx
'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { VERTICALS, verticalNavLabel } from '@/config/verticals';
import { LanguageSwitcher } from './LanguageSwitcher';
import Image from 'next/image';


export function Header({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const l = locale === 'en' ? 'en' : 'ro';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)} prefetch={false}>
          <img className="brand-mark" src="/logo-pin.svg" alt="Plecări" />
          <span className="brand-name">Plecări</span>
        </Link>

        <button
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-label="Meniu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          <ul>
            {VERTICALS.map((v) => {
              const active = pathname.startsWith(`/${v.slug}`);
              return (
                <li key={v.slug}>
                  <Link
                    href={`/${v.slug}`}
                    className={active ? 'active' : ''}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    {verticalNavLabel(v.slug, l)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-lang">
            <LanguageSwitcher />
          </div>
        </nav>
        <Link href="/search" className="header-search-btn" prefetch={false} aria-label="Caută">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </Link>
      </div>
    </header>
  );
}