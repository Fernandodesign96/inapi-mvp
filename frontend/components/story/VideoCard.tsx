'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { INAPI_VIDEOS, type InapiVideoKey } from '@/lib/inapi-videos'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

/**
 * Video de YouTube con fachada: muestra la miniatura y monta el iframe
 * (youtube-nocookie) solo al pulsar reproducir.
 */
export function VideoCard({
  video,
  tone = 'paper',
  showText = true,
  className,
  size = 'md',
}: {
  video: InapiVideoKey
  tone?: 'night' | 'paper'
  showText?: boolean
  className?: string
  size?: 'md' | 'lg'
}) {
  const { tx, locale } = useI18n()
  const [playing, setPlaying] = useState(false)
  const v = INAPI_VIDEOS[video]
  const night = tone === 'night'
  const title = tx(v.title)

  return (
    <figure className={cn('flex min-w-0 flex-col gap-gob-4', className)}>
      <div
        className={cn(
          'relative aspect-video w-full overflow-hidden rounded-gob-xl bg-[#061526] shadow-elevation-04',
          night ? 'ring-1 ring-white/15' : 'ring-1 ring-gob-border',
        )}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&hl=${locale}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gob-focus"
            aria-label={`${tx('Reproducir video:')} ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061526]/85 via-[#061526]/25 to-transparent" />
            <span
              aria-hidden
              className={cn(
                'absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#092039] shadow-elevation-05 transition-transform group-hover:scale-105',
                size === 'lg' ? 'size-20' : 'size-16',
              )}
            >
              <Play className={cn('translate-x-0.5 fill-current', size === 'lg' ? 'size-8' : 'size-6')} />
            </span>
            <span aria-hidden className="absolute bottom-gob-4 left-gob-4 right-gob-4 flex items-center gap-gob-2 text-left text-gri-body-xs font-semibold uppercase tracking-[0.08em] text-white/90">
              <span className="size-2 rounded-full bg-inapi-header" />
              {tx('Video INAPI')}
            </span>
          </button>
        )}
      </div>
      {showText ? (
        <figcaption className="space-y-gob-1">
          <p className={cn('font-heading text-gri-h2 font-medium leading-[1.35]', night ? 'text-white' : 'text-gob-text')}>{title}</p>
          <p className={cn('text-gri-body-sm leading-[1.55]', night ? 'text-white/78' : 'text-muted-foreground')}>{tx(v.description)}</p>
        </figcaption>
      ) : null}
    </figure>
  )
}
