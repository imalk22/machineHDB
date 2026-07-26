'use client'

import Reveal from '@/components/Reveal'
import { useYoutubeInViewPlayer } from '@/hooks/useYoutubeInViewPlayer'

const YOUTUBE_ID = 'MgbIAa46c9o'

export default function YoutubeDemoSection() {
  const { sectionRef, iframeRef, src } = useYoutubeInViewPlayer({
    youtubeId: YOUTUBE_ID,
    activeId: 'youtube',
    variant: 'landscape',
  })

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="mb-5 text-center">
          <h2 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
            🔥 ප්‍රසිද්ධ YouTubers ලා අපේ ව්‍යාපාරය ගැන දක්වන අදහස්
          </h2>
          <p className="font-english mt-2 text-base text-white/70">Real reviews from YouTubers</p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
            <div className="relative aspect-video w-full">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 h-full w-full"
                src={src}
                title="Kottu Cutting Machine Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="eager"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
