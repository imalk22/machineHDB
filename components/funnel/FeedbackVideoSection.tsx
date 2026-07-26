'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/Reveal'
import {
  setActiveVideo,
  onActiveVideoChange,
  markUserInteracted,
  onUserInteracted,
} from '@/lib/videoPlayback'

const VIDEO_SRC = '/videos/feedbackvedio.mp4'

export default function FeedbackVideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    video.muted = false
    video.volume = 1

    const play = () => {
      setActiveVideo('feedback')
      video.muted = false
      video.volume = 1
      void video.play().catch(() => {
        // Browser blocked until a gesture — retry on next tap (no mute fallback)
      })
    }

    const pause = () => {
      video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4
        inViewRef.current = visible
        if (visible) play()
        else pause()
      },
      { threshold: [0, 0.4, 0.7] }
    )

    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== 'feedback') pause()
    })

    const stopUnlock = onUserInteracted(() => {
      if (inViewRef.current) play()
    })

    return () => {
      observer.disconnect()
      stopIfOther()
      stopUnlock()
    }
  }, [])

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
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                playsInline
                loop
                preload="metadata"
                controls
                muted={false}
                aria-label="Customer feedback video"
                onPlay={() => markUserInteracted()}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
