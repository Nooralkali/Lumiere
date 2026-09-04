/* Lumière — site content.
   Copy is lifted from the Lumière Website design; anything the design implied
   but did not spell out (the per-tier prices above the ₦250,000 floor, the
   add-on menu) is gathered here so it can be retuned in one place. */

export const BRAND = {
  name: 'Lumière',
  wordmark: 'LUMIÈRE',
  tagline: 'PHOTO BOOTH',
  line: 'Beautifully captured. Thoughtfully experienced.',
  email: 'hello@lumiere.ng',
  phone: '+234 000 000 0000',
  base: 'Abuja — travelling nationwide',
  city: 'Abuja, Nigeria',
  copyright: '© 2026 Lumière Photo Booth',
};

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/lumierephotobooth' },
  { label: 'WhatsApp', href: 'https://wa.me/2340000000000' },
  { label: 'TikTok', href: 'https://tiktok.com/@lumierephotobooth' },
  { label: 'Email', href: 'mailto:hello@lumiere.ng' },
];

export const INCLUDED = [
  {
    title: 'Professional Photography',
    body: 'Mirrorless camera + studio lighting for beautifully captured images.',
  },
  {
    title: 'The Lumière Booth',
    body: 'A double-sided statement booth designed to complement your event.',
  },
  {
    title: 'Your Aesthetic',
    body: 'Custom templates, welcome screens and rear-screen displays designed around your celebration.',
  },
  {
    title: 'Digital Memories',
    body: 'Easy sharing and an online gallery so guests can take their memories home.',
  },
  {
    title: 'The Full Service',
    body: 'Our team handles setup, operation and breakdown, so you can enjoy your event.',
  },
];

export const EVENTS = [
  { id: 1, slotId: 'lum-ev1', title: 'Mary & Antony', meta: 'Wedding · Abuja · March 2026' },
  { id: 2, slotId: 'lum-ev2', title: 'Zainab & Idris', meta: 'Nikkai · Abuja · January 2026' },
  { id: 3, slotId: 'lum-ev3', title: 'The Okafor Fiftieth', meta: 'Birthday · Abuja · December 2025' },
  { id: 4, slotId: 'lum-ev4', title: 'Year-End Gala', meta: 'Corporate · Abuja · December 2025' },
  { id: 5, slotId: 'lum-ev5', title: 'Amara & Kelechi', meta: 'Wedding · Kaduna · November 2025' },
];

export const TESTIMONIALS = [
  {
    quote: 'The booth had a queue all night. Our guests are still sending us the strips.',
    by: 'Chidinma & Tobi — Wedding, Abuja',
  },
  {
    quote: 'The print design matched our invitations exactly. It looked like it belonged to the event.',
    by: 'Amara O. — 40th Birthday, Abuja',
  },
  {
    quote: 'They arrived two hours early, set up quietly, and we never had to think about it again.',
    by: 'Ifeoma A. — Corporate Gala, Abuja',
  },
];

export const FAQS = [
  {
    q: 'How much space does the booth need?',
    a: 'A 3m × 3m footprint with access to a standard power outlet within 5 metres. We can work with less — tell us the venue and we will advise.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'Two to three months for a weekend date, and earlier for November and December. Diamond bookings include priority date reservation.',
  },
  {
    q: 'Do you travel outside Abuja?',
    a: 'The booth is based in Abuja. Kaduna, Kano and Bauchi carry a ₦500,000 per day travel charge, and flights, accommodation and transportation must be provided for one photobooth manager. For any other state, enquire with the team.',
  },
  {
    q: 'When do we receive the photos?',
    a: 'Guests share theirs by QR code and email during the event. The full online gallery goes live within 48 hours.',
  },
  {
    q: 'What secures a date?',
    a: 'A 50% deposit. The balance is due one week before the event.',
  },
];

