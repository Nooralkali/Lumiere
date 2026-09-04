/* Stands in for the design's <image-slot>: shows the photograph when there is
   one, and an engraved placeholder carrying the caption when there is not. */
export default function ImageSlot({ src, alt = '', placeholder = 'Photograph', dark = false }) {
  const tone = dark ? ' slot-dark' : '';

  if (!src) {
    return (
      <div className={`slot slot-empty${tone}`} role="img" aria-label={placeholder}>
        <span>{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`slot${tone}`}>
      <img src={src} alt={alt || placeholder} loading="lazy" decoding="async" />
    </div>
  );
}
