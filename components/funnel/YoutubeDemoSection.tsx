'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/Reveal'
import {
  setActiveVideo,
  onActiveVideoChange,
  hasUserInteracted,
  markUserInteracted,
} from '@/lib/videoPlayback'

const YOUTUBE_ID = 'MgbIAa46c9o'

export default function YoutubeDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const iframe = iframeRef.current
    if (!section || !iframe) return

    const post = (func: string, args: unknown[] = []) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      )
    }

    const playWithSound = () => {
      setActiveVideo('youtube')
      if (hasUserInteracted()) {
        post('unMute')
        post('setVolume', [100])
      }
      post('playVideo')
    }

    const pause = () => {
      post('pauseVideo')
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          playWithSound()
        } else {
          pause()
        }
      },
      { threshold: [0, 0.4, 0.7] }
    )

    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== 'youtube') pause()
    })

    // Any tap unlocks sound for YouTube autoplay policies
    const unlock = () => {
      markUserInteracted()
      post('unMute')
      post('setVolume', [100])
    }
    document.addEventListener('click', unlock, { once: true })
    document.addEventListener('touchstart', unlock, { once: true })

    return () => {
      observer.disconnect()
      stopIfOther()
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-12 sm:py-16">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="mb-6 text-center">
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
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                title="Kottu Cutting Machine Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
