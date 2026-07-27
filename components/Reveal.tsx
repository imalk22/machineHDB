'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

// Static export: show content until hydrated, then scroll-reveal (avoids blank page if JS is slow).
export default function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const [motionEnabled, setMotionEnabled] = useState(false)

  useEffect(() => {
    setMotionEnabled(true)
  }, [])

  const visible = !motionEnabled || isInView

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
