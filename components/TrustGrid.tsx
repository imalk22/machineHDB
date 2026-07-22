import { Landmark, FileCheck, Store, Building2, Users, Lock } from 'lucide-react'
import Reveal from './Reveal'

const reasons = [
  {
    icon: Landmark,
    title: 'නිල ලියාපදිංචි ආයතනය',
    desc: 'නිත්‍යනුකුල ලියාපදිංචි ආයතනයකි.',
    subtitle: 'Official Company Registration',
  },
  {
    icon: FileCheck,
    title: 'නිල නීතිමය ගිවිසුමක්',
    desc: 'Advance මුදලට නිල ගිවිසුමක් ලබා දේ.',
    subtitle: 'Legal Agreement Issued',
  },
  {
    icon: Store,
    title: 'දඹුල්ල Showroom',
    desc: 'Dambulla Showroom හිදී Machine Live Demo.',
    subtitle: 'Physical Showroom — Dambulla',
  },
  {
    icon: Building2,
    title: 'ආරක්ෂිත බැංකු ගෙවීම්',
    desc: 'ආරක්ෂිත බැංකු ගෙවීම් ක්‍රම.',
    subtitle: 'Secure Bank Payments',
  },
  {
    icon: Users,
    title: 'දිවයින පුරා සේවා කණ්ඩායම',
    desc: 'දිවයින පුරා ක්ෂේත්‍ර සේවා කණ්ඩායමක් ඇත.',
    subtitle: 'Island-wide Expert Service Team',
  },
]

export default function TrustGrid() {
  return (
    <section className="py-16 px-4 bg-charcoal">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            ඇයි HDB Engineering Lanka තෝරාගත යුත්තේ?
          </h2>
          <span className="inline-flex items-center gap-2 bg-white/10 text-white font-bold text-sm px-4 py-2 rounded-full border border-white/20">
            <Lock className="w-4 h-4" aria-hidden />
            ඔබේ මුදල 100%ක් ආරක්ෂිතයි
          </span>
        </Reveal>

        {/* TODO: replace with real Dambulla showroom photos (exterior, interior, machine floor demo) */}
        <Reveal className="mb-8 rounded-2xl border border-dashed border-white/20 bg-white/5 h-40 sm:h-56 flex items-center justify-center text-gray-500 text-sm">
          TODO: Dambulla showroom photo strip
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <Reveal key={reason.title} delayMs={index * 60}>
                <div className="group bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-flame/30 hover:bg-white/10 transition-colors duration-300 shadow-lg h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-flame to-flame-amber text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <Icon className="w-6 h-6 text-flame-amber" aria-hidden />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{reason.title}</h3>
                  <p className="text-xs text-gray-300 font-semibold leading-relaxed">{reason.desc}</p>
                  <p className="text-xs text-gray-500 mt-1">{reason.subtitle}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
