'use client'

import Image from 'next/image'
import Reveal from '@/components/Reveal'

export default function AdBannerSection({
  src = '/images/ad.jpg',
  alt = 'HDB Engineering Lanka — Commercial Kottu Cutting Machine',
}: {
  src?: string
  alt?: string
}) {
  return (
    <section className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-lg">
            <Image
              src={src}
              alt={alt}
              width={1080}
              height={1080}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
              priority={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
