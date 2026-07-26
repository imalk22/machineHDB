'use client'

import { useEffect, useRef, useState } from 'react'
import {
  setActiveVideo,
  onActiveVideoChange,
  hasUserInteracted,
  markUserInteracted,
  type ActiveVideo,
} from '@/lib/videoPlayback'

type Options = {
  youtubeId: string
  activeId: ActiveVideo
  /** Shorts-style chrome-hidden embed (default) vs normal landscape embed */
  variant?: 'short' | 'landscape'
}

/**
 * Fast warm-load + scroll autoplay/pause for YouTube embeds.
 * Prefetches the iframe before it enters view, then plays as soon as visible.
 */
export function useYoutubeInViewPlayer({
  youtubeId,
  activeId,
  variant = 'short',
}: Options) {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playingRef = useRef(false)
  const wantPlayRef = useRef(false)
  const readyRef = useRef(false)
  const [src, setSrc] = useState(() =>
    variant === 'landscape'
      ? youtubeLandscapeEmbedSrc(youtubeId)
      : youtubeShortEmbedSrc(youtubeId)
  )

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

    const applyPlay = () => {
      if (!wantPlayRef.current) return
      setActiveVideo(activeId)
      playingRef.current = true
      if (hasUserInteracted()) {
        post('unMute')
        post('setVolume', [100])
      } else {
        post('mute')
      }
      post('playVideo')
      ;[150, 400, 900, 1600].forEach((ms) => {
        window.setTimeout(() => {
          if (wantPlayRef.current) post('playVideo')
        }, ms)
      })
    }

    const applyPause = () => {
      wantPlayRef.current = false
      playingRef.current = false
      post('pauseVideo')
      ;[100, 300, 600].forEach((ms) => {
        window.setTimeout(() => post('pauseVideo'), ms)
      })
    }

    const play = () => {
      wantPlayRef.current = true
      // Ensure src is set (warm load)
      setSrc((current) => current || (variant === 'landscape'
        ? youtubeLandscapeEmbedSrc(youtubeId)
        : youtubeShortEmbedSrc(youtubeId)))
      if (readyRef.current) applyPlay()
    }

    const pause = () => applyPause()

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
        post('addEventListener', ['onStateChange'])
        if (wantPlayRef.current) applyPlay()
      }
    }
    window.addEventListener('message', onMessage)

    const handshake = window.setInterval(() => {
      iframe.contentWindow?.postMessage('{"event":"listening","id":1,"channel":"widget"}', '*')
    }, 300)
    const stopHandshake = window.setTimeout(() => window.clearInterval(handshake), 15000)

    const readyFallback = window.setTimeout(() => {
      readyRef.current = true
      if (wantPlayRef.current) applyPlay()
    }, 800)

    // Warm-load: start fetching player before it enters the viewport
    const warmObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(
            variant === 'landscape'
              ? youtubeLandscapeEmbedSrc(youtubeId)
              : youtubeShortEmbedSrc(youtubeId)
          )
          warmObserver.disconnect()
        }
      },
      { rootMargin: '600px 0px', threshold: 0 }
    )
    warmObserver.observe(section)

    // Play as soon as any meaningful part is on screen
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) play()
        else pause()
      },
      { threshold: [0, 0.1, 0.15, 0.25, 0.4], rootMargin: '0px 0px -5% 0px' }
    )
    playObserver.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== activeId) pause()
    })

    const unlock = () => {
      markUserInteracted()
      if (wantPlayRef.current) {
        post('unMute')
        post('setVolume', [100])
        post('playVideo')
      }
    }
    document.addEventListener('click', unlock, { once: true })
    document.addEventListener('touchstart', unlock, { once: true })

    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.9 && rect.bottom > vh * 0.1) play()

    return () => {
      warmObserver.disconnect()
      playObserver.disconnect()
      stopIfOther()
      window.clearInterval(handshake)
      window.clearTimeout(stopHandshake)
      window.clearTimeout(readyFallback)
      window.removeEventListener('message', onMessage)
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [youtubeId, activeId, variant])

  const togglePause = () => {
    markUserInteracted()
    const iframe = iframeRef.current
    if (!iframe) return

    const post = (func: string, args: unknown[] = []) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      )
    }

    if (playingRef.current) {
      wantPlayRef.current = false
      playingRef.current = false
      post('pauseVideo')
      window.setTimeout(() => post('pauseVideo'), 120)
    } else {
      wantPlayRef.current = true
      setActiveVideo(activeId)
      playingRef.current = true
      post('unMute')
      post('setVolume', [100])
      post('playVideo')
      window.setTimeout(() => post('playVideo'), 200)
    }
  }

  return { sectionRef, iframeRef, togglePause, src }
}

export function youtubeShortEmbedSrc(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${youtubeId}&iv_load_policy=3&fs=0&disablekb=1`
}

export function youtubeLandscapeEmbedSrc(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1`
}
