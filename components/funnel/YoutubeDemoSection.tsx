'use client'

import Reveal from '@/components/Reveal'
import YoutubeCoverFrame from '@/components/funnel/YoutubeCoverFrame'
import { useYoutubeInViewPlayer } from '@/hooks/useYoutubeInViewPlayer'

const YOUTUBE_ID = 'MgbIAa46c9o'

export default function YoutubeDemoSection() {
  const { sectionRef, iframeRef, togglePause, src, posterUrl, showPoster, onIframeLoad } =
    useYoutubeInViewPlayer({
      youtubeId: YOUTUBE_ID,
      activeId: 'youtube',
      variant: 'landscape',
    })

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-8 sm:py-10">
      {/* Prefetch thumbnail so the cover paints instantly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterUrl}
        alt=""
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        fetchPriority="high"
        decoding="async"
        aria-hidden
      />

      <div className="relative mx-auto max-w-lg">
        <Reveal className="mb-5 text-center">
          <h2 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
            🔥 ප්‍රසිද්ධ YouTubers ලා අපේ ව්‍යාපාරය ගැන දක්වන අදහස්
          </h2>
          <p className="font-english mt-2 text-base text-white/70">Real reviews from YouTubers</p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
            <YoutubeCoverFrame
              src={src}
              posterUrl={posterUrl}
              showPoster={showPoster}
              title="Kottu Cutting Machine Demo"
              iframeRef={iframeRef}
              onIframeLoad={onIframeLoad}
              aspectClass="aspect-video"
              onToggle={togglePause}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
