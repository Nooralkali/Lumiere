import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Seal from '../components/Seal.jsx';
import HeroRays from '../components/HeroRays.jsx';
import {
  ADD_ONS,
  HOME_STATE,
  NIGERIAN_STATES,
  PACKAGES,
  TERMS,
  TRAVEL_DAY_RATE,
  TRAVEL_STATES,
  naira,
} from '../data/site.js';

/* Every feature named across the four tiers, in the order they first appear —
   the row order of the comparison table. */
const COMPARE_ROWS = (() => {
  const seen = [];
  PACKAGES.forEach((p) => {
    p.features.forEach((f) => {
      if (!f.startsWith('Everything in') && !seen.includes(f)) seen.push(f);
    });
  });
  return seen;
})();

/* A tier carries a feature if it lists it, or inherits it from the tier below
   via its "Everything in …" line. */
function tierHas(pkgIndex, feature) {
  for (let i = pkgIndex; i >= 0; i -= 1) {
    if (PACKAGES[i].features.includes(feature)) return true;
    if (i > 0 && !PACKAGES[i].features.some((f) => f.startsWith('Everything in'))) break;
  }
  return false;
}

function travelFor(state, days) {
  if (!state || state === HOME_STATE) return { cost: 0, note: null };

  if (TRAVEL_STATES.includes(state)) {
    return {
      cost: TRAVEL_DAY_RATE * days,
      note:
        `${state} carries a travel charge of ${naira(TRAVEL_DAY_RATE)} per day. Flights, ` +
        'accommodation and transportation for one photobooth manager are provided by you.',
    };
  }

  return {
    cost: 0,
    note:
      `${state} sits outside our standard coverage. Send the enquiry and the team will come ` +
      'back with a tailored quote, including travel for one photobooth manager.',
  };
}

