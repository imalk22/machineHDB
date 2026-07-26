'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/Reveal'
import {
  setActiveVideo,
  onActiveVideoChange,
  onUserInteracted,
} from '@/lib/videoPlayback'

const YOUTUBE_ID = 'MgbIAa46c9o'

export default function YoutubeDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inViewRef = useRef(false)
  const readyRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const iframe = iframeRef.current
    if (!section || !iframe) return

    const origin =
      typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''

    // Keep mute=0 so sound is on; enablejsapi for play/unmute commands
    iframe.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&autoplay=0&mute=0&playsinline=1&rel=0&modestbranding=1&origin=${origin}`

    const post = (func: string, args: unknown[] = []) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      )
    }

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
    }

    const playLoud = () => {
      setActiveVideo('youtube')
      const attempt = () => {
        if (!inViewRef.current) return
        post('unMute')
        post('setVolume', [100])
        post('playVideo')
      }
      clearTimers()
      attempt()
      ;[100, 300, 600, 1200, 2200].forEach((ms) => {
        timersRef.current.push(window.setTimeout(attempt, ms))
      })
    }

    const pause = () => {
      clearTimers()
      post('pauseVideo')
    }

    const onMessage = (event: MessageEvent) => {
      let data: { event?: string } | null = null
      if (typeof event.data === 'string') {
        try {
          data = JSON.parse(event.data)
        } catch {
          return
        }
      } else if (typeof event.data === 'object' && event.data) {
        data = event.data as { event?: string }
      }
      if (data?.event === 'onReady') {
        readyRef.current = true
        if (inViewRef.current) playLoud()
      }
    }
    window.addEventListener('message', onMessage)

    const handshake = window.setInterval(() => {
      iframe.contentWindow?.postMessage(
        '{"event":"listening","id":1,"channel":"widget"}',
        '*'
      )
    }, 400)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.2
        inViewRef.current = visible
        if (visible) playLoud()
        else pause()
      },
      { threshold: [0, 0.2, 0.4, 0.6], rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== 'youtube') pause()
    })

    const stopUnlock = onUserInteracted(() => {
      if (inViewRef.current) playLoud()
    })

    return () => {
      clearTimers()
      window.clearInterval(handshake)
      observer.disconnect()
      stopIfOther()
      stopUnlock()
      window.removeEventListener('message', onMessage)
    }
  }, [])

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
                title="Kottu Cutting Machine Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
