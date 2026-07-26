/** Warm kitchen / flame atmosphere — soft orange glows + ember dots */
export default function BlueprintPattern({ fixed = false }: { fixed?: boolean }) {
  const wrap = fixed
    ? 'pointer-events-none fixed inset-0 z-0 overflow-hidden'
    : 'pointer-events-none absolute inset-0 overflow-hidden'

  return (
    <div className={`${wrap} bg-charcoal`} aria-hidden>
      {/* Soft flame glows */}
      <div
        className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full blur-[130px]"
        style={{ background: 'rgba(255, 107, 26, 0.32)' }}
      />
      <div
        className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'rgba(255, 179, 0, 0.16)' }}
      />
      <div
        className="absolute left-1/2 top-[45%] h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: 'rgba(255, 107, 26, 0.08)' }}
      />

      {/* Ember dots — sparse spark atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 179, 0, 0.22) 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0',
        }}
      />
      {/* Offset second layer for a less uniform spark feel */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 107, 26, 0.2) 1px, transparent 1.5px)',
          backgroundSize: '44px 44px',
          backgroundPosition: '14px 10px',
        }}
      />
    </div>
  )
}
