'use client'

import { Wallet, Zap, MapPin, Wrench } from 'lucide-react'
import Reveal from '@/components/Reveal'

const benefits = [
  { icon: Wallet, sinhala: 'අඩු ආයෝජනයකින් ආරම්භ කරන්න', english: 'Low investment start' },
  { icon: Zap, sinhala: 'වේගවත් ආදායම් ලබාගන්න', english: 'Fast return on investment' },
  { icon: MapPin, sinhala: 'ලංකාවේම සහාය', english: 'Local support across Sri Lanka' },
  { icon: Wrench, sinhala: 'Spare parts ලබාගත හැක', english: 'Spare parts available' },
]

export default function BenefitsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold text-brand-primary sm:text-3xl">
            ඇයි අපව තෝරාගන්නේ?
          </h2>
          <p className="mt-2 text-center text-base text-brand-text/70">Why choose HDB</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.english} delayMs={i * 80}>
                <div className="flex flex-col items-center rounded-2xl bg-brand-primary/5 p-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cta text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="text-sm font-bold leading-snug text-brand-text">{b.sinhala}</p>
                  <p className="mt-1 text-xs text-brand-text/60">{b.english}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
