export type ActiveVideo = 'hero' | 'youtube' | 'feedback'

const ACTIVE_EVENT = 'kottu-active-video'
const INTERACT_EVENT = 'kottu-user-interacted'

let userInteracted = false

export function markUserInteracted() {
  if (userInteracted) return
  userInteracted = true
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(INTERACT_EVENT))
}

export function hasUserInteracted() {
  return userInteracted
}

/** Run handler now if already interacted, otherwise on first unlock. */
export function onUserInteracted(handler: () => void) {
  if (typeof window === 'undefined') return () => {}
  if (userInteracted) {
    handler()
    return () => {}
  }
  const listener = () => handler()
  window.addEventListener(INTERACT_EVENT, listener)
  return () => window.removeEventListener(INTERACT_EVENT, listener)
}

function forceHtml5Loud() {
  document.querySelectorAll('video').forEach((node) => {
    const video = node as HTMLVideoElement
    video.defaultMuted = false
    video.muted = false
    video.volume = 1
    video.removeAttribute('muted')
  })
}

/** Tell every YouTube iframe to unmute + full volume. */
export function forceYoutubeLoud() {
  document.querySelectorAll('iframe').forEach((iframe) => {
    const el = iframe as HTMLIFrameElement
    if (!el.src.includes('youtube.com/embed')) return
    el.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
      '*'
    )
    el.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
      '*'
    )
    el.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*'
    )
  })
}

/**
 * Unlock audio site-wide. Call from any real user gesture.
 * Browsers block unmuted autoplay until this happens at least once.
 */
export function unlockAllSound() {
  markUserInteracted()
  forceHtml5Loud()
  forceYoutubeLoud()

  // Resume any HTML5 video that is currently in (or near) the viewport
  document.querySelectorAll('video').forEach((node) => {
    const video = node as HTMLVideoElement
    const rect = video.getBoundingClientRect()
    const vh = window.innerHeight || 0
    const near = rect.top < vh * 0.95 && rect.bottom > vh * 0.05
    if (near) void video.play().catch(() => {})
  })

  // Wake Web Audio (helps some mobile browsers keep sound allowed)
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (AC) {
      const ctx = new AC()
      void ctx.resume().then(() => {
        const buf = ctx.createBuffer(1, 1, 22050)
        const src = ctx.createBufferSource()
        src.buffer = buf
        src.connect(ctx.destination)
        src.start(0)
      })
    }
  } catch {
    /* ignore */
  }
}

export function installGlobalSoundUnlock() {
  if (typeof window === 'undefined') return () => {}

  const unlock = () => unlockAllSound()
  const opts: AddEventListenerOptions = { capture: true, passive: true }

  // Only real user-activation events (not scroll — browsers ignore scroll for unmute)
  document.addEventListener('pointerdown', unlock, opts)
  document.addEventListener('touchstart', unlock, opts)
  document.addEventListener('touchend', unlock, opts)
  document.addEventListener('click', unlock, opts)
  document.addEventListener('keydown', unlock, opts)

  return () => {
    document.removeEventListener('pointerdown', unlock, opts)
    document.removeEventListener('touchstart', unlock, opts)
    document.removeEventListener('touchend', unlock, opts)
    document.removeEventListener('click', unlock, opts)
    document.removeEventListener('keydown', unlock, opts)
  }
}

/** Claim exclusive playback — other videos should pause. */
export function setActiveVideo(id: ActiveVideo) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(ACTIVE_EVENT, { detail: id }))
}

export function onActiveVideoChange(handler: (id: ActiveVideo) => void) {
  if (typeof window === 'undefined') return () => {}

  const listener = (e: Event) => {
    handler((e as CustomEvent<ActiveVideo>).detail)
  }

  window.addEventListener(ACTIVE_EVENT, listener)
  return () => window.removeEventListener(ACTIVE_EVENT, listener)
}
