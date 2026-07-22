'use client'

import { Wrench, ShieldCheck, Check } from 'lucide-react'
import Reveal from './Reveal'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

const counterSpecs = [
  { label: 'Power', target: 1.5, decimals: 1, suffix: ' HP' },
  { label: 'Capacity', target: 150, decimals: 0, suffix: ' kg/hr' },
  { label: 'Warranty', target: 12, decimals: 0, suffix: ' mo' },
]

const plainSpecs = [
  { label: 'Material', value: 'SS304 Stainless Steel' },
  { label: 'Origin', value: 'Made in Sri Lanka' },
]

const features = [
  {
    en: 'Rapid slicing for kottu',
    si: 'කොත්තු රොටී වේගවත්ව කපාගත හැක',
  },
  {
    en: 'Cuts meat, cheese, and vegetables uniformly',
    si: 'මස්, චීස් සහ එළවලු සමාන ලෙස කපාගත හැක',
  },
  {
    en: 'Single operator needed',
    si: 'එක් ක්‍රියාකරුවෙකු පමණක් ප්‍රමාණවත්',
  },
  {
    en: 'SS304 commercial-grade stainless steel',
    si: 'SS304 වාණිජ ශ්‍රේණියේ මල නොබැඳෙන වානේ',
  },
  {
    en: 'island-wide delivery',
    si: 'දිවයින පුරා බෙදාහැරීම',
  },
]

function CounterCard({ label, target, decimals, suffix }: (typeof counterSpecs)[number]) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const value = useCountUp(target, isInView)

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white/5 border border-flame/20 p-4 text-center shadow-[0_0_24px_rgba(255,107,26,0.08)]"
    >
      <p className="text-2xl sm:text-3xl font-black gradient-text-flame leading-none mb-1">
        {value.toFixed(decimals)}
        {suffix}
      </p>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
    </div>
  )
}

export default function Specs() {
  return (
    <section id="specs" className="bg-charcoal py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-flame/10 text-flame-amber text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            <Wrench className="w-3.5 h-3.5" aria-hidden />
            Technical Specifications
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            තාක්ෂණික විස්තර සහ වගකිම් සහතිකය
          </h2>
        </Reveal>

        {/* Count-up spec cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {counterSpecs.map((spec) => (
            <CounterCard key={spec.label} {...spec} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Plain specs + warranty badge */}
          <div className="flex flex-col gap-4">
            <Reveal className="overflow-hidden rounded-2xl border border-white/10">
              {plainSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                  }`}
                >
                  <span className="text-gray-400 text-xs">{spec.label}</span>
                  <span className="text-white font-semibold text-xs">{spec.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delayMs={100} className="bg-whatsapp/10 border border-whatsapp/30 rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-whatsapp text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden />
              </div>
              <div>
                <p className="font-bold text-white text-sm">යන්ත්‍රයේ බඳ සඳහා වගකීම</p>
                <p className="text-xs text-gray-400">Machine Warranty (Parts &amp; Service)</p>
              </div>
            </Reveal>
          </div>

          {/* Key features */}
          <div className="lg:col-span-2 space-y-2.5">
            {features.map((feature, index) => (
              <Reveal key={feature.en} delayMs={index * 80}>
                <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-transparent hover:border-flame/30 rounded-xl p-3 transition-colors duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shadow-green-700/20">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} aria-hidden />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-snug">{feature.si}</p>
                    <p className="text-gray-400 text-xs leading-snug mt-0.5">{feature.en}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
