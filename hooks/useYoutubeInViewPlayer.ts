'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
 * Lite-YouTube pattern: thumbnail first, iframe only near viewport,
 * then muted autoplay when visible. Avoids black boxes + heavy first load.
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
    playingRef.current = true
    if (hasUserInteracted()) {
      post('unMute')
      post('setVolume', [100])
    } else {
      post('mute')
    }
    post('playVideo')
    ;[200, 600, 1200].forEach((ms) => {
      window.setTimeout(() => {
        if (wantPlayRef.current) post('playVideo')
      }, ms)
    })
  }, [activeId, post])

  const ensureIframe = useCallback(
    (autoplay: boolean) => {
      setSrc((current) => {
        if (current) return current
        return embedSrc(autoplay)
      })
    },
    [embedSrc]
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const play = () => {
      wantPlayRef.current = true
      ensureIframe(true)
      if (readyRef.current) applyPlay()
    }

    const pause = () => {
      wantPlayRef.current = false
      playingRef.current = false
      post('pauseVideo')
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
        if (wantPlayRef.current) {
          applyPlay()
          window.setTimeout(() => setShowPoster(false), 300)
        }
      }

      if (data.event === 'onStateChange' && data.info === 1) {
        playingRef.current = true
        setShowPoster(false)
      }
    }
    window.addEventListener('message', onMessage)

    const warmObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureIframe(false)
          warmObserver.disconnect()
        }
      },
      { rootMargin: '350px 0px', threshold: 0 }
    )
    warmObserver.observe(section)

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) play()
        else pause()
      },
      { threshold: [0, 0.1, 0.12, 0.25, 0.4], rootMargin: '0px 0px -5% 0px' }
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
    if (rect.top < vh + 350) ensureIframe(false)
    if (rect.top < vh * 0.9 && rect.bottom > vh * 0.1) play()

    return () => {
      warmObserver.disconnect()
      playObserver.disconnect()
      stopIfOther()
      window.removeEventListener('message', onMessage)
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [youtubeId, activeId, variant, ensureIframe, applyPlay, post])

  // After iframe mounts, handshake so enablejsapi postMessage works
  useEffect(() => {
    if (!src) return

    readyRef.current = false
    const handshake = window.setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"listening","id":1,"channel":"widget"}',
        '*'
      )
    }, 350)

    const readyFallback = window.setTimeout(() => {
      readyRef.current = true
      if (wantPlayRef.current) {
        applyPlay()
        setShowPoster(false)
      }
    }, 1800)

    return () => {
      window.clearInterval(handshake)
      window.clearTimeout(readyFallback)
    }
  }, [src, applyPlay])

  const onIframeLoad = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"listening","id":1,"channel":"widget"}',
      '*'
    )
    if (wantPlayRef.current) {
      window.setTimeout(() => {
        applyPlay()
        setShowPoster(false)
      }, 400)
    }
  }, [applyPlay])

  const togglePause = () => {
    markUserInteracted()

    if (!src) {
      wantPlayRef.current = true
      playingRef.current = true
      setActiveVideo(activeId)
      setSrc(embedSrc(true))
      setShowPoster(false)
      return
    }

    if (playingRef.current) {
      wantPlayRef.current = false
      playingRef.current = false
      post('pauseVideo')
    } else {
      wantPlayRef.current = true
      setActiveVideo(activeId)
      playingRef.current = true
      setShowPoster(false)
      post('unMute')
      post('setVolume', [100])
      post('playVideo')
      window.setTimeout(() => post('playVideo'), 200)
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

export function youtubeShortEmbedSrc(youtubeId: string, autoplay = false) {
  const auto = autoplay ? '&autoplay=1' : ''
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${youtubeId}&iv_load_policy=3&fs=0&disablekb=1${auto}`
}

export function youtubeLandscapeEmbedSrc(youtubeId: string, autoplay = false) {
  const auto = autoplay ? '&autoplay=1' : ''
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1${auto}`
}
