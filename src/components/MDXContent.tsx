// src/components/MDXContent.tsx
// Randează codul MDX compilat de Velite. Rulează la BUILD (SSG), deci
// `new Function` se execută pe CI (Linux), nu pe Worker la runtime -> ok.
import * as runtime from 'react/jsx-runtime';
import type {ComponentType} from 'react';

function getComponent(code: string): ComponentType<{components?: Record<string, ComponentType>}> {
  const fn = new Function(code);
  return fn({...runtime}).default;
}

export function MDXContent({
  code,
  components
}: {
  code: string;
  components?: Record<string, ComponentType>;
}) {
  const Component = getComponent(code);
  return <Component components={components} />;
}
