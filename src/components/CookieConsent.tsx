// src/components/CookieConsent.tsx
'use client';

import {useConsent} from '@/lib/consent';
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export function CookieConsent() {
  const {consent, setConsent} = useConsent();
  const t = useTranslations('Cookies');

  if (consent) return null; // deja a ales

  return (
    <div className="cookie-consent" role="dialog" aria-label={t('title')}>
      <p className="cookie-consent-text">
        {t('message')}{' '}
        <Link href="/legal/cookies">{t('learnMore')}</Link>
      </p>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => setConsent('essential')}>
          {t('reject')}
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => setConsent('all')}
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
