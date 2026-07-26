'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
  setActiveVideo,
  onActiveVideoChange,
  markUserInteracted,
} from '@/lib/videoPlayback'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  autoPlay?: boolean
}

// The video overlay shows the Call CTA for OVERLAY_VISIBLE_SECONDS,
// then hides for OVERLAY_GAP_SECONDS, and repeats. Driven off video
// playback time so it also re-triggers correctly each time the looping
// video comes back around.
const OVERLAY_VISIBLE_SECONDS = 7
const OVERLAY_GAP_SECONDS = 10
const OVERLAY_CYCLE_SECONDS = OVERLAY_VISIBLE_SECONDS + OVERLAY_GAP_SECONDS

const ctaContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const ctaItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// Bouncy scale pop for the Sinhala line - distinct from the button's slide-up.
const sinhalaPopVariants = {
  hidden: {
    scale: 0.4,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 16, mass: 0.9 },
  },
}

export default function VideoModal({ isOpen, onClose, autoPlay = false }: VideoModalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCTA, setShowCTA] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  // Mark ready from readyState / events. After React remounts (Strict Mode /
  // HMR), canplay may not fire again if the file is already buffered.
  useEffect(() => {
    const video = videoRef.current
    if (!isOpen || !video) return

    const markReady = () => {
      setIsVideoReady(true)
      setVideoError(false)
    }
    const markError = () => {
      setVideoError(true)
      setIsVideoReady(true)
    }

    if (video.readyState >= 2) markReady()

    video.addEventListener('loadeddata', markReady)
    video.addEventListener('canplay', markReady)
    video.addEventListener('playing', markReady)
    video.addEventListener('error', markError)

    return () => {
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('playing', markReady)
      video.removeEventListener('error', markError)
    }
  }, [isOpen])

  useEffect(() => {
    const video = videoRef.current
    if (!isOpen || !video || !autoPlay) return

    // Autoplay requires starting muted. Unmuting immediately (even after
    // play() resolves) makes Chrome pause the video outright instead of
    // playing it unmuted, since there's been no user gesture yet - so stay
    // muted here and let the listener below unmute on the visitor's first tap.
    video.muted = true
    setActiveVideo('hero')
    const tryPlay = () => {
      video.play().catch(() => {})
    }
    tryPlay()
    // Retry shortly in case the first play raced ahead of buffering
    const t = window.setTimeout(tryPlay, 400)
    return () => window.clearTimeout(t)
  }, [isOpen, autoPlay])

  // Unmute (and resume play, in case the browser paused it) on the
  // visitor's first tap/click anywhere on the page.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const ensureSound = () => {
      markUserInteracted()
      video.muted = false
      if (video.paused) video.play().catch(() => {})
    }
    document.addEventListener('click', ensureSound, { once: true })
    document.addEventListener('touchstart', ensureSound, { once: true })
    return () => {
      document.removeEventListener('click', ensureSound)
      document.removeEventListener('touchstart', ensureSound)
    }
  }, [])

  // Pause when scrolled away; resume when hero is back in view.
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!isOpen || !section || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setActiveVideo('hero')
          video.play().catch(() => {})
          setIsPlaying(true)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: [0, 0.4, 0.7] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isOpen])

  // Pause if another section claims playback.
  useEffect(() => {
    return onActiveVideoChange((id) => {
      const video = videoRef.current
      if (!video || id === 'hero') return
      video.pause()
      setIsPlaying(false)
    })
  }, [])

  // Show the Call CTA on the video overlay, and keep the scrub bar in sync.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTimeUpdate = () => {
      const t = video.currentTime
      const pos = t % OVERLAY_CYCLE_SECONDS
      setShowCTA(pos < OVERLAY_VISIBLE_SECONDS)
      setCurrentTime(t)
    }
    const handleLoadedMetadata = () => setDuration(video.duration || 0)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    if (video.duration) setDuration(video.duration)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (videoRef.current) videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    markUserInteracted()
    if (video.paused) {
      setActiveVideo('hero')
      video.muted = false
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!isOpen) return null

  return (
    <section ref={sectionRef} className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative z-10 mx-auto max-w-lg">
        {/* Video Container - same size as feedback video */}
        <motion.div
          className="relative mx-auto w-full max-w-[400px] aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg sm:max-w-[460px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/videos/vid.mp4"
            autoPlay={autoPlay}
            loop
            preload="auto"
            poster="/images/video-poster.jpg"
            playsInline
            muted
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setVideoError(true)
              setIsVideoReady(true)
            }}
            onClick={togglePlay}
          />

          {/* Loading animation - covers the video until it's ready to play */}
          <AnimatePresence>
            {!isVideoReady && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/60"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-orange"
                    animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-orange"
                    animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  />
                  <motion.div
                    className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-xl shadow-lg shadow-orange/40"
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🔪
                  </motion.div>
                </div>
                <motion.p
                  className="text-white text-xs font-semibold tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  වීඩියෝව පූරණය වෙමින්...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {videoError && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/80 px-6 text-center">
              <p className="text-sm font-semibold text-white">වීඩියෝව පූරණය කළ නොහැකි විය</p>
              <button
                type="button"
                className="rounded-xl bg-orange px-4 py-2 text-sm font-bold text-white"
                onClick={() => {
                  setVideoError(false)
                  setIsVideoReady(false)
                  const video = videoRef.current
                  if (!video) return
                  video.load()
                  video.play().catch(() => {})
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Scrub bar - drag to jump back and rewatch any part */}
          {duration > 0 && (
            <motion.div
              className="absolute top-0 inset-x-0 z-20 flex items-center gap-2 px-3 pt-3 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
              >
                {isPlaying ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="video-scrubber w-full"
                style={{
                  background: `linear-gradient(to right, #ff6b00 ${progressPct}%, rgba(255,255,255,0.3) ${progressPct}%)`,
                }}
                aria-label="Video progress"
              />
            </motion.div>
          )}

          {/* CTA Overlay - Sinhala line */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 pointer-events-none"
            initial="hidden"
            animate={showCTA ? 'visible' : 'hidden'}
            variants={ctaContainerVariants}
          >
            <motion.div className="mb-6 flex justify-center" variants={sinhalaPopVariants}>
              <p className="rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-center text-sm font-bold text-white shadow-lg backdrop-blur-sm sm:text-base">
                මිලදිගැනීම හා විස්තර දැනගැනීම සදහා දැන්ම අමතන්න
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
