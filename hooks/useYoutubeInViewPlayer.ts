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
  variant?: 'short' | 'landscape'
  /** If false, never show YouTube thumbnail overlay — iframe only (autoplay in view). */
  coverWithPoster?: boolean
}

export function useYoutubeInViewPlayer({
  youtubeId,
  activeId,
  variant = 'short',
  coverWithPoster = false,
}: Options) {
  const sectionRef = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inViewRef = useRef(false)
  const wantPlayRef = useRef(false)
  const readyRef = useRef(false)
  const [src, setSrc] = useState('')
  const [showPoster, setShowPoster] = useState(coverWithPoster)

  const posterUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  const embedSrc = useCallback(
    () =>
      variant === 'landscape'
        ? youtubeLandscapeEmbedSrc(youtubeId, true)
        : youtubeShortEmbedSrc(youtubeId, true),
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
    ;[0, 80, 200, 450, 900, 1600, 2800].forEach((ms) => {
      window.setTimeout(() => {
        if (!wantPlayRef.current) return
        post('unMute')
        post('setVolume', [100])
        post('playVideo')
      }, ms)
    })
  }, [activeId, post])

  const applyPause = useCallback(() => {
    post('mute')
    post('pauseVideo')
  }, [post])

  const ensureIframe = useCallback(() => {
    setSrc((current) => current || embedSrc())
  }, [embedSrc])

  const revealVideo = useCallback(() => {
    if (coverWithPoster) setShowPoster(false)
  }, [coverWithPoster])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const play = () => {
      markUserInteracted()
      inViewRef.current = true
      wantPlayRef.current = true
      ensureIframe()
      if (readyRef.current) applyPlay()
      else if (!coverWithPoster) setShowPoster(false)
    }

    const pause = () => {
      inViewRef.current = false
      wantPlayRef.current = false
      applyPause()
      if (coverWithPoster) setShowPoster(true)
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
        else applyPause()
      }

      if (data.event === 'onStateChange' && data.info === 1) {
        revealVideo()
        post('unMute')
        post('setVolume', [100])
      }
    }
    window.addEventListener('message', onMessage)

    const warmObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureIframe()
          warmObserver.disconnect()
        }
      },
      { rootMargin: '2800px 0px', threshold: 0 }
    )
    warmObserver.observe(section)

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.02
        if (visible) play()
        else pause()
      },
      { threshold: [0, 0.02, 0.08, 0.2, 0.4], rootMargin: '200px 0px -2% 0px' }
    )
    playObserver.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== activeId) pause()
    })

    const stopUnlock = onUserInteracted(() => {
      if (!wantPlayRef.current) return
      applyPlay()
    })

    const keepPlaying = window.setInterval(() => {
      if (!inViewRef.current || !wantPlayRef.current) return
      applyPlay()
    }, 500)

    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.92 && rect.bottom > vh * 0.05) play()

    return () => {
      warmObserver.disconnect()
      playObserver.disconnect()
      stopIfOther()
      stopUnlock()
      window.clearInterval(keepPlaying)
      window.removeEventListener('message', onMessage)
    }
  }, [
    youtubeId,
    activeId,
    variant,
    coverWithPoster,
    ensureIframe,
    applyPlay,
    applyPause,
    post,
    revealVideo,
  ])

  useEffect(() => {
    if (!src) return

    readyRef.current = false
    const handshake = window.setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"listening","id":1,"channel":"widget"}',
        '*'
      )
    }, 250)

    return () => window.clearInterval(handshake)
  }, [src])

  const onIframeLoad = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"listening","id":1,"channel":"widget"}',
      '*'
    )
    if (wantPlayRef.current) applyPlay()
    else applyPause()
    if (!coverWithPoster) setShowPoster(false)
  }, [applyPlay, applyPause, coverWithPoster])

  return {
    sectionRef,
    iframeRef,
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

export function youtubeShortEmbedSrc(youtubeId: string, autoplay = true) {
  const auto = autoplay ? '&autoplay=1' : ''
  return withOrigin(
    `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${youtubeId}&iv_load_policy=3&fs=0&disablekb=1${auto}`
  )
}

export function youtubeLandscapeEmbedSrc(youtubeId: string, autoplay = true) {
  const auto = autoplay ? '&autoplay=1' : ''
  return withOrigin(
    `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&mute=1&playsinline=1` +
      `&rel=0&modestbranding=1&controls=0&fs=0&iv_load_policy=3&disablekb=1` +
      `&loop=1&playlist=${youtubeId}${auto}`
  )
}
