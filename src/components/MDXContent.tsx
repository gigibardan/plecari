// src/components/MDXContent.tsx
import * as runtime from 'react/jsx-runtime';
import type {ComponentType} from 'react';

function getComponent(code: string): ComponentType<{components?: Record<string, ComponentType<any>>}> {
  const fn = new Function(code);
  return fn({...runtime}).default;
}

export function MDXContent({
  code,
  components
}: {
  code: string;
  components?: Record<string, ComponentType<any>>;
}) {
  const Component = getComponent(code);
  return <Component components={components} />;
}