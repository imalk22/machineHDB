'use client'

import { useEffect, useState } from 'react'
import { Factory, MapPin, Layers, type LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

const stats: {
  target: number
  suffix: string
  en: string
  icon: LucideIcon
}[] = [
  {
    target: 500,
    suffix: '+',
    en: 'Machines Installed',
    icon: Factory,
  },
  {
    target: 25,
    suffix: '+',
    en: 'Districts Covered',
    icon: MapPin,
  },
  {
    target: 10,
    suffix: '+',
    en: 'Machine Categories',
    icon: Layers,
  },
]

function StatCard({
  target,
  suffix,
  en,
  icon: Icon,
  start,
  delayMs,
}: {
  target: number
  suffix: string
  en: string
  icon: LucideIcon
  start: boolean
  delayMs: number
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!start) return
    if (delayMs <= 0) {
      setReady(true)
      return
    }
    const t = window.setTimeout(() => setReady(true), delayMs)
    return () => window.clearTimeout(t)
  }, [start, delayMs])

  const value = useCountUp(target, ready, 2200)

  return (
    <div className="flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-1.5 py-4 text-center shadow-lg backdrop-blur-md sm:min-h-[160px] sm:rounded-3xl sm:px-3 sm:py-5">
      <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-white/10 sm:mb-2 sm:h-9 sm:w-9 sm:rounded-xl">
        <Icon className="h-3.5 w-3.5 text-white sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="font-english text-base font-extrabold leading-none text-white sm:text-3xl">
        {Math.round(value)}
        {suffix}
      </p>
      <p className="font-english mt-1.5 text-[9px] font-semibold leading-snug text-white/90 sm:mt-2 sm:text-xs">
        {en}
      </p>
    </div>
  )
}

export default function StatsSection() {
  const { ref, isInView } = useInView<HTMLElement>(0.15)

  return (
    <section ref={ref} className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto grid max-w-5xl grid-cols-3 gap-2 sm:gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.en}
            {...stat}
            start={isInView}
            delayMs={index * 150}
          />
        ))}
      </div>
    </section>
  )
}
