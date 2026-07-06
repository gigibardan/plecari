// src/components/FAQ.tsx
// Bloc de întrebări frecvente + injectează automat schema FAQPage.
// Folosește întrebări REALE (ce caută userul), nu umplutură.
import {JsonLd} from './JsonLd';
import {faqSchema} from '@/lib/schema';

type Item = {question: string; answer: string};

export function FAQ({items, heading}: {items: Item[]; heading?: string}) {
  return (
    <section className="faq" aria-label={heading ?? 'Întrebări frecvente'}>
      {heading && <h2>{heading}</h2>}
      <JsonLd data={faqSchema(items)} />
      <dl>
        {items.map((it, i) => (
          <div key={i} className="faq-item">
            <dt>{it.question}</dt>
            <dd>{it.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
