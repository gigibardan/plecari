// src/lib/translation-context.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const TranslationPathContext = createContext<{
  translationPath: string | undefined;
  setTranslationPath: (path: string | undefined) => void;
}>({
  translationPath: undefined,
  setTranslationPath: () => {}
});

export function TranslationPathProvider({ children }: { children: ReactNode }) {
  const [translationPath, setTranslationPath] = useState<string | undefined>(undefined);
  return (
    <TranslationPathContext.Provider value={{ translationPath, setTranslationPath }}>
      {children}
    </TranslationPathContext.Provider>
  );
}

export function useTranslationPath() {
  return useContext(TranslationPathContext);
}