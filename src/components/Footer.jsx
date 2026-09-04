import Seal from './Seal.jsx';
import { BRAND, SOCIALS } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <div className="foot-top">
          <div className="foot-brand">
            <Seal size={72} stroke="#D8B476" weight="light" />
            <div className="foot-word">{BRAND.wordmark}</div>
            <div className="foot-sub">{BRAND.tagline.toUpperCase()}</div>
          </div>
          <p className="foot-line">{BRAND.line}</p>
        </div>

        <div className="social">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="foot-rule" />

        <div className="foot-meta">
          <span>{BRAND.city}</span>
          <span>{BRAND.email}</span>
          <span className="tnum">{BRAND.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
