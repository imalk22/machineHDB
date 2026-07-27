'use client'

import { useEffect } from 'react'
import { installGlobalSoundUnlock, installPageLoadMediaSilence } from '@/lib/videoPlayback'

/** Silent: unlocks full sound on any page tap/scroll gesture — no UI button. */
export default function SoundUnlock() {
  useEffect(() => {
    const stopSilence = installPageLoadMediaSilence()
    const stopUnlock = installGlobalSoundUnlock()
    return () => {
      stopSilence()
      stopUnlock()
    }
  }, [])
  return null
}