export const NIGERIAN_STATES = [
  'FCT (Abuja)', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

/* Travel — the booth is based in Abuja. */
export const HOME_STATE = 'FCT (Abuja)';
export const TRAVEL_STATES = ['Kaduna', 'Kano', 'Bauchi'];
export const TRAVEL_DAY_RATE = 500000;

export const PACKAGES = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 250000,
    hours: 2,
    tagline: 'For an intimate dinner or a first-look reception.',
    features: [
      'The Lumière double-sided booth',
      'Mirrorless camera + studio lighting',
      'Unlimited sessions for 2 hours',
      'One custom print template',
      'Unlimited prints on the night',
      'QR + email sharing',
      'Online gallery within 48 hours',
      'Setup, operation and breakdown',
    ],
    highlight: false,
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 400000,
    hours: 3,
    tagline: 'The everyday favourite — enough room for a full reception.',
    features: [
      'Everything in Bronze',
      'Unlimited sessions for 3 hours',
      'Custom welcome + rear-screen design',
      'Choice of backdrop from our house range',
      'Guest props styled to your palette',
      'Two booth attendants on the night',
      'Digital copies delivered in 48 hours',
    ],
    highlight: false,
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 600000,
    hours: 4,
    tagline: 'When the booth is part of how the evening is remembered.',
    features: [
      'Everything in Silver',
      'Unlimited sessions for 4 hours',
      'Bespoke backdrop built to your brief',
      'Guest sign-in album with a curator',
      'Roaming photographer for one hour',
      'Animated GIF + boomerang mode',
      'Same-night highlight set to your phone',
    ],
    highlight: true,
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 850000,
    hours: 5,
    tagline: 'The full Lumière production, start to finish.',
    features: [
      'Everything in Gold',
      'Unlimited sessions for 5 hours',
      'Priority date reservation',
      'Two booths, or one booth plus a roaming studio',
      'Bespoke print and stationery design',
      'Leather-bound guest album, hand-finished',
      'Full-event photography coverage',
      'Dedicated producer from booking to delivery',
    ],
    highlight: false,
  },
];

export const ADD_ONS = [
  { id: 'hour', label: 'Additional hour', price: 90000, note: 'Per extra hour of booth time.' },
  { id: 'album', label: 'Guest sign-in album', price: 120000, note: 'Hand-finished, curated on the night.' },
  { id: 'backdrop', label: 'Bespoke backdrop', price: 150000, note: 'Built to your brief and palette.' },
  { id: 'roaming', label: 'Roaming photographer', price: 180000, note: 'Two hours of floor coverage.' },
  { id: 'video', label: 'Video + GIF booth mode', price: 110000, note: 'Boomerangs, GIFs and short clips.' },
  { id: 'stationery', label: 'Bespoke print design', price: 75000, note: 'Strips matched to your invitations.' },
  { id: 'second', label: 'Second print per guest', price: 60000, note: 'Everyone leaves with a copy.' },
  { id: 'earlyset', label: 'Early setup / late strike', price: 85000, note: 'For venues with tight access windows.' },
];

export const TERMS = [
  {
    title: 'Securing your date',
    body: 'A 50% deposit secures the date. The balance is due one week before the event. Diamond bookings include priority date reservation.',
  },
  {
    title: 'Space and power',
    body: 'The booth needs a 3m × 3m footprint with a standard power outlet within 5 metres. Tell us the venue and we will advise if the space is tighter.',
  },
  {
    title: 'Travel',
    body: 'The booth is based in Abuja. Kaduna, Kano and Bauchi carry a ₦500,000 per day travel charge, and flights, accommodation and transportation must be provided for one photobooth manager. For any other state, enquire with the team.',
  },
  {
    title: 'Delivery',
    body: 'Guests share their photographs by QR code and email during the event. The full online gallery goes live within 48 hours.',
  },
  {
    title: 'Lead time',
    body: 'Two to three months for a weekend date, and earlier for November and December, when weekends go first.',
  },
  {
    title: 'Changes',
    body: 'Dates can be moved once, up to 30 days before the event, subject to availability. Deposits transfer to the new date.',
  },
];

export const naira = (n) => '₦' + n.toLocaleString('en-NG');
