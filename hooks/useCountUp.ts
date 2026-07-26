'use client'

import { useEffect, useState } from 'react'

// Animates from 0 to `target` over `durationMs`, starting only once `start`
// flips true (pair with useInView so counters run when scrolled into view).
export function useCountUp(target: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    let cancelled = false
    const startTime = performance.now()

    const tick = (now: number) => {
      if (cancelled) return
      const progress = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [start, target, durationMs])

  return value
}
