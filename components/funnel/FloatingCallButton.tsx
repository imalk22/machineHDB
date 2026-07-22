'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_TEL } from '@/lib/contact'

const SHOW_MS = 5000
const HIDE_MS = 8000
const START_DELAY_MS = 5000

export default function FloatingCallButton() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  // Start the cycle only after the user begins scrolling
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setHasScrolled(true)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 5s after first scroll → show 5s → hide 8s → repeat
  useEffect(() => {
    if (!hasScrolled) return

    let showTimer: number | undefined
    let hideTimer: number | undefined
    let cancelled = false

    const runCycle = () => {
      if (cancelled) return
      setVisible(true)
      hideTimer = window.setTimeout(() => {
        if (cancelled) return
        setVisible(false)
        showTimer = window.setTimeout(runCycle, HIDE_MS)
      }, SHOW_MS)
    }

    const startTimer = window.setTimeout(runCycle, START_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(startTimer)
      if (showTimer) window.clearTimeout(showTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
    }
  }, [hasScrolled])

  return (
    <a
      href={`tel:${PHONE_TEL}`}
      aria-label="Call Now"
      className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-cta text-white shadow-lg shadow-brand-cta/40 transition-all duration-500 hover:scale-105 hover:bg-brand-cta/90 sm:bottom-24 ${
        visible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      }`}
    >
      <Phone className="h-7 w-7" aria-hidden />
    </a>
  )
}
