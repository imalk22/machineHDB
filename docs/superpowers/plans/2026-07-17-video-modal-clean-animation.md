# VideoModal Clean Animation + Delayed CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hero video in `components/VideoModal.tsx` loop continuously and reveal its WhatsApp/Call offer overlay ~2.5s into playback as one smoothly-staggered animation (instead of five independently-timed pieces appearing almost immediately), with a subtle recurring glow on the WhatsApp button once visible.

**Architecture:** Single-file change to `components/VideoModal.tsx`. Add a `showCTA` boolean state that starts `false` and flips to `true` via a `setTimeout` keyed off actual video playback (`isPlaying`). Replace the five separately-hardcoded `initial/animate/transition` props on the overlay's child `motion.div`s with a shared framer-motion `variants` pair (`ctaContainerVariants` / `ctaItemVariants`) driven by `showCTA`, so all pieces animate in as one coordinated stagger. Add `loop`/`preload="auto"` to the `<video>` tag. Add a looping `boxShadow` keyframe animation to the WhatsApp button.

**Tech Stack:** Next.js 14, React 18, framer-motion 10 (already installed — no new dependencies), Tailwind CSS.

**Note on testing:** This project has no automated test suite (no test runner in `package.json`, no `tests/` directory). Verification steps below are manual: run `npm run dev` and check behavior in the browser, per the project's existing practice. Do not add a testing framework as part of this plan — that would be out of scope.

---

## Reference: full current file

`components/VideoModal.tsx` (136 lines) — read this file before starting so the line numbers below make sense; it may have shifted slightly if it was touched since this plan was written.

---

### Task 1: Wire up delayed-reveal state and video attributes

**Files:**
- Modify: `components/VideoModal.tsx:1-45`

- [ ] **Step 1: Replace the top of the file (imports through the `if (!isOpen) return null` guard) to add the reveal-delay state, timing constant, and variants objects**

Find this block (lines 1-24):

```tsx
'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  autoPlay?: boolean
}

export default function VideoModal({ isOpen, onClose, autoPlay = false }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (isOpen && videoRef.current && autoPlay) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isOpen, autoPlay])

  if (!isOpen) return null
```

Replace it with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  autoPlay?: boolean
}

const CTA_REVEAL_DELAY_MS = 2500

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

