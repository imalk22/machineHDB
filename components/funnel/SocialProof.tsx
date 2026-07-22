'use client'

import { Star } from 'lucide-react'
import Reveal from '@/components/Reveal'

const testimonials = [
  {
    quote:
      'මම කොත්තු machine එක ගත්තට පස්සේ income එක double උනා. වැඩත් ලෙසී',
    name: 'සුනිල් පෙරේරා',
    location: 'අනුරාධපුර',
  },
  {
    quote:
      'HDB team එක training දීලා setup කරලා දුන්නා. ඒක ගොඩක් වටින දෙයක් සහා සුහද සේවාවක් ලබා දුන්නා',
    name: 'කමලා සිල්වා',
    location: 'කුරුණෑගල',
  },
  {
    quote:
      'අපිට ගෙදරටම delivery එකත් කරලා දුන්නා machine එක හොදම තත්වයේ තියෙනවා.',
    name: 'නිශාන්ත රාජපක්ෂ',
    location: 'මාතර',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-brand-cta text-brand-cta" aria-hidden />
      ))}
    </div>
  )
}

export default function SocialProof() {
  return (
    <section className="relative bg-transparent px-4 py-12 sm:py-16">
      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold text-white sm:text-3xl">
            පාරිභෝගික අදහස්
          </h2>
          <p className="font-english mt-2 text-center text-base text-white/70">
            customer feedbacks
          </p>
        </Reveal>

        <div className="mt-6 space-y-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delayMs={i * 100}>
              <blockquote className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 backdrop-blur-sm">
                <Stars count={5} />
                <p className="mt-2 text-sm leading-snug text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-2.5 border-t border-white/15 pt-2">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/60">{t.location}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
