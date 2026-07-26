'use client'

import { PhoneCall, Users, PackageCheck, Store } from 'lucide-react'
import Reveal from '@/components/Reveal'

const steps = [
  { icon: PhoneCall, step: '1', sinhala: 'අපට අමතන්න', english: 'Call us' },
  { icon: Users, step: '2', sinhala: 'උපදෙස් ලබාගන්න', english: 'Get advice' },
  { icon: PackageCheck, step: '3', sinhala: 'යන්ත්‍රය තෝරන්න', english: 'Choose machine' },
  { icon: Store, step: '4', sinhala: 'ව්‍යාපාරය ආරම්භ කරන්න', english: 'Start business' },
]

export default function HowItWorks() {
  return (
    <section className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold text-white sm:text-3xl">
            ඔබගේම ව්‍යාපාරයක් ආරම්භ කරන ක්‍රමවේදය
          </h2>
          <p className="font-english mt-2 text-center text-base text-white/70">
            4 simple steps to start the business
          </p>
        </Reveal>

        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.step} delayMs={i * 100}>
                <li className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-cta/40 bg-brand-cta/20 text-brand-cta">
                    <Icon className="h-6 w-6" aria-hidden />
                    <span className="font-english absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-brand-cta text-[10px] font-extrabold text-white">
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{s.sinhala}</p>
                    <p className="font-english text-xs text-white/60">{s.english}</p>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
