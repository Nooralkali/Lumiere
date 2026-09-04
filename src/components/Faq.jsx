import { useState } from 'react';
import { FAQS } from '../data/site.js';

/* The design's <details> list, rebuilt so the answer can animate open. Several
   questions may stand open at once, as they could before. */
export default function Faq() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="faq">
      {FAQS.map(({ q, a }, i) => {
        const isOpen = open.has(i);
        return (
          <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => toggle(i)}
              >
                {q}
                <span className="faq-plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
