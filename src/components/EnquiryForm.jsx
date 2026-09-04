import { useEffect, useState } from 'react';
import {
  HOME_STATE,
  NIGERIAN_STATES,
  TRAVEL_STATES,
} from '../data/site.js';

const EMPTY = {
  name: '', email: '', date: '', type: '',
  state: '', venue: '', pkg: '', message: '',
};

/* Returns the travel notice for a chosen state, or null where none applies.
   Wording is carried over from the design. */
function travelNotice(state) {
  if (!state || state === HOME_STATE) return null;

  if (TRAVEL_STATES.includes(state)) {
    return {
      title: `${state} — travel applies`,
      body:
        'The booth is based in Abuja. Bookings in Kaduna, Kano and Bauchi carry a travel ' +
        'charge of ₦500,000 per day, and flights, accommodation and transportation must be ' +
        'provided for one photobooth manager.',
    };
  }

  return {
    title: 'Outside our standard coverage',
    body:
      'The booth is based in Abuja and currently travels to Kaduna, Kano and Bauchi. For ' +
      `${state}, send your enquiry and the team will come back to you with a tailored quote. ` +
      'Flights, accommodation and transportation for one photobooth manager would be required.',
  };
}

/* Order matters: a failed submit sends focus to the first field listed here
   that is carrying an error. */
const VALIDATED = ['name', 'email', 'date'];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'That email does not look right.';
  if (!values.date) errors.date = 'Which date are you checking?';
  return errors;
}

/* `prefill` arrives from the pricing page's quote builder, so a visitor who has
   already chosen a package does not retype it here. */
export default function EnquiryForm({ prefill }) {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!prefill) return;
    setValues((v) => ({ ...v, ...prefill }));
    setSent(false);
  }, [prefill]);

  /* Derived, not stored: the errors always describe the values on screen, so a
     corrected field stops complaining on the same keystroke. */
  const errors = validate(values);

  const set = (field) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [field]: value }));
    setSent(false);
  };

  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const firstBad = VALIDATED.find((id) => errors[id]);
    if (firstBad) {
      setSent(false);
      document.getElementById(`lm-${firstBad}`)?.focus();
      return;
    }

    // No backend in this build — the design ends at the confirmation.
    setSent(true);
  };

  const notice = travelNotice(values.state);
  // A field speaks up once it has been visited, or once submit has been tried.
  const invalid = (field) => ((touched[field] || submitted) && errors[field] ? errors[field] : null);

  const field = (id, label, extra = {}) => {
    const err = invalid(id);
    return (
      <div className={`field${extra.wide ? ' span-2' : ''}`}>
        <label htmlFor={`lm-${id}`}>{label}</label>
        <input
          className={`input${err ? ' has-error' : ''}`}
          id={`lm-${id}`}
          type={extra.type || 'text'}
          placeholder={extra.placeholder}
          value={values[id]}
          onChange={set(id)}
          onBlur={blur(id)}
          aria-invalid={err ? 'true' : undefined}
          aria-describedby={err ? `lm-${id}-err` : undefined}
        />
        {err && <span className="form-error" id={`lm-${id}-err`}>{err}</span>}
      </div>
    );
  };

  return (
    <form className="g-form-fields" onSubmit={onSubmit} noValidate>
      {field('name', 'Name', { placeholder: 'Your name' })}
      {field('email', 'Email', { type: 'email', placeholder: 'you@example.com' })}
      {field('date', 'Event date', { type: 'date' })}
      {field('type', 'Event type', { placeholder: 'Wedding, gala, birthday' })}

      <div className="field">
        <label htmlFor="lm-state">State</label>
        <select className="input" id="lm-state" value={values.state} onChange={set('state')}>
          <option value="">Select a state</option>
          {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {field('venue', 'Venue', { placeholder: 'Venue name' })}

      {notice && (
        <div className="travel-note span-2">
          <div className="title">{notice.title}</div>
          <div className="body">{notice.body}</div>
        </div>
      )}

      {field('pkg', 'Package', { wide: true, placeholder: 'Bronze, Silver, Gold or Diamond' })}
      {field('message', 'Anything else', { wide: true, placeholder: 'Guest count, add-ons, questions' })}

      <button
        type="submit"
        className="btn btn-primary span-2"
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          justifyContent: 'center',
        }}
      >
        Send enquiry
      </button>

      <div className="span-2" aria-live="polite">
        {sent && <div className="sent-note">Enquiry sent. We will reply within 24 hours.</div>}
      </div>
    </form>
  );
}
