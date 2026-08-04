'use client';
// src/components/BackToTop.tsx
// Apare după 400px scroll, dispare când ești sus

import { useEffect, useRef } from 'react';

export function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const toggle = () => {
      if (window.scrollY > 400) {
        btn.classList.add('btt--visible');
      } else {
        btn.classList.remove('btt--visible');
      }
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={btnRef}
      className="btt"
      onClick={handleClick}
      aria-label="Înapoi sus"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}