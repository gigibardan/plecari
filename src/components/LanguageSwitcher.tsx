// src/components/LanguageSwitcher.tsx
'use client';

import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from 'next-intl';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const other = locale === 'ro' ? 'en' : 'ro';

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={() => router.replace(pathname, {locale: other})}
      aria-label={`Schimbă limba în ${other.toUpperCase()}`}
    >
      <span className={locale === 'ro' ? 'on' : ''}>RO</span>
      <span className="sep" aria-hidden>
        /
      </span>
      <span className={locale === 'en' ? 'on' : ''}>EN</span>
    </button>
  );
}