export default function VideoModal({ isOpen, onClose, autoPlay = false }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    if (isOpen && videoRef.current && autoPlay) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isOpen, autoPlay])

  useEffect(() => {
    setShowCTA(false)
    if (!isPlaying) return
    const timer = setTimeout(() => setShowCTA(true), CTA_REVEAL_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isPlaying])

  if (!isOpen) return null
```

- [ ] **Step 2: Update the `<video>` tag to loop and report real playback start**

Find this block (was lines 36-45 before Step 1's insertion shifted line numbers — search by content instead):

```tsx
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            playsInline
            muted
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
```

Replace it with:

```tsx
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            loop
            preload="auto"
            playsInline
            muted
            onPlay={() => setIsPlaying(true)}
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
```

- [ ] **Step 3: Save the file and confirm it still compiles**

Run: `cd "c:\Users\imesh\Music\kottu cutting" && npx tsc --noEmit`
Expected: No errors (the project has no other type errors to worry about — this command should exit with no output and exit code 0).

---

### Task 2: Convert the overlay to a single staggered animation and add the WhatsApp pulse

**Files:**
- Modify: `components/VideoModal.tsx` (overlay `motion.div` and its five children, plus the WhatsApp `motion.a`)

- [ ] **Step 1: Replace the overlay wrapper's animation props**

Find:

```tsx
          {/* CTA Overlay - Pricing Section */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
```

Replace with:

```tsx
          {/* CTA Overlay - Pricing Section, pops up ~2.5s into playback */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none"
            initial="hidden"
            animate={showCTA ? 'visible' : 'hidden'}
            variants={ctaContainerVariants}
          >
```

- [ ] **Step 2: Replace the badge block's animation props**

Find:

```tsx
            {/* Special Offer Badge */}
            <motion.div
              className="mb-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-orange-400 font-bold text-lg mb-2">🔥 Special Offer</p>
              <p className="text-white text-sm">සීමිත දීමනාවලට - ගිණුමෙ සඳහා අසීමිත</p>
            </motion.div>
```

Replace with:

```tsx
            {/* Special Offer Badge */}
            <motion.div className="mb-4 text-center" variants={ctaItemVariants}>
              <p className="text-orange-400 font-bold text-lg mb-2">🔥 Special Offer</p>
              <p className="text-white text-sm">සීමිත දීමනාවලට - ගිණුමෙ සඳහා අසීමිත</p>
            </motion.div>
```

- [ ] **Step 3: Replace the price block's animation props**

Find:

```tsx
            {/* Price Section */}
            <motion.div
              className="text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-gray-400 line-through text-lg">රු.124,375</span>
                <span className="text-red-500 text-2xl">✕</span>
                <span className="text-4xl font-bold text-accent">රු. 99,500</span>
                <span className="text-green-400 text-2xl">✓</span>
              </div>
              <p className="text-orange-300 text-sm font-semibold">SAVE රු.24,875</p>
            </motion.div>
```

Replace with:

```tsx
            {/* Price Section */}
            <motion.div className="text-center mb-6" variants={ctaItemVariants}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-gray-400 line-through text-lg">රු.124,375</span>
                <span className="text-red-500 text-2xl">✕</span>
                <span className="text-4xl font-bold text-accent">රු. 99,500</span>
                <span className="text-green-400 text-2xl">✓</span>
              </div>
              <p className="text-orange-300 text-sm font-semibold">SAVE රු.24,875</p>
            </motion.div>
```

- [ ] **Step 4: Replace the features block's animation props**

Find:

```tsx
            {/* Features */}
            <motion.div
              className="text-white text-xs mb-6 space-y-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p>✅ නොමිලේ ගෙවීම සිරි ලංකා පුරා</p>
              <p>✅ නිමිතෝ ස්ථාපනය සහ පුහුණුව</p>
              <p>✅ 1 වසර භාරය</p>
            </motion.div>
```

Replace with:

```tsx
            {/* Features */}
            <motion.div className="text-white text-xs mb-6 space-y-1" variants={ctaItemVariants}>
              <p>✅ නොමිලේ ගෙවීම සිරි ලංකා පුරා</p>
              <p>✅ නිමිතෝ ස්ථාපනය සහ පුහුණුව</p>
              <p>✅ 1 වසර භාරය</p>
            </motion.div>
```

- [ ] **Step 5: Replace the buttons block's animation props and add the WhatsApp glow**

Find:

```tsx
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-3 pointer-events-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-center transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 WhatsApp Price & Demo
              </motion.a>
              <motion.a
                href="tel:+94760360560"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Call Now
              </motion.a>
            </motion.div>
```

Replace with:

```tsx
            {/* CTA Buttons */}
            <motion.div className="flex flex-col gap-3 pointer-events-auto" variants={ctaItemVariants}>
              <motion.a
                href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-center transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(34,197,94,0.5)',
                    '0 0 22px rgba(34,197,94,0.55)',
                    '0 0 0px rgba(34,197,94,0.5)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
              >
                💬 WhatsApp Price & Demo
              </motion.a>
              <motion.a
                href="tel:+94760360560"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Call Now
              </motion.a>
            </motion.div>
```

- [ ] **Step 6: Save the file and confirm it still compiles**

Run: `cd "c:\Users\imesh\Music\kottu cutting" && npx tsc --noEmit`
Expected: No errors.

---

### Task 3: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `cd "c:\Users\imesh\Music\kottu cutting" && npm run dev`
Expected: `▲ Next.js 14.x.x` banner and `Local: http://localhost:3000` in the output, no compile errors.

- [ ] **Step 2: Open the page and watch the first ~5 seconds**

Open `http://localhost:3000` in a browser.
Expected:
- Video starts playing automatically, muted, no visible overlay content for the first ~2.5 seconds (just the video, no price panel or buttons).
- Around 2.5 seconds in, the badge, price, features, and both buttons animate in together as one smooth staggered motion (each element sliding up + fading in with a very slight cascade, not five separately-timed pops).
- Once visible, the green WhatsApp button has a soft recurring glow pulsing around it every ~2 seconds.

- [ ] **Step 3: Confirm the video loops**

If you don't want to wait for the full 2:53 clip, temporarily set the video's `currentTime` from the browser devtools console to near the end (e.g. `document.querySelector('video').currentTime = document.querySelector('video').duration - 2`) and watch it cross the end boundary.
Expected: Video restarts from the beginning automatically (no freeze on the last frame, no controls appearing).
Cleanup: Refresh the page afterward — this is a devtools-only check, no code changes needed.

- [ ] **Step 4: Confirm the WhatsApp and Call links are unchanged**

Click (or inspect the `href` of) the WhatsApp button and the Call button.
Expected:
- WhatsApp button href starts with `https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka...`
- Call button href is `tel:+94760360560`
- Both are unchanged from before this plan.

- [ ] **Step 5: Stop the dev server**

Stop the `npm run dev` process (Ctrl+C in its terminal, or however it was started).

---

## Out of scope (explicitly not part of this plan)

- Replacing `public/videos/vid.mp4` with a higher-resolution or trimmed file — deferred, user will provide this separately; no code changes needed when they do (same file path).
- Any change to `app/page.tsx` or any other component (`Specs`, `Features`, `WhyChoose`, `Pricing`, `Footer`).
- Adding a test framework — this project has none today and adding one is out of scope for this change.
