'use client'

import Reveal from '@/components/Reveal'
import { useInViewLoudVideo } from '@/hooks/useInViewLoudVideo'

const VIDEO_SRC = '/videos/feedbackvedio.mp4'

export default function FeedbackVideoSection() {
  const { sectionRef, videoRef } = useInViewLoudVideo('feedback')

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
          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm sm:max-w-[420px]">
            <div className="relative aspect-[9/16] w-full bg-black/40">
              {/* muted omitted from React props so unmute isn't overwritten on re-render */}
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                playsInline
                loop
                preload="auto"
                autoPlay
                aria-label="Customer feedback video"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
