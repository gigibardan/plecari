// src/components/Header.tsx
'use client';

import {useState} from 'react';
import {Link, usePathname} from '@/i18n/navigation';
import {VERTICALS} from '@/config/verticals';
import {LanguageSwitcher} from './LanguageSwitcher';
import Image from 'next/image';

export function Header({locale}: {locale: string}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const l = locale === 'en' ? 'en' : 'ro';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden>
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22 11 13 2 9 22 2Z" />
          </svg>
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
                  >
                    {l === 'en' ? v.label.en : v.label.ro}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-lang">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}