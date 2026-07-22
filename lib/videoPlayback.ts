export type ActiveVideo = 'hero' | 'youtube' | 'feedback'

const ACTIVE_EVENT = 'kottu-active-video'

let userInteracted = false

export function markUserInteracted() {
  userInteracted = true
}

export function hasUserInteracted() {
  return userInteracted
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
