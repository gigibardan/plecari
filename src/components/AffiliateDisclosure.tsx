// src/components/AffiliateDisclosure.tsx
// Conformitate: OBLIGATORIU pe orice pagină cu linkuri sau widget-uri de
// afiliere. Textul vine din traduceri (namespace 'Affiliate').
import {useTranslations} from 'next-intl';

export function AffiliateDisclosure() {
  const t = useTranslations('Affiliate');
  return (
    <p className="affiliate-disclosure" role="note">
      {t('disclosure')}
    </p>
  );
}
