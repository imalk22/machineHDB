import { Phone } from 'lucide-react'
import { PHONE_TEL } from '@/lib/contact'

interface CTAButtonsProps {
  size?: 'sm' | 'md' | 'lg'
  layout?: 'row' | 'stack'
  className?: string
}

const sizeClasses = {
  sm: 'py-3 px-4 text-sm rounded-xl',
  md: 'py-3.5 px-5 text-base rounded-2xl',
  lg: 'py-4 px-6 text-lg rounded-2xl',
}

export default function CTAButtons({
  size = 'md',
  layout = 'row',
  className = '',
}: CTAButtonsProps) {
  const btn = sizeClasses[size]

  return (
    <div
      className={`flex gap-3 ${layout === 'stack' ? 'flex-col' : 'flex-col sm:flex-row'} ${className}`}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        className={`btn-english flex flex-1 cursor-pointer items-center justify-center gap-2 border border-brand-cta/40 bg-brand-cta/20 text-white backdrop-blur-sm transition-colors hover:bg-brand-cta/30 ${btn}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cta text-white">
          <Phone className="h-4 w-4 flex-shrink-0" aria-hidden />
        </span>
        Call Now
      </a>
    </div>
  )
}
