'use client'

import Reveal from '@/components/Reveal'
import YoutubeCoverFrame from '@/components/funnel/YoutubeCoverFrame'
import { useYoutubeInViewPlayer } from '@/hooks/useYoutubeInViewPlayer'

const YOUTUBE_ID = 'PJLNLCJHPVg'

export default function LastYoutubeVideoSection() {
  const { sectionRef, iframeRef, src, posterUrl, showPoster, onIframeLoad } =
    useYoutubeInViewPlayer({
      youtubeId: YOUTUBE_ID,
      activeId: 'hero',
      coverWithPoster: true,
    })

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal delayMs={100}>
          <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg sm:max-w-[460px]">
            <YoutubeCoverFrame
              src={src}
              posterUrl={posterUrl}
              showPoster={showPoster}
              title="Kottu Cutting Machine demo video"
              iframeRef={iframeRef}
              onIframeLoad={onIframeLoad}
              aspectClass="aspect-[9/16]"
              iframeClassName="absolute left-0 w-full max-w-none border-0"
              iframeStyle={{ top: '-14%', height: '128%' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
