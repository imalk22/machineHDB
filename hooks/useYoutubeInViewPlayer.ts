'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  setActiveVideo,
  onActiveVideoChange,
  markUserInteracted,
  onUserInteracted,
  type ActiveVideo,
} from '@/lib/videoPlayback'

type Options = {
  youtubeId: string
  activeId: ActiveVideo
  /** Shorts-style chrome-hidden embed (default) vs normal landscape embed */
  variant?: 'short' | 'landscape'
}

/**
 * Thumbnail stays covering the iframe until YouTube reports PLAYING (state 1).
 * That removes the ~2–3s black flash while the player boots.
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
  const [src, setSrc] = useState('')
  const [showPoster, setShowPoster] = useState(true)

  // hqdefault is reliable for Shorts + landscape; maxres often 404s on Shorts
  const posterUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  const embedSrc = useCallback(
    (autoplay: boolean) =>
      variant === 'landscape'
        ? youtubeLandscapeEmbedSrc(youtubeId, autoplay)
        : youtubeShortEmbedSrc(youtubeId, autoplay),
    [youtubeId, variant]
  )

  const post = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    )
  }, [])

  const applyPlay = useCallback(() => {
    if (!wantPlayRef.current) return
    setActiveVideo(activeId)
    post('unMute')
    post('setVolume', [100])
    post('playVideo')
    ;[80, 200, 500, 1000, 1800, 2800].forEach((ms) => {
      window.setTimeout(() => {
        if (!wantPlayRef.current) return
        post('unMute')
        post('setVolume', [100])
        post('playVideo')
      }, ms)
    })
  }, [activeId, post])

  const ensureIframe = useCallback(
    (autoplay: boolean) => {
      setSrc((current) => current || embedSrc(autoplay))
    },
    [embedSrc]
  )

  const revealVideo = useCallback(() => {
    playingRef.current = true
    setShowPoster(false)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const play = () => {
      markUserInteracted()
      wantPlayRef.current = true
      ensureIframe(true)
      if (readyRef.current) applyPlay()
    }

    const pause = () => {
      wantPlayRef.current = false
      playingRef.current = false
      post('mute')
      post('pauseVideo')
      // Keep iframe mounted — unloading forced a multi-second reload on return
      setShowPoster(true)
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

      if (data.event === 'onReady') {
        readyRef.current = true
        post('addEventListener', ['onStateChange'])
        if (wantPlayRef.current) applyPlay()
        // Do NOT hide poster here — player is ready but still black until frames paint
      }

      // 1 = playing — only safe moment to lift the thumbnail
      if (data.event === 'onStateChange' && data.info === 1) {
        revealVideo()
        post('unMute')
        post('setVolume', [100])
      }
    }
    window.addEventListener('message', onMessage)

    // Warm-load player ~2 viewports ahead so it is ready when the user arrives
    const warmObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureIframe(false)
          warmObserver.disconnect()
        }
      },
      { rootMargin: '2200px 0px', threshold: 0 }
    )
    warmObserver.observe(section)

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.05) play()
        else pause()
      },
      { threshold: [0, 0.05, 0.15, 0.3], rootMargin: '160px 0px -2% 0px' }
    )
    playObserver.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== activeId) pause()
    })

    // SoundUnlock / any site tap — unmute only if this section wants to play
    const stopUnlock = onUserInteracted(() => {
      if (!wantPlayRef.current) return
      post('unMute')
      post('setVolume', [100])
      post('playVideo')
    })

    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh + 2200) ensureIframe(false)

    return () => {
      warmObserver.disconnect()
      playObserver.disconnect()
      stopIfOther()
      stopUnlock()
      window.removeEventListener('message', onMessage)
    }
  }, [youtubeId, activeId, variant, ensureIframe, applyPlay, post, revealVideo])

  useEffect(() => {
    if (!src) return

    readyRef.current = false
    const handshake = window.setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"listening","id":1,"channel":"widget"}',
        '*'
      )
    }, 300)

    // Safety: if postMessage API never fires, still lift poster after a long wait
    const safety = window.setTimeout(() => {
      readyRef.current = true
      if (wantPlayRef.current) {
        applyPlay()
        revealVideo()
      }
    }, 6000)

    return () => {
      window.clearInterval(handshake)
      window.clearTimeout(safety)
    }
    // Only re-run when the embed URL mounts — not when play helpers change identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  // After first paint, warm-load as soon as the browser is idle (even before scroll)
  useEffect(() => {
    const warm = () => ensureIframe(false)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idleId: number | undefined
    let timeoutId: number | undefined

    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(warm, { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(warm, 1200)
    }

    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [ensureIframe])

  const onIframeLoad = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"listening","id":1,"channel":"widget"}',
      '*'
    )
    if (wantPlayRef.current) applyPlay()
    // Keep poster up — load ≠ first video frame
  }, [applyPlay])

  const togglePause = () => {
    markUserInteracted()

    if (!src) {
      wantPlayRef.current = true
      setActiveVideo(activeId)
      setSrc(embedSrc(true))
      return
    }

    if (playingRef.current && !showPoster) {
      wantPlayRef.current = false
      playingRef.current = false
      post('pauseVideo')
      setShowPoster(true)
    } else {
      wantPlayRef.current = true
      setActiveVideo(activeId)
      applyPlay()
    }
  }

  return {
    sectionRef,
    iframeRef,
    togglePause,
    onIframeLoad,
    src,
    posterUrl,
    showPoster,
  }
}

function withOrigin(base: string) {
  if (typeof window === 'undefined') return base
  return `${base}&origin=${encodeURIComponent(window.location.origin)}`
}

export function youtubeShortEmbedSrc(youtubeId: string, autoplay = false) {
  const auto = autoplay ? '&autoplay=1' : ''
  return withOrigin(
    `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${youtubeId}&iv_load_policy=3&fs=0&disablekb=1${auto}`
  )
}

export function youtubeLandscapeEmbedSrc(youtubeId: string, autoplay = false) {
  const auto = autoplay ? '&autoplay=1' : ''
  return withOrigin(
    `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1` +
      `&rel=0&modestbranding=1&controls=0&fs=0&iv_load_policy=3&disablekb=1` +
      `&loop=1&playlist=${youtubeId}${auto}`
  )
}
