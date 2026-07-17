'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  autoPlay?: boolean
}

// The video overlay alternates between two things, each shown for
// OVERLAY_VISIBLE_SECONDS with a OVERLAY_GAP_SECONDS break in between:
// WhatsApp CTA -> gap -> scroll-down cue -> gap -> repeat. Driven off video
// playback time so it also re-triggers correctly each time the looping
// video comes back around.
const OVERLAY_VISIBLE_SECONDS = 7
const OVERLAY_GAP_SECONDS = 10
const OVERLAY_CYCLE_SECONDS = OVERLAY_VISIBLE_SECONDS * 2 + OVERLAY_GAP_SECONDS * 2

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCTA, setShowCTA] = useState(false)
  const [showScrollCue, setShowScrollCue] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!isOpen || !video || !autoPlay) return

    // Autoplay requires starting muted; unmute right after playback begins so
    // sound is on by default (allowed once play() has succeeded under the
    // muted-autoplay exemption).
    video.muted = true
    video.play()
      .then(() => {
        video.muted = false
      })
      .catch(() => {})
  }, [isOpen, autoPlay])

  // Safety net: some browsers re-block the unmute above without a user
  // gesture. Guarantee sound turns on by the visitor's first tap/click.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const ensureSound = () => {
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

  // Alternate the WhatsApp CTA and the scroll-down cue on the video overlay,
  // and keep the scrub bar's position in sync.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTimeUpdate = () => {
      const t = video.currentTime
      const pos = t % OVERLAY_CYCLE_SECONDS
      const scrollCueStart = OVERLAY_VISIBLE_SECONDS + OVERLAY_GAP_SECONDS
      setShowCTA(pos < OVERLAY_VISIBLE_SECONDS)
      setShowScrollCue(pos >= scrollCueStart && pos < scrollCueStart + OVERLAY_VISIBLE_SECONDS)
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

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!isOpen) return null

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-navy to-primary">
      <div className="max-w-2xl mx-auto">
        {/* Video Container - Portrait Mode */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            loop
            preload="auto"
            playsInline
            muted
            onCanPlay={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading animation - covers the video until it's ready to play */}
          <AnimatePresence>
            {!isVideoReady && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-navy to-primary"
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
                  className="text-white/70 text-xs font-semibold tracking-wide"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  වීඩියෝව පූරණය වෙමින්...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrub bar - drag to jump back and rewatch any part */}
          {duration > 0 && (
            <motion.div
              className="absolute top-0 inset-x-0 z-20 px-3 pt-3 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
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

          {/* CTA Overlay - Sinhala line + WhatsApp button, pops up every 30s of playback */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 pointer-events-none"
            initial="hidden"
            animate={showCTA ? 'visible' : 'hidden'}
            variants={ctaContainerVariants}
          >
            {/* Sinhala CTA line */}
            <motion.div className="flex justify-center mb-6" variants={sinhalaPopVariants}>
              <p className="text-center text-white text-sm sm:text-base font-bold bg-black/25 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2.5 shadow-lg">
                මිලදිගැනීම හා විස්තර දැනගැනීම සදහා දැන්ම අමතන්න
              </p>
            </motion.div>

            {/* CTA Button - small icon-only WhatsApp button, fills solid green on tap */}
            <motion.div className="pointer-events-auto flex justify-center" variants={ctaItemVariants}>
              <motion.a
                href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-whatsapp bg-whatsapp/25 backdrop-blur-sm shadow-lg font-bold text-sm"
                initial={{ backgroundColor: 'rgba(34,197,94,0.25)', color: '#22c55e' }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(34,197,94,0.4)' }}
                whileTap={{ scale: 0.9, backgroundColor: 'rgba(34,197,94,1)', color: '#ffffff' }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(34,197,94,0.5)',
                    '0 0 16px rgba(34,197,94,0.55)',
                    '0 0 0px rgba(34,197,94,0.5)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.875L0 24l6.335-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.012-1.379l-.361-.214-3.746.897.941-3.636-.235-.375A9.807 9.807 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll-down cue - alternates with the CTA above, nudges visitors toward the specs/details sections */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-5 pointer-events-none"
            initial="hidden"
            animate={showScrollCue ? 'visible' : 'hidden'}
            variants={ctaContainerVariants}
          >
            <motion.a
              href="#specs"
              className="pointer-events-auto flex flex-col items-center gap-1.5"
              variants={sinhalaPopVariants}
            >
              <span className="text-center text-white text-sm sm:text-base font-bold bg-black/25 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2.5 shadow-lg">
                තවත් විසතර සදහා පහලට යන්න
              </span>
              <motion.span
                className="text-2xl leading-none text-white"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↓
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Below Video: CTA buttons + price card */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-400 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.875L0 24l6.335-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.012-1.379l-.361-.214-3.746.897.941-3.636-.235-.375A9.807 9.807 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              WhatsApp Price &amp; Demo
            </a>
            <a
              href="tel:+94760360560"
              className="flex-1 flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg"
            >
              📞 Call Now
            </a>
          </div>

          {/* Price card */}
          <div className="relative">
            <div className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 bg-orange text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg shadow-orange/50">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
              20% OFF
            </div>

            <div className="bg-navy/80 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-orange via-whatsapp to-electric" />
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-blue-300 text-xs font-medium">Pre-Order Price</p>
                  <p className="text-white/50 text-sm font-bold line-through">රු. 124,375</p>
                </div>
                <p className="text-white font-extrabold text-3xl tracking-tight leading-none mb-3">රු. 99,500</p>
                <div className="flex items-center gap-2.5 bg-whatsapp/15 border border-whatsapp/40 rounded-xl px-4 py-2.5">
                  <svg className="w-5 h-5 text-whatsapp flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-whatsapp font-extrabold text-lg leading-none tracking-tight">රු. 24,875 Saved!</p>
                    <p className="text-whatsapp/70 text-xs font-semibold mt-0.5">You save this amount on pre-order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
