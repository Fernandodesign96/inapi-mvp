'use client'

import { useState } from 'react'
import { Layers, Lightbulb, MonitorPlay, Stamp } from 'lucide-react'
import { StorySection } from '@/components/story/StorySection'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { Reveal } from '@/components/story/Reveal'
import { VideoCard } from '@/components/story/VideoCard'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import type { StoryTone } from '@/components/story/EyebrowPill'
import { INAPI_VIDEOS, INAPI_YOUTUBE_CHANNEL, type InapiVideoKey } from '@/lib/inapi-videos'
import { cn } from '@/lib/utils'

/** Banda con un video embebido y su explicación en 3 puntos. */
export function VideoSpotlight({
  video,
  eyebrow = 'En video',
  title,
  lead,
  points,
  tone = 'mist',
  reverse = false,
  id,
}: {
  video: InapiVideoKey
  eyebrow?: string
  title: string
  lead?: string
  points: { title: string; body: string }[]
  tone?: StoryTone
  reverse?: boolean
  id?: string
}) {
  const night = tone === 'night'
  return (
    <StorySection tone={tone} id={id}>
      <div className={cn('grid items-center gap-gob-7 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]', reverse && 'min-[1100px]:[&>*:first-child]:order-2')}>
        <Reveal>
          <VideoCard video={video} tone={night ? 'night' : 'paper'} showText={false} size="lg" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-gob-5">
          <span
            className={cn(
              'inline-flex w-fit items-center gap-gob-2 rounded-full border px-gob-3 py-gob-1 text-gri-body-xs font-semibold uppercase tracking-[0.08em]',
              night ? 'border-white/20 bg-white/8 text-white' : 'border-gob-border bg-card text-gob-text',
            )}
          >
            <MonitorPlay className="size-4 text-inapi-header" aria-hidden />
            {eyebrow}
          </span>
          <h2 className={cn('portal-h2 text-balance', night ? 'text-white' : 'text-gob-text')}>{title}</h2>
          {lead ? <p className={cn('text-gri-body leading-[1.6]', night ? 'text-white/82' : 'text-muted-foreground')}>{lead}</p> : null}
          <ol className="flex flex-col gap-gob-3">
            {points.map((p, i) => (
              <li
                key={p.title}
                className={cn('flex gap-gob-4 rounded-gob-lg p-gob-4', night ? 'story-glass' : 'border border-gob-border bg-card shadow-elevation-01')}
              >
                <span
                  aria-hidden
                  className="story-tabular inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-inapi-header font-heading text-gri-body-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <div className="space-y-0.5">
                  <p className={cn('font-medium', night ? 'text-white' : 'text-gob-text')}>{p.title}</p>
                  <p className={cn('text-gri-body-sm leading-[1.55]', night ? 'text-white/78' : 'text-muted-foreground')}>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </StorySection>
  )
}

/** Carrusel de videos con el enlace al canal como pie. */
export function VideoGallery({
  videos,
  title = 'Aprende en video',
  lead,
  tone = 'paper',
}: {
  videos: InapiVideoKey[]
  title?: string
  lead?: string
  tone?: StoryTone
}) {
  const night = tone === 'night'
  return (
    <StorySection tone={tone} eyebrow="Videos INAPI" title={title} lead={lead}>
      <StoryCarousel
        label={title}
        tone={tone}
        arrows="sides"
        footer={
          <a
            href={INAPI_YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'mr-gob-2 inline-flex min-h-11 items-center gap-gob-2 text-gri-body-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              night ? 'text-white' : 'text-gob-link',
            )}
          >
            <MonitorPlay className="size-4 text-inapi-header" aria-hidden />
            Canal de INAPI en YouTube
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        }
      >
        {videos.map(v => (
          <VideoCard key={v} video={v} tone={night ? 'night' : 'paper'} />
        ))}
      </StoryCarousel>
    </StorySection>
  )
}

const SHOWCASE_VIDEOS: InapiVideoKey[] = [
  'solicitarMarca',
  'tramitarPatente',
  'queEsPatente',
  'costosPatente',
  'selloOrigen',
  'cuentaPublica',
]

const SHOWCASE_POINTS = [
  {
    id: 'marca',
    title: 'La marca identifica',
    summary: 'Protege el nombre, el logo o el signo con el que te reconocen tus clientes.',
    icon: <Stamp />,
    bullets: [
      { icon: <Stamp />, text: 'Cubre el **nombre**, el **logo** o el eslogan de tu negocio.' },
      { icon: <Layers />, text: 'Sirve para que un cliente pida «este producto» y no el de otra tienda.' },
      { icon: <Lightbulb />, text: 'No protege cómo funciona el producto, solo cómo se reconoce.' },
    ],
  },
  {
    id: 'patente',
    title: 'La patente protege una invención',
    summary: 'Cubre un producto o un procedimiento nuevo que resuelve un problema técnico.',
    icon: <Lightbulb />,
    bullets: [
      { icon: <Lightbulb />, text: 'Cubre un **producto** o un **procedimiento** nuevo.' },
      { icon: <Layers />, text: 'Resuelve un problema técnico, no el nombre comercial.' },
      { icon: <Stamp />, text: 'Si también quieres el nombre, pide además una **marca**.' },
    ],
  },
  {
    id: 'juntas',
    title: 'Pueden ir juntas',
    summary: 'Un producto innovador puede tener una patente por cómo funciona y una marca por su nombre.',
    icon: <Layers />,
    bullets: [
      { icon: <Lightbulb />, text: 'La **patente** cubre cómo funciona o se fabrica.' },
      { icon: <Stamp />, text: 'La **marca** cubre cómo lo reconocen tus clientes.' },
      { icon: <Layers />, text: 'Un mismo producto puede pedir **ambos** derechos.' },
    ],
  },
]

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function VideoFaqRow({
  night,
}: {
  night: boolean
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set())
  const toggle = (id: string) => {
    setOpen(current => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  return (
    <div className="grid h-full grid-cols-3 items-start gap-gob-3">
      {SHOWCASE_POINTS.map(point => {
        const selected = open.has(point.id)
        return (
          <article
            key={point.id}
            className={cn(
              'flex min-h-0 w-full cursor-pointer flex-col overflow-hidden rounded-gob-lg border transition-[height,background-color,color,border-color] duration-300 ease-out',
              selected ? 'h-full aspect-auto' : 'aspect-square',
              night
                ? selected
                  ? 'border-transparent bg-white/14 text-white'
                  : 'story-glass story-glass-interactive text-white'
                : 'story-card-hover-paper border-gob-border bg-card text-gob-text shadow-elevation-01',
            )}
            data-clickable=""
            data-open={selected ? 'true' : undefined}
          >
            <button
              type="button"
              onClick={() => toggle(point.id)}
              aria-expanded={selected}
              className="flex min-h-0 flex-1 cursor-pointer flex-col gap-2 px-gob-4 py-gob-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus"
            >
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-9 shrink-0 items-center justify-center rounded-gob-md [&_svg]:size-4',
                  night || selected ? 'bg-white/15 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
                )}
              >
                {point.icon}
              </span>
              <span className="font-heading text-gri-body-sm font-semibold leading-[1.35]">{point.title}</span>
              <span className={cn('text-gri-body-xs leading-[1.45]', night || selected ? 'text-white/90' : 'text-muted-foreground')}>
                {point.summary}
              </span>
              <div
                className={cn(
                  'grid min-h-0 flex-1 transition-[grid-template-rows] duration-300 ease-out',
                  selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
                aria-hidden={!selected}
              >
                <ul className="min-h-0 space-y-gob-3 overflow-hidden pt-gob-3">
                  {point.bullets.map(bullet => (
                    <li key={bullet.text} className="flex items-start gap-gob-2 text-gri-body-xs leading-[1.45]">
                      <span aria-hidden className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-gob-md bg-white/15 text-white [&_svg]:size-3.5">
                        {bullet.icon}
                      </span>
                      <span>
                        <RichLine text={bullet.text} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </article>
        )
      })}
    </div>
  )
}

/** Home: video principal, tres cards a la derecha y seis barras debajo. */
export function VideoShowcase({
  video = 'patenteVsMarca',
  title,
  lead,
  tone = 'paper',
}: {
  video?: InapiVideoKey
  title: string
  lead?: string
  tone?: StoryTone
}) {
  const night = tone === 'night'
  const v = INAPI_VIDEOS[video]
  const leftVideos = SHOWCASE_VIDEOS.slice(0, 3)
  const rightVideos = SHOWCASE_VIDEOS.slice(3)
  return (
    <StorySection tone={tone} eyebrow="En video" title={title} lead={lead} align="left" leadSingleLine>
      <div className="grid items-stretch gap-gob-5 min-[1100px]:grid-cols-2">
        <Reveal className="min-w-0 min-[1100px]:col-span-2">
          <h3 className={cn('font-heading text-[1.5rem] font-bold leading-[1.3] min-[905px]:text-[1.75rem]', night ? 'text-white' : 'text-gob-text')}>{v.title}</h3>
          <p className={cn('mt-gob-1 text-gri-body-sm leading-[1.55]', night ? 'text-white/90' : 'text-muted-foreground')}>{v.description}</p>
        </Reveal>
        <Reveal className="min-w-0">
          <VideoCard video={video} tone={night ? 'night' : 'paper'} showText={false} size="lg" />
        </Reveal>
        <Reveal delay={0.08} className="relative min-h-[18rem] min-w-0 min-[1100px]:min-h-0">
          <div className="h-full min-[1100px]:absolute min-[1100px]:inset-0">
            <VideoFaqRow night={night} />
          </div>
        </Reveal>
        {[leftVideos, rightVideos].map((column, i) => (
          <SectionAccordion
            key={i}
            tone={night ? 'night' : 'paper'}
            items={column.map(key => {
              const item = INAPI_VIDEOS[key]
              return {
                id: key,
                title: item.title,
                summary: item.description,
                icon: <MonitorPlay />,
                content: (
                  <div className="mx-auto w-full max-w-xl">
                    <VideoCard video={key} tone={night ? 'night' : 'paper'} showText={false} />
                  </div>
                ),
              }
            })}
          />
        ))}
      </div>
    </StorySection>
  )
}
