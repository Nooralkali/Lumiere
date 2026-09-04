/* The Lumière mark — an arc, a circle and an L, drawn as one seal. */
export default function Seal({ size = 34, stroke = 'var(--color-accent)', weight = 'bold' }) {
  const w = weight === 'bold'
    ? { arc: 6, ring: 4, l: 8.5 }
    : { arc: 5, ring: 3.2, l: 7.4 };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 138 34.2 A 76 76 0 1 1 86.8 25.2" strokeWidth={w.arc} />
      <circle cx="97" cy="103" r="63" strokeWidth={w.ring} />
      <path d="M 90 12 L 90 139 L 152 139" strokeWidth={w.l} />
    </svg>
  );
}
