/** Soft blue glow + spark dots — same structure as warm kitchen, brand blue palette */
export default function BlueprintPattern({ fixed = false }: { fixed?: boolean }) {
  const wrap = fixed
    ? 'pointer-events-none fixed inset-0 z-0 overflow-hidden'
    : 'pointer-events-none absolute inset-0 overflow-hidden'

  return (
    <div className={`${wrap} bg-navy`} aria-hidden>
      {/* Soft blue glows */}
      <div
        className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full blur-[130px]"
        style={{ background: 'rgba(29, 78, 216, 0.38)' }}
      />
      <div
        className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'rgba(59, 130, 246, 0.22)' }}
      />
      <div
        className="absolute left-1/2 top-[45%] h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: 'rgba(27, 117, 208, 0.12)' }}
      />

      {/* Spark dots — same pattern, blue */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147, 197, 253, 0.28) 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 1px, transparent 1.5px)',
          backgroundSize: '44px 44px',
          backgroundPosition: '14px 10px',
        }}
      />
    </div>
  )
}
