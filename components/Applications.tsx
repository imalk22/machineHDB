import Reveal from './Reveal'

const applications = [
  {
    label: 'Hotels & restaurants',
    icon: (
      <path d="M2.25 21h19.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    ),
  },
  {
    label: 'Kottu shops',
    icon: (
      <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
    ),
  },
  {
    label: 'Catering services',
    icon: (
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    ),
  },
  {
    label: 'Food courts',
    icon: (
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    ),
  },
]

export default function Applications() {
  return (
    <section className="py-16 bg-charcoal overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-10">
          <span className="inline-block bg-flame/10 text-flame-amber text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 border border-flame/20">
            Applications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            මෙම යන්ත්‍රය භාවිත කළ හැකි ක්ෂේත්‍ර
          </h2>
        </Reveal>
      </div>

      {/* Horizontal snap-scroll row - bleeds to the edges on mobile */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {applications.map((app, index) => (
          <Reveal key={app.label} delayMs={index * 100} className="snap-center flex-shrink-0 w-[62vw] max-w-[240px]">
            <div className="group relative h-full bg-white/5 rounded-3xl p-6 text-center border border-white/10 hover:border-flame/40 transition-colors duration-300 overflow-hidden">
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-flame/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />

              <div className="relative mx-auto mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-flame to-flame-amber flex items-center justify-center shadow-md shadow-flame/25">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {app.icon}
                </svg>
              </div>

              <p className="relative text-gray-200 text-sm font-semibold leading-snug">{app.label}</p>
            </div>
          </Reveal>
        ))}
        {/* Trailing spacer so the last card can reach center on snap */}
        <div className="flex-shrink-0 w-[1px]" aria-hidden />
      </div>
    </section>
  )
}
