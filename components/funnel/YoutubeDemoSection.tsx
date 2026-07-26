'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/Reveal'
import {
  setActiveVideo,
  onActiveVideoChange,
  hasUserInteracted,
  markUserInteracted,
  onUserInteracted,
} from '@/lib/videoPlayback'

const YOUTUBE_ID = 'MgbIAa46c9o'

export default function YoutubeDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inViewRef = useRef(false)
  const [isMuted, setIsMuted] = useState(true)

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

    const unmute = () => {
      post('unMute')
      post('setVolume', [100])
      setIsMuted(false)
    }

    const playWithSound = () => {
      setActiveVideo('youtube')
      if (hasUserInteracted()) unmute()
      post('playVideo')
    }

    const pause = () => {
      post('pauseVideo')
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4
        inViewRef.current = visible
        if (visible) playWithSound()
        else pause()
      },
      { threshold: [0, 0.4, 0.7] }
    )

    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== 'youtube') pause()
    })

    const stopUnlock = onUserInteracted(() => {
      unmute()
      if (inViewRef.current) playWithSound()
    })

    return () => {
      observer.disconnect()
      stopIfOther()
      stopUnlock()
    }
  }, [])

  const enableSound = () => {
    markUserInteracted()
    const iframe = iframeRef.current
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
      '*'
    )
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
      '*'
    )
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*'
    )
    setIsMuted(false)
  }

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
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
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
              {isMuted && (
                <button
                  type="button"
                  onClick={enableSound}
                  className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 bg-black/70 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm"
                >
                  🔊 Tap for sound
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
