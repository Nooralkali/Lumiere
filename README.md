# Lumière Photo Booth

A React implementation of the **Lumière Website** design (`Lumiere Website.dc.html`),
built from the published Claude Design artifact.

Lumière is a photobooth service based in Abuja, travelling nationwide.

## Running it

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Pages

| Route      | What it is                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| `/`        | The main site — hero, what's included, packages banner, celebrations gallery, testimonials, FAQ, enquiry form. |
| `/pricing` | The page behind the design's `Lumiere Pricing.dc.html` links: the four packages, a side-by-side comparison, an interactive quote builder, and the coverage and terms. |
| `*`        | A 404 in the same voice.                                                   |

The design's other links are anchors within the home page (`#included`, `#events`,
`#faq`, `#enquire`) or external (Instagram, WhatsApp, TikTok, email), so they did
not need pages of their own. The nav's anchors work from any route.

## Interaction

- **Nav** — sticky, raises on scroll, underlines the section you are reading, and
  carries a reading-progress hairline. Collapses to a drawer under 900px.
- **Celebrations** — a card grows into a lightbox in place. Page it with the arrow
  keys or the flanking controls, close it with Escape or the scrim. Focus returns
  to the card you opened.
- **FAQ** — animated accordion; several answers may stand open at once.
- **Enquiry form** — inline validation that clears as you correct it, a travel
  notice that changes with the state you pick, and a confirmation on send.
- **Quote builder** (pricing) — choose a package, tick add-ons, set the state and
  number of days, and the estimate and 50% deposit recompute live. "Send this with
  my enquiry" carries the selection into the home page's form.
- **Reveal on scroll** throughout, and every motion respects
  `prefers-reduced-motion`.

## Layout

```
src/
  assets/         hero photograph + the three self-hosted webfont families
  components/     Nav, Footer, Seal, HeroRays, ImageSlot, Reveal,
                  EventGallery, Faq, EnquiryForm, BackToTop
  data/site.js    all copy, packages, add-ons, FAQs, states, travel rates
  pages/          Home, Pricing, NotFound
  styles/
    fonts.css     @font-face for Cormorant Garamond, Lora and Jost
    classical.css the "Classical" design-system tokens and component classes,
                  carried over verbatim from the design
    site.css      the home page's own styles
    pricing.css   the pricing page's own styles
```

`classical.css` is the design system and is the place to retune the look —
colours, type, spacing, radii and elevation all come from the tokens at its top.

## Notes on content

Everything on the home page is the design's own copy. The pricing page had to
carry figures the design named only in part — it gives the ₦250,000 floor, the
four tier names, the ₦500,000/day travel charge for Kaduna, Kano and Bauchi, and
the 50% deposit. The per-tier prices above the floor, and the add-on menu, are
placeholders written to fit that ladder. They all live in `src/data/site.js`, so
correcting them is a one-file edit.

The five celebration photographs are placeholders — the design shipped captions
but no images for them. Drop files in and pass them to `ImageSlot` via `EVENTS`
in `src/data/site.js`.

The enquiry form has no backend; submitting it validates and confirms, as the
design does.

## Fonts

Cormorant Garamond, Lora and Jost are served from `src/assets/fonts` rather than a
CDN, with the original subsets and unicode ranges, so the page renders correctly
with no third-party request.
