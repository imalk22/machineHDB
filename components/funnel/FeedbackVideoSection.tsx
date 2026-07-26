'use client'

import Reveal from '@/components/Reveal'
import { useYoutubeInViewPlayer } from '@/hooks/useYoutubeInViewPlayer'

const YOUTUBE_ID = 'X03dd14RUIE'

export default function FeedbackVideoSection() {
  const { sectionRef, iframeRef, togglePause, src } = useYoutubeInViewPlayer({
    youtubeId: YOUTUBE_ID,
    activeId: 'feedback',
  })

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="mb-5 text-center">
          <h2 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
            පාරිභෝගික Feedback Video
          </h2>
          <p className="font-english mt-2 text-base text-white/70">
            Real customer feedback
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg sm:max-w-[420px]">
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
              <iframe
                ref={iframeRef}
                className="absolute left-0 w-full max-w-none border-0"
                style={{ top: '-14%', height: '128%' }}
                src={src}
                title="Customer feedback video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                loading="eager"
              />
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                aria-label="Play or pause feedback video"
                onClick={togglePause}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
