'use client'

import type { CSSProperties, Ref } from 'react'

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
  iframeRef: Ref<HTMLIFrameElement>
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
        <div className="absolute inset-0 bg-black/10" aria-hidden />
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
