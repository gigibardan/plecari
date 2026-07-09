// src/components/GYGScript.tsx
// Încarcă scriptul GetYourGuide analytics O SINGURĂ DATĂ, consent-gated.
// Se pune în layout.tsx (root), NU în componente individuale.
'use client';

import {useEffect, useRef} from 'react';
import {useConsent} from '@/lib/consent';

const GYG_SCRIPT = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
const GYG_PARTNER_ID = 'EKAA80H';

export function GYGScript() {
  const {consent} = useConsent();
  const loaded = useRef(false);

  useEffect(() => {
    if (consent !== 'all' || loaded.current) return;
    // Verifică dacă scriptul e deja pe pagină (ex: navigare client-side)
    const existing = document.querySelector(`script[src="${GYG_SCRIPT}"]`);
    if (existing) {
      loaded.current = true;
      return;
    }
    const s = document.createElement('script');
    s.src = GYG_SCRIPT;
    s.async = true;
    s.defer = true;
    s.setAttribute('data-gyg-partner-id', GYG_PARTNER_ID);
    document.head.appendChild(s);
    loaded.current = true;
  }, [consent]);

  return null;
}