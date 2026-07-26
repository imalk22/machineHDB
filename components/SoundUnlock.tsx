'use client'

import { useEffect } from 'react'
import { installGlobalSoundUnlock } from '@/lib/videoPlayback'

/** Silent: unlocks full sound on any page tap/scroll gesture — no UI button. */
export default function SoundUnlock() {
  useEffect(() => installGlobalSoundUnlock(), [])
  return null
}
