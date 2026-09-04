/* The fan of light behind every dark hero — one repeating pattern, as drawn in
   the design. */
export default function HeroRays() {
  return (
    <svg
      className="hero-rays"
      width="100%"
      height="100%"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-ray" width="150" height="90" patternUnits="userSpaceOnUse">
          <g stroke="#B68235" strokeWidth="1.6" fill="none">
            <path d="M 75 88 L 15 30" />
            <path d="M 75 88 L 39 18" />
            <path d="M 75 88 L 75 9" />
            <path d="M 75 88 L 111 18" />
            <path d="M 75 88 L 135 30" />
          </g>
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="url(#hero-ray)" />
    </svg>
  );
}
