// src/components/SearchWidget.tsx
// Wrapper pentru "motoarele de căutare" (widget-uri Travelpayouts etc.).
// - se încarcă LAZY (la scroll, cu 200px avans) -> nu strică viteza/SEO
// - rezervă înălțime (minHeight) -> zero salt de layout (CLS)
// scriptSrc = URL-ul scriptului de widget copiat din dashboard-ul de afiliere.
'use client';

import {useEffect, useRef, useState} from 'react';

type Props = {
  scriptSrc: string;
  minHeight?: number;
  title?: string;
};

export function SearchWidget({scriptSrc, minHeight = 320, title}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
  }, [scriptSrc, loaded]);

  return (
    <section className="search-widget" aria-label={title ?? 'Căutare'}>
      {title && <h2>{title}</h2>}
      <div ref={ref} style={{minHeight}} />
    </section>
  );
}
