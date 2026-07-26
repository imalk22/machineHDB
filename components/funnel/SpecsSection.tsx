'use client'

import { Wrench, ShieldCheck, Check } from 'lucide-react'
import Reveal from '@/components/Reveal'
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
      className="rounded-2xl border border-white/25 bg-white/15 p-3 text-center backdrop-blur-sm sm:p-4"
    >
      <p className="text-xl font-black leading-none text-flame-amber sm:text-2xl">
        {value.toFixed(decimals)}
        {suffix}
      </p>
      <p className="font-english mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/85 sm:text-xs">
        {label}
      </p>
    </div>
  )
}

export default function SpecsSection() {
  return (
    <section id="specs" className="relative bg-transparent px-4 pb-8 pt-5 sm:pb-10 sm:pt-6">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <span className="font-english inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            <Wrench className="h-3.5 w-3.5" aria-hidden />
            Technical Specifications
          </span>
          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            තාක්ෂණික විස්තර සහ වගකිම් සහතිකය
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {counterSpecs.map((spec) => (
            <CounterCard key={spec.label} {...spec} />
          ))}
        </div>

        <Reveal className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
          {plainSpecs.map((spec, index) => (
            <div
              key={spec.label}
              className={`font-english flex items-center justify-between px-4 py-3 text-sm ${
                index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
              }`}
            >
              <span className="text-xs text-white/55">{spec.label}</span>
              <span className="text-xs font-semibold text-white">{spec.value}</span>
            </div>
          ))}
        </Reveal>

        <Reveal
          delayMs={80}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-whatsapp/40 bg-whatsapp/15 p-4 backdrop-blur-sm"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
            <ShieldCheck className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold text-white">යන්ත්‍රයේ බඳ සඳහා වගකීම</p>
            <p className="font-english text-xs text-white/60">
              Machine Warranty (Parts &amp; Service)
            </p>
          </div>
        </Reveal>

        <div className="mt-4 space-y-2.5">
          {features.map((feature, index) => (
            <Reveal key={feature.en} delayMs={index * 70}>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-cta">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold leading-snug text-white">{feature.si}</p>
                  <p className="font-english mt-0.5 text-xs leading-snug text-white/55">
                    {feature.en}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
