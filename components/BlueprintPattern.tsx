/** Blueprint grid + 2 soft round blue lights */
export default function BlueprintPattern({ fixed = false }: { fixed?: boolean }) {
  const wrap = fixed
    ? 'pointer-events-none fixed inset-0 z-0 overflow-hidden'
    : 'pointer-events-none absolute inset-0 overflow-hidden'

  return (
    <div className={wrap} aria-hidden>
      {/* 2 round lights */}
      <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-royal/30 blur-[120px]" />
      <div className="absolute -bottom-24 -right-16 h-[520px] w-[520px] rounded-full bg-electric/22 blur-[110px]" />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
