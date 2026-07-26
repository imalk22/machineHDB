'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_TEL } from '@/lib/contact'

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="border-t border-white/10 bg-navy/80 p-3 shadow-lg backdrop-blur-md">
        <a
          href={`tel:${PHONE_TEL}`}
          className="btn-english flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-brand-cta/40 bg-brand-cta/20 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-brand-cta/30"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cta text-white">
            <Phone className="h-4 w-4" aria-hidden />
          </span>
          Call Now
        </a>
      </div>
    </div>
  )
}
