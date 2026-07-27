'use client'

import { useLayoutEffect, useRef, useState } from 'react'

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

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const markVisible = () => {
      if (!cancelled) setIsInView(true)
    }

    if (isElementInViewport(el)) markVisible()

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

    const raf = requestAnimationFrame(() => {
      if (isElementInViewport(el)) markVisible()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isInView }
}
