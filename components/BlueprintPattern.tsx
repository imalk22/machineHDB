/** Blueprint grid + glow orbs — matches https://hdb-engineering.vercel.app/en/about */
export default function BlueprintPattern({ fixed = false }: { fixed?: boolean }) {
  const wrap = fixed
    ? 'pointer-events-none fixed inset-0 z-0 overflow-hidden'
    : 'pointer-events-none absolute inset-0 overflow-hidden'

  return (
    <div className={wrap} aria-hidden>
      <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-royal/20 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-electric/15 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-royal/10 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
