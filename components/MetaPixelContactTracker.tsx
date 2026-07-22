'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Fires Meta Pixel Contact on any tel: link click (hero, sticky bar, CTAs, etc.). */
export default function MetaPixelContactTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href^="tel:"]')
      if (!link) return

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact')
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
