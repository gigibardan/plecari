// src/components/TrustBar.tsx
'use client';

import {useEffect, useRef, useState} from 'react';

function AnimatedNumber({target, suffix = ''}: {target: number; suffix?: string}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1100;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      {threshold: 0.5}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="trust-number">
      {value}
      {suffix}
    </span>
  );
}

export function TrustBar({locale}: {locale: string}) {
  const l = locale === 'en' ? 'en' : 'ro';
  return (
    <section className="hp-trust">
      <div className="hp-trust-inner">
        <div className="trust-item">
          <AnimatedNumber target={29} suffix="+" />
          <span className="trust-label">
            {l === 'en' ? 'travel guides' : 'ghiduri de călătorie'}
          </span>
        </div>
        <div className="trust-dot" aria-hidden="true" />
        <div className="trust-item">
          <AnimatedNumber target={8} />
          <span className="trust-label">
            {l === 'en' ? 'service categories' : 'categorii de servicii'}
          </span>
        </div>
        <div className="trust-dot" aria-hidden="true" />
        <div className="trust-item">
          <span className="trust-number trust-number--static">✓</span>
          <span className="trust-label">
            {l === 'en' ? 'prices compared live' : 'prețuri comparate live'}
          </span>
        </div>
      </div>
    </section>
  );
}