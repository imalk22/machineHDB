'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

// Shared scroll-reveal wrapper: fade + rise on first intersection, using
// transform/opacity transitions only (no Framer Motion) to keep this cheap
// on the low-end phones this page is built for.
export default function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
