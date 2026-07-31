// src/components/TranslationPathSetter.tsx
'use client';

import { useEffect } from 'react';
import { useTranslationPath } from '@/lib/translation-context';

export function TranslationPathSetter({ path }: { path: string }) {
  const { setTranslationPath } = useTranslationPath();
  useEffect(() => {
    setTranslationPath(path);
    return () => setTranslationPath(undefined); // cleanup la unmount
  }, [path, setTranslationPath]);
  return null;
}