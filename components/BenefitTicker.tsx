const benefits = [
  'නොමිලේ දිවයින පුරා බෙදාහැරීම',
  'මාස 12ක වගකීම',
  'SS304 වාණිජ ශ්‍රේණියේ වානේ',
  'නොමිලේ පුහුණුව',
  'නිල නීතිමය ගිවිසුමක්',
]

export default function BenefitTicker() {
  // Duplicated once so the marquee wraps seamlessly at the halfway point.
  const items = [...benefits, ...benefits]

  return (
    <div className="bg-charcoal border-y border-flame/20 py-3 overflow-hidden">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="ticker-text flex-shrink-0 flex items-center gap-3 px-6 text-sm sm:text-base font-extrabold uppercase tracking-wide"
          >
            {item}
            <span className="text-flame-amber text-xs" aria-hidden>
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
