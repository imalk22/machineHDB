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

/**
 * Stop all HTML5 video and YouTube iframes — use on fresh load / reload / bfcache restore.
 */
export function silenceAllPageMedia() {
  if (typeof document === 'undefined') return
  document.querySelectorAll('video').forEach((node) => {
    const video = node as HTMLVideoElement
    video.pause()
    video.muted = true
    video.defaultMuted = true
  })
  document.querySelectorAll('iframe[src*="youtube"]').forEach((node) => {
    const win = (node as HTMLIFrameElement).contentWindow
    if (!win) return
    win.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*')
    win.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*')
  })
}

export function installPageLoadMediaSilence() {
  if (typeof window === 'undefined') return () => {}

  silenceAllPageMedia()
  const onPageShow = (e: PageTransitionEvent) => {
    silenceAllPageMedia()
    if (e.persisted) silenceAllPageMedia()
  }
  window.addEventListener('pageshow', onPageShow)
  return () => window.removeEventListener('pageshow', onPageShow)
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

/**
 * Unlock audio site-wide. Call from any real user gesture.
 * Browsers block unmuted autoplay until this happens at least once.
 * YouTube is NOT unmuted here — only the YouTube section does that when in view.
 */
export function unlockAllSound() {
  markUserInteracted()
  forceHtml5Loud()
  // Do not auto-play videos here — sections resume via in-view hooks after a real tap.
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

  // First scroll / touch counts as engagement so in-view videos can use sound (mobile).
  const engage = () => markUserInteracted()
  const engageOpts: AddEventListenerOptions = { capture: true, passive: true, once: true }
  document.addEventListener('scroll', engage, engageOpts)
  document.addEventListener('touchstart', engage, engageOpts)
  document.addEventListener('wheel', engage, engageOpts)

  const unlock = () => unlockAllSound()
  const opts: AddEventListenerOptions = { capture: true, passive: true }

  // Only real user-activation events (not scroll — browsers ignore scroll for unmute)
  document.addEventListener('pointerdown', unlock, opts)
  document.addEventListener('touchstart', unlock, opts)
  document.addEventListener('touchend', unlock, opts)
  document.addEventListener('click', unlock, opts)
  document.addEventListener('keydown', unlock, opts)

  return () => {
    document.removeEventListener('scroll', engage, engageOpts)
    document.removeEventListener('touchstart', engage, engageOpts)
    document.removeEventListener('wheel', engage, engageOpts)
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
