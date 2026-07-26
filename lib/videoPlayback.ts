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
 * First pointer/key/click anywhere unlocks sound site-wide.
 * Browsers block unmuted autoplay until a user gesture.
 */
export function installGlobalSoundUnlock() {
  if (typeof window === 'undefined') return () => {}

  const unlock = () => markUserInteracted()
  const opts: AddEventListenerOptions = { capture: true, passive: true }

  document.addEventListener('pointerdown', unlock, opts)
  document.addEventListener('touchstart', unlock, opts)
  document.addEventListener('click', unlock, opts)
  document.addEventListener('keydown', unlock, opts)

  return () => {
    document.removeEventListener('pointerdown', unlock, opts)
    document.removeEventListener('touchstart', unlock, opts)
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
