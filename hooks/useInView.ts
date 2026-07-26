'use client'

import { useEffect, useRef, useState } from 'react'

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw
}

// Fires once when the element first scrolls into view - shared trigger for
// scroll-reveal animations and count-up counters.
export function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const markVisible = () => {
      if (!cancelled) setIsInView(true)
    }

    // Fallback: IntersectionObserver can miss already-visible elements on
    // mount / React Strict Mode remount, which left counters stuck at 0.
    if (isElementInViewport(el)) {
      markVisible()
      return () => {
        cancelled = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '40px 0px' }
    )

    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isInView }
}
