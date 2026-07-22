'use client'

import { useEffect, useRef, useState } from 'react'
import { Factory, MapPin, Layers, type LucideIcon } from 'lucide-react'

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

function useScrollCount(target: number, playId: number, durationMs = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (playId === 0) return

    setValue(0)

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playId, target, durationMs])

  return value
}

function StatCard({
  target,
  suffix,
  en,
  icon: Icon,
  playId,
  delayMs,
}: {
  target: number
  suffix: string
  en: string
  icon: LucideIcon
  playId: number
  delayMs: number
}) {
  const [cardPlayId, setCardPlayId] = useState(0)

  useEffect(() => {
    if (playId === 0) return
    const t = window.setTimeout(() => setCardPlayId(playId), delayMs)
    return () => window.clearTimeout(t)
  }, [playId, delayMs])

  const value = useScrollCount(target, cardPlayId, 2200)

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
  const sectionRef = useRef<HTMLElement>(null)
  const wasInView = useRef(false)
  const [playId, setPlayId] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.25
        if (inView && !wasInView.current) {
          setPlayId((id) => id + 1)
        }
        wasInView.current = inView
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent px-3 py-10 sm:px-4 sm:py-12"
    >
      <div className="relative mx-auto grid max-w-5xl grid-cols-3 gap-2 sm:gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.en}
            {...stat}
            playId={playId}
            delayMs={index * 150}
          />
        ))}
      </div>
    </section>
  )
}
