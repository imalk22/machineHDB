'use client'

import { useEffect, useRef } from 'react'
import {
  setActiveVideo,
  onActiveVideoChange,
  onUserInteracted,
  hasUserInteracted,
  markUserInteracted,
  type ActiveVideo,
} from '@/lib/videoPlayback'

function loud(video: HTMLVideoElement) {
  video.defaultMuted = false
  video.muted = false
  video.volume = 1
  video.removeAttribute('muted')
}

/**
 * Always try autoplay WITH sound first.
 * If the browser blocks it, play muted then flip to loud after the first tap.
 */
export async function playVideoLoud(video: HTMLVideoElement) {
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  video.volume = 1

  // 1) Prefer unmuted autoplay (works when browser allows it)
  loud(video)
  try {
    await video.play()
    if (!video.muted) {
      markUserInteracted()
      return
    }
  } catch {
    /* NotAllowedError — fall through */
  }

  // 2) After a real tap, force loud again
  if (hasUserInteracted()) {
    loud(video)
    try {
      await video.play()
      return
    } catch {
      /* fall through to muted */
    }
  }

  // 3) Muted autoplay so motion always starts; sound unlocks on next tap
  video.muted = true
  try {
    await video.play()
  } catch {
    /* ignore */
  }

  if (hasUserInteracted()) {
    loud(video)
    await video.play().catch(() => {})
  }
}

export function useInViewLoudVideo(activeId: ActiveVideo) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    video.playsInline = true
    video.volume = 1

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
    }

    const play = () => {
      setActiveVideo(activeId)
      clearTimers()
      const attempt = () => {
        if (!inViewRef.current) return
        void playVideoLoud(video)
      }
      attempt()
      ;[50, 150, 400, 900, 1800, 3000].forEach((ms) => {
        timersRef.current.push(window.setTimeout(attempt, ms))
      })
    }

    const pause = () => {
      clearTimers()
      video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.12
        inViewRef.current = visible
        if (visible) play()
        else pause()
      },
      { threshold: [0, 0.12, 0.3, 0.5], rootMargin: '120px 0px -5% 0px' }
    )
    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== activeId) pause()
    })

    const stopUnlock = onUserInteracted(() => {
      loud(video)
      if (inViewRef.current) play()
    })

    const keepLoud = window.setInterval(() => {
      if (!inViewRef.current) return
      if (hasUserInteracted()) {
        if (video.muted || video.volume < 1) loud(video)
      }
      if (video.paused) void playVideoLoud(video)
    }, 400)

    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.95 && rect.bottom > vh * 0.05) {
      inViewRef.current = true
      play()
    }

    return () => {
      clearTimers()
      window.clearInterval(keepLoud)
      observer.disconnect()
      stopIfOther()
      stopUnlock()
    }
  }, [activeId])

  return { sectionRef, videoRef }
}
