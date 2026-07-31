// LanguageSwitcher.tsx — citește din context
'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useTranslationPath } from '@/lib/translation-context';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const other = locale === 'ro' ? 'en' : 'ro';
  const { translationPath } = useTranslationPath();

  const handleSwitch = () => {
    router.replace(translationPath ?? pathname, { locale: other });
  };

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={handleSwitch}
      aria-label={`Schimbă limba în ${other.toUpperCase()}`}
    >
      <span className={locale === 'ro' ? 'on' : ''}>RO</span>
      <span className="sep" aria-hidden>/</span>
      <span className={locale === 'en' ? 'on' : ''}>EN</span>
    </button>
  );
}