export default function Pricing() {
  const navigate = useNavigate();

  const [pkgId, setPkgId] = useState('gold');
  const [picked, setPicked] = useState(() => new Set());
  const [state, setState] = useState('');
  const [days, setDays] = useState(1);
  const [compareOpen, setCompareOpen] = useState(false);

  const pkg = PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[0];

  const toggleAddOn = (id) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const quote = useMemo(() => {
    const addOns = ADD_ONS.filter((a) => picked.has(a.id));
    const addOnTotal = addOns.reduce((sum, a) => sum + a.price, 0);
    const travel = travelFor(state, days);
    const total = pkg.price + addOnTotal + travel.cost;
    return { addOns, addOnTotal, travel, total, deposit: Math.round(total / 2) };
  }, [pkg, picked, state, days]);

  /* Hands the built quote to the enquiry form on the home page. */
  const sendToEnquiry = () => {
    const lines = [
      `${pkg.name} (${pkg.hours} hours)`,
      quote.addOns.length ? `Add-ons: ${quote.addOns.map((a) => a.label).join(', ')}` : '',
      days > 1 ? `${days} days on site` : '',
      `Estimated total ${naira(quote.total)}`,
    ].filter(Boolean);

    navigate('/', {
      state: {
        enquiry: {
          pkg: pkg.name,
          state,
          message: lines.join(' · '),
        },
      },
    });
  };

  return (
    <div className="site">
      <header className="hero pricing-hero">
        <HeroRays />
        <div className="hero-inner pricing-hero-inner">
          <div className="hero-mark">
            <Seal size={72} stroke="#D8B476" weight="light" />
            <div className="hero-kicker">LUMIÈRE PHOTOBOOTH — PRICING</div>
          </div>
          <h1 className="pricing-h1">
            Four experiences,
            <br />
            from ₦250,000
          </h1>
          <p className="hero-lede">
            Every package below carries the full Lumière service — the double-sided booth,
            professional photography, your own print design and an online gallery. What changes
            is how long we stay, and how far the production goes.
          </p>
          <div className="hero-actions">
            <a href="#builder" className="lum-btn lum-btn-gold">Build a quote</a>
            <Link to={{ pathname: '/', hash: '#included' }} className="lum-btn lum-btn-outline-gold">
              What’s included
            </Link>
          </div>
        </div>
      </header>

      {/* ── the four tiers ───────────────────────────────────────────── */}
      <Reveal id="packages" className="section">
        <div className="head-rule">
          <h2>The packages</h2>
          <span className="grow" />
        </div>

        <div className="g-4 tier-grid">
          {PACKAGES.map((p) => {
            const chosen = p.id === pkgId;
            return (
              <article
                key={p.id}
                className={`tier${p.highlight ? ' is-featured' : ''}${chosen ? ' is-chosen' : ''}`}
              >
                {p.highlight && <div className="tier-flag">Most chosen</div>}
                <h3 className="tier-name">{p.name}</h3>
                <div className="tier-price tnum">{naira(p.price)}</div>
                <div className="tier-hours">{p.hours} hours on site</div>
                <p className="tier-tag">{p.tagline}</p>
                <ul className="tier-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="tick" aria-hidden="true">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`lum-btn ${chosen ? 'lum-btn-accent' : 'tier-pick'}`}
                  onClick={() => {
                    setPkgId(p.id);
                    document.getElementById('builder')?.scrollIntoView({ block: 'start' });
                  }}
                  aria-pressed={chosen}
                >
                  {chosen ? 'Selected' : `Choose ${p.name}`}
                </button>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="compare-toggle"
          aria-expanded={compareOpen}
          aria-controls="compare-table"
          onClick={() => setCompareOpen((v) => !v)}
        >
          {compareOpen ? 'Hide the full comparison' : 'Compare all four side by side'}
          <span className="faq-plus" style={compareOpen ? { transform: 'rotate(45deg)' } : undefined}>+</span>
        </button>

        {compareOpen && (
          <div className="compare-wrap" id="compare-table">
            <table className="table compare">
              <thead>
                <tr>
                  <th scope="col">Included</th>
                  {PACKAGES.map((p) => <th key={p.id} scope="col">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Booth time</th>
                  {PACKAGES.map((p) => <td key={p.id} className="tnum">{p.hours} hrs</td>)}
                </tr>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    {PACKAGES.map((p, i) => (
                      <td key={p.id}>
                        {tierHas(i, row)
                          ? <span className="yes" aria-label="Included">●</span>
                          : <span className="no" aria-label="Not included">–</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">From</th>
                  {PACKAGES.map((p) => <td key={p.id} className="tnum">{naira(p.price)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Reveal>

      {/* ── quote builder ────────────────────────────────────────────── */}
      <Reveal id="builder" className="section">
        <div className="head-split">
          <h2>Build your quote</h2>
          <p className="hint eyebrow">Figures update as you choose</p>
        </div>

        <div className="builder g-form">
          <div className="builder-choices">
            <fieldset className="bl">
              <legend className="bl-legend">Package</legend>
              <div className="chip-row">
                {PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`chip${p.id === pkgId ? ' is-on' : ''}`}
                    aria-pressed={p.id === pkgId}
                    onClick={() => setPkgId(p.id)}
                  >
                    {p.name}
                    <span className="chip-price tnum">{naira(p.price)}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="bl">
              <legend className="bl-legend">Add-ons</legend>
              <div className="addon-list">
                {ADD_ONS.map((a) => (
                  <label className={`addon${picked.has(a.id) ? ' is-on' : ''}`} key={a.id}>
                    <input
                      type="checkbox"
                      checked={picked.has(a.id)}
                      onChange={() => toggleAddOn(a.id)}
                    />
                    <span className="addon-box" aria-hidden="true" />
                    <span className="addon-text">
                      <span className="addon-label">{a.label}</span>
                      <span className="addon-note">{a.note}</span>
                    </span>
                    <span className="addon-price tnum">{naira(a.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="bl">
              <legend className="bl-legend">Where and how long</legend>
              <div className="g-2 builder-where">
                <div className="field">
                  <label htmlFor="q-state">State</label>
                  <select
                    className="input"
                    id="q-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select a state</option>
                    {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="q-days">Days on site</label>
                  <div className="stepper">
                    <button type="button" onClick={() => setDays((d) => Math.max(1, d - 1))} aria-label="One day fewer">−</button>
                    <output id="q-days" className="tnum">{days}</output>
                    <button type="button" onClick={() => setDays((d) => Math.min(7, d + 1))} aria-label="One day more">+</button>
                  </div>
                </div>
              </div>
              {quote.travel.note && <p className="builder-travel">{quote.travel.note}</p>}
            </fieldset>
          </div>

          {/* the running total */}
          <aside className="quote-card" aria-live="polite">
            <div className="quote-head">
              <div className="eyebrow" style={{ color: 'var(--color-accent-700)' }}>Your estimate</div>
              <h3 className="quote-pkg">{pkg.name}</h3>
              <div className="quote-sub">{pkg.hours} hours · {days} {days === 1 ? 'day' : 'days'} on site</div>
            </div>

            <div className="rule" />

            <dl className="quote-lines">
              <div className="quote-line">
                <dt>{pkg.name} package</dt>
                <dd className="tnum">{naira(pkg.price)}</dd>
              </div>

              {quote.addOns.map((a) => (
                <div className="quote-line" key={a.id}>
                  <dt>{a.label}</dt>
                  <dd className="tnum">{naira(a.price)}</dd>
                </div>
              ))}

              {quote.travel.cost > 0 && (
                <div className="quote-line">
                  <dt>Travel — {state} × {days}</dt>
                  <dd className="tnum">{naira(quote.travel.cost)}</dd>
                </div>
              )}
            </dl>

            <div className="rule" />

            <div className="quote-total">
              <span>Estimated total</span>
              <strong className="tnum">{naira(quote.total)}</strong>
            </div>
            <div className="quote-deposit">
              <span>50% deposit secures the date</span>
              <strong className="tnum">{naira(quote.deposit)}</strong>
            </div>

            <button type="button" className="lum-btn lum-btn-accent quote-cta" onClick={sendToEnquiry}>
              Send this with my enquiry
            </button>

            <p className="quote-small">
              An estimate, not an invoice. Flights, accommodation and transportation outside
              Abuja are arranged with you directly.
            </p>
          </aside>
        </div>
      </Reveal>

      {/* ── terms ────────────────────────────────────────────────────── */}
      <Reveal className="section">
        <div className="head-rule">
          <h2>Coverage and terms</h2>
          <span className="grow" />
        </div>
        <div className="g-3 terms-grid">
          {TERMS.map(({ title, body }) => (
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
            <div className="kicker">Next</div>
            <h2>
              Tell us the date
              <br />
              and we will check it.
            </h2>
          </div>
          <div className="pkg-banner-body">
            <p>
              Two to three months is comfortable for a weekend date, and November and December
              go earlier. A 50% deposit secures it; the balance is due one week before.
            </p>
            <Link to={{ pathname: '/', hash: '#enquire' }} className="lum-btn lum-btn-accent">
              Check your date
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
