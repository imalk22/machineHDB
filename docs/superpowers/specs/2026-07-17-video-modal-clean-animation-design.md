# VideoModal: cleaner autoplay animation + delayed CTA

Date: 2026-07-17
Status: Approved, ready for implementation

## Context

The Kottu Cutting Machine landing page (`app/page.tsx`) opens with `VideoModal.tsx`: a portrait (9:16) autoplay video card with a WhatsApp/Call pricing overlay. Reference points supplied by the user:

- [hdb-engineering.vercel.app/en/clients](https://hdb-engineering.vercel.app/en/clients) — "short videos" section, for autoplay video feel
- [hdb.lk/copy-of-liquide-machine](https://www.hdb.lk/copy-of-liquide-machine) — for the WhatsApp/Call popup button style

Feedback on the current implementation, gathered via brainstorming (including a visual companion mockup comparing three chrome/layout treatments — boxed card vs. immersive minimal vs. reels-style):

- Layout: the existing boxed rounded-card treatment is correct (confirmed via mockup selection) — no structural redesign needed.
- The overlay/buttons currently appear almost immediately when the video starts, all staggered with separate hardcoded per-element delays (0.3s–0.7s). This reads as busy rather than "clean."
- The user wants the CTA to feel like it "pops up while watching" — i.e., appear after a delay once the video is already playing, not instantly.
- Investigated a user report that the video looks "squished/cropped": parsed `public/videos/vid.mp4`'s `tkhd` atom directly (no ffprobe/mediainfo available in this environment) — native resolution is 478×850, aspect ratio 0.562 ≈ 9:16 (0.5625). So there is no cropping/distortion bug; the video is simply low-resolution (roughly 480p) and looks soft when stretched to fill a phone-width container. This is a source-asset limitation, not a layout/CSS bug. User decided to proceed with the current file and swap in a higher-res export later — no code changes needed when that happens, same `/videos/vid.mp4` path.
- Video is 2:53 long with no `loop` attribute today, so it plays once and freezes on the last frame. User confirmed: add `loop` and keep the full video (no trimming) for now.

## Design

Scope: `components/VideoModal.tsx` only. No new files, no new dependencies (still `framer-motion`, already installed). No changes to `app/page.tsx` or other sections.

### Video element

- Add `loop` and `preload="auto"` to the existing `<video>` tag.
- Keep `autoPlay`, `muted`, `playsInline` unchanged (required for reliable cross-browser autoplay).
- Keep the existing 9:16 `aspect-[9/16] rounded-3xl` container — no structural/layout change.

### Delayed CTA reveal

- The overlay (gradient + badge + price + features + buttons) starts hidden.
- A timer tied to actual playback start (not just component mount) reveals it after **2.5s** of watching, so it reads as popping up mid-video rather than instantly overlaying it.
- Implementation approach: use the video's `onPlay` handler (falls back gracefully if autoplay is blocked/delayed by the browser) to start a `setTimeout(2500)` that flips a `showCTA` state, rather than firing the timer unconditionally on mount.

### Animation choreography

- Replace the current five separately-hardcoded `delay:` values on individual `motion.div`s with a single framer-motion parent variant using `staggerChildren` (~0.08s) and a shared "expo-out" easing curve `[0.16, 1, 0.3, 1]`.
- Children (badge, price block, features list, button group) become variant-driven `motion.div`s that inherit timing from the parent instead of each hardcoding its own delay — same visual grouping/order as today, just one coordinated motion instead of independently-timed pieces.
- The video container's own entrance (fade+scale, 0.6s) is unchanged — it already reads as clean.

### CTA emphasis

- Once visible, the WhatsApp button gets a slow recurring pulse/glow loop (framer-motion `animate` with `repeat: Infinity`, a few-second period) to keep drawing the eye after the initial reveal, echoing the persistent-CTA feel on hdb.lk. Kept subtle — not a flashing/attention-grabbing effect.

### Explicitly not changing

- Overlay content/copy: badge text, price figures, features list, WhatsApp/Call button text and links.
- Page structure/order: Specs, Features, WhyChoose, Pricing, Footer sections untouched.
- The video source file itself (resolution/trim) — deferred to the user providing a replacement later.

## Testing / verification

No automated tests exist in this project (marketing landing page, no test suite configured). Verification will be manual: run the Next.js dev server, load the page, confirm:

- Video autoplays, loops seamlessly after 2:53.
- Overlay stays hidden for ~2.5s after playback starts, then animates in as one coordinated motion.
- WhatsApp button shows a subtle recurring pulse once visible.
- WhatsApp and Call links still point to the correct existing URLs (unchanged).

## Notes

- This project directory is not a git repository, so this spec is not committed to version control — it's a plain file for reference.
