// src/components/SearchWidget.tsx — actualizat: încarcă widget-ul DOAR
// după consimțământ (cookies de la parteneri = non-esențiale, cer consent).
'use client';

import {useEffect, useRef, useState} from 'react';
import {useConsent} from '@/lib/consent';

type Props = {
  scriptSrc: string;
  minHeight?: number;
  title?: string;
};

export function SearchWidget({scriptSrc, minHeight = 320, title}: Props) {
  const {consent, setConsent} = useConsent();
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (consent !== 'all') return; // fără consimțământ complet, nu încărcăm
    const el = ref.current;
    if (!el || loaded) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const s = document.createElement('script');
          s.src = scriptSrc;
          s.async = true;
          s.charset = 'utf-8';
          el.appendChild(s);
          setLoaded(true);
          io.disconnect();
        }
      },
      {rootMargin: '200px'}
    );

    io.observe(el);
    return () => io.disconnect();
  }, [scriptSrc, loaded, consent]);

  return (
    <section className="search-widget" aria-label={title ?? 'Căutare'}>
      {title && <h2>{title}</h2>}
      {consent === 'all' ? (
        <div ref={ref} style={{minHeight}} />
      ) : (
        <div className="widget-consent-gate" style={{minHeight}}>
          <p>
            Acest instrument de căutare folosește cookies de la partenerii
            noștri. Activează-le pentru a-l încărca.
          </p>
          <button type="button" className="primary" onClick={() => setConsent('all')}>
            Activează și încarcă
          </button>
        </div>
      )}
    </section>
  );
}
