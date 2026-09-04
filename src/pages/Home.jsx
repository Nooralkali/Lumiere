import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Seal from '../components/Seal.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import EventGallery from '../components/EventGallery.jsx';
import Faq from '../components/Faq.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import HeroRays from '../components/HeroRays.jsx';
import { BRAND, INCLUDED, SOCIALS, TESTIMONIALS } from '../data/site.js';
import heroImage from '../assets/hero.webp';

export default function Home() {
  const location = useLocation();
  const [prefill, setPrefill] = useState(null);

  /* A visitor sent here from the pricing page's quote arrives with their
     selection in tow; it is consumed once so a later reload starts clean. */
  useEffect(() => {
    const carried = location.state?.enquiry;
    if (carried) {
      setPrefill(carried);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <div className="site">
      <header id="top" className="hero">
        <HeroRays />
        <div className="hero-inner g-hero">
          <div className="hero-copy">
            <div className="hero-mark">
              <Seal size={88} stroke="#D8B476" weight="light" />
              <div className="hero-kicker">LUMIÈRE PHOTOBOOTH — ABUJA</div>
            </div>

            <h1>
              More than a photobooth.
              <br />
              An experience worth remembering.
            </h1>

            <p className="hero-lede">
              Every Lumière booking includes our signature double-sided booth, professional
              studio lighting, premium photography and a beautifully curated guest experience.
            </p>

            <div className="hero-actions">
              <Link to="/pricing" className="lum-btn lum-btn-gold">See the pricing</Link>
              <Link to={{ pathname: '/', hash: '#enquire' }} className="lum-btn lum-btn-outline-gold">
                Check your date
              </Link>
            </div>
          </div>

          <div className="hero-plate">
            <ImageSlot
              src={heroImage}
              alt="Lumière photobooth strips laid out on marble"
              placeholder="Drop the booth hero photograph"
              dark
            />
          </div>
        </div>
      </header>

      <Reveal id="included" className="section">
        <div className="head-rule">
          <h2>What’s included with every Lumière booking</h2>
          <span className="grow" />
        </div>
        <div className="g-5" style={{ display: 'grid', gap: 0 }}>
          {INCLUDED.map(({ title, body }) => (
            <div className="inc-item" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="pkg-banner g-coverage">
          <div>
            <div className="kicker">Packages</div>
            <h2>
              Four experiences,
              <br />
              from ₦250,000
            </h2>
          </div>
          <div className="pkg-banner-body">
            <p>
              Bronze, Silver, Gold and Diamond — from an intimate dinner to a celebration where
              the booth becomes part of the event itself. Add-ons, coverage and travel terms are
              all on the pricing page.
            </p>
            <Link to="/pricing" className="lum-btn lum-btn-accent">View the pricing</Link>
          </div>
        </div>
      </Reveal>

      <Reveal id="events" className="section">
        <div className="head-split">
          <h2>Celebrations we have lit</h2>
          <p className="hint eyebrow">Select a photograph to open it</p>
        </div>
        <EventGallery />
      </Reveal>

      <Reveal className="quote-band">
        <div className="wrap">
          <div className="g-3" style={{ display: 'grid', gap: 56 }}>
            {TESTIMONIALS.map(({ quote, by }) => (
              <div className="quote" key={by}>
                <p>“{quote}”</p>
                <div className="by">{by}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal id="faq" className="section" style={{ maxWidth: 860 }}>
        <h2 style={{ margin: '0 0 40px', fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 44 }}>
          Questions
        </h2>
        <Faq />
      </Reveal>

      <Reveal id="enquire" style={{ maxWidth: 1200, margin: '104px auto 0', padding: '0 40px' }}>
        <div className="enquire-card g-form">
          <div className="enquire-intro">
            <h2>Check your date</h2>
            <p>
              Tell us about your celebration and we will come back within 24 hours with
              availability and a quote.
            </p>
            <div className="rule" />
            <div className="enquire-contact">
              <div><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
              <div className="tnum">{BRAND.phone}</div>
              <div>{BRAND.base}</div>
            </div>
            <div className="enquire-socials">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="lum-btn lum-btn-outline"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <EnquiryForm prefill={prefill} />
        </div>
      </Reveal>
    </div>
  );
}
