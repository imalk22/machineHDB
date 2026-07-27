'use client'

import {
  Landmark,
  FileCheck,
  Building2,
  Users,
  Lock,
} from 'lucide-react'
import Reveal from '@/components/Reveal'

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
    icon: Building2,
    title: 'ආරක්ෂිත බැංකු ගෙවීම්',
    desc: 'ඔබට අරක්ෂිත බැංකු ගෙවීමේ ක්‍රම අප අයතනය මගින් සලසා ඇත',
    subtitle: 'Secure Bank Payments',
  },
  {
    icon: Users,
    title: 'දිවයින පුරා සේවා සැපයිම 24/7',
    desc: 'දිවයින පුරා සේවා කණ්ඩායම ඔබගේ නිවසටම පැමිණ සේවා සපයනු ඇත.',
    subtitle: 'Island-wide Expert Service Team',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="text-center">
          <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
            ඇයි HDB Engineering Lanka තෝරාගත යුත්තේ?
          </h2>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white">
            <Lock className="h-4 w-4 flex-shrink-0" aria-hidden />
            ඔබේ මුදල 100%ක් ආරක්ෂිතයි
          </span>
        </Reveal>

        <div className="mt-6 space-y-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <Reveal key={reason.title} delayMs={index * 70}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="btn-english flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-cta text-sm font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Icon className="h-5 w-5 flex-shrink-0 text-brand-cta" aria-hidden />
                        <h3 className="text-base font-extrabold text-white">{reason.title}</h3>
                      </div>
                      <p className="text-xs font-bold leading-relaxed text-white/90">{reason.desc}</p>
                      {reason.subtitle ? (
                        <p className="font-english mt-1 text-xs text-white/55">{reason.subtitle}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
