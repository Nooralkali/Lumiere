import { useCallback, useEffect, useRef, useState } from 'react';
import ImageSlot from './ImageSlot.jsx';
import { EVENTS } from '../data/site.js';

/* The celebrations grid. A card grows into a lightbox in place — the same
   element, restyled — and once open the set can be paged with the arrow keys
   or the flanking controls. Escape closes, as does the scrim. */
export default function EventGallery() {
  const [openId, setOpenId] = useState(null);
  const cardRefs = useRef(new Map());
  const lastFocused = useRef(null);

  const isOpen = openId !== null;
  const index = EVENTS.findIndex((e) => e.id === openId);

  const close = useCallback(() => setOpenId(null), []);

  const step = useCallback(
    (delta) =>
      setOpenId((current) => {
        if (current === null) return current;
        const at = EVENTS.findIndex((e) => e.id === current);
        if (at < 0) return current;
        const next = (at + delta + EVENTS.length) % EVENTS.length;
        return EVENTS[next].id;
      }),
    [],
  );

  const open = (id) => {
    lastFocused.current = document.activeElement;
    setOpenId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    };

    document.addEventListener('keydown', onKey);

    // The page behind the lightbox should not scroll away under it. Padding
    // stands in for the scrollbar we are removing, so nothing shifts sideways.
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    /* Chromium composites the nav's backdrop-filter above the scrim even though
       the scrim sits higher in the stacking order; dropping the filter for the
       duration lets the scrim dim the nav as it should. */
    document.body.classList.add('is-lightbox');

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.body.classList.remove('is-lightbox');
    };
  }, [isOpen, close, step]);

  // Keep focus on whichever card is enlarged, and hand it back on close.
  useEffect(() => {
    if (openId !== null) {
      cardRefs.current.get(openId)?.focus();
    } else if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus();
      lastFocused.current = null;
    }
  }, [openId]);

  return (
    <>
      <div className="g-5" style={{ display: 'grid', gap: 20 }}>
        {EVENTS.map((ev) => {
          const cardOpen = openId === ev.id;
          return (
            <div className="ev-cell" key={ev.id}>
              <button
                type="button"
                ref={(el) => {
                  if (el) cardRefs.current.set(ev.id, el);
                  else cardRefs.current.delete(ev.id);
                }}
                className={`ev-card${cardOpen ? ' ev-open' : ''}`}
                aria-label={`${ev.title} — ${ev.meta}`}
                aria-expanded={cardOpen}
                onClick={() => open(ev.id)}
              >
                <div className="ev-fill">
                  <ImageSlot placeholder={ev.title} dark={cardOpen} />
                </div>
                <div className="ev-cap">{ev.title}</div>
                <div className="ev-meta">{ev.meta}</div>
              </button>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <>
          <button type="button" className="ev-scrim" aria-label="Close photograph" onClick={close} />
          <button
            type="button"
            className="ev-nav ev-nav-prev"
            aria-label="Previous celebration"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="ev-nav ev-nav-next"
            aria-label="Next celebration"
            onClick={() => step(1)}
          >
            ›
          </button>
          <div className="ev-counter" aria-live="polite">
            {index + 1} / {EVENTS.length} — Esc to close
          </div>
        </>
      )}
    </>
  );
}
