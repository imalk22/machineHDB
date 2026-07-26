'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/Reveal'
import {
  setActiveVideo,
  onActiveVideoChange,
  onUserInteracted,
  hasUserInteracted,
  markUserInteracted,
} from '@/lib/videoPlayback'

const YOUTUBE_ID = 'MgbIAa46c9o'

/** Same clean params as last days — hide chrome, no crop, full frame. */
function embedSrc(origin: string) {
  return (
    `https://www.youtube.com/embed/${YOUTUBE_ID}` +
    `?enablejsapi=1&autoplay=1&mute=1&playsinline=1` +
    `&rel=0&modestbranding=1&controls=0&fs=0` +
    `&iv_load_policy=3&disablekb=1&loop=1&playlist=${YOUTUBE_ID}` +
    `&origin=${origin}`
  )
}

export default function YoutubeDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inViewRef = useRef(false)
  const wantPlayRef = useRef(true)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const iframe = iframeRef.current
    if (!section || !iframe) return

    const origin =
      typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''

    iframe.src = embedSrc(origin)

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

    const applySound = () => {
      post('unMute')
      post('setVolume', [100])
    }

    const playLoud = () => {
      wantPlayRef.current = true
      setActiveVideo('youtube')
      const attempt = () => {
        if (!inViewRef.current || !wantPlayRef.current) return
        post('playVideo')
        if (hasUserInteracted()) applySound()
      }
      clearTimers()
      attempt()
      ;[50, 150, 350, 700, 1400, 2500].forEach((ms) => {
        timersRef.current.push(window.setTimeout(attempt, ms))
      })
    }

    const pause = () => {
      wantPlayRef.current = false
      clearTimers()
      post('pauseVideo')
      timersRef.current.push(window.setTimeout(() => post('pauseVideo'), 100))
      timersRef.current.push(window.setTimeout(() => post('pauseVideo'), 300))
    }

    const onMessage = (event: MessageEvent) => {
      let data: { event?: string; info?: number } | null = null
      if (typeof event.data === 'string') {
        try {
          data = JSON.parse(event.data)
        } catch {
          return
        }
      } else if (typeof event.data === 'object' && event.data) {
        data = event.data as { event?: string; info?: number }
      }
      if (!data) return

      if (data.event === 'onReady' && inViewRef.current && wantPlayRef.current) {
        playLoud()
      }
      if (data.event === 'onStateChange' && data.info === 1 && hasUserInteracted()) {
        applySound()
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
      { threshold: [0, 0.2, 0.4, 0.6], rootMargin: '80px 0px -8% 0px' }
    )
    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== 'youtube') pause()
    })

    const stopUnlock = onUserInteracted(() => {
      if (inViewRef.current && wantPlayRef.current) {
        applySound()
        playLoud()
      }
    })

    const keepAlive = window.setInterval(() => {
      if (!inViewRef.current || !wantPlayRef.current) return
      post('playVideo')
      if (hasUserInteracted()) applySound()
    }, 900)

    return () => {
      clearTimers()
      window.clearInterval(handshake)
      window.clearInterval(keepAlive)
      observer.disconnect()
      stopIfOther()
      stopUnlock()
      window.removeEventListener('message', onMessage)
    }
  }, [])

  const togglePlayPause = () => {
    markUserInteracted()
    const iframe = iframeRef.current
    if (!iframe) return

    if (wantPlayRef.current) {
      wantPlayRef.current = false
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      )
    } else {
      wantPlayRef.current = true
      setActiveVideo('youtube')
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      )
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
        '*'
      )
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
        '*'
      )
    }
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
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
            {/* Full frame — no crop. controls=0 hides publisher / chrome. */}
            <div className="relative aspect-video w-full">
              <iframe
                ref={iframeRef}
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                title="Kottu Cutting Machine Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                aria-label="Play or pause video"
                onClick={togglePlayPause}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
