import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Seal from './Seal.jsx';

const SECTIONS = [
  { id: 'included', label: 'Included' },
  { id: 'events', label: 'Events' },
  { id: 'faq', label: 'FAQ' },
];

export default function Nav() {
  const { pathname, hash } = useLocation();
  const onHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  /* One scroll handler drives the bar's raised state, the reading hairline and
     — on the home page — which section the nav underlines. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0);

      if (!onHome) {
        setActive('');
        return;
      }

      // The section whose top has most recently passed the nav is the one we
      // are reading; nothing is marked until the first one arrives.
      const line = y + 140;
      let current = '';
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onHome]);

  // Any navigation closes the drawer.
  useEffect(() => setOpen(false), [pathname, hash]);

  // A drawer that outlives its breakpoint would trap the page scroll.
  useEffect(() => {
    if (!open) return undefined;
    const mq = window.matchMedia('(min-width: 901px)');
    const close = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, [open]);

  const anchor = (id) => ({ pathname: '/', hash: `#${id}` });

  const links = (
    <>
      <Link to="/pricing" className={pathname === '/pricing' ? 'is-active' : undefined}>
        Pricing
      </Link>
      {SECTIONS.map(({ id, label }) => (
        <Link key={id} to={anchor(id)} className={onHome && active === id ? 'is-active' : undefined}>
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className={`nav-bar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to={anchor('top')} className="nav-brand" aria-label="Lumière — home">
          <Seal size={34} />
          <span className="nav-brand-word">LUMIÈRE</span>
        </Link>

        <div className="nav-links">
          {links}
          <Link to={anchor('enquire')} className="btn btn-primary nav-cta">Enquire</Link>
        </div>

        <button
          type="button"
          className={`nav-toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="nav-drawer" id="nav-drawer">
          {links}
          <Link to={anchor('enquire')}>Enquire</Link>
        </div>
      )}

      <div
        className="nav-progress"
        style={{ width: `${progress * 100}%`, opacity: progress > 0.01 ? 1 : 0 }}
        aria-hidden="true"
      />
    </nav>
  );
}
