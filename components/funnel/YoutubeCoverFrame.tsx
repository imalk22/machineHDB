'use client'

import type { CSSProperties, RefObject } from 'react'

/**
 * Shared YouTube frame: thumbnail covers iframe until showPoster is false.
 * Poster must sit above the iframe (z-20) or YouTube's black boot screen shows.
 */
export default function YoutubeCoverFrame({
  src,
  posterUrl,
  showPoster,
  title,
  iframeRef,
  onIframeLoad,
  aspectClass,
  iframeClassName,
  iframeStyle,
  onToggle,
}: {
  src: string
  posterUrl: string
  showPoster: boolean
  title: string
  iframeRef: RefObject<HTMLIFrameElement | null>
  onIframeLoad: () => void
  aspectClass: string
  iframeClassName?: string
  iframeStyle?: CSSProperties
  onToggle?: () => void
}) {
  return (
    <div className={`relative w-full overflow-hidden bg-zinc-900 ${aspectClass}`}>
      {src ? (
        <iframe
          ref={iframeRef}
          className={iframeClassName ?? 'absolute inset-0 h-full w-full border-0'}
          style={iframeStyle}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          onLoad={onIframeLoad}
        />
      ) : null}

      {/* Always render poster while needed — ABOVE iframe */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
          showPoster ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!showPoster}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt=""
          className="h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg ring-1 ring-white/30">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      {onToggle ? (
        <button
          type="button"
          className="absolute inset-0 z-30 cursor-pointer bg-transparent"
          aria-label="Play or pause video"
          onClick={onToggle}
        />
      ) : null}
    </div>
  )
}
