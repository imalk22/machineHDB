'use client'

import { useEffect } from 'react'
import { installGlobalSoundUnlock } from '@/lib/videoPlayback'

/** Installs one page-wide gesture listener so videos can unmute after any tap. */
export default function SoundUnlock() {
  useEffect(() => installGlobalSoundUnlock(), [])
  return null
}
