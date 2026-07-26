'use client'

import { useEffect, useRef } from 'react'
import {
  setActiveVideo,
  onActiveVideoChange,
  onUserInteracted,
  type ActiveVideo,
} from '@/lib/videoPlayback'

/** Play an HTML5 video unmuted, with retries — used when the section enters view. */
export function playVideoLoud(video: HTMLVideoElement) {
  video.defaultMuted = false
  video.muted = false
  video.volume = 1
  video.removeAttribute('muted')
  return video.play()
}

/**
 * When this section scrolls into view, play the video with sound.
 * Pauses when leaving view or when another video claims focus.
 */
export function useInViewLoudVideo(activeId: ActiveVideo) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    video.defaultMuted = false
    video.muted = false
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
        void playVideoLoud(video).catch(() => {})
      }
      attempt()
      // Keep trying briefly — phones often need a moment after scroll settles
      ;[80, 250, 500, 1000, 2000].forEach((ms) => {
        timersRef.current.push(window.setTimeout(attempt, ms))
      })
    }

    const pause = () => {
      clearTimers()
      video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Start as soon as a useful portion is visible
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.2
        inViewRef.current = visible
        if (visible) play()
        else pause()
      },
      { threshold: [0, 0.2, 0.4, 0.6], rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(section)

    const stopIfOther = onActiveVideoChange((id) => {
      if (id !== activeId) pause()
    })

    // After first page touch (scroll starts with a touch), replay if already in view
    const stopUnlock = onUserInteracted(() => {
      if (inViewRef.current) play()
    })

    // If native controls remute, force sound back while this section is active
    const onVolume = () => {
      if (!inViewRef.current) return
      if (video.muted || video.volume < 0.5) {
        video.muted = false
        video.volume = 1
      }
    }
    video.addEventListener('volumechange', onVolume)
    video.addEventListener('play', onVolume)

    return () => {
      clearTimers()
      observer.disconnect()
      stopIfOther()
      stopUnlock()
      video.removeEventListener('volumechange', onVolume)
      video.removeEventListener('play', onVolume)
    }
  }, [activeId])

  return { sectionRef, videoRef }
}
