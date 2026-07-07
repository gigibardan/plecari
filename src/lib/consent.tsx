// src/lib/consent.tsx
// Context simplu pentru consimțământ cookies. Stochează alegerea într-un
// cookie (1 an) ca să poată fi citit și pe server la nevoie.
'use client';

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

export type Consent = 'all' | 'essential' | null;

const COOKIE = 'plecari_consent';

const ConsentContext = createContext<{
  consent: Consent;
  setConsent: (c: Exclude<Consent, null>) => void;
}>({consent: null, setConsent: () => {}});

function readCookie(): Consent {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]*)'));
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === 'all' || v === 'essential' ? v : null;
}

function writeCookie(v: Exclude<Consent, null>) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE}=${v}; path=/; max-age=${oneYear}; samesite=lax`;
}

export function ConsentProvider({children}: {children: ReactNode}) {
  const [consent, setConsentState] = useState<Consent>(null);

  useEffect(() => {
    setConsentState(readCookie());
  }, []);

  const setConsent = (c: Exclude<Consent, null>) => {
    writeCookie(c);
    setConsentState(c);
  };

  return (
    <ConsentContext.Provider value={{consent, setConsent}}>
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => useContext(ConsentContext